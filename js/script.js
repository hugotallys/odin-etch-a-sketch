const GRID_SIZE_IN_PIXELS = 512;

const container = document.querySelector(".container");
let gridSize = 16;

initGrid(gridSize);

const sizeButton = document.querySelector("#size-btn");
const cleanButton = document.querySelector("#clean-btn");

cleanButton.onclick = () => {
    const squares = document.querySelectorAll(".square-div");
    [...squares].forEach((square) => {
        square.classList.remove("active");
    });
};

sizeButton.onclick = () => {
    let newSize = prompt("Enter New Size", `${gridSize}`);

    newSize = parseInt(newSize);

    if (isNaN(newSize)) {
        alert(`Please, enter a whole number from 1 up to 100.`);
        newSize = gridSize;
        return;
    }

    if (newSize > 100) {
        alert(`Maximum size is 100x100.`);
        newSize = 100;
    } else if (newSize < 16) {
        alert("Minimum size is 16x16")
        newSize = 16;
    }

    gridSize = newSize;

    const squareRows = document.querySelectorAll(".square-div-row");
    [...squareRows].forEach((row) => {
        container.removeChild(row);
    });

    initGrid(gridSize);
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
            "mouseover", (e) => {
                const et = e.target;

                if (et["sFactor"] === undefined) {
                    et["sFactor"] = 0.5;
                } else {
                    et["sFactor"] -= 0.1;
                }

                et["sFactor"] = Math.max(et["sFactor"], 0);

                e.target.style["background-color"] = rgb2hex(...hsl2rgb(360 * Math.random(), 1, et["sFactor"]));
            }
        );
    });
}

// input: h in [0,360] and s,v in [0,1] - output: r,g,b in [0,1]
function hsl2rgb(h, s, l) {
    let a = s * Math.min(l, 1 - l);
    let f = (n, k = (n + h / 30) % 12) => l - a * Math.max(Math.min(k - 3, 9 - k, 1), -1);
    return [f(0), f(8), f(4)];
}

let rgb2hex = (r, g, b) => "#" + [r, g, b].map(x => Math.round(x * 255).toString(16).padStart(2, 0)).join('');