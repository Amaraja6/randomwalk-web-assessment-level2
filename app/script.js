// Selecting all the cells, game status, and restart button
const cells = document.querySelectorAll(".cell");
const gameStatus = document.getElementById("game-status");
const restartButton = document.getElementById("restart-button");

// Initializing game variables
let currentPlayer = "X";
let gameActive = true;
let gameState = ["", "", "", "", "", "", "", "", ""];

// Winning conditions for the Tic Tac Toe game
const winningConditions = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

// Function to handle cell click event
function handleCellClick(clickedCellEvent) {
  const clickedCell = clickedCellEvent.target;
  const clickedCellIndex = parseInt(
    clickedCell.getAttribute("data-cell-index")
  );

  // Check if the cell is already filled or the game is inactive
  if (gameState[clickedCellIndex] !== "" || !gameActive) {
    console.log("Already filled or game over");
    return;
  }

  // Update game state and display current player's symbol
  gameState[clickedCellIndex] = currentPlayer;
  clickedCell.innerHTML = currentPlayer;

  // Check for a win or draw, then switch players
  checkWin();
  checkDraw();
  currentPlayer = currentPlayer === "X" ? "O" : "X";
  document.getElementById("player-name").innerText = currentPlayer;
}

// Function to check for a win
function checkWin() {
  for (let i = 0; i < winningConditions.length; i++) {
    const [a, b, c] = winningConditions[i];
    if (
      gameState[a] &&
      gameState[a] === gameState[b] &&
      gameState[a] === gameState[c]
    ) {
      // If there's a win, update scores and display winner
      gameActive = false;
      switch (gameState[a]) {
        case "X": {
          let xScore = parseInt(
            document.getElementById("playerXScore").innerText
          );
          xScore++;
          document.getElementById("playerXScore").innerText = xScore;
          break;
        }
        case "O": {
          let oScore = parseInt(
            document.getElementById("playerOScore").innerText
          );
          oScore++;
          document.getElementById("playerOScore").innerText = oScore;
          break;
        }
        default: {
          console.log("Invalid Game State");
        }
      }
      gameStatus.innerHTML = `Player ${gameState[a]} wins!`;
      return;
    }
  }
}

// Function to check for a draw
function checkDraw() {
  if (!gameState.includes("") && gameActive) {
    // If it's a draw and no cells are empty, end the game
    gameActive = false;
    gameStatus.innerHTML = "It's a draw!";
    return;
  }
}

// Function to restart the game
function restartGame() {
  // Reset all game-related variables and display elements
  gameActive = true;
  currentPlayer = "X";
  gameState = ["", "", "", "", "", "", "", "", ""];
  gameStatus.innerHTML = "";
  cells.forEach((cell) => (cell.innerHTML = ""));
  document.getElementById("player-name").innerText = "X";
}

// Function to reset the scores
function resetScore() {
  // Reset scores for both players to zero
  document.getElementById("playerXScore").innerText = "0";
  document.getElementById("playerOScore").innerText = "0";
}

// Add event listeners to cells and restart button
cells.forEach((cell) => cell.addEventListener("click", handleCellClick));
restartButton.addEventListener("click", restartGame);
