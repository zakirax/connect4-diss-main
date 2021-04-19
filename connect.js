const colours = { // Enum of colours
    playerOne: "red",
    playerTwo: "yellow"
}
// Player 1 = red, player 2 = yellow
var player1 = 'PLAYER 1';
var player2 = 'PLAYER 2';
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
var board = new Array(boardCols);
for (var col = 0; col < boardCols; col++) {   //Iterates over every position and looks for a win 
    board[col] = new Array(boardRows);
    for (var row = 0; row < boardRows; row++) {
        board[col][row] = 0;
    }
}


function hasWon() {
    for (var col = 0; col < boardCols; col++); {
        var won = false;
        for (var row = 0; row < boardRows; row++) {
            if (board[col][row] == 1) {
                won++
                if (won == 4) {
                    return true;
                }
            }
        }
    }

    return false;


    // TO DO code to calculate if either player has won, needs to iterate over the array

    return (won);
}

document.addEventListener('DOMContentLoaded', () => {
    //logs the slots of the grid selected by the player in the console 
    let cellId = '';
    for (y = 0; y < tableCell.length; y++) {
        tableCell[y].addEventListener('click', (event) => {

            //cellId = event.target.parentElement.rowIndex.toString() + event.target.cellIndex.toString();
            cellId = event.target.id.substring(5, event.target.id.length);
            var id = parseInt(cellId);
            var col = Math.round(id % boardCols);
            var row = Math.round(id / boardCols);
            var found = false;
            var rowFound = 1;
            for (var i = boardRows - 1; i >= 0; i--) {
                if (board[col][i] == 0) {
                    found = true;
                    rowFound = i;
                    break;
                }
            }
            if (!found) return;
            row = rowFound;
            id = row * boardCols + col;
            cellId = id;

            if (isPlayerOneTurn) {
                // update the cells using red colour e.g.
                document.getElementById("board" + cellId).style.background = colours.playerOne;
                board[col][row] = 2;
                document.getElementById("Player-Go").innerHTML = "Player 2";
            }
            else {
                board[col][row] = 1;
                document.getElementById("board" + cellId).style.background = colours.playerTwo;
                document.getElementById("Player-Go").innerHTML = "Player 1";
            }

            isPlayerOneTurn = !isPlayerOneTurn;

            // const startIndex = cellId.split(''); // [row, col]
        });
    };
});



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
    playerTurn.innerHTML = '';
    playerTurn.style.color = 'black';
});



