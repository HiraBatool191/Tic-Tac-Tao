let boxes = document.querySelectorAll(".box");
let reset = document.querySelector("#reset");
let new_btn = document.querySelector("#new");
let winnerBox = document.querySelector(".newGame");
let msg = document.querySelector(".msg");

let turn0 = true;
const winPattner = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

const disabledBox = () => {
  for (let box of boxes) {
    box.disabled = true;
  }
};

const enableBox = () => {
  for (let box of boxes) {
    box.disabled = false;
    box.innerText = "";
  }
};

const checkWinner = () => {
  let isWinner = false;

  for (let patter of winPattner) {
    let pos1 = boxes[patter[0]].innerText;
    let pos2 = boxes[patter[1]].innerText;
    let pos3 = boxes[patter[2]].innerText;

    if (pos1 != "" && pos2 != "" && pos3 != "") {
      if (pos1 === pos2 && pos2 === pos3) {
        //console.log("winner", pos1);
        showWinner(pos1);
        disabledBox();
        isWinner = true;
        break;
      }
    }
  }

  if (!isWinner) {
    let filled = true;
    boxes.forEach((box) => {
      if (box.innerText === "") filled = false;
    });

    if (filled) {
      showDraw();
      disabledBox();
    }
  }
};

boxes.forEach((element) => {
  element.addEventListener("click", () => {
    if (turn0) {
      element.innerText = "o";
      turn0 = false;
    } else {
      element.innerText = "x";
      turn0 = true;
    }
    element.disabled = true;
    checkWinner();
  });
});

const showWinner = (winner) => {
  msg.innerHTML = `
    🎉 Congratulations, winner is ${winner} <br> <br>
    <img src="https://media.giphy.com/media/v1.Y2lkPWVjZjA1ZTQ3dWt1aTA3ZWF6ZDByMXR5dnpycjRlMHV0ZHkyc3o2dWxkaHRpMzBwdSZlcD12MV9naWZzX3JlbGF0ZWQmY3Q9Zw/SlFxmA7U56mLyHZOLx/giphy.gif" 
         alt="congratulations gif" 
         width="200"/>
  `;
  winnerBox.classList.remove("hide");
};

const showDraw = () => {
  msg.innerText = `Match Draw! Try again.`;
  winnerBox.classList.remove("hide");
};

const resetGame = () => {
  turn0 = true;
  enableBox();
  winnerBox.classList.add("hide");
};

reset.addEventListener("click", resetGame);
new_btn.addEventListener("click", resetGame);
