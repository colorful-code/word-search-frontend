import { Grid } from "./grid";

const newGameBtn = document.querySelector(".new-game");
const grid = new Grid();

newGameBtn.addEventListener("click", async () => {
  //grid.size = SET SIZE OF GRID FROM INPUT
  let result = await fetchGrid(["ONE", "TWO", "THREE"]);
  grid.renderGrid(result);
});

async function fetchGrid(wordsList) {
  const commaSeperatedWords = wordsList.join(",");
  const response = await fetch(
    `http://localhost:8080/wordgrid?gridSize=${grid.size}&words=${commaSeperatedWords}`
  );
  const result = await response.text();
  return result.split(" ");
}
