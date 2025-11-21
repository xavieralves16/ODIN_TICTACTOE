const Gameboard = (function () {
    const board = ["", "", "", "", "", "", "", "", ""];

    const getBoard = () => board;

    const setCell = (index, marker) => {
        if (board[index] === "") {
            board[index] = marker;
            return true;
        }
        return false;
    };

    const reset = () => {
        for (let i = 0; i < board.length; i++) board[i] = "";
    };

    return { getBoard, setCell, reset };
})();


const Player = (name, marker) => {
    return { name, marker };
};

const GameController = (function () {

    let player1, player2, activePlayer;
    let gameOver = false;

    const start = (name1 = "Player 1", name2 = "Player 2") => {
        player1 = Player(name1, "X");
        player2 = Player(name2, "O");
        activePlayer = player1;
        gameOver = false;
        Gameboard.reset();
    };

    const getActivePlayer = () => activePlayer;

    const switchPlayer = () => {
        activePlayer = activePlayer === player1 ? player2 : player1;
    };

    const playRound = (index) => {
        if (gameOver) return;

        const valid = Gameboard.setCell(index, activePlayer.marker);
        if (!valid) return; // invalid move

        if (checkWinner(Gameboard.getBoard(), activePlayer.marker)) {
            gameOver = true;
            return `${activePlayer.name} wins!`;
        }

        if (Gameboard.getBoard().every(cell => cell !== "")) {
            gameOver = true;
            return "It's a tie!";
        }

        switchPlayer();
    };

    const winningCombos = [
        [0,1,2], [3,4,5], [6,7,8],
        [0,3,6], [1,4,7], [2,5,8],
        [0,4,8], [2,4,6]
    ];

    const checkWinner = (board, marker) => {
        return winningCombos.some(combo =>
            combo.every(i => board[i] === marker)
        );
    };

    return { start, playRound, getActivePlayer };
})();
