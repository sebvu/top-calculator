function add(num1, num2) {
  return num1 + num2;
}

function subtract(num1, num2) {
  return num1 - num2;
}

function multiply(num1, num2) {
  return num1 * num2;
}

function divide(num1, num2) {
  return num1 / num2;
}

function operate(operator, num1, num2) {
  switch (operator) {
    case "+":
      add(num1, num2);
      break;
    case "-":
      subtract(num1, num2);
      break;
    case "*":
      multiply(num1, num2);
      break;
    case "/":
      divide(num1, num2);
      break;
    default:
      console.error("[operate] Invalid operator passed through");
      break;
  }
}

function main() {
  // const vars
  const DEFAULT_DISPLAY_TEXT = "Insert";

  // all operators
  const addOp = document.getElementById("add-operator");
  const subtractOp = document.getElementById("subtract-operator");
  const multiplyOp = document.getElementById("multiply-operator");
  const divideOp = document.getElementById("divide-operator");
  const equalOp = document.getElementById("equal-operator");
  const clearOp = document.getElementById("clear-operator");

  // container elements
  const opsCtn = document.getElementById("calculator-operator-container");
  const calcDisplaySpan = document.querySelector(
    "#calculator-display-container span",
  );

  ////

  calcDisplaySpan.textContent = DEFAULT_DISPLAY_TEXT;
  let currOpsInserted = ""; // holder for current operations by user

  opsCtn.addEventListener("click", (e) => {
    let target = e.target; // target the id of button clicked

    switch (target.id) {
    }

    // determine what text to fill display span with
    if (currOpsInserted === "") {
      calcDisplaySpan.textContent = currOpsInserted;
    } else {
      calcDisplaySpan.textContent = DEFAULT_DISPLAY_TEXT;
    }
  });
}

main();
