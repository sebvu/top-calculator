// number and operations are both referred to as ops in func names

function Calculator() {
  // public
  this.operate = () => 1;
  this.addOp = (op) => {
    // verify is op is a number or an operator

    // do not add if last element is not a number
    if (isNaN(parseInt(currOperators.at(-1)))) return null;

    currOperators.push(op);
  };
  this.popOp = () => {
    if (currOperators.length === 0) return null; // return null if pop failed
    currOperators.pop();
  };
  this.getOps = () => currOperators.join("");

  // private
  currOperators = []; // holds current nums and operators in its appropriate order
  add = (num1, num2) => num1 + num2;
  subtract = (num1, num2) => num1 - num2;
  multiply = (num1, num2) => num1 * num2;
  divide = (num1, num2) => num1 / num2;
}

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
  const DEFAULT_DISPLAY_TEXT = "Insert";

  const opsCtn = document.getElementById("calculator-operator-container");
  const calcDisplaySpan = document.querySelector(
    "#calculator-display-container span",
  );

  calcDisplaySpan.textContent = DEFAULT_DISPLAY_TEXT;
  let currOpsInserted = []; // holder for current operations by user

  let calc = new Calculator();

  opsCtn.addEventListener("click", (e) => {
    let target = e.target; // target the id of button clicked

    switch (target.id) {
      case "add-operator":
        break;
    }

    // determine what text to fill display span with
    if (currOpsInserted.join("") === "") {
      calcDisplaySpan.textContent = currOpsInserted;
    } else {
      calcDisplaySpan.textContent = DEFAULT_DISPLAY_TEXT;
    }
  });
}

main();
