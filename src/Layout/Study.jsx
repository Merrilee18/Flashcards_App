import React, { useEffect, useState } from "react";
import { useParams, Link, useHistory } from "react-router-dom";
import { readDeck } from "../utils/api";
import NotEnoughCards from "./NotEnoughCards";

function Study({ cards, setCards, deck }) {
  const { deckId } = useParams();
  const [tempDeck, setTempDeck] = useState({});
  const history  = useHistory();

  const [study, setStudy] = useState({
    cards: [],
    currentCard: 0,
    cardMax: 0,
    front: true,
    flipped: false,
  });

  //useEffect to fetch deck data
  useEffect(() => {
    const abortController = new AbortController();
    setCards([]);
    setTempDeck({});
    async function loadDecks() {
      const loadedDeck = await readDeck(deckId, abortController.signal);
      setTempDeck(loadedDeck);
      setStudy({
        cards: loadedDeck.cards,
        currentCard: 0,
        front: true,
        flipped: false,
        cardMax: loadedDeck.cards.length,
      });
    }
    loadDecks();

    return () => {
      abortController.abort();
    };
  }, [deckId, setCards]);


  if (study.cards.length < 3) {
    return (
        <NotEnoughCards study={study} tempDeck={tempDeck} />
    );
  }

  function handleFlip() {
    setStudy({
      ...study,
      front: !study.front,
      flipped: true,
    });
  }

  function handleNext() {
    if (study.currentCard >= study.cardMax -1) {
      if(window.confirm("Restart cards? Click 'cancel' to return to the home page")){
          setStudy({
              ...study,
              currentCard: 0,
              front: true,
              flipped: false
          })
      } else {
          history.push("/")
      }
    }  
    
    else {
      setStudy({
        ...study,
        front: true,
        flipped: false,
        currentCard: study.currentCard + 1,
      });
    }
  }

  return (
    <div>
      <nav aria-label="breadcrumb">
        <ol className="breadcrumb">
          <li className="breadcrumb-item">
            <a href="/">Home</a>
          </li>
          <li className="breadcrumb-item">
            <Link to={`/decks/${deckId}`}>{tempDeck.name}</Link>
          </li>
          <li className="breadcrumb-item active" aria-current="page">
            Study
          </li>
        </ol>
      </nav>
      <h1>Study: {tempDeck.name}</h1>
      <br />
      <div className="card border-success mb-3">
        <div className="card-body text-success">
          <h5 className="card-title">{study.front ? "Question" : "Answer"}</h5>
          <p className="card-text">
            {study.front
              ? study.cards[study.currentCard].front
              : study.cards[study.currentCard].back}
          </p>
          <div className="row">
            <div className="col">
              <button onClick={handleFlip} className="btn btn-success mr-2">
                <i className="bi bi-arrow-counterclockwise"></i> Flip
              </button>
              {!study.front ? (
                <button onClick={handleNext} className="btn btn-secondary">
                  <i className="bi bi-check2-circle"></i> Next
                </button>
              ) : null}
            </div>
            <div className="col text-right">
              <p>{`card ${study.currentCard + 1} of ${study.cardMax}`}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Study;
