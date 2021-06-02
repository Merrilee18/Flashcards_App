import React from "react";
import { Link, useRouteMatch, useHistory } from "react-router-dom";
import { deleteDeck } from "../utils/api/index.js";
//Displays the deck name, count, and description.
//Has three buttons: view, study, delete

function Deck({ deckId, name, description, count, setReRender, reRender }) {
  const { url } = useRouteMatch();
  const history = useHistory();

  function deleteHandler() {
    window.confirm("Are you sure you want to delete this deck?");
    deleteDeck(deckId);
    setReRender(!reRender)
    history.push("/");
    history.go(0);
  }

  return (
    <div className="row">
      <div className="col">
        <div className="card">
          <div className="card-body">
            <h5>{name}</h5>
            <h6>{count} cards</h6>
            <p>{description}</p>
            {/* This link takes you to "ViewDeck" */}
            <div className="row">
              <div className="col">
                <Link to={`${url}decks/${deckId}`}>
                  <button type="button" className="btn btn-secondary mr-2">
                  <i className="bi bi-eye"></i> View
                  </button>
                </Link>
                {/* This link takes you to Study */}
                <Link to={`${url}decks/${deckId}/study`}>
                  <button type="button" className="btn btn-info">
                  <i className="bi bi-book"></i> Study
                  </button>
                </Link>
              </div>
              <div className="col text-right">
                {/* Button deletes the entire deck and returns you to home screen */}
                  <button
                    type="button"
                    onClick={deleteHandler}
                    className="btn btn-danger"
                  >
                    <i className="bi bi-trash"></i> Delete
                  </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Deck;
