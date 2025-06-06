let gridDimension = 16;
let persist = true;
let trailColor = "black";
let gridLinesVisible = false;
let ctrlPressed = false;

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

function renderContainer(gridDim) {
  for (let i = 0; i < gridDim; i++) {
    const firstInnerDiv = document.createElement("div");
    firstInnerDiv.classList.add("first-inner-div");
    firstInnerDiv.textContent = ``;

    for (let j = 0; j < gridDim; j++) {
      const innerDiv = document.createElement("div");
      
      innerDiv.classList.add("inner-div");
      
      innerDiv.addEventListener("mouseover", (e) => {
        if (e.shiftKey) innerDiv.style.backgroundColor = "white";
        else if (!ctrlPressed) innerDiv.style.backgroundColor = trailColor;
      });

      innerDiv.addEventListener("mouseout", (e) => {
        if (!persist) innerDiv.style.backgroundColor = "white";
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

gridDimButton.addEventListener("click", (e) => {
  let changeGridDim = Number(prompt("Please enter the length of the Grid (should NOT exceed 100):"));

  console.log(changeGridDim, typeof(changeGridDim));

  if (changeGridDim <= 100 && changeGridDim >= 0) {
    clearContainer();
    gridDimension = changeGridDim;
    renderContainer(gridDimension);
    if (gridLinesVisible) drawGridLines();
  } else {
    alert("Sorry, an invalid value for the Grid was provided!");
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
        console.log("Here aeeee: " + colorsUsedList.indexOf(e.target.style.backgroundColor), e.target.style.backgroundColor);
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