// Imports
import { getCardsLocalStorage } from "./index.js";

// Delete card from local storage
function deleteCard(deckId) {
  let cards = getCardsLocalStorage();
  for (let i = 0; i < cards.length; i++) {
    if (cards[i].id === deckId) {
      cards.splice(i, 1);
    }
  }
  localStorage.setItem("cards", JSON.stringify(cards));
}

export { deleteCard };
