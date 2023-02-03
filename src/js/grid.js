export class Grid {
  size;
  wordSelectMode;
  selectedCells;

  constructor(size = 10) {
    this.size = size;
    this.wordSelectMode = false;
    this.selectedCells = [];
    this.firstSelectedCell;
    this.gridArea = {};
    this.words = [];
  }

  getCellsInLine(firstCell, currentCell) {
    let start = {
      x: parseInt(firstCell.getAttribute("pos-x")),
      y: parseInt(firstCell.getAttribute("pos-y")),
    };
    let end = {
      x: parseInt(currentCell.getAttribute("pos-x")),
      y: parseInt(currentCell.getAttribute("pos-y")),
    };
    let cellsInRange = [];

    if (start.x > end.x || start.y > end.y) {
      //TODO Swap doesnt work diagonally when going from bl to tr or vice versa
      [end, start] = [start, end]; //Swap the cells with array destructuring when moving in the inverse direction
    }
    if (start.y === end.y) {
      for (let i = start.x; i <= end.x; i++) {
        cellsInRange.push(
          this.gridArea.querySelector(`td[pos-x="${i}"][pos-y="${end.y}"]`)
        );
      }
    } else if (start.x === end.x) {
      for (let i = start.y; i <= end.y; i++) {
        cellsInRange.push(
          this.gridArea.querySelector(`td[pos-x="${end.x}"][pos-y="${i}"]`)
        );
      }
    } else if (start.x - end.x === start.y - end.y) {
      const delta = end.x - start.x; //delta is same regardless if we use x or y.
      for (let i = 0; i <= delta; i++) {
        cellsInRange.push(
          this.gridArea.querySelector(
            `td[pos-x="${start.x + i}"][pos-y="${start.y + i}"]`
          )
        );
      }
    }

    return cellsInRange;
  }

  renderGrid(gridContents) {
    this.gridArea = document.getElementsByClassName("grid-area")[0];
    if (this.gridArea.lastChild) {
      this.gridArea.removeChild(this.gridArea.lastChild);
    }
    const tbl = document.createElement("table");
    const tblBody = document.createElement("tbody");

    for (let i = 0; i < this.size; i++) {
      const row = document.createElement("tr");
      for (let j = 0; j < this.size; j++) {
        const letter = gridContents[i * this.size + j];
        const cell = document.createElement("td");
        cell.setAttribute("pos-x", j);
        cell.setAttribute("pos-y", i);
        cell.setAttribute("letter", letter);
        const cellText = document.createTextNode(letter);
        cell.appendChild(cellText);
        row.appendChild(cell);
      }
      tblBody.appendChild(row);
    }

    tbl.appendChild(tblBody);
    this.gridArea.appendChild(tbl);

    this.gridArea.addEventListener("mousedown", (event) => {
      if (event.target.tagName != "TD") return;
      this.wordSelectMode = true;
      this.firstSelectedCell = event.target;
    });

    this.gridArea.addEventListener("mousemove", (event) => {
      //Avoid reacting to any other element than the cells in the table.
      if (event.target.tagName != "TD") return;
      //TODO Throttle?
      if (this.wordSelectMode) {
        const lastSelectedCell = this.selectedCells.at(-1);
        //If event triggered while still on the same cell, do nothing.
        if (
          lastSelectedCell &&
          lastSelectedCell.getAttribute("pos-x") ===
            event.target.getAttribute("pos-x") &&
          lastSelectedCell.getAttribute("pos-y") ===
            event.target.getAttribute("pos-y")
        ) {
          return;
        }
        this.selectedCells.forEach((cell) => cell.classList.remove("selected"));
        this.selectedCells = this.getCellsInLine(
          this.firstSelectedCell,
          event.target
        );
        this.selectedCells.forEach((cell) => cell.classList.add("selected"));
      }
    });

    this.gridArea.addEventListener("mouseup", (event) => {
      if (event.target.tagName != "TD") return;
      this.wordSelectMode = false;
      this.selectedCells.forEach((cell) => {
        cell.classList.remove("selected");
      });
    });
  }
}
