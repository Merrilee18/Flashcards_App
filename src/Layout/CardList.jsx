import React from "react";
import { Link, useRouteMatch, useHistory } from "react-router-dom";
import { deleteCard } from "../utils/api/index.js";

//display a preview of the cards in a deck
//front/back and two buttons: edit and trash

function CardList({ cards = [] }) {
  const { url } = useRouteMatch();
  const history = useHistory();



  return (
    <div>
      <ul className="CardList list-group">
        {cards.map((card, key) => (
          <li className="list-group-item">
            <div className="d-flex justify-content-between row">
              <div className="row align-content-center ">
                <div className="col mx-3">{card.front}</div>
                <div className="col">{card.back}</div>
              </div>
              <div className="row ml-auto p-2">
                  {/* Takes you to EditCard */}
                <Link
                  to={`${url}/cards/${card.id}/edit`}
                >
                  <button
                    type="button"
                    className="btn btn-secondary"
                  >
                    <i className="bi bi-pencil-fill"></i> Edit
                  </button>
                </Link>
                {/* Deletes the card */}
                <Link to={`${url}`}>
                  <button
                    type="button"
                onClick={() => {
                    window.confirm("Delete?")
                    deleteCard(card.id)
                    history.go("/decks/deckId")
                }}
                    className="btn btn-danger  ml-2 mr-4"
                  >
                    <i className="bi bi-trash"></i>
                  </button>
                </Link>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default CardList;
