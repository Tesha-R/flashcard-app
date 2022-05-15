const appEl = document.getElementById("app");

// display flashcard header with create deck button
function displayHeader() {
  let html = "";
  html = `
  <header class="main-header">
      <h1 class="display-3">Flashcards</h1>
      <div>
        <button
          type="button"
          class="btn btn-primary"
          data-bs-toggle="modal"
          data-bs-target="#createDeck"
        >
          Create deck
        </button>
      </div>
    </header>
  `;
  return (appEl.innerHTML = html);
}

export default displayHeader;
