const e=document.querySelector("#generate-grid"),t=document.querySelector("#add-word"),s=document.querySelector("#reset"),r=document.querySelector("#word"),i=document.querySelector("#grid-size"),d=document.querySelector("#word-list"),l=document.querySelector("#word-length-warning"),n=document.querySelector("#character-warning"),a=document.querySelector("#size-warning"),o=document.querySelector("#game-won"),c=document.querySelector("#omitted-warning"),h=[],u=new class{size;wordSelectMode;selectedCells;firstSelectedCell;gridArea;words;foundWords;constructor(e=10){this.size=e,this.wordSelectMode=!1,this.selectedCells=[],this.firstSelectedCell,this.gridArea={},this.words=[],this.foundWords=[],this.gridArea=document.getElementsByClassName("grid-area")[0]}init(e,t=10){this.size=t,this.wordSelectMode=!1,this.selectedCells=[],this.firstSelectedCell,this.words=e,this.foundWords=[],document.querySelector("#game-won").classList.replace("game-won","hidden")}getCellsInLine(e,t){let s={x:parseInt(e.getAttribute("pos-x")),y:parseInt(e.getAttribute("pos-y"))},r={x:parseInt(t.getAttribute("pos-x")),y:parseInt(t.getAttribute("pos-y"))},i=[];if((s.x>r.x||s.y>r.y)&&([r,s]=[s,r]),s.y===r.y)for(let e=s.x;e<=r.x;e++)i.push(this.gridArea.querySelector(`td[pos-x="${e}"][pos-y="${r.y}"]`));else if(s.x===r.x)for(let e=s.y;e<=r.y;e++)i.push(this.gridArea.querySelector(`td[pos-x="${r.x}"][pos-y="${e}"]`));else if(s.x-r.x==s.y-r.y){const e=r.x-s.x;for(let t=0;t<=e;t++)i.push(this.gridArea.querySelector(`td[pos-x="${s.x+t}"][pos-y="${s.y+t}"]`))}else if(s.x-r.x==-1*(s.y-r.y)){const e=Math.abs(r.x-s.x);for(let t=0;t<=e;t++){const e=s.x+t*(s.x-r.x>0?-1:1),d=s.y+t*(s.y-r.y>0?-1:1);i.push(this.gridArea.querySelector(`td[pos-x="${e}"][pos-y="${d}"]`))}}return i}renderGrid(e){this.gridArea.lastChild&&this.gridArea.removeChild(this.gridArea.lastChild);const t=document.createElement("table"),s=document.createElement("tbody");for(let t=0;t<this.size;t++){const r=document.createElement("tr");for(let s=0;s<this.size;s++){const i=e[t*this.size+s],d=document.createElement("td");d.setAttribute("pos-x",s),d.setAttribute("pos-y",t),d.setAttribute("letter",i);const l=document.createTextNode(i);d.appendChild(l),r.appendChild(d)}s.appendChild(r)}t.appendChild(s),this.gridArea.appendChild(t),this.gridArea.addEventListener("mousedown",(e=>{"TD"==e.target.tagName&&(this.wordSelectMode=!0,this.firstSelectedCell=e.target)})),this.gridArea.addEventListener("mousemove",(e=>{if("TD"==e.target.tagName&&this.wordSelectMode){const t=this.selectedCells.at(-1);if(t&&t.getAttribute("pos-x")===e.target.getAttribute("pos-x")&&t.getAttribute("pos-y")===e.target.getAttribute("pos-y"))return;this.selectedCells.forEach((e=>e.classList.remove("selected"))),this.selectedCells=this.getCellsInLine(this.firstSelectedCell,e.target),this.selectedCells.forEach((e=>{e.classList.contains("found")||e.classList.add("selected")}))}})),this.gridArea.addEventListener("mouseup",(e=>{if("TD"!=e.target.tagName)return;this.wordSelectMode=!1;const t=this.selectedCells.reduce(((e,t)=>e+t.getAttribute("letter")),""),s=t.split("").reverse().join("");-1!==this.words.indexOf(t)?(-1===this.foundWords.indexOf(t)&&this.foundWords.push(t),this.restyleCells(this.selectedCells,"selected","found")):-1!==this.words.indexOf(s)?(-1===this.foundWords.indexOf(s)&&this.foundWords.push(s),this.restyleCells(this.selectedCells,"selected","found")):this.selectedCells.forEach((e=>e.classList.remove("selected"))),this.foundWords.length===this.words.length&&document.querySelector("#game-won").classList.replace("hidden","game-won"),this.selectedCells=[]}))}restyleCells(e,t,s){e.forEach((e=>{t&&s&&e.classList.replace(t,s)}))}};function g(e){return!(!e||!/^[0-9]*$/.test(e)||parseInt(e)<2)}s.addEventListener("click",(t=>{h=[],e.disabled=!0,i.value=10,u.size=i.value,d.innerHTML="",r.value="",o.classList.replace("game-won","hidden"),u.gridArea.lastChild&&u.gridArea.removeChild(u.gridArea.lastChild)})),t.addEventListener("click",(()=>{const s=r.value.toUpperCase();if(r.value){if(-1===h.indexOf(s)){h.push(s);const e=document.createElement("li");e.innerHTML=s,e.dataset.word=s,d.appendChild(e)}h.length&g(i.value)&&(e.disabled=!1),r.value="",t.disabled=!0}})),r.addEventListener("input",(e=>{if(!e.target.value)return t.disabled=!0,void document.querySelectorAll(".active-warning").forEach((e=>e.classList.replace("active-warning","hidden-warning")));const s=/^[a-zA-Z]+$/.test(e.target.value),r=e.target.value.length>u.size;r?l.classList.replace("hidden-warning","active-warning"):l.classList.replace("active-warning","hidden-warning"),s?n.classList.replace("active-warning","hidden-warning"):n.classList.replace("hidden-warning","active-warning"),t.disabled=!(!r&&s)})),i.addEventListener("input",(t=>{g(t.target.value)?(a.classList.replace("active-warning","hidden-warning"),h.length?e.disabled=!1:e.disabled=!0):(a.classList.replace("hidden-warning","active-warning"),e.disabled=!0)})),e.addEventListener("click",(async()=>{if(!i.value)return;u.init(h,parseInt(i.value));let e=await async function(e){const t=e.words.join(","),s=await fetch(`https://word-search-api.onrender.com/wordgrid?gridSize=${e.size}&words=${t}`),r=await s.json();if(r[1]){const t=r[1].split(",");h=h.filter((e=>-1===t.indexOf(e))),t.forEach((e=>document.querySelector(`[data-word="${e}"]`).remove())),c.innerHTML="One or more words have been removed because they couldn't fit with this combination of words and grid size!",e.words=h}return r[0].split(" ")}(u);u.renderGrid(e)}));
//# sourceMappingURL=index.29123eee.js.map
