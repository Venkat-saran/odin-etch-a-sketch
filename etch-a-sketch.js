let gridDimension = 16;
let persist = true;
let trailColor = "black";
let gridLinesVisible = false;
let ctrlPressed = false;
let version = 0;

let colorsUsedList = ["black"];
const colorsUsedMaxCount = 6;

const gridDimButton = document.querySelector(".grid-dimension-button");
const trailColorButton = document.querySelector(".trail-color-button");
const containerDiv = document.querySelector(".container");
const currentDimButton = document.querySelector(".current-dimension-button");
const currentColorPara = document.querySelector(".current-color-para");
const clearButton = document.querySelector(".clear-button");
const currentColorBlock = document.querySelector(".current-color-block");
const showGridButton = document.querySelector(".show-grid-button");
const colorsUsedDiv = document.querySelector(".colors-used-div");
const persistButton = document.querySelector(".persist-button");

const changeVersionDiv = document.querySelector(".change-verion-div");
const changeVersionButton = document.querySelector(".change-version-button");
const changeVersionPara = document.querySelector(".change-version-para");

// Creates an array to represent the opacity values of all 
// the Grid blocks. Initially all set to 0. Increases by 0.
// 1 after each hover over the corresponding grid block.
let visitedList = Array.from({ length: gridDimension }, () => Array(gridDimension).fill(0));
const listItemListVerOne = [];
const listItemListVerZero = [];

listItemListVerOne.push("For every grid hovered over in the grid, a random color is generated, as opposed to a single, user chosen color in the original version of the Webpage.");
listItemListVerOne.push("Initially, the opacity of all the grid blocks is set to 0. With each hover, the opacity will increase by a value of 0.1. This implies a total of 10 interactions/hovers over a particular block will result in a completely colored block.");

listItemListVerZero.push("Setting the value to 'persist' will leave a trail, like a pen on a board would.");
listItemListVerZero.push("'Don't Persist' will make the cursor feel like a pointer of the current color, moving across the board as the cursor moves.");

function getRandomInteger(min, max) {
  return Math.floor(Math.random() * (max-min+1)) + min;
}

function renderContainer(gridDim) {
  for (let i = 0; i < gridDim; i++) {
    const firstInnerDiv = document.createElement("div");
    firstInnerDiv.classList.add("first-inner-div");
    firstInnerDiv.textContent = ``;

    for (let j = 0; j < gridDim; j++) {
      const innerDiv = document.createElement("div");
      
      innerDiv.classList.add("inner-div");
      
      innerDiv.addEventListener("mouseover", (e) => {
        if (e.shiftKey) {
          innerDiv.style.backgroundColor = "white";
          if (version == 1) {
            visitedList[i][j] = 0;
            innerDiv.style.opacity = 1;
          }
          
        }
        else if (!ctrlPressed) {
          if (version == 0) innerDiv.style.backgroundColor = trailColor;
          else {
            if (visitedList[i][j] == 0) {
              visitedList[i][j] = 0.1;
              innerDiv.style.backgroundColor = `rgb(${getRandomInteger(0,255)},${getRandomInteger(0,255)},${getRandomInteger(0,255)})`;
              innerDiv.style.opacity = visitedList[i][j];
            } else if (visitedList[i][j] >= 0.1 && visitedList[i][j] <= 0.9) {
              visitedList[i][j] += 0.1;
              innerDiv.style.opacity = visitedList[i][j];
            } else {
              visitedList[i][j] = 1;
              innerDiv.style.opacity = visitedList[i][j];
            }
          }
        }
      });

      innerDiv.addEventListener("mouseout", (e) => {

        if (version == 0) {
          if (!persist) innerDiv.style.backgroundColor = "white";
        }
      });

      firstInnerDiv.appendChild(innerDiv);
    }

    containerDiv.appendChild(firstInnerDiv);
  }
}

function clearContainer() {
  while (containerDiv.firstChild) {
    containerDiv.removeChild(containerDiv.firstChild);
  }
}

function drawGridLines() {
  const innerDiv = document.querySelectorAll(".inner-div");

    innerDiv.forEach((innerDiv) => {
      innerDiv.style.borderWidth = "1px";
      innerDiv.style.borderColor = "grey";
      innerDiv.style.borderStyle = "dotted";
    });
    gridLinesVisible = true;
    showGridButton.textContent = "Hide Gridlines";
}

function clearGridLines() {
  const innerDiv = document.querySelectorAll(".inner-div");

    innerDiv.forEach((innerDiv) => {
    innerDiv.style.borderWidth = "0px";
  });
  gridLinesVisible = false;
  showGridButton.textContent = "Show Gridlines";
}

renderContainer(gridDimension);

function renderListForVerOne() {
  const uLTag = document.querySelector("ul");
  uLTag.removeChild(uLTag.lastElementChild);
  uLTag.removeChild(uLTag.lastElementChild);
  // uLTag.removeChild(uLTag.lastChild); 

  listItemListVerOne.forEach((listItem) => {
    const listItemTag = document.createElement("li");
    listItemTag.textContent = listItem;
    document.querySelector("ul").appendChild(listItemTag);
  });
}

function renderListForVerZero() {
  const uLTag = document.querySelector("ul");
  uLTag.removeChild(uLTag.lastElementChild);
  uLTag.removeChild(uLTag.lastElementChild);

  listItemListVerZero.forEach((listItem) => {
    const listItemTag = document.createElement("li");
    listItemTag.textContent = listItem;
    document.querySelector("ul").appendChild(listItemTag);
  });
}

