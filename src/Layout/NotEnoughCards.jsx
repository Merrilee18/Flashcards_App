import React from "react";
import { Link, useParams } from "react-router-dom";

function NotEnoughCards({ study, tempDeck }) {
    const { deckId } = useParams();

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
      <h3>Not Enough Cards.</h3>
      <p>
        You need at least 3 cards to study. There are {study.cards.length} cards in this deck.
      </p>
      {/* This link takes you to AddCard */}
      <Link to={`/decks/${tempDeck.id}/cards/new`}>
        <button type="button" className="btn btn-info">
          <i className="bi bi-plus-square"></i> Add Card
        </button>
      </Link>
    </div>
  );
}

export default NotEnoughCards;
