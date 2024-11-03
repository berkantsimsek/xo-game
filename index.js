const cells = document.querySelectorAll(".cell");
const statusText = document.querySelector("#statusText");
const restartBtn = document.querySelector("#restartBtn");
const winLine = document.createElement("div");
winLine.classList.add("win-line");
document.getElementById("cellContainer").appendChild(winLine);

// Skorlar için değişkenler
let xScore = 0;
let oScore = 0;

// HTML skor öğelerine referanslar
const xScoreText = document.querySelector("#xScore");
const oScoreText = document.querySelector("#oScore");

const winConditions = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8],
    [0, 3, 6], [1, 4, 7], [2, 5, 8],
    [0, 4, 8], [2, 4, 6]
];

let options = ["", "", "", "", "", "", "", "", ""];
let currentPlayer = "X";
let running = false;

initializeGame();

function initializeGame() {
    cells.forEach((cell, index) => {
        cell.addEventListener("click", cellClicked);
        cell.setAttribute("cellIndex", index);
    });
    restartBtn.addEventListener("click", restartGame);
    statusText.textContent = `${currentPlayer}'s turn`;
    running = true;
}

function cellClicked() {
    const cellIndex = this.getAttribute("cellIndex");

    if (options[cellIndex] !== "" || !running) return;
    updateCell(this, cellIndex);
    checkWinner();
    if (running) changePlayer();
}

function updateCell(cell, index) {
    options[index] = currentPlayer;
    cell.textContent = currentPlayer;
}

function changePlayer() {
    currentPlayer = currentPlayer === "X" ? "O" : "X";
    statusText.textContent = `${currentPlayer}'s turn`;
}

function checkWinner() {
    let roundWon = false;
    for (let condition of winConditions) {
        const [a, b, c] = condition;
        if (options[a] && options[a] === options[b] && options[a] === options[c]) {
            roundWon = true;
            drawWinLine(condition);
            updateScore(); // Skor güncelleme fonksiyonunu çağırıyoruz
            break;
        }
    }

    if (roundWon) {
        statusText.textContent = `${currentPlayer} wins!`;
        running = false;
    } else if (!options.includes("")) {
        statusText.textContent = `Draw!`;
        running = false;
    }
}

// Skor güncelleme fonksiyonu
function updateScore() {
    if (currentPlayer === "X") {
        xScore++;
        xScoreText.textContent = xScore;
    } else {
        oScore++;
        oScoreText.textContent = oScore;
    }
}

function drawWinLine(condition) {
    const [a, , c] = condition;
    const startCell = cells[a].getBoundingClientRect();
    const endCell = cells[c].getBoundingClientRect();
    const containerRect = document.getElementById("cellContainer").getBoundingClientRect();

    const x1 = startCell.left - containerRect.left + startCell.width / 2;
    const y1 = startCell.top - containerRect.top + startCell.height / 2;
    const x2 = endCell.left - containerRect.left + endCell.width / 2;
    const y2 = endCell.top - containerRect.top + endCell.height / 2;

    const angle = Math.atan2(y2 - y1, x2 - x1) * (180 / Math.PI);
    const distance = Math.hypot(x2 - x1, y2 - y1);

    winLine.style.width = `${distance}px`;
    winLine.style.transform = `rotate(${angle}deg)`;
    winLine.style.top = `${y1}px`;
    winLine.style.left = `${x1}px`;
    winLine.style.display = "block";
}

function restartGame() {
    currentPlayer = "X";
    options = ["", "", "", "", "", "", "", "", ""];
    statusText.textContent = `${currentPlayer}'s turn`;
    cells.forEach(cell => (cell.textContent = ""));
    winLine.style.width = "0";
    winLine.style.display = "none";
    running = true;
}
// Skor sıfırlama butonunu seçin ve sıfırlama işlevini atayın
const resetScoreBtn = document.querySelector("#resetScoreBtn");
resetScoreBtn.addEventListener("click", resetScore);

function resetScore() {
    xScore = 0;
    oScore = 0;
    xScoreText.textContent = xScore;
    oScoreText.textContent = oScore;
}


