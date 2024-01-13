var playerRed ="R";
var playerYellow ="Y";
var currentPlayer = playerRed;


var gameOver = false;
var board;


var rows = 6;
var columns = 7;
var currentColumns = [];

window.onload = function() {
    setGame();
}
/// getting the game ready
function setGame() {
    board = [];
    currentColumns = [5, 5, 5, 5, 5, 5, 5];

    for (let r = 0; r < rows; r++) {
        let row = [];
        for (let c = 0; c < columns; c++) {
            // JS
            row.push(' ');
            // HTML
            let tile = document.createElement("div");
            tile.id = r.toString() + "-" + c.toString();
            tile.classList.add("tile");
            tile.addEventListener("click", setPiece);
            document.getElementById("board").append(tile);
        }
        board.push(row);
    }
}
/// game pieces
function setPiece() {
    try {
        if (gameOver) {
            throw new Error('Game is already over.'); // Throw an error if the game is already over
        }

        // Get coords of the tile clicked
        let coords = this.id.split("-");
        let r = parseInt(coords[0]);
        let c = parseInt(coords[1]);

        // Figure out which row the current column should be on
        r = currentColumns[c];

        if (r < 0) {
            return;
        }

        board[r][c] = currentPlayer; // Update JS board
        let tile = document.getElementById(r.toString() + "-" + c.toString());
        if (currentPlayer == playerRed) {
            tile.classList.add("red-piece");
            currentPlayer = playerYellow;
        } else {
            tile.classList.add("yellow-piece");
            currentPlayer = playerRed;
        }

        r -= 1; // Update the row height for that column
        currentColumns[c] = r; // Update the array

        checkWinner();
    } catch (error) {
        // Handle the error (game already over)
        alert(error.message);
    }
}

function checkWinner() {
     /// horizontal check
     for (let r = 0; r < rows; r++) {
         for (let c = 0; c < columns - 3; c++){
            if (board[r][c] != ' ') {
                if (board[r][c] == board[r][c+1] && board[r][c+1] == board[r][c+2] && board[r][c+2] == board[r][c+3]) {
                    setWinner(r, c);
                    return;
                }
            }
         }
    }

    ///vertical check
    for (let c = 0; c < columns; c++) {
        for (let r = 0; r < rows - 3; r++) {
            if (board[r][c] != ' ') {
                if (board[r][c] == board[r+1][c] && board[r+1][c] == board[r+2][c] && board[r+2][c] == board[r+3][c]) {
                    setWinner(r, c);
                    return;
                }
            }
        }
    }

    /// anti diagonal check
    for (let r = 0; r < rows - 3; r++) {
        for (let c = 0; c < columns - 3; c++) {
            if (board[r][c] != ' ') {
                if (board[r][c] == board[r+1][c+1] && board[r+1][c+1] == board[r+2][c+2] && board[r+2][c+2] == board[r+3][c+3]) {
                    setWinner(r, c);
                    return;
                }
            }
        }
    }

    /// diagonal check
    for (let r = 3; r < rows; r++) {
        for (let c = 0; c < columns - 3; c++) {
            if (board[r][c] != ' ') {
                if (board[r][c] == board[r-1][c+1] && board[r-1][c+1] == board[r-2][c+2] && board[r-2][c+2] == board[r-3][c+3]) {
                    setWinner(r, c);
                    return;
                }
            }
        }
    }
}




  ///Function to handle winning a game 

function setWinner(r, c) {
    let winner = document.getElementById("winner");
    if (board[r][c] == playerRed) {
        winner.innerText = "Red Wins";
        updateScore(playerRed);
    } else {
        winner.innerText = "Yellow Wins";
        updateScore(playerYellow);
    }
    gameOver = true;
}

function updateScore(player) {
    ///  update scores to scoreboard
    if (player === playerRed) {
        let scoreRedElement = document.querySelector('.scoreboard_scoreRed');
        scoreRedElement.textContent = parseInt(scoreRedElement.textContent) + 1;
    } else {
        let scoreYellowElement = document.querySelector('.scoreboard_scoreYellow');
        scoreYellowElement.textContent = parseInt(scoreYellowElement.textContent) + 1;
    }
}

function resetGame() {
    /// Clear the board and reset game state
    setGame();
    gameOver = false;
    currentPlayer = playerRed;
    document.getElementById("winner").innerText = "";

    /// Clear all tiles on the board
    clearBoard();
}

/// Function to clear all tiles on the board
function clearBoard() {
    ///localStorage.setItem("redScore", 1);
    ///localStorage.setItem("yellowScore", 2);

    ///alert(localStorage.getItem("redScore"));

    location.reload();

    /// Iterate through each tile on the board and remove the player classes
    for (let r = 0; r < rows; r++) {
        for (let c = 0; c < columns; c++) {
            let tile = document.getElementById(r.toString() + "-" + c.toString());
            tile.classList.remove("red-piece", "yellow-piece");
        }
    }
}

document.getElementById('clearBoardButton').addEventListener('click', clearBoard);

///creates a csv file
function saveScoresToCSV() {
    /// Get the current scores from the HTML
    const scoreRed = parseInt(document.querySelector('.scoreboard_scoreRed').textContent);
    const scoreYellow = parseInt(document.querySelector('.scoreboard_scoreYellow').textContent);

    /// Create a CSV content
    const csvContent = `Red Score,${scoreRed}\nYellow Score,${scoreYellow}`;

    /// Create the CSV content
    const blob = new Blob([csvContent], { type: 'text/csv' });

    /// Create a download link
    const a = document.createElement('a');
    a.href = window.URL.createObjectURL(blob);
    a.download = 'scorekeeper.txt';
    
    /// Append the link to the document and trigger the click event
    document.body.appendChild(a);
    a.click();

    /// Remove the link from the document
    document.body.removeChild(a);
}



