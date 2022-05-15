import displayHeader from "/src/displayHeader.js";
// Variables
// Create deck
const formDeck = document.getElementById("form-deck");
const deckTitle = document.getElementById("deck-title");
const deckDescription = document.getElementById("deck-description");
// Add cards
const formAddCards = document.getElementById("form-add-cards");
const cardFront = document.getElementById("card-front");
const cardBack = document.getElementById("card-back");
const appEl = document.getElementById("app");
const container = document.querySelector(".container");
const deckList = document.getElementById("deck-list");
// create random id for deck
let decks = [];
let cards = [];
function randomNum() {
  return Math.floor(Math.random() * 100) - 1;
}

function handleViewDeck() {
  let deckId = "";
  container.addEventListener("click", (e) => {
    // turn deck Id into a number
    deckId = Number(e.target.dataset.id);
    let html = "";
    if (e.target.matches(".view-deck-btn")) {
      console.log("view button");
      console.log("deck id " + deckId);
      //showDeck(deckId);
      showAll(deckId);
      console.log(cards);
    }
  });
}
function showDeck(deckId) {
  decks = JSON.parse(localStorage.getItem("decks")) || [];
  let html = "";
  decks.map((deck) => {
    if (deck.id === deckId) {
      console.log("deck id " + deck.id);
      html = `
    <div class="deck card">
    <div class="card-body">deck id ${deck.id}
      <h2 class="deck-name">${deck.name}</h2>
      <p class="deck-desc">${deck.description}</p>
      <button type="button" class="view-deck-btn btn btn-secondary" data-id=${deck.id}>View</button>
      <button type="button" class="study-deck-btn btn btn-secondary" data-id=${deck.id}>Study</button>
      <button type="button" class="edit-deck-btn btn btn-secondary" data-id=${deck.id}>Edit</button>
      <button type="button" class="btn btn-primary add-cards-btn" data-bs-toggle="modal" data-bs-target="#addCardsToDeck" data-id=${deck.id}>
  + Add cards
  </button>
      <button type="button" class="delete-deck-btn btn btn-danger" data-id=${deck.id}>Delete</button>
    </div>
  </div>
      `;
      appEl.innerHTML = html;
    }
  });
}
function showAll(deckId) {
  cards = JSON.parse(localStorage.getItem("cards")) || [];
  let html = "";
  cards.map((card) => {
    if (card.id == deckId) {
      console.log("card id " + card.id);
      html += `
          <div class="deck-card card" data-id=${card.id}>
          <div class="card-body">
          <div class="card-wrap">
          <div class="card-front">
          <p>card id ${card.id}</p>
          <p class="display-6">${card.front}</p>
          </div>
          <div class="card-back"><p>${card.back}</p></div>
          </div>
            <button type="button" class="edit-card-btn btn btn-secondary" data-id=${card.id}>Edit</button>
            <button type="button" class="flip-card-btn btn btn-danger" data-id=${card.id}>Delete</button>
      
          </div>
        </div>
        `;
      appEl.innerHTML = html;
    } else {
      showDeck(deckId);
    }
  });
}

/* --------- Creating the cards ---------  */
// trigger create card modal
container.addEventListener("click", (e) => {
  if (e.target.matches(".add-cards-btn")) {
    console.log("add card button");
    console.log(e.target.dataset.id);
    formAddCards.setAttribute("data-id", e.target.dataset.id);
  }
});

formAddCards.addEventListener("submit", (e) => {
  console.log("add cards");
  e.preventDefault();
  acceptCardData();
});
// get data from new deck form
function acceptCardData() {
  // create object and push data into deck array
  cards.push({
    id: formAddCards.dataset.id,
    front: cardFront.value,
    back: cardBack.value,
  });
  localStorage.setItem("cards", JSON.stringify(cards));
  console.log(cards);
}

/* --------- Creating the deck ---------  */
// create form event listener
formDeck.addEventListener("submit", (e) => {
  console.log("deck submit");
  e.preventDefault();
  acceptDeckData();
});
// get data from new deck form
function acceptDeckData() {
  // create object and push data into deck array
  decks.unshift({
    id: randomNum(),
    name: deckTitle.value,
    description: deckDescription.value,
  });
  localStorage.setItem("decks", JSON.stringify(decks));
  //console.log(decks);
  displayDeckList();
}

// display all decks
function displayDeckList() {
  decks = JSON.parse(localStorage.getItem("decks")) || [];
  // access data of decks and display
  let html = "";
  let id = "";
  if (decks.length > 0) {
    decks.forEach((deck) => {
      let cardCount = cards.filter((card) => card.deckId === deck.id);
      html += `
    <div class="deck card">
              <div class="card-body">deck id ${deck.id}
                <h2 class="deck-name">${deck.name}</h2>
                <p class="deck-desc">${deck.description}</p>
                <button type="button" class="view-deck-btn btn btn-secondary" data-id=${deck.id}>View</button>
                <button type="button" class="study-deck-btn btn btn-secondary" data-id=${deck.id}>Study</button>
                <button type="button" class="edit-deck-btn btn btn-secondary" data-id=${deck.id}>Edit</button>
                <button type="button" class="btn btn-primary add-cards-btn" data-bs-toggle="modal" data-bs-target="#addCardsToDeck" data-id=${deck.id}>
        + Add cards
      </button>
                <button type="button" class="delete-deck-btn btn btn-danger" data-id=${deck.id}>Delete</button>
                <p>number of cards ${cardCount.length}</p>
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

function main() {
  displayDeckList();
  handleViewDeck();
}

main();
// localStorage API
// setItem
// getItem
// removeItem
// save as strings
// localStorage.setItem("orange", JSON.stringify(["item", "item2"]));
// const oranges = JSON.parse(localStorage.getItem("orange"));
// console.log(oranges);
// localStorage.removeItem("orange");
