let gameBoard = (() => {
    let board = ["X", "O", "X", "O", "X", "O", "X", "O", "X"];
    return {
        board,
    }
})();

const player = function(symbol) {
    return {
        symbol
    }
};

const containerChildren = Array.from(document.getElementById("container").children);
containerChildren.forEach(element => {
    const index = containerChildren.indexOf(element);
    element.textContent = gameBoard.board[index];
})

let drawBoard = () => {

}