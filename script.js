document.addEventListener('DOMContentLoaded', () => {
    const playerForm = document.getElementById('player-form');
    const startGameBtn = document.getElementById('start-game-btn');
    const gameContainer = document.getElementById('game-container');
    const board = document.getElementById('board');
    const status = document.getElementById('status');
    const resultScreen = document.getElementById('result-screen');
    const resultMessage = document.getElementById('result-message');
    const newGameBtn = document.getElementById('new-game-btn');
    const restartBtn = document.getElementById('restart-btn');
    const scoreboard = document.getElementById('scoreboard');
    const player1ScoreDisplay = document.getElementById('player1-score');
    const player2ScoreDisplay = document.getElementById('player2-score');

    let player1Name = '';
    let player2Name = '';
    let currentPlayer = 'X';
    let boardState = ['', '', '', '', '', '', '', '', ''];
    let gameActive = false;
    let player1Score = 0;
    let player2Score = 0;

    startGameBtn.addEventListener('click', () => {
        player1Name = document.getElementById('player1').value;
        player2Name = document.getElementById('player2').value;

        if (player1Name && player2Name) {
            playerForm.style.display = 'none';
            gameContainer.style.display = 'flex';
            scoreboard.style.display = 'flex';
            startNewGame();
        } else {
            alert('Please enter names for both players.');
        }
    });

    function startNewGame() {
        currentPlayer = currentPlayer === 'X' ? 'O' : 'X'; // Alternate starting player
        gameActive = true;
        status.textContent = `${getCurrentPlayerName()}'s turn`;
        resetBoard();
    }

    function resetBoard() {
        boardState = ['', '', '', '', '', '', '', '', ''];
        document.querySelectorAll('.cell').forEach(cell => cell.textContent = '');
        resultScreen.style.display = 'none';
    }

    function cellClick(index) {
        if (!gameActive || boardState[index] !== '') return;

        boardState[index] = currentPlayer;
        document.querySelector(`.cell[data-index="${index}"]`).textContent = currentPlayer;

        if (checkWin()) {
            showResult(`${getCurrentPlayerName()} wins!`);
            updateScore();
            gameActive = false;
        } else if (boardState.every(cell => cell !== '')) {
            showResult('It\'s a draw!');
            gameActive = false;
        } else {
            currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
            status.textContent = `${getCurrentPlayerName()}'s turn`;
        }
    }

    function checkWin() {
        const winPatterns = [
            [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
            [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
            [0, 4, 8], [2, 4, 6]             // Diagonals
        ];

        return winPatterns.some(pattern =>
            pattern.every(index => boardState[index] === currentPlayer)
        );
    }

    function showResult(message) {
        resultMessage.textContent = message;
        resultScreen.style.display = 'flex';
    }

    function updateScore() {
        if (currentPlayer === 'X') {
            player1Score++;
        } else {
            player2Score++;
        }
        updateScoreboard();
    }

    function updateScoreboard() {
        player1ScoreDisplay.textContent = `${player1Name}: ${player1Score}`;
        player2ScoreDisplay.textContent = `${player2Name}: ${player2Score}`;
    }

    // New game button click event
    newGameBtn.addEventListener('click', () => {
        gameActive = true;
        startNewGame();
    });

    // Restart button click event
    restartBtn.addEventListener('click', () => {
        gameActive = true;
        startNewGame();
    });

    // Create cells
    for (let i = 0; i < 9; i++) {
        const cell = document.createElement('div');
        cell.classList.add('cell');
        cell.dataset.index = i;
        cell.addEventListener('click', () => cellClick(i));
        board.appendChild(cell);
    }

    function getCurrentPlayerName() {
        return currentPlayer === 'X' ? player1Name : player2Name;
    }
});
