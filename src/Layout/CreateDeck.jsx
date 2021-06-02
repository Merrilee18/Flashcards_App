import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { createDeck } from "../utils/api/index.js";

function CreateDeck({ reRender, setReRender }) {
  // navbar with home / Create Deck
  //Create Deck heading
  //form: name (Deck Name), Description (Brief description of the deck)
  // two buttons: cancel, submit
  
  const [newDeck, setNewDeck] = useState([]);
  const history = useHistory();

  function submitHandler(e) {
    e.preventDefault();
    createDeck(newDeck).then((output) => history.push(`/decks/${output.id}`));
    setReRender(!reRender);
  }

  function handleCancel() {
    history.push("/");
  }

  //change deck state when name changes
  function changeName(e) {
    setNewDeck({ ...newDeck, name: e.target.value });
  }
  //change deck state when description changes
  function changeDesc(e) {
    setNewDeck({ ...newDeck, description: e.target.value });
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
            Create Deck
          </li>
        </ol>
      </nav>
      <h2>Create Deck</h2>
      <form onSubmit={submitHandler}>
        <div className="form-group">
          <label htmlFor="name">Name</label>
          <input
            type="name"
            className="form-control"
            id="deckName"
            placeholder="Name"
            onChange={changeName}
          />
        </div>
        <div className="form-group">
          <label htmlFor="Description">Description</label>
          <textarea
            className="form-control"
            id="description"
            rows="3"
            placeholder="Brief description of the deck"
            onChange={changeDesc}
          ></textarea>
        </div>
        <button
          onClick={handleCancel}
          type="button"
          className="btn btn-secondary m-1"
        >
          Cancel
        </button>
        {/* Submit button should take the user to the Viewdeck screen */}
        <button type="submit" className="btn btn-info m-1">
          Submit
        </button>
      </form>
    </div>
  );
}

export default CreateDeck;
