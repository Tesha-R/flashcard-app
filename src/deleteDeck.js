// Imports
import {
  container,
  getDecksLocalStorage,
  getCardsLocalStorage,
} from "./index.js";
import { displayDeckList } from "./displayDeckList.js";
// Variables
const deckCards = document.querySelectorAll(".deck-card");
// Delete multiple cards from local storage
function deleteMultipleCards(deckId) {
  let cards = getCardsLocalStorage();
  for (let i = 0; i < cards.length; i++) {
    if (Number(cards[i].id) === deckId) {
      cards.splice(i, 1);
      i--;
    }
  }
  localStorage.setItem("cards", JSON.stringify(cards));
}

// Delete deck from local storage
function deleteDeck(deckId) {
  let decks = getDecksLocalStorage();
  for (let i = 0; i < decks.length; i++) {
    if (decks[i].id === deckId) {
      decks.splice(i, 1);
    }
  }
  localStorage.setItem("decks", JSON.stringify(decks));
}

// Delete deck with matching cards
function handleDeleteDeck() {
  container.addEventListener("click", (e) => {
    let deckId = Number(e.target.dataset.id);
    if (e.target.matches(".delete-deck-btn")) {
      console.log("delete btn");
      // Delete html element from screen
      e.target.parentElement.parentElement.remove();
      deckCards.forEach((deck) => {
        appEl.removeChild(deck);
      });
      deleteDeck(deckId);
      deleteMultipleCards(deckId);
      displayDeckList();
    }
  });
}

export { deleteMultipleCards, deleteDeck, handleDeleteDeck };
