const board = document.getElementById('game-board');
const statusDiv = document.getElementById('status');
const restartBtn = document.getElementById('restart');
let currentPlayer = 'X';
let gameActive = true;
let gameState = ['', '', '', '', '', '', '', '', ''];

function createBoard() {
    board.innerHTML = '';
    for (let i = 0; i < 9; i++) {
        const cell = document.createElement('div');
        cell.classList.add('cell');
        cell.dataset.index = i;
        cell.addEventListener('click', handleCellClick);
        board.appendChild(cell);
    }
}

function handleCellClick(e) {
    const index = e.target.dataset.index;
    if (gameState[index] !== '' || !gameActive) return;

    gameState[index] = currentPlayer;
    e.target.textContent = currentPlayer;

    if (checkWin()) {
        statusDiv.textContent = `O jogador ${currentPlayer} venceu! 🎉`;
        gameActive = false;
        return;
    }

    if (!gameState.includes('')) {
        statusDiv.textContent = "Empate! 😲";
        gameActive = false;
        return;
    }

    currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
    statusDiv.textContent = `Vez do jogador ${currentPlayer}`;
}

function checkWin() {
    const winPatterns = [
        [0,1,2],[3,4,5],[6,7,8], // linhas
        [0,3,6],[1,4,7],[2,5,8], // colunas
        [0,4,8],[2,4,6],         // diagonais
    ];
    return winPatterns.some(pattern => 
        gameState[pattern[0]] && 
        gameState[pattern[0]] === gameState[pattern[1]] &&
        gameState[pattern[1]] === gameState[pattern[2]]
    );
}

function restartGame() {
    gameState = ['', '', '', '', '', '', '', '', ''];
    currentPlayer = 'X';
    gameActive = true;
    statusDiv.textContent = `Vez do jogador ${currentPlayer}`;
    createBoard();
}

restartBtn.addEventListener('click', restartGame);

// Inicializar
restartGame();