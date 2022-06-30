import { displayDeckList } from "./displayDeckList.js";
import { showCardsAndDeck, handleViewDeck } from "./showCardsAndDeck.js";
import { deleteCard } from "./deleteCard.js";
import { handleDeleteDeck } from "./deleteDeck.js";
// Variables
// Deck
const formDeck = document.getElementById("form-deck");
const formDeckEdit = document.getElementById("form-deck-edit");
const deckTitle = document.getElementById("deck-title");
const deckDescription = document.getElementById("deck-description");
// Cards
const formAddCards = document.getElementById("form-add-cards");
const cardFront = document.getElementById("card-front");
const cardBack = document.getElementById("card-back");
// Page
const appEl = document.getElementById("app");
const container = document.querySelector(".container");
// Get decks from local storage
function getDecksLocalStorage() {
  return localStorage.getItem("decks")
    ? JSON.parse(localStorage.getItem("decks"))
    : [];
}
// Get cards from local storage
function getCardsLocalStorage() {
  return JSON.parse(localStorage.getItem("cards")) || [];
}
// create random id for deck
function randomNum() {
  return Math.floor(Math.random() * 100) - 1;
}
// Get number of cards associated with deck
function numberOfCards(deckId) {
  let cards = getCardsLocalStorage();
  let cardCount = cards.filter((card) => card.id === deckId);
  return cardCount.length;
}

// Flip button for card to show front and back - still in progress
container.addEventListener("click", (e) => {
  //let deckId = Number(e.target.dataset.id);
  let cardFront = document.querySelector(".card-front");
  let cardBack = document.querySelector(".card-back");

  if (cardBack.classList.contains("hide")) {
    cardBack.classList.toggle("hide");
    cardFront.classList.add("hide");
  } else {
    cardFront.classList.toggle("hide");
    cardBack.classList.add("hide");
  }
});
// pass in specific card

// Next button function for card to cycle through cards in deck
let counter = 1;
function handleNextBtn(deckId) {
  let cards = getCardsLocalStorage();
  let showCards = cards.filter((card) => card.id === deckId);
  if (counter < showCards.length) {
    console.log(counter, "if");
    appEl.innerHTML = studyCardFrontHtml(showCards[counter]);
    counter++;
    console.log(counter, " counter");
  } else {
    console.log(counter, "else");
    counter = 0;
  }
}
// Next button event handler
container.addEventListener("click", (e) => {
  let deckId = Number(e.target.dataset.id);
  if (e.target.matches(".next-card-btn")) {
    console.log(".next-card-btn");
    handleNextBtn(deckId);
  }
});
// HTML for cards in study view
function studyCardFrontHtml(card) {
  return `
  <div class="card-study card" data-id=${card.id}>
  <div class="card-body">
  <div class="card-front">
  <p class="display-2">${card.front}</p>
  </div>
  <div class="card-back hide">
  <p class="display-2">${card.back}</p>
  </div>
  </div>
   <div class="group-btn">
   <button type="button" class="flip-card-btn btn btn-secondary" data-id=${card.id}>Flip</button>
   <button type="button" class="next-card-btn btn btn-danger" data-id=${card.id}>Next</button>
   </div>
</div>
`;
}
// When study button click - show first card in deck
function handleStudyView(deckId) {
  let cards = getCardsLocalStorage();
  const showCards = cards.filter((card) => Number(card.id) === deckId);
  let firstCard = showCards[0];
  appEl.innerHTML = studyCardFrontHtml(firstCard);
}

// Study deck button event handler
container.addEventListener("click", (e) => {
  let deckId = Number(e.target.dataset.id);
  if (e.target.matches(".study-deck-btn")) {
    console.log(".study-deck-btn");
    handleStudyView(deckId);
  }
});

// Delete card
container.addEventListener("click", (e) => {
  let deckId = Number(e.target.dataset.id);
  if (e.target.matches(".delete-card-btn")) {
    e.target.parentElement.parentElement.remove();
    deleteCard(deckId);
    console.log("delete card");
  }
});

// Trigger create card modal - add deck id to card
container.addEventListener("click", (e) => {
  if (
    e.target.matches(".add-cards-btn") ||
    e.target.matches(".edit-deck-btn")
  ) {
    console.log("add card button");
    //console.log(e.target.dataset.id);
    // Add deck id to card
    formDeckEdit.setAttribute("data-id", e.target.dataset.id);
    formAddCards.setAttribute("data-id", e.target.dataset.id);
  }
});
// Add cards to deck
formAddCards.addEventListener("submit", (e) => {
  e.preventDefault();
  acceptCardData();
});
// Get from data for new cards
function acceptCardData() {
  let cards = getCardsLocalStorage();
  // create object and push data into deck array
  cards.unshift({
    id: Number(formAddCards.dataset.id),
    front: cardFront.value,
    back: cardBack.value,
  });
  localStorage.setItem("cards", JSON.stringify(cards));
  showCardsAndDeck(Number(formAddCards.dataset.id));
}

/* --------- Creating the deck ---------  */
// create form event listener
formDeck.addEventListener("submit", (e) => {
  console.log("deck submit");
  e.preventDefault();
  acceptDeckData();
});

// Get from data for new deck
function acceptDeckData() {
  let decks = getDecksLocalStorage();
  // create object and push data into deck array
  decks.unshift({
    id: randomNum(),
    name: deckTitle.value,
    description: deckDescription.value,
  });
  localStorage.setItem("decks", JSON.stringify(decks));
  displayDeckList();
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

export {
  appEl,
  container,
  numberOfCards,
  getDecksLocalStorage,
  getCardsLocalStorage,
};
