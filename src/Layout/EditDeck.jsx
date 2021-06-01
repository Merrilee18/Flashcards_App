import React, { useState, useEffect } from "react";
import { Link, useHistory, useParams } from "react-router-dom";
import { updateDeck, readDeck } from "../utils/api";

function EditDeck() {
  const { deckId } = useParams();
  const history = useHistory();
  const [deck, setDeck] = useState({
    id: 0,
    name: "",
    description: "",
  });

  //useEffect to fetch deck data
  useEffect(() => {
    async function loadDecks() {
      const loadedDeck = await readDeck(deckId);
      setDeck(loadedDeck);
    }
    loadDecks();
  }, [deckId]);

  function handleCancel() {
    history.push("/")
  }

  //when form is submitted, handles edit submission
  function submitHandler(e) {
    e.preventDefault();
    updateDeck(deck).then((output) => history.push(`/decks/${output.id}`));
  }
  //change deck state when name changes
  function changeName(e) {
    setDeck({ ...deck, name: e.target.value });
  }
  //change deck state when description changes
  function changeDesc(e) {
    setDeck({ ...deck, description: e.target.value });
  }
  return (
    <div>
      {/* Breadcrumb navigation */}
      <nav aria-label="breadcrumb">
        <ol className="breadcrumb">
          <li className="breadcrumb-item">
            <Link to="/"><i className="bi bi-house-door"></i> Home</Link>
          </li>
          <li className="breadcrumb-item">
            <Link to={`/decks/${deckId}`}>{deck.name}</Link>
          </li>
          <li className="breadcrumb-item active" aria-current="page">
            Edit Deck
          </li>
        </ol>
      </nav>
      <h2>Edit Deck</h2>
      <form onSubmit={submitHandler}>
        <div className="form-group">
          <label htmlfor="name">Name</label>
          <input
            type="name"
            className="form-control"
            id="deckName"
            onChange={changeName}
            defaultValue={deck.name}
          />
        </div>
        <div className="form-group">
          <label for="Description">Description</label>
          <textarea
            className="form-control"
            id="description"
            rows="3"
            onChange={changeDesc}
            defaultValue={deck.description}
          ></textarea>
        </div>

        <button onClick={handleCancel} type="button" className="btn btn-secondary mr-2">
          Cancel
        </button>
        {/* Submit button should take the user to the deck screen */}

        <button type="submit" value="submit" className="btn btn-info">
          Submit
        </button>
      </form>
    </div>
  );
}

export default EditDeck;
