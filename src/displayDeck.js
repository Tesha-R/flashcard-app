import { getDecksLocalStorage, numberOfCards } from "./index.js";

function displayDeck(deckId) {
  let decks = getDecksLocalStorage();
  let html = "";
  const deck = decks.find((deck) => {
    return deck.id === deckId;
  });
  let cardCount = numberOfCards(deck.id);
  console.log("deck id " + deck.id);
  html += `
      <div class="deck card">
      <div class="card-body">
        <h2 class="deck-name">${deck.name}</h2>
        <p class="deck-desc lead">${deck.description}</p>
       <div class="group-btns">
       <button type="button" class="btn btn-primary add-cards-btn" data-bs-toggle="modal" data-bs-target="#addCardsToDeck" data-id=${deck.id}>
       + Add cards
       </button>
       <button type="button" class="study-deck-btn btn btn-light" data-id=${deck.id}><img src="../assets/book.svg" alt="eye icon"/> Study</button>
   <button type="button" class="edit-deck-btn btn btn-light" data-bs-toggle="modal" data-bs-target="#editDeck"data-id=${deck.id}><img src="../assets/edit-3.svg" alt="eye icon"/> Edit</button>
       <button type="button" class="delete-deck-btn btn btn-light" data-id=${deck.id}><img src="../assets/trash-2.svg" alt="eye icon"/> Delete</button>
       </div>
        <p class="h6 card-count">${cardCount} Cards</p>
      </div>
    </div>
        `;
  localStorage.setItem("decks", JSON.stringify(decks));
  return html;
}

export { displayDeck };
