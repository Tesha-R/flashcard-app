// Imports
import {
  appEl,
  getDecksLocalStorage,
  getCardsLocalStorage,
  numberOfCards,
} from "./index.js";
import displayHeader from "./displayHeader.js";

// display all decks
function displayDeckList() {
  let decks = getDecksLocalStorage();
  // access data of decks and display
  let html = "";
  let id = "";
  if (decks.length > 0) {
    decks.forEach((deck) => {
      let cardCount = numberOfCards(deck.id);
      html += `
      <div class="deck card">
                <div class="card-body">
                  <h2 class="deck-name">${deck.name}</h2>
                  <p class="deck-desc lead">${deck.description}</p>
                  <div class="group-btns">
                  <button type="button" class="view-deck-btn btn btn-light" data-id=${deck.id}><img src="../assets/eye.svg" alt="eye icon"/> View</button>
                  <button type="button" class="study-deck-btn btn btn-light" data-id=${deck.id}><img src="../assets/book.svg" alt="eye icon"/> Study</button>
                  <button type="button" class="edit-deck-btn btn btn-light" data-bs-toggle="modal" data-bs-target="#editDeck"data-id=${deck.id}>
                  <img src="../assets/edit-3.svg" alt="eye icon"/> Edit</button>
                  <button type="button" class="delete-deck-btn btn btn-light" data-id=${deck.id}><img src="../assets/trash-2.svg" alt="eye icon"/> 
                  Delete</button>
                  </div>
                  <p class="h6 card-count">${cardCount} Cards</p>
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
