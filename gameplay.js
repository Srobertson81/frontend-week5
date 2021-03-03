//displays game win/loss/draw
const statusDisplay = document.querySelector('.game-status');
//displays which player's turn it is
const playerDisplay = document.querySelector('.player-turn');
//allows game to hault for win/draw
let gameRunning = true;
//Sets default player
let currentPlayer = "X";
let gameMode = ["", "", "", "", "", "", "", "", ""];
//winning message
const winMessage = () => `Player ${currentPlayer} has won!`;
//draw message
const drawMessage = () => `Game is a draw!`;
//current player message
const currentPlayerTurn = () => `${currentPlayer} 's turn`;
//shows current player
// statusDisplay.innerHTML = currentPlayerTurn ();
playerDisplay.innerHTML = currentPlayerTurn ();
//sets cell clicked to current player
function cellClicked (clickedCell, clickedCellIndex) {
    gameMode [clickedCellIndex] = currentPlayer;
    clickedCell.innerHTML = currentPlayer;
}
//function to change player
function playerChange () {
    currentPlayer = currentPlayer === "X" ? "O" : "X";
    playerDisplay.innerHTML = currentPlayerTurn();
}
//sets winning combinations
const winRules = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];
// checks for win if winRules has a match a draw if there is no available squares or 
// switches player if neither is true
function resultChecker () {
    let gameWon = false;
    for (let i = 0; i <= 7; i++) {
        const winRule = winRules[i];
        let a = gameMode [winRule[0]];
        let b = gameMode [winRule[1]];
        let c = gameMode [winRule[2]];
        if (a === '' || b === '' || c === '') {
            continue;
        }
        if (a === b && b === c) {
            gameWon = true;
            break
        }
    }
    if (gameWon) {
        statusDisplay.innerHTML = winMessage();
        gameRunning = false;
        return;
    }
    let gameDraw = !gameMode.includes("");
    if (gameDraw) {
        statusDisplay.innerHTML = drawMessage();
        gameRunning = false;
        return;
    }else playerChange();
}
//matches cell index of clicked square checks to make sure square is available and selects for current player
function cellClick (clickedCellSelect) {
    const clickedCell = clickedCellSelect.target;
    const clickedCellIndex = parseInt (clickedCell.getAttribute ('square-cell-index')
    );
    if (gameMode [clickedCellIndex] !== "" || !gameRunning) {
        return;
    }
    cellClicked (clickedCell, clickedCellIndex);
    resultChecker();
}
//function to restart game using restart button resets cells to blank
function restartGame() {
    gameRunning = true;
    gameMode = ["", "", "", "", "", "", "", "", ""];
    document.querySelectorAll ('.square') .forEach (square => square.innerHTML = "");
}
//event listener for each cell or square to register a play
document.querySelectorAll('.square').forEach(square => square.addEventListener('click', cellClick));
//adds event listener to the restart button so game can restart
document.querySelector('.game-restart').addEventListener('click', restartGame);