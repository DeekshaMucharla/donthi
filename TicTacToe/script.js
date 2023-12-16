const cells = document.querySelectorAll('.cell');
const status = document.querySelector('.status');
const restartButton = document.querySelector('.restart-btn');
const resultScreen = document.querySelector('.result-screen');
const resultMessage = document.querySelector('.result-message');
const newGameButton = document.querySelector('.new-game-btn');

let currentPlayer = 'X';
let gameActive = true;
let gameState = ['', '', '', '', '', '', '', '', ''];

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

const handleCellClick = (clickedCellEvent) => {
  const clickedCell = clickedCellEvent.target;
  const clickedCellIndex = parseInt(clickedCell.getAttribute('data-cell'));

  if (gameState[clickedCellIndex] !== '' || !gameActive) return;

  gameState[clickedCellIndex] = currentPlayer;
  clickedCell.textContent = currentPlayer;
  checkResult();
  currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
  status.textContent = `Player ${currentPlayer}'s turn`;
};

const checkResult = () => {
  for (let i = 0; i < winningConditions.length; i++) {
    const [a, b, c] = winningConditions[i];
    const cellA = gameState[a];
    const cellB = gameState[b];
    const cellC = gameState[c];

    if (cellA === '' || cellB === '' || cellC === '') continue;

    if (cellA === cellB && cellB === cellC) {
      gameActive = false;
      showResultScreen(`Player ${currentPlayer} wins!`);
      return;
    }
  }

  if (!gameState.includes('')) {
    gameActive = false;
    showResultScreen(`It's a tie!`);
  }
};

const restartGame = () => {
  currentPlayer = 'X';
  gameActive = true;
  gameState = ['', '', '', '', '', '', '', '', ''];
  status.textContent = `Player ${currentPlayer}'s turn`;
  cells.forEach(cell => {
    cell.textContent = '';
  });
};

const showResultScreen = (message) => {
  resultMessage.textContent = message;
  resultScreen.style.display = 'flex';
};

const hideResultScreen = () => {
  resultScreen.style.display = 'none';
};

const newGame = () => {
  hideResultScreen();
  restartGame();
};

cells.forEach(cell => {
  cell.addEventListener('click', handleCellClick);
});

restartButton.addEventListener('click', () => showResultScreen(''));
newGameButton.addEventListener('click', newGame);
