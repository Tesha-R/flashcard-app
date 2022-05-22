import displayHeader from "/src/displayHeader.js";
// Variables
// Deck
const formDeck = document.getElementById("form-deck");
const deckTitle = document.getElementById("deck-title");
const deckDescription = document.getElementById("deck-description");
const deckList = document.getElementById("deck-list");
// Cards
const formAddCards = document.getElementById("form-add-cards");
const cardFront = document.getElementById("card-front");
const cardBack = document.getElementById("card-back");
const deckCards = document.querySelectorAll(".deck-card");
// Page
const appEl = document.getElementById("app");
const container = document.querySelector(".container");
// Arrays for deck and cards
let decks = [];
let cards = [];
// create random id for deck
function randomNum() {
  return Math.floor(Math.random() * 100) - 1;
}

container.addEventListener("click", (e) => {
  let deckId = Number(e.target.dataset.id);
  if (e.target.matches(".delete-card-btn")) {
    e.target.parentElement.parentElement.remove();
    deleteCard(deckId);
    console.log("delete card");
  }
});

// Delete card from local storage
function deleteCard(deckId) {
  for (let i = 0; i < cards.length; i++) {
    if (cards[i].id === deckId) {
      cards.splice(i, 1);
    }
  }
  localStorage.setItem("cards", JSON.stringify(cards));
}

// Delete multiple cards from local storage
function deleteMultipleCards(deckId) {
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

function handleViewDeck() {
  let deckId = "";
  container.addEventListener("click", (e) => {
    // turn deck Id into a number
    deckId = Number(e.target.dataset.id);
    if (e.target.matches(".view-deck-btn")) {
      console.log("view button");
      // Show all cards that match deck id
      showCardsAndDeck(deckId);
    }
  });
}
function showDeck(deckId) {
  decks = JSON.parse(localStorage.getItem("decks")) || [];
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
  <button type="button" class="edit-deck-btn btn btn-secondary" data-id=${deck.id}>Edit</button>
      <button type="button" class="delete-deck-btn btn btn-danger" data-id=${deck.id}>Delete</button>
    </div>
  </div>
      `;
  return html;
}

/* --------- Creating the cards ---------  */
function showCardsAndDeck(deckId) {
  //console.log("showCardsAndDeck");
  cards = JSON.parse(localStorage.getItem("cards")) || [];
  let html = showDeck(deckId);
  //console.log(html);
  const showCards = cards.filter((card) => Number(card.id) === deckId);
  showCards.forEach((card) => {
    // console.log("card id " + card.id);
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
            <button type="button" class="delete-card-btn btn btn-danger" data-id=${card.id}>Delete</button>
      
          </div>
        </div>
        `;
  });
  //console.log(html);
  appEl.innerHTML = html;
}
// trigger create card modal
container.addEventListener("click", (e) => {
  if (e.target.matches(".add-cards-btn")) {
    console.log("add card button");
    console.log(e.target.dataset.id);
    formAddCards.setAttribute("data-id", e.target.dataset.id);
  }
});

formAddCards.addEventListener("submit", (e) => {
  e.preventDefault();
  console.log("add cards");
  e.preventDefault();
  acceptCardData();
});
// get data from new deck form
function acceptCardData() {
  // create object and push data into deck array
  cards.unshift({
    id: Number(formAddCards.dataset.id),
    front: cardFront.value,
    back: cardBack.value,
  });
  localStorage.setItem("cards", JSON.stringify(cards));
  showCardsAndDeck(Number(formAddCards.dataset.id));
  //console.log(cards);
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
  handleDeleteDeck();
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
