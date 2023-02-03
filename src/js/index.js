import { Grid } from "./grid";

const newGridBtn = document.querySelector(".generate-grid");
const addWordBtn = document.querySelector(".add-word");
words = [];
const grid = new Grid();

addWordBtn.addEventListener("click", () => {
  newWord = document.querySelector("#word");
  if (!newWord.value) return; //Don't do anything if no word was entered

  //Only add the word if it doesn't already exist in the list
  if (words.indexOf(newWord.value) === -1) {
    words.push(newWord.value);
  }
  newWord.value = "";
});

newGridBtn.addEventListener("click", async () => {
  grid.init();
  grid.words = words;
  grid.size = document.querySelector("#grid-size").value;
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
