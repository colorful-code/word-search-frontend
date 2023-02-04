import { Grid } from "./grid";

const newGridBtn = document.querySelector(".generate-grid");
const addWordBtn = document.querySelector(".add-word");
const resetBtn = document.querySelector("#reset");
const wordInput = document.querySelector("#word");
const sizeInput = document.querySelector("#grid-size");
const wordListElement = document.querySelector("#word-list");
const lengthWarningLabel = document.querySelector("#word-length-warning");
const charWarningLabel = document.querySelector("#character-warning");
const sizeWarningLabel = document.querySelector("#size-warning");

words = [];
const grid = new Grid();

resetBtn.addEventListener("click", (event) => {
  words = [];
  newGridBtn.disabled = true;
  sizeInput.value = 10;
  wordListElement.innerHTML = "";
});

addWordBtn.addEventListener("click", () => {
  const newWord = wordInput.value.toUpperCase();
  //Do nothing if empty input given. This scenario shouldn't be possible as we disable the button on empty field.
  if (!wordInput.value) return;

  //Only add the word if it doesn't already exist in the list.
  if (words.indexOf(newWord) === -1) {
    words.push(newWord);
    const li = document.createElement("li");
    li.innerHTML = newWord;
    wordListElement.appendChild(li);
  }

  if (words.length & validSize(sizeInput.value)) {
    newGridBtn.disabled = false;
  }

  wordInput.value = "";
});

// Validate word input is made of letters a-z (case insensitive) and not too long.
// Shows warning labels when needed.
wordInput.addEventListener("input", (event) => {
  if (!event.target.value) {
    addWordBtn.disabled = true;
    document
      .querySelectorAll(".active-warning")
      .forEach((element) =>
        element.classList.replace("active-warning", "hidden-warning")
      );
    return;
  }

  const validLetters = /^[a-zA-Z]+$/.test(event.target.value);
  const tooLong = event.target.value.length > grid.size;

  if (tooLong) {
    lengthWarningLabel.classList.replace("hidden-warning", "active-warning");
  } else {
    lengthWarningLabel.classList.replace("active-warning", "hidden-warning");
  }

  if (!validLetters) {
    charWarningLabel.classList.replace("hidden-warning", "active-warning");
  } else {
    charWarningLabel.classList.replace("active-warning", "hidden-warning");
  }

  tooLong || !validLetters
    ? (addWordBtn.disabled = true)
    : (addWordBtn.disabled = false);
});

sizeInput.addEventListener("input", (event) => {
  if (validSize(event.target.value)) {
    sizeWarningLabel.classList.replace("active-warning", "hidden-warning");
    words.length ? (newGridBtn.disabled = false) : (newGridBtn.disabled = true);
  } else {
    sizeWarningLabel.classList.replace("hidden-warning", "active-warning");
    newGridBtn.disabled = true;
  }
});

newGridBtn.addEventListener("click", async () => {
  if (!sizeInput.value) return; //Don't do anything if no size was entered. This scenario shouldn't be possible as we disable the button on empty field.

  grid.init(words, parseInt(sizeInput.value));
  let result = await fetchGrid(grid);
  grid.renderGrid(result);
});

async function fetchGrid(grid) {
  const commaSeperatedWords = grid.words.join(",");
  const response = await fetch(
    `http://localhost:8080/wordgrid?gridSize=${grid.size}&words=${commaSeperatedWords}`
  );
  const result = await response.text();
  return result.split(" ");
}

// Checks if input is numeric and larger than 2. Expects input to be string.
function validSize(size) {
  if (!size || !/^[0-9]*$/.test(size) || parseInt(size) < 2) {
    return false;
  }
  return true;
}
