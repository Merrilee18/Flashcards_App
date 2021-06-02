import React, { useEffect } from "react";
import { Link, useRouteMatch, useParams, useHistory } from "react-router-dom";
import { deleteDeck, readDeck } from "../utils/api/index.js";
import CardList from "./CardList";

{
  /* Displays the current deck with a preview of it's cards */
}
{
  /* Has options to edit, study, add cards, and delete */
}

function ViewDeck({ deck, setDeck, reRender, setReRender }) {
  const { url } = useRouteMatch();
  const { deckId } = useParams();
  const history = useHistory();

  useEffect(() => {
    const abortController = new AbortController();
    const readingDeck = async () => {
      try {
        const deckData = await readDeck(deckId, abortController.signal);
        setDeck(() => ({ ...deck, ...deckData }));
      } catch (error) {
        if (error.name === "AbortError") {
          console.log(error);
        } else {
          throw error;
        }
      }
    };

    readingDeck();
    return () => {
      abortController.abort();
    };
  }, [deckId, deck, setDeck]);

  function deleteHandler() {
    window.confirm("Are you sure you want to delete this deck?");
    deleteDeck(deckId);
    setReRender(!reRender)
    history.push("/");
    history.go(0);
  }

  return (
    <div>
      <nav aria-label="breadcrumb">
        <ol className="breadcrumb">
          <li className="breadcrumb-item">
            <Link to="/">
              <i className="bi bi-house-door"></i> Home
            </Link>
          </li>
          <li className="breadcrumb-item active" aria-current="page">
            {deck.name}
          </li>
        </ol>
      </nav>

      <div className="row">
        <div className="col">
          <div className="card">
            <div className="card-body">
              <h5>{deck.name}</h5>
              <p>{deck.description}</p>
              {/* This link takes you to EditDeck */}
              <div className="row">
                <div className="col">
                  <Link to={`${url}/edit`}>
                    <button type="button" className="btn btn-secondary mr-2">
                      <i className="bi bi-pencil-fill"></i> Edit
                    </button>
                  </Link>
                  {/* This link takes you to Study */}
                  <Link to={`${url}/study`}>
                    <button type="button" className="btn btn-info mr-2">
                      <i className="bi bi-book"></i> Study
                    </button>
                  </Link>
                  {/* This link takes you to AddCard */}
                  <Link to={`${url}/cards/new`}>
                    <button type="button" className="btn btn-info">
                      <i className="bi bi-plus-square"></i> Add Card
                    </button>
                  </Link>
                </div>
                <div className="col text-right">
                  {/* Delete button, returns you to home page */}
                  <Link to={`${url}decks/${deckId}`}>
                    <button
                      type="button"
                      onClick={deleteHandler}
                      className="btn btn-danger "
                    >
                      <i className="bi bi-trash"></i>
                    </button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="mb-5">
        <h3 className="p-3">Cards</h3>
        <CardList cards={deck.cards} />
      </div>
    </div>
  );
}

export default ViewDeck;
