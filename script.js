const gameBoard = (() => {
    const containerChildren = Array.from(document.getElementById("container").children);
    const board = ["","","","","","","","",""];
    let players = [];
    let turn = "O"; //whose turn is it, i.e. who needs to play next, it's always "X" first

    // fill the board with dummy data for styling experimentation
    const dummyFill = () => {
        const board = ["X", "O", "X", "O", "X", "O", "X", "O", "X"];
        containerChildren.forEach(element => {
        const index = containerChildren.indexOf(element);
        element.textContent = board[index];
        });
    }

    const render = () => {
        containerChildren.forEach(element => {
            const index = containerChildren.indexOf(element);
            element.textContent = board[index];
         });
    }
    const drawElement = (e) => {
        //ako je prazan square
        if (e.target.textContent == "") {
            if (turn == "X") {
                //draw element
                // we need to push the element to the specific index in the array
                // iterate through containerChildren and stop when there's a match with the exact element
               // let currentIndex;
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
        render();
    }
    return {
        containerChildren,
        dummyFill,
        drawElement,
        render,
        board
    }
})();

const player = function(name,symbol) {
    return {
        name,
        symbol,
        score: 0
    }
};


const game = (() => {
    //create two players
  //  gameBoard.players.push(player("Lovro", "X"));
  //  gameBoard.players.push(player("Marija", "O"));
    //render empty board
    gameBoard.render();
    //add event listeners to every square
    gameBoard.containerChildren.forEach(element => {
        element.addEventListener('click', gameBoard.drawElement);
    });
})();

