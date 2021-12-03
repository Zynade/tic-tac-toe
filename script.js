const Player = (sign) => {
    this.sign = sign;
    const getSign = () => {
        return sign;
    };

    return { getSign };
};

const gameBoard = (() => {
    let board = [
        '', '', '',
        '', '', '',
        '', '', ''
    ];

    const getGridItem = (index) => {
        if (index + 1 > board.length) {
            return;
        }
        return board[index];
    }

    const setGridItem = (index, sign) => {
        if (index + 1 > board.length) {
            return;
        }
        board[index] = sign;
    }

    const resetGrid = () => {
        for (let i = 0, n = board.length; i < n; i++) {
            board[i] = '';
        }
    }

    return { getGridItem, setGridItem, resetGrid };
})();

const displayController = (() => {
    const playerText = document.querySelector('#player-text');
    const gridItems = document.querySelectorAll('.grid-item');
    const restartButton = document.querySelector('#restart-button');

    restartButton.addEventListener('click', (e) => {
        gameController.resetGame();
    })

    Array.from(gridItems).forEach(item => {
        item.addEventListener('click', (e) => {
            // stuff
            if (e.target.textContent === "" && !gameController.isGameOver()) {
                gameController.performTurn(parseInt(e.target.dataset.index))
                renderGameBoard();
            };
        });
    });

    const renderGameBoard = () => {
        for (let i = 0, n = gridItems.length; i < n; i++) {
            gridItems[i].textContent = gameBoard.getGridItem(i);
        }
    };

    const setPlayerTextMessage = (winner) => {
        if (winner === "draw") {
            updatePlayerText('The match was a draw!');
        }
        else {
            updatePlayerText(`Player ${gameController.getCurrentPlayerSign()} has won the match! Congratulations.`)
        }
    };

    const updatePlayerText = (message) => {
        playerText.textContent = message;
    };

    return { setPlayerTextMessage, updatePlayerText, renderGameBoard };
})();

const gameController = (() => {
    const playerX = Player('X');
    const playerO = Player('O');

    let isOver = false;
    let round = 1;

    const getCurrentPlayerSign = () => {
        return (round % 2 === 0) ? playerO.getSign() : playerX.getSign();
    };

    const isGameOver = () => {
        return isOver;
    };

    const performTurn = (index) => {
        gameBoard.setGridItem(index, getCurrentPlayerSign());
        if (checkWinner(getCurrentPlayerSign())) {
            console.log(`Congrats, Player ${getCurrentPlayerSign()}! You win.`);
            displayController.setPlayerTextMessage(getCurrentPlayerSign());
            isOver = true;
            return;
        }
        if (round === 9) {
            displayController.setPlayerTextMessage('draw');
            isOver = true;
            return;
        }
        round++;
        displayController.updatePlayerText(`Player ${getCurrentPlayerSign()}'s turn to play`);
    };


    const checkWinner = (sign) => {
        const winningAxes = [
            [0, 1, 2],
            [3, 4, 5],
            [6, 7, 8],
            [0, 3, 6],
            [1, 4, 7],
            [2, 5, 8],
            [0, 4, 8],
            [2, 4, 6],
        ];
        let gameOver = false;
        winningAxes.forEach((item, index) => {
            if (gameBoard.getGridItem(item[0]) === sign && gameBoard.getGridItem(item[1]) === sign &&
                gameBoard.getGridItem(item[2]) === sign) {
                    gameOver = true;
            }

        });

        if (gameOver) return true;
    };

    const resetController = () => {
        isOver = false;
        round = 1;
    }

    const resetGame = () => {
        gameBoard.resetGrid();
        resetController();
        displayController.renderGameBoard();
        displayController.updatePlayerText(`Player ${getCurrentPlayerSign()}'s turn to play`);
    }

    if (round == 1) {
        resetGame();
    };

    return { isGameOver, performTurn, getCurrentPlayerSign, resetGame };
})();

