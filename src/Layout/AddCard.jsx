import React, { useEffect } from "react";
import { Link, useParams, useHistory } from "react-router-dom";
import { createCard, readDeck } from "../utils/api";

function AddCard({ card, setCard, deck, setDeck, reRender, setReRender }) {
  const { deckId } = useParams();
  const history = useHistory();

  const initializeForm = {
    front: "",
    back: "",
    deckId,
  };

    //load cards from API to determine new card ID
    useEffect(() => {
      const abortController = new AbortController();
      async function loadDeck() {
        //get name from current deck
        const loadedDeck = await readDeck(deckId);
        setDeck(loadedDeck);

      }
      loadDeck();

      return () => {
        abortController.abort();
      }
    }, [deckId, setDeck]);

  function handleSubmit(e) {
    e.preventDefault();
    async function updateData() {
      await createCard(deckId, card);
      setCard({ ...initializeForm });
      setReRender(!reRender);
    }
    updateData();
    history.push(`/decks/${deckId}`);
  }
  //change deck state when name changes
  function changeFront(e) {
    setCard({ ...card, front: e.target.value });
  }
  //change deck state when description changes
  function changeBack(e) {
    setCard({ ...card, back: e.target.value });
  }

  function handleCancel() {
    history.push(`/decks/${deckId}`)
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
          <li className="breadcrumb-item">
            <Link to={`/decks/${deckId}`}>{deck.name}</Link>
          </li>
          <li className="breadcrumb-item active" aria-current="page">
            Edit Deck
          </li>
        </ol>
      </nav>
      <h2>{deck.name}: Add Card</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="Description">Front</label>
          <textarea
            className="form-control"
            id="description"
            rows="3"
            placeholder="Front side of the card"
            onChange={changeFront}
          ></textarea>
        </div>

        <div className="form-group">
          <label htmlFor="Description">Back</label>
          <textarea
            className="form-control"
            id="description"
            rows="3"
            onChange={changeBack}
            placeholder="Back side of the card"
          ></textarea>
        </div>
        <button onClick={handleCancel} type="button" className="btn btn-secondary">
          Cancel
        </button>
        {/* Submit button should take the user to the deck screen */}
        <button type="submit" className="btn btn-info ml-2">
          Submit
        </button>
      </form>
    </div>
  );
}

export default AddCard;
