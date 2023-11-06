/*----- Intialization Section-----*/
const board = [
  [null,null,null],
  [null,null,null],
  [null,null,null]
]
const boardRows = 3;
const boardCols = 3;
let freshBoard = true;
let nextTurn = decideFirstTurn();
renderBoard();

/*-----End of main-----*/

// Decide Whose Turn Function
function decideFirstTurn() {
  if(Math.random() > 0.5) {
    document.querySelector('.js-next-turn').innerHTML = 'Next Turn: O';
    return 'O';
  } else {
    document.querySelector('.js-next-turn').innerHTML = 'Next Turn: X';
    return 'X';
  }
}

// Render Board Function
function renderBoard() {
  // Builds board html
  let boardHtml = '';

  board.forEach((rowArray, rowIndex) => {
    const rowHtml = `
      <div>
        <button id="${rowIndex}-0" class="game-square-pos-${rowIndex}-0 game-square">
        <img src="./images/${rowArray[0]}.png"
        class="square-value-${rowArray[0]}">
        </button>

        <button id="${rowIndex}-1" class="game-square-pos-${rowIndex}-1 game-square">
        <img src="./images/${rowArray[1]}.png"
        class="square-value-${rowArray[1]}">
        </button>

        <button id="${rowIndex}-2" class="game-square-pos-${rowIndex}-2 game-square">
        <img src="./images/${rowArray[2]}.png"
        class="square-value-${rowArray[2]}">
        </button>
      </div>
    `;
    boardHtml += rowHtml;
  });

  // Updates board html
  document.querySelector('.js-board').innerHTML = boardHtml;

  // Gives squares click-able property
  document.querySelectorAll('.game-square').forEach((gameButton) => {
    gameButton.addEventListener('click', () => {
      setSquareValue(gameButton.id); 
    });
  });

  // Checks for win
  if(!freshBoard){
    let win = false;
    win = checkForWins();
    console.log(win);
    if(win){
      alert('Winner!');
      resetBoard();
    }

    // Checks for tie
    let tie = false;
    tie = checkForFullBoard();
    if(!win && tie && !freshBoard){
      alert('Tie.');
      resetBoard();
    }
  }

  // Posts next turn
  postNextTurn();
};

// Updates square value in board array
function setSquareValue(gameButtonId){
  // let targetSquare = document.getElementById(gameButtonId);
  // const targetSquare = document.querySelector(`#${gameButtonId}`);
  row = gameButtonId.split("-")[0]
  col = gameButtonId.split("-")[1]
  if(nextTurn==='X'){
    board[row][col] = 'x'
    nextTurn='O';
  } else {
    board[row][col] = 'o';
    nextTurn='X';
  }
  freshBoard = false;
  renderBoard();
}

// Post next turn function
function postNextTurn() {
  document.querySelector('.js-next-turn').innerHTML = `Next Turn: ${nextTurn}`;
}

// Checks for winner
function checkForWins()  {
  // Reusable variables
  let count = 0;
  let value = false;

  // Check horizontal wins
  for(let i=0; i<boardRows; i++){
    for(let j=0; j<boardCols; j++){
      if (!value && board[i][j]!=null){
        value = board[i][j];
      }

      if(board[i][j]===value){
        count++;
      }
    }

    // Found three across win
    if(count===3){
      return true;
    }

    // Reset values
    count = 0;
    value = false;
  }

  // Check vertical wins
  for(let i=0; i<boardRows; i++){
    for(let j=0; j<boardCols; j++){
      if (!value && board[j][i]!=null){
        value = board[j][i];
      }

      if(board[j][i]===value){
        count++;
      }
    }

    // Found three across win
    if(count===3){
      return true;
    }

    // Reset values
    count = 0;
    value = false;
  }

  // Check Diagonal wins
  // Top-left to bottom-right diagonal
  count = 0;
  value = false;
  for(let i=0; i<boardRows; i++){
    if(!value && board[i][i]!=null){
      value = board[i][i];
    }

    if(board[i][i]===value){
      count++;
    }
  }

  if(count===3){
    return true;
  }

  // Bottom-left to top-right diagonal
  count = 0;
  value = false;
  for(let i=0; i<boardRows; i++){
    if(!value && board[boardRows-1-i][i]!=null){
      value = board[boardRows-1-i][i];
    }

    if(board[boardRows-1-i][i]===value){
      count++;
    }
  }

  if(count===3){
    return true;
  }

  return false;
}

// Check for full board
function checkForFullBoard() {
  for(let i=0; i<boardRows; i++){
    for(j=0; j<boardCols; j++){
      if(board[i][j]===null){
        return false;
      }
    }
  }
  return true;
}

// Reset Board function
function resetBoard(){
  location.reload();
}