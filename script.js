let boxes = document.querySelectorAll(".box");
let reset = document.querySelector("#reset");
let newGame = document.querySelector("#new-game");
let msgContainer = document.querySelector(".msg-container");
let msg = document.querySelector("#msg");

let turnO = true;

let oMoves = [];
let xMoves = [];

const winPatterns = [
  [0, 1, 2],
  [0, 3, 6],
  [0, 4, 8],
  [1, 4, 7],
  [2, 5, 8],
  [2, 4, 6],
  [3, 4, 5],
  [6, 7, 8],
];

boxes.forEach((box, index) => {
  box.addEventListener("click", () => {
    if (box.innerText !== "") return;

    if (turnO) {
      oMoves.push(index);
      if (oMoves.length > 3) {
        let removeIndex = oMoves.shift();
        boxes[removeIndex].innerText = "";
      }

      box.innerText = "O";
      turnO = false;
    } else {
      xMoves.push(index);

      if (xMoves.length > 3) {
        let removeIndex = xMoves.shift();
        boxes[removeIndex].innerText = "";
      }

      box.innerText = "X";
      turnO = true;
    }

    checkWinner();
  });
});

const disabledboxes = () => {
  for (let box of boxes) box.disabled = true;
};

const enabledboxes = () => {
  for (let box of boxes) {
    box.disabled = false;
    box.innerText = "";
  }
};

const showWinner = (winner) => {
  msg.innerText = `Congratulations, winner is ${winner}`;
  msgContainer.classList.remove("hide");
  disabledboxes();
};

const checkWinner = () => {
  for (let pattern of winPatterns) {
    let pos1Val = boxes[pattern[0]].innerText;
    let pos2Val = boxes[pattern[1]].innerText;
    let pos3Val = boxes[pattern[2]].innerText;

    if (pos1Val !== "" && pos2Val !== "" && pos3Val !== "") {
      if (pos1Val === pos2Val && pos2Val === pos3Val) {
        showWinner(pos1Val);
      }
    }
  }
};

const resetGame = () => {
  turnO = true;
  oMoves = [];
  xMoves = [];
  enabledboxes();
  msgContainer.classList.add("hide");
};

reset.addEventListener("click", resetGame);
newGame.addEventListener("click", resetGame);