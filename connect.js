const colours = { // Enum of colours
    playerOne: "red",
    playerTwo: "yellow"
}

// Player 1 = red, player 2 = yellow // Labels
var player1Lbl = 'PLAYER 1 - Red'; // Red
var player2Lbl = 'PLAYER 2 - Yellow'; // Yellow
var isPlayerOneTurn = true;

var tableRow = document.querySelectorAll('tr'); //this allows us to select each individual (6) row
var tableCell = document.querySelectorAll('td'); //this allows us to  select each of the indiviudal slots 
var tableDrop = document.querySelectorAll('.drop');//this allows for all the drop cells on the board to be selected
const playerGo = document.querySelector('#player-go');//h3 in our index file outlines the players go selected  
const statusSpan = document.querySelector('#status'); //satus of the game
const resetButton = document.querySelector('.reset'); //we get the reset button

// First set up the board internal state
// Array defined for whole board 
var boardCols = 7;
var boardRows = 6;
var board = new Array(boardCols); // Init Board Array

for (var col = 0; col < boardCols; col++) {   //Iterates over every position
    board[col] = new Array(boardRows);

    for (var row = 0; row < boardRows; row++) {
        board[col][row] = 0;
    }
}

document.addEventListener('DOMContentLoaded', () => {
    //logs the slots of the grid selected by the player in the console 
    let cellId = '';
    for (y = 0; y < tableCell.length; y++) {
        tableCell[y].addEventListener('click', (event) => {


            //cellId = event.target.parentElement.rowIndex.toString() + event.target.cellIndex.toString();
            cellId = event.target.id.substring(5, event.target.id.length); // board6 => 6
            var id = parseInt(cellId);
            var col = Math.round(id % boardCols); // id % 7
            var row = Math.round(id / boardCols); // id / 7
            var found = false;
            var rowFound = 1;

            for (var i = boardRows - 1; i >= 0; i--) { // i = 6, from right to left ?? 
                if (board[col][i] == 0) { // Empty cell, user can drop a counter into grid
                    found = true;
                    rowFound = i;
                    break;
                }
            }

            if (!found) return; // Cell is NOT empty, return as the row/col is full

            row = rowFound;
            id = row * boardCols + col; // Id of the where the counter landed
            cellId = id;

            if (isPlayerOneTurn) {
                // update the cells using red colour e.g.
                board[col][row] = 1; // Player 2, changes grid value to 2
                document.getElementById("board" + cellId).style.background = colours.playerOne; // Red = 1
                document.getElementById("Player-Go").innerHTML = player1Lbl;
            }
            else {
                board[col][row] = 2;
                document.getElementById("board" + cellId).style.background = colours.playerTwo; // Yellow = 2
                document.getElementById("Player-Go").innerHTML = player2Lbl;
            }
            isPlayerOneTurn = !isPlayerOneTurn;
            hasWon(1);
            hasWon(2);

        });
    };
});


function hasWon(playerNum) {
    // let playerNums = new Set([1,2]); // Player numbers
    for (let col = 0; col < boardCols; col++) {
        for (let row = 0; row < boardRows; row++) {

            let hasWon = false;

            //vertical check 
            if (board[col][row] == playerNum && board[col][row + 1] == playerNum &&
                board[col][row + 2] == playerNum && board[col][row + 3] === playerNum) {
                hasWon = true;
            }

            //horizontal check 
            if (board[col][row] == playerNum && board[col + 1][row] == playerNum &&
                board[col + 2][row] == playerNum && board[col + 3][row] === playerNum) {
                hasWon = true;
            }

            //diaganol check \ (Top left to bottom right and vice versa)
            if (board[col][row] == playerNum && board[col + 1][row + 1] == playerNum &&
                board[col + 2][row + 2] == playerNum && board[col + 3][row + 3] === playerNum) {
                hasWon = true;
            }

            // //diaganol check / (bottom left to top right)
            if (board[col][row] == playerNum && board[col + 1][row - 1] == playerNum &&
                board[col + 2][row - 2] == playerNum && board[col + 3][row - 3] === playerNum) {
                hasWon = true;
            }

            if (hasWon) {
                console.log('Winner is: ', playerNum);
                alert("Winner: ", playerNum);
            }
        }
    }
    return false;

}


resetButton.addEventListener('click', () => {
    // Reset board
    board = new Array(boardCols);
    for (var col = 0; col < boardCols; col++) {
        board[col] = new Array(boardRows);
        for (var row = 0; row < boardRows; row++) {
            board[col][row] = 0;
        }
    }
    for (let row = 0; row < tableRow.length; row++) {
        for (let col = 0; col < tableRow.length + 1; col++) {
            tableRow[row].children[col].style.backgroundColor = 'white';
        }
    }
    //playerTurn.innerHTML = '';
    //playerTurn.style.color = '';
});



