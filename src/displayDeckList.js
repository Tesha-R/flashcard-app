// Imports
import { appEl, getDecksLocalStorage } from "./index.js";
import displayHeader from "./displayHeader.js";

// display all decks
function displayDeckList() {
  let decks = getDecksLocalStorage();
  // access data of decks and display
  let html = "";
  let id = "";
  if (decks.length > 0) {
    decks.forEach((deck) => {
      //let cardCount = cards.filter((card) => card.deckId === deck.id);
      html += `
      <div class="deck card">
                <div class="card-body">deck id ${deck.id}
                  <h2 class="deck-name">${deck.name}</h2>
                  <p class="deck-desc">${deck.description}</p>
                  <button type="button" class="view-deck-btn btn btn-secondary" data-id=${deck.id}>View</button>
                  <button type="button" class="study-deck-btn btn btn-secondary" data-id=${deck.id}>Study</button>
                  <button type="button" class="edit-deck-btn btn btn-secondary" data-bs-toggle="modal" data-bs-target="#createDeck"data-id=${deck.id}>Edit</button>
                  <button type="button" class="delete-deck-btn btn btn-danger" data-id=${deck.id}>Delete</button>
                  <p>number of cards #</p>
                </div>
              </div>
      `;
      appEl.innerHTML = `${displayHeader()}<div id="deck-list">
        ${html}
        </div>
        `;
    });
  } else {
    appEl.innerHTML = `${displayHeader()}<h2>Create a deck</h2>`;
  }
}

export { displayDeckList };
