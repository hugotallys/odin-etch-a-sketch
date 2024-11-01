const GRID_SIZE_IN_PIXELS = 512;

const container = document.querySelector(".container");

initGrid(16);

const sizeButton = document.querySelector("#size-btn");
const cleanButton = document.querySelector("#clean-btn");

cleanButton.onclick = () => {
    const squares = document.querySelectorAll(".square-div");
    [...squares].forEach((square) => {
        square.classList.remove("active");
    });
};

sizeButton.onclick = () => {
    let newSize = prompt("Enter New Size", "16");

    try {
        newSize = parseInt(newSize);
    } catch (error) {
        alert(`Please, enter a whole number from 1 up to 100.`);
    }

    if (newSize > 100) {
        alert(`Maximum size is 100x100.`);
        newSize = 100;
    } else if (newSize < 16) {
        alert("Minimum size is 16x16")
        newSize = 16;
    }

    const squareRows = document.querySelectorAll(".square-div-row");
    [...squareRows].forEach((row) => {
        container.removeChild(row);
    });
    initGrid(parseInt(newSize));
};

function initGrid(gridSize) {
    const squareSize = `${parseInt(GRID_SIZE_IN_PIXELS / gridSize)}px`;
    for (let i = 0; i < gridSize; i++) {
        const divRow = document.createElement("div");
        divRow.classList.add("square-div-row");
        for (let j = 0; j < gridSize; j++) {
            const squareDiv = document.createElement("div");
            squareDiv.classList.add("square-div");
            squareDiv.style.width = squareSize;
            squareDiv.style.height = squareSize;
            divRow.append(squareDiv);
        }
        container.append(divRow);
    }

    const squares = document.querySelectorAll(".square-div");
    [...squares].forEach((square) => {
        square.addEventListener(
            "mouseover", (e) => e.target.classList.add("active")
        );
    });
}