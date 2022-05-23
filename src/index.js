import { displayDeckList } from "./displayDeckList.js";
import { showCardsAndDeck, handleViewDeck } from "./showCardsAndDeck.js";
import { deleteCard } from "./deleteCard.js";
import { handleDeleteDeck } from "./deleteDeck.js";
// Variables
// Deck
const formDeck = document.getElementById("form-deck");
const deckTitle = document.getElementById("deck-title");
const deckDescription = document.getElementById("deck-description");
const deckList = document.getElementById("deck-list");
const deckName = document.querySelector(".deck-name");
const deckDesc = document.querySelector(".deck-desc");
// Cards
const formAddCards = document.getElementById("form-add-cards");
const cardFront = document.getElementById("card-front");
const cardBack = document.getElementById("card-back");
const flipCardBtn = document.querySelectorAll(".flip-card-button");
// Page
const appEl = document.getElementById("app");
const container = document.querySelector(".container");

function getDecksLocalStorage() {
  return localStorage.getItem("decks")
    ? JSON.parse(localStorage.getItem("decks"))
    : [];
}
function getCardsLocalStorage() {
  return JSON.parse(localStorage.getItem("cards")) || [];
}
// create random id for deck
function randomNum() {
  return Math.floor(Math.random() * 100) - 1;
}
function nextCard(deckId) {}

const allCards = document.querySelectorAll(".card-study");
// select next card button
// Event listener and next card functionality
container.addEventListener("click", (e) => {
  if (e.target.matches(".next-card-btn")) {
    console.log("next-card-btn");
    allCards.forEach((card, index) => {
      // appEl.innerHTML = studyCardHtml(card);
      card.style.backgroundColor = "red";
      //card.classList.add("fade-in");
      //card.style.transform = `translateX(${100 * (index - currCardIndex)}%)`;
    });
  }
});

function studyCardHtml(card) {
  return `
  <div class="card-study card" data-id=${card.id}>
  <div class="card-body">
  <div class="card-front">
  <p>card id ${card.id}</p>
  <p class="display-2">${card.front}</p>
  </div>
  <div class="card-back"><p>${card.back}</p></div>
  </div>
   <div class="group-btn">
   <button type="button" class="flip-card-btn btn btn-secondary" data-id=${card.id}>Flip</button>
   <button type="button" class="next-card-btn btn btn-danger" data-id=${card.id}>Next</button>
   </div>
</div>
`;
}

function handleStudyView(deckId) {
  let html = "";
  let cards = getCardsLocalStorage();
  const showCards = cards.filter((card) => Number(card.id) === deckId);
  showCards.forEach((card) => {
    // console.log("card id " + card.id);
    html += studyCardHtml(card);
  });
  //console.log(html);
  appEl.innerHTML = `<div class="cards-study-list">
  <div class="cards-study-content">${html}</div>
  </div>
  `;
}

// Study deck
container.addEventListener("click", (e) => {
  let deckId = Number(e.target.dataset.id);
  if (e.target.matches(".study-deck-btn")) {
    console.log(".study-deck-btn");
    handleStudyView(deckId);
  }
});

/* --------- Event handlers ---------  */
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
  if (e.target.matches(".add-cards-btn")) {
    console.log("add card button");
    //console.log(e.target.dataset.id);
    // Add deck id to card
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
  //handleStudyView();
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

export { appEl, container, getDecksLocalStorage, getCardsLocalStorage };
