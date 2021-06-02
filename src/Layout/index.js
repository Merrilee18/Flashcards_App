import React, { useState, useEffect } from "react";
import {
  Route,
  Switch,
  Link
} from "react-router-dom";
import Header from "./Header";
import NotFound from "./NotFound";
import Home from "./Home";
import CreateDeck from "./CreateDeck";
import { listDecks } from "../utils/api/index.js";
import Study from "./Study";
import ViewDeck from "./ViewDeck";
import EditDeck from "./EditDeck";
import EditCard from "./EditCard";
import AddCard from "./AddCard";

function Layout() {
  const [reRender, setReRender] = useState(false);
  const [decks, setDecks] = useState([]);
  const [deck, setDeck] = useState({});
  const [cards, setCards] = useState([]);
  const [card, setCard] = useState({});

  useEffect(() => {
    const abortController = new AbortController();

    const settingDecks = async () => {
      try {
        const data = await listDecks(abortController.signal);
        setDecks(() => {
          return data;
        });
      } catch (error) {
        if (error.name === "AbortError") {
          console.log(error);
        } else {
          throw error;
        }
      }
    };

    settingDecks();

    return () => {
      abortController.abort();
    };
  }, [reRender]);

  return (
    <div>
      <Header />
      <div className="container">
        <Switch>
          <Route exact path="/">
            <Link to="/decks/new">
              <button type="button" className="btn btn-info mb-3  ">
                <i className="bi bi-plus-square"></i> Create Deck
              </button>
            </Link>
            <Home decks={decks} reRender={reRender} setReRender={setReRender} />
          </Route>
          <Route path="/decks/new">
            <CreateDeck reRender={reRender} setReRender={setReRender} />
          </Route>
          <Route exact path="/decks/:deckId">
            <ViewDeck
              deck={deck}
              setDeck={setDeck}
              reRender={reRender}
              setReRender={setReRender}
            />
          </Route>
          <Route path="/decks/:deckId/edit">
            <EditDeck
              deck={deck}
              setDeck={setDeck}
              reRender={reRender}
              setReRender={setReRender}
            />
          </Route>
          <Route path="/decks/:deckId/study">
            <Study
              cards={cards}
              setCards={setCards}
              deck={deck}
              setDeck={setDeck}
            />
          </Route>
          <Route path="/decks/:deckId/cards/:cardId/edit">
            <EditCard card={card} setCard={setCard} deck={deck} />
          </Route>
          <Route path="/decks/:deckId/cards/new">
            <AddCard
              card={card}
              setCard={setCard}
              deck={deck}
              setDeck={setDeck}
              reRender={reRender}
              setReRender={setReRender}
            />
          </Route>
          <Route>
            <NotFound />
          </Route>
        </Switch>
      </div>
    </div>
  );
}

export default Layout;
