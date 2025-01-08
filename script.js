let column = document.querySelectorAll(".col");
let button = document.querySelector(".btn");
let newButton = document.querySelector(".newbtn");
let messageCon = document.querySelector(".message");
let msg = document.querySelector("#msg");


let playerO = true;
let count = 0;

const winPattern = [
    [0, 1, 2],
    [0, 3, 6],
    [0, 4, 8],
    [1, 4, 7],
    [2, 5, 8],
    [2, 4, 6],
    [3, 4, 5],
    [6, 7, 8],
];

const resetGame = () => {
    playerO = true;
    count = 0;
    enabledCol();
    messageCon.classList.add("hide");
};

column.forEach((col) => {
    col.addEventListener("click", () => {
        if (playerO) {
            col.innerText = "O";
            col.innerHTML = '<p style="color: brown;">O</p>'
            playerO = false;
        }
        else {
            col.innerText = "X";
            playerO = true;
        }
        col.disabled = true;
        count++;

       let isWinner = checkWinner();

       if(count === 9 && !isWinner){
        drawGame();
       }
    });
});

const drawGame = () => {
    msg.innerText = `The Match is Draw`;
    messageCon.classList.remove("hide");
    disabledCol();
};

const disabledCol = () => {
    for (let col of column) {
        col.disabled = true;
    }
};

const enabledCol = () => {
    for (let col of column) {
        col.disabled = false;
        col.innerText = "";
    }
};

const showWinner = (winner) => {
    msg.innerText = `Congratulations, Winner is ${winner}`;
    messageCon.classList.remove("hide");
    disabledCol();
};

const checkWinner = () => {
    for (let pattern of winPattern) {
        let pos1Val = column[pattern[0]].innerText;
        let pos2Val = column[pattern[1]].innerText;
        let pos3Val = column[pattern[2]].innerText;

        if (pos1Val != "" && pos2Val != "" && pos3Val != "") {
            if (pos1Val === pos2Val && pos2Val === pos3Val) {
                showWinner(pos1Val);
                return true;
            }    
        }
    }
};

newButton.addEventListener("click", resetGame);
button.addEventListener("click", resetGame);
