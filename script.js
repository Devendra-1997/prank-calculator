const allBtns = document.querySelectorAll(".btn");

const displayElm = document.querySelector(".display");

let strToDisplay = "";

const operators = ["%", "/", "*", "+", "-"];
let lastOperator = "";

const audio = new Audio("./aa.wav");

allBtns.forEach((btn, i) => {
  btn.addEventListener("click", () => {
    displayElm.style.background = "";
    displayElm.style.color = "";
    displayElm.classList.remove("prank");

    const value = btn.innerText;
    if (value === "AC") {
      strToDisplay = "";
      return display();
    }

    if (value == "C") {
      strToDisplay = strToDisplay.slice(0, -1);
      return display(strToDisplay);
    }

    if (value === "=") {
      const lastChar = strToDisplay[strToDisplay.length - 1];
      if (operators.includes(lastChar)) {
        strToDisplay = strToDisplay.slice(0, -1);
      }
      return total();
    }

    if (operators.includes(value)) {
      lastOperator = value;
      const lastChar = strToDisplay[strToDisplay.length - 1];

      if (operators.includes(lastChar)) {
        strToDisplay = strToDisplay.slice(0, -1);
      }
    }

    if (value === ".") {
      const lastOperatorIndex = strToDisplay.lastIndexOf(lastOperator);

      const lastNumebrSet = strToDisplay.slice(lastOperatorIndex);

      if (lastNumebrSet.includes(".")) {
        return;
      }

      if (!lastOperator && strToDisplay.includes(".")) {
        return;
      }
    }

    strToDisplay += value;
    display(strToDisplay);
  });
});

const display = (str) => {
  displayElm.innerText = str || "0.00";
};

const total = () => {
  const randNum = reandomNumGenerator();

  if (randNum) {
    // apply prank version
    audio.play();
    displayElm.style.background = "red";
    displayElm.style.color = "white";
    displayElm.classList.add("prank");
  }

  const ttl = +eval(strToDisplay).toFixed(2) + randNum;
  strToDisplay = ttl.toString();
  display(strToDisplay);
};

const reandomNumGenerator = () => {
  const num = Math.round(Math.random() * 10);
  return num < 5 ? num : 0;
};
