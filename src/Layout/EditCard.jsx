import React, { useEffect } from "react";
import { Link, useHistory, useParams } from "react-router-dom";
import { updateCard, readCard } from "../utils/api";

function EditCard({ card, setCard, deck }) {
  const history = useHistory();
  const { cardId, deckId } = useParams();

  //useEffect to fetch deck data
  useEffect(() => {
    async function loadCard() {
      const loadedCard = await readCard(cardId);
      setCard(loadedCard);
    }
    loadCard();
  }, [cardId, setCard]);

  //when form is submitted, handles edit submission
  function submitHandler(e) {
    e.preventDefault();
    updateCard(card).then((output) => history.push(`/decks/${deckId}`));
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
    history.push("/")
  }

  return (
    <div>
      <nav aria-label="breadcrumb">
        <ol className="breadcrumb">
          <li className="breadcrumb-item">
            <Link to="/"><i className="bi bi-house-door"></i> Home</Link>
          </li>
          <li className="breadcrumb-item">
            <Link to={`/decks/${deck.id}`}>{deck.name}</Link>
          </li>
          <li className="breadcrumb-item active" aria-current="page">
            Edit Card
          </li>
        </ol>
      </nav>
      <h2>Edit Card</h2>
      <form onSubmit={submitHandler}>
        <div className="form-group">
          <label className="font-weight-bold" htmlFor="Description">Front</label>
          <textarea
            className="form-control"
            id="description"
            rows="3"
            onChange={changeFront}
            defaultValue={card.front}
          ></textarea>
        </div>
        <div className="form-group">
          <label className="font-weight-bold" htmlFor="Description">Back</label>
          <textarea
            className="form-control"
            id="description"
            rows="3"
            onChange={changeBack}
            defaultValue={card.back}
          ></textarea>
        </div>
        {/* Submit button should take the user to the deck screen */}
        <button type="submit" className="btn btn-info mr-2">
          Submit
        </button>
        <button onClick={handleCancel} type="button" className="btn btn-secondary">
          Cancel
        </button>
      </form>
    </div>
  );
}

export default EditCard;