gridDimButton.addEventListener("click", (e) => {
  let changeGridDim = Number(prompt("Please enter the length of the Grid (should NOT be greater than 100 and lesser than 1):", 25));

  if (changeGridDim <= 100 && changeGridDim >= 1) {
    clearContainer();
    gridDimension = changeGridDim;
    renderContainer(gridDimension);
    visitedList = Array.from({ length: gridDimension }, () => Array(gridDimension).fill(0));
    if (gridLinesVisible) drawGridLines();
  } else {
    if (changeGridDim == 0) alert("Sorry, a grid with a dimension of 0 CANNOT be constructed. Please try again!");
    else if (changeGridDim > 100)
    alert("Sorry, values greater than 100 consume too many resources. Please try again!");
    else alert("Sorry, an invalid value for the grid was provided. Please try again!");
  }
  gridDimButton.blur();
});

currentDimButton.addEventListener("click", (e) => {
  alert(`Current Dimension: ${gridDimension}x${gridDimension} blocks\nHeight: ${containerDiv.clientHeight}px, Width: ${containerDiv.clientWidth}px`);
  currentDimButton.blur();
});

document.addEventListener("keydown", (e) => {
  if (e.key === "q" || e.key === "Q") {
    clearContainer();
    renderContainer(gridDimension);
    visitedList = Array.from({ length: gridDimension }, () => Array(gridDimension).fill(0));
    if (gridLinesVisible) drawGridLines();
  }
  if (e.ctrlKey) ctrlPressed = true;

});

document.addEventListener("keyup", (e) => {
  if (e.key === "Control") ctrlPressed = false;
});

trailColorButton.addEventListener("click", (e) => {
  let inputTrailColor = prompt("Please enter a valid Trail color: ");
  inputTrailColor = inputTrailColor.toLowerCase();

  if (CSS.supports("color", inputTrailColor)) {
    trailColor = inputTrailColor;

    currentColorBlock.style.backgroundColor = trailColor;
    currentColorPara.textContent = `Current Color: ${trailColor.toUpperCase()}`;

    if (colorsUsedList.includes(trailColor)) {
      colorsUsedList.splice(colorsUsedList.indexOf(trailColor), 1);
    }
    
    if (colorsUsedList.length >= colorsUsedMaxCount) colorsUsedList.pop();

    colorsUsedList.unshift(inputTrailColor);

    colorsUsedDiv.querySelectorAll("*").forEach((node) => {
      if (node.tagName != "P") {
        node.remove();
      }
    });

    colorsUsedList.forEach((color) => {
      const usedColorButton = document.createElement("button");
      usedColorButton.classList.add("used-color-button");
      usedColorButton.style.backgroundColor = color;
      usedColorButton.addEventListener("click", (e) => {
        trailColor = usedColorButton.style.backgroundColor;
        currentColorBlock.style.backgroundColor = trailColor;
        currentColorPara.textContent = `Current Color: ${trailColor.toUpperCase()}`;
        usedColorButton.remove();
        colorsUsedDiv.querySelector("p").after(usedColorButton);

        colorsUsedList.splice(colorsUsedList.indexOf(e.target.style.backgroundColor), 1);
        colorsUsedList.unshift(e.target.style.backgroundColor);
      });
      colorsUsedDiv.appendChild(usedColorButton);
    });

  } else {
    alert("The input color is NOT valid/supported by CSS!");
  }
  
  trailColorButton.blur();
});

clearButton.addEventListener("click", (e) => {
  clearContainer();
  renderContainer(gridDimension);
  visitedList = Array.from({ length: gridDimension }, () => Array(gridDimension).fill(0));
  if (gridLinesVisible) drawGridLines();
  clearButton.blur();
});

showGridButton.addEventListener("click", (e) => {

  if (gridLinesVisible) clearGridLines();
  else drawGridLines(); 
  
  showGridButton.blur();
});

persistButton.addEventListener("click", (e) => {
  if (persist == true) {

    clearContainer();
    renderContainer(gridDimension);

    if (gridLinesVisible) drawGridLines();
    persistButton.textContent = "Persist";
    persist = false;
  } else {
    persistButton.textContent = "Don't Persist";
    persist = true;
  }

  persistButton.blur();
});

changeVersionButton.addEventListener("click", (e) => {
  if (version == 0) {
    version = 1;

    changeVersionPara.textContent = "for the original version of the Webpage, involving colors chosen by the user.";

    clearContainer();
    renderContainer(gridDimension);
    visitedList = Array.from({ length: gridDimension }, () => Array(gridDimension).fill(0));

    trailColorButton.disabled = true;
    document.querySelector(".colors-used-div > p").style.color = 'gray';
    document.querySelector(".used-color-button").disabled = true;
    renderListForVerOne();

    persistButton.disabled = true;
  } else {
    version = 0;

    changeVersionPara.textContent = "for another version of the Webpage, involving random colors.";

    clearContainer();
    renderContainer(gridDimension);
    visitedList = Array.from({ length: gridDimension }, () => Array(gridDimension).fill(0));
    
    trailColorButton.disabled = false;
    document.querySelector(".colors-used-div > p").style.color = 'black';
    document.querySelector(".used-color-button").disabled = false;
    renderListForVerZero();

    persistButton.disabled = false;
  }
  changeVersionButton.blur(); 
});