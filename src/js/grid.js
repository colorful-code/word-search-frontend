export class Grid {
  size;

  constructor(size = 10) {
    this.size = size;
  }

  renderGrid(gridContents) {
    let gridArea = document.getElementsByClassName("grid-area")[0];
    if (gridArea.lastChild) {
      gridArea.removeChild(gridArea.lastChild);
    }
    const tbl = document.createElement("table");
    const tblBody = document.createElement("tbody");

    for (let i = 0; i < this.size; i++) {
      const row = document.createElement("tr");
      for (let j = 0; j < this.size; j++) {
        const cell = document.createElement("td");
        const cellText = document.createTextNode(
          gridContents[i * this.size + j]
        );
        cell.appendChild(cellText);
        row.appendChild(cell);
      }
      tblBody.appendChild(row);
    }

    tbl.appendChild(tblBody);
    gridArea.appendChild(tbl);
    tbl.setAttribute("border", "2");
  }
}
