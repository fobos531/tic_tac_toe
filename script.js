const gameBoard = (() => {
    const containerChildren = Array.from(document.getElementById("container").children);
    let board = ["","","","","","","","",""];
    const emptyBoard = ["","","","","","","","",""];
    let players = [];
    let turn = "O"; //whose turn is it, i.e. who needs to play next, "X" starts first
    const clearBoard = () => board = [...emptyBoard];
    // fill the board with dummy data for styling experimentation
    const dummyFill = () => {
        const board = ["X", "O", "X", "O", "X", "O", "X", "O", "X"];
        containerChildren.forEach(element => {
        const index = containerChildren.indexOf(element);
        element.textContent = board[index];
        });
    }
    const render = (board) => {
        containerChildren.forEach(element => {
            const index = containerChildren.indexOf(element);
            element.textContent = board[index];
         });
    }
    const drawElement = (e) => {
        //if the square is empty
        if (e.target.textContent == "") {
            if (turn == "X") {
                // we need to push the element to the specific index in the array
                // iterate through containerChildren and stop when there's a match with the exact element
                containerChildren.forEach(element => {
                    const index = containerChildren.indexOf(element);
                    if (e.target == element) {
                        board[index] = "X";
                        element.textContent = board[index];
                    }
                 });
                turn = "O";
            }
            else {
                containerChildren.forEach(element => {
                    const index = containerChildren.indexOf(element);
                    if (e.target == element) {
                        board[index] = "O";
                        element.textContent = board[index];
                    }
                 });
                turn = "X";
            }
        }
        render(board);
        if (gameEndCheck(board)) {
                if (turn == "O") congratulatePlayer("X");
                else congratulatePlayer("O");

        }
    }
    return {
        containerChildren,
        dummyFill,
        drawElement,
        render,
        board,
        emptyBoard,
        players,
        turn,
        clearBoard
    }
})();

const player = function(name,symbol) {
    return {
        name,
        symbol,
        score: 0
    }
};


function gameEndCheck(board) {
    const arr = board;
    //check horizontally - 0 1 2, 3 4 5, 6 7 8
    //check diagonally - 0 4 8, 2 4 6
    //check vertically - 0 3 6, 1 4 7, 2 5 8
    let horizontal = [[arr[0],arr[1],arr[2]],[arr[3],arr[4],arr[5]],[arr[6],arr[7],arr[8]]];
    let diagonal = [[arr[0],arr[4],arr[8]],[arr[2],arr[4],arr[6]]];
    let vertical = [[arr[0],arr[3],arr[6]],[arr[1],arr[4],arr[7]],[arr[2],arr[5],arr[8]]];

    function check(direction) {
            return (direction.some((element) =>
                    (element.every((elem) => elem == "X") || element.every((elem) => elem == "O"))
        ));
    }
    return check(horizontal) || check(diagonal) || check(vertical);
}

function emptyBoard() {
    gameBoard.clearBoard();
    gameBoard.render(gameBoard.emptyBoard);
}

function congratulatePlayer(symbol) {
    let winner = {};
    const player = gameBoard.players;
    player.forEach(elem => {
        for (let key in elem) {
            if (elem[key] == symbol) {
                winner = elem;
                break;
            }
        }
    })
    winner.score++;
    alert(`Congratulations player ${winner.name}, you won! :)`);
}

const game = (() => {
    //create two players
    gameBoard.players.push(player(prompt("X player's name: "), "X"));
    gameBoard.players.push(player(prompt("O player's name: "), "O"));
    //render empty board
    gameBoard.render(gameBoard.emptyBoard);
    //add event listeners to every square
    gameBoard.containerChildren.forEach(element => {
        element.addEventListener('click', gameBoard.drawElement);
    });
})();

