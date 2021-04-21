const resetButton = document.querySelector('.reset'); //we get the reset button

resetButton.addEventListener('click', () => {
    // Reset board
    board = new Array(BOARD_COLS);
    for (var col = 0; col < BOARD_COLS; col++) {
        board[col] = new Array(BOARD_ROWS
        );
        for (var row = 0; row < BOARD_ROWS; row++) {
            board[col][row] = 0;
        }
    }
    for (let row = 0; row < tableRow.length; row++) {
        for (let col = 0; col < tableRow.length + 1; col++) {
            tableRow[row].children[col].style.backgroundColor = 'white';
        }
    }
    document.getElementById("Player-Go").innerHTML = ""  //when board is reset gets rid of any lables on show
});
