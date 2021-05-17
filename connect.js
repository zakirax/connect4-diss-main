const colours = { // Enum of colours
    playerOne: "grey",
    playerTwo: "purple"
}

// Player 1 = grey, player 2 = purple // Labels that are displayed on the site
const PLAYER1LBL = '1s Turn (Grey)'; // grey
const PLAYER2LBL = '2s Turn (Purple)'; // purple

// Accessing elements from HTML
var tableRow = document.querySelectorAll('tr'); //this allows us to select each individual (6) row
var tableCell = document.querySelectorAll('td'); //this allows us to  select each of the indiviudal slots 
var tableDrop = document.querySelectorAll('.drop');//this allows for all the drop cells on the board to be selected
const playerGo = document.querySelector('#player-go');//h3 in our index file outlines the players go selected  
const statusSpan = document.querySelector('#status'); //satus of the game

var isPlayerOneTurn = true; // Used to check which player is playing


// First set up the board internal state
const BOARD_COLS = 7; // SAME as FINAL in Java
const BOARD_ROWS = 6;

// Array defined for whole board 
var board = new Array(BOARD_COLS); // Init Board Array
for (var col = 0; col < BOARD_COLS; col++) {   //Iterates over every position
    board[col] = new Array(BOARD_ROWS);

    for (var row = 0; row < BOARD_ROWS; row++) {
        board[col][row] = 0;
    }
}


document.addEventListener('DOMContentLoaded', () => {


    //logs the slots of the grid selected by the player in the console 
    let cellId = '';
    for (y = 0; y < tableCell.length; y++) {
        tableCell[y].addEventListener('click', (event) => {

            //putting coin in correct position 
            cellId = event.target.id.substring(5, event.target.id.length); // id = board6 => 6
            var id = parseInt(cellId); // Id of cell position
            var col = Math.round(id % BOARD_COLS); // id % 7 // Gets the column
            var row = Math.round(id / BOARD_COLS); // id / 7 // Gets the row
            var found = false; // 
            var rowFound = 1;

            // Checks space for counter
            for (var i = BOARD_ROWS - 1; i >= 0; i--) { // i = 6, from button to top
                if (board[col][i] == 0) { // For this column and currenet row (i), is the cell empty?
                    found = true; //if it is empty the counter can be dropped 
                    rowFound = i;
                    break;
                }
            }

            if (!found) return; // Cell is NOT empty, return as the row/col is full
            // /** Drops the counter as far as it can go */
            row = rowFound; // Finds the avaliable row
            id = row * BOARD_COLS + col; // calcs Id to get where the counter should be
            cellId = id;

            if (isPlayerOneTurn) {
                playTurn(cellId, col, row, 1, colours.playerOne, PLAYER2LBL);
            }
            else {
                playTurn(cellId, col, row, 2, colours.playerTwo, PLAYER1LBL);
            }

            isPlayerOneTurn = !isPlayerOneTurn;
            hasWon(1) || hasWon(2); // If either is true (does not make a difference, just looks nicer)

        });
    };
});

// Good DRY principle -> Passing parameters for max code reuse/DRY
function playTurn(cellId, col, row, playerNum, colour, opponentLbl) {
    board[col][row] = playerNum; // e.g., Player 2, changes grid value to 2
    document.getElementById("board" + cellId).style.background = colour; // e.g., grey = 1
    document.getElementById("Player-Go").innerHTML = "Player " + opponentLbl; //sets label of player go
}


function hasWon(playerNum) {
    for (let col = 0; col < BOARD_COLS; col++) {
        for (let row = 0; row < BOARD_ROWS; row++) {

            let hasWon = false;

            //vertical check 
            if (row + 3 < BOARD_ROWS) {
                if (board[col][row] == playerNum && board[col][row + 1] == playerNum &&
                    board[col][row + 2] == playerNum && board[col][row + 3] == playerNum) {
                    hasWon = true;
                }
            }

            //horizontal check 
            if (col + 3 < BOARD_COLS) {
                if (board[col][row] == playerNum && board[col + 1][row] == playerNum &&
                    board[col + 2][row] == playerNum && board[col + 3][row] == playerNum) {
                    hasWon = true;
                }
            }

            //diaganol check \ (Top left to bottom right and vice versa)
            if ((row + 3 < BOARD_ROWS) && (col + 3 < BOARD_COLS)) {
                if (board[col][row] == playerNum && board[col + 1][row + 1] == playerNum &&
                    board[col + 2][row + 2] == playerNum && board[col + 3][row + 3] == playerNum) {
                    hasWon = true;
                }
            }

            // //diaganol check / (bottom left to top right)
            if ((row - 3 > 0) && (col + 3 < BOARD_COLS)) {
                if (board[col][row] == playerNum && board[col + 1][row - 1] == playerNum &&
                    board[col + 2][row - 2] == playerNum && board[col + 3][row - 3] == playerNum) {
                    hasWon = true;
                }
            }

            if (hasWon) {
                console.log('Winner is: ', playerNum);
                modal.style.display = "block";
                document.getElementById('winnerLabel').innerHTML = 'Player: ' + playerNum + ' is the winner!';
            }
        }
    }
    return false;

}

