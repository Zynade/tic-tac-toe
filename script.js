const Player = (sign) => {
    this.sign = sign;
    const getSign = () => {
        return sign;
    };

    return {getSign};
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

    return {getGridItem, setGridItem, resetGrid};
})();

const displayController = (() => {
    const playerText = document.getElementById('player-text');
    const gridItems = document.querySelectorAll('.grid-item');
    const restartButton = document.getElementById('restart-button');

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

    return {setPlayerTextMessage, updatePlayerText, renderGameBoard};
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
        if (checkWinner()) {
            displayController.setPlayerTextMessage(getCurrentPlayerSign());
            isOver = true;
            return
        }
        if (round === 9) {
            displayController.setPlayerTextMessage('draw');
            isOver = true;
            return
        }
        round++;
        displayController.updatePlayerText(`Player ${getCurrentPlayerSign()}'s turn to play`);
    };


    const checkWinner = () => {
        // TODO
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

    return {isGameOver, performTurn, getCurrentPlayerSign, resetGame};
})();

