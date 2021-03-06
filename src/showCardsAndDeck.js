import { appEl, container, getCardsLocalStorage } from "./index.js";
import { displayDeck } from "./displayDeck.js";

// // Arrays for deck and cards
// let decks = [];
// let cards = [];

function handleViewDeck() {
  let deckId = "";
  container.addEventListener("click", (e) => {
    //e.preventDefault();
    // turn deck Id into a number
    deckId = Number(e.target.dataset.id);
    if (e.target.matches(".view-deck-btn")) {
      console.log("view button");
      // Show all cards that match deck id
      showCardsAndDeck(deckId);
    }
  });
}

/* --------- Creating the cards ---------  */
function showCardsAndDeck(deckId) {
  //console.log("showCardsAndDeck");
  let cards = getCardsLocalStorage();
  let html = displayDeck(deckId);
  //console.log(html);
  const showCards = cards.filter((card) => Number(card.id) === deckId);
  showCards.forEach((card) => {
    // console.log("card id " + card.id);
    html += `
            <div class="deck-card card">
            <div class="card-body">
            <div class="card-wrap">
            <div class="card-front">
            <p class="display-6">${card.front}</p>
            </div>
            <div class="card-back"><p class="lead">${card.back}</p></div>
            </div>
              <button type="button" class="edit-card-btn btn btn-light" data-id=${card.id}><img src="../assets/edit-3.svg" alt="edit icon"/> Edit</button>
              <button type="button" class="delete-card-btn btn btn-light" data-id=${card.id}><img src="../assets/trash-2.svg" alt="delete icon"/> Delete</button>
        
            </div>
          </div>
          `;
  });
  //console.log(html);
  appEl.innerHTML = html;
}

export { showCardsAndDeck, handleViewDeck };
