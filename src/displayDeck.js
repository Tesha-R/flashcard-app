import { getDecksLocalStorage } from "./index.js";

function displayDeck(deckId) {
  let decks = getDecksLocalStorage();
  let html = "";
  const deck = decks.find((deck) => {
    return deck.id === deckId;
  });
  console.log("deck id " + deck.id);
  html += `
      <div class="deck card">
      <div class="card-body">deck id ${deck.id}
        <h2 class="deck-name">${deck.name}</h2>
        <p class="deck-desc">${deck.description}</p>
        <button type="button" class="study-deck-btn btn btn-secondary" data-id=${deck.id}>Study</button>
        <button type="button" class="btn btn-primary add-cards-btn" data-bs-toggle="modal" data-bs-target="#addCardsToDeck" data-id=${deck.id}>
    + Add cards
    </button>
        <button type="button" class="edit-deck-btn btn btn-secondary" data-bs-toggle="modal" data-bs-target="#createDeck"data-id=${deck.id}>Edit</button>
        <button type="button" class="delete-deck-btn btn btn-danger" data-id=${deck.id}>Delete</button>
      </div>
    </div>
        `;
  localStorage.setItem("decks", JSON.stringify(decks));
  return html;
}

export { displayDeck };
