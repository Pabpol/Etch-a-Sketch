const DEFAULT_COLOR = '#333333';
const DEFAULT_MODE = 'solid';
const DEFAULT_SIZE = 16;

let currentColor = DEFAULT_COLOR;
let currentMode = DEFAULT_MODE;
let currentSize = DEFAULT_SIZE;

const container = document.querySelector('.container');
const clearBtn = document.querySelector('.clearBtn');
const rainbowBtn = document.querySelector('.rainbowBtn');
const eraserBtn = document.querySelector('.eraserBtn');
const colorBtn = document.getElementById('colorBtn');
const sizeLabel = document.querySelector('.sizeLabel');
const gridSize = document.getElementById('gridSize');

const min = gridSize.min
const max = gridSize.max
const value = gridSize.value

gridSize.style.background = `linear-gradient(to right, rgba(178,43,255,0.8644859813084113) 0%, rgba(36,105,255,0.8691588785046729) ${(value - min) / (max - min) * 100}%, #DEE2E6 ${(value - min) / (max - min) * 100}%, #DEE2E6 100%)`;
gridSize.oninput = function () {
    this.style.background = `linear-gradient(to right, rgba(178,43,255,0.8644859813084113) 0%, rgba(36,105,255,0.8691588785046729) ${(this.value - this.min) / (this.max - this.min) * 100}%, #DEE2E6 ${(this.value - this.min) / (this.max - this.min) * 100}%, #DEE2E6 100%)`
};


gridSize.addEventListener('change', () => resizeGrid(gridSize.value));
clearBtn.addEventListener('click', () => clearGrid());
rainbowBtn.addEventListener('click', () => currentMode = 'rainbow');
eraserBtn.addEventListener('click', () => currentMode = 'eraser');
colorBtn.addEventListener('click', () => currentMode = 'solid');

sizeLabel.textContent = `${currentSize}x${currentSize}`;

const changeGridSize = (value) => {
    currentSize = value;
    sizeLabel.textContent = `${currentSize}x${currentSize}`;
}
const resizeGrid = (value) => {
    clearGrid();
    changeGridSize(value);
    createGrid(value);
}

const createGrid = (size) => {

    container.style.gridTemplateColumns = `repeat(${size}, 1fr)`;
    container.style.gridTemplateRows = `repeat(${size}, 1fr)`;


    for (let i = 0; i < size; i++) {
        for (let j = 0; j < size; j++) {
            let divGrid = document.createElement('div');
            divGrid.setAttribute('style', `display: block;`);
            divGrid.className = 'sqr';
            divGrid.addEventListener('click', paintGrid);
            divGrid.addEventListener('mouseover', (e) => e.buttons === 1 ? paintGrid(e) : null);

            container.appendChild(divGrid);
        }
    }
}

const paintGrid = (e) => {
    if (currentMode === 'solid') {
        e.target.style.backgroundColor = `${colorBtn.value}`;
    } else if (currentMode === 'rainbow') {
        e.target.style.backgroundColor = `hsl(${Math.random() * 360}, 100%, 50%)`;
    } else if (currentMode === 'eraser') {
        e.target.style.backgroundColor = 'white'
    }

}

const clearGrid = () => {
    container.innerHTML = '';
    createGrid(currentSize);
}

window.onload = () => {
    createGrid(currentSize);
}

