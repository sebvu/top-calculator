function Calculator() {
  // public

  /*
   use calcOpsHolder to store operator and nextNum
   calculate currNum = currNum {operator} nextNum
  */
  this.operate = () => {
    let currNum = currOperators[0];
    let calcOpsHolder = [];

    for (let i = 1; i < currOperators.length; i++) {
      calcOpsHolder.push(currOperators[i]);

      if (i % 2 !== 0) {
        let operator = calcOpsHolder[0];
        let nextNum = calcOpsHolder[1];

        currNum = calculateWithOperation(currNum, nextNum, operator);
        // flush calcOpsHolder after usage
        calcOpsHolder = [];
      }
    }

    // flush currOperators, and add new sum
    currOperators = [];
    currOperators.push(currNum);
    return currNum; // the final output of all operations
  };
  this.addOp = (op) => {
    let topOpIsNaN = isNaN(parseInt(currOperators.at(-1)));
    let newOpIsNaN = isNaN(parseInt(op));

    // operator pushed if top is num, num is pushed if top is operator
    if ((topOpIsNaN && !newOpIsNaN) || (!topOpIsNaN && newOpIsNaN)) {
      currOperators.push(op);
      return true;
    }
    return false;
  };
  this.popOp = () => {
    if (currOperators.length === 0) return null;
    currOperators.pop();
  };
  this.clearOp = () => {
    calcOpsHolder = [];
  };
  this.getOps = () => currOperators.join("");

  // private
  let currOperators = []; // holds current nums and operators in its appropriate order
  let calculateWithOperation = (num1, num2, op) => {
    switch (op) {
      case "+":
        return add(num1, num2);
      case "-":
        return subtract(num1, num2);
      case "*":
        return multiply(num1, num2);
      case "/":
        return divide(num1, num2);
      case "%":
        return modulo(num1, num2);
      default:
        return null;
    }
  };
  let add = (num1, num2) => num1 + num2;
  let subtract = (num1, num2) => num1 - num2;
  let multiply = (num1, num2) => num1 * num2;
  let divide = (num1, num2) => num1 / num2;
  let modulo = (num1, num2) => num1 % num2;
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
      case "number-operator":
        break;
      case "equal-operator":
        break;
      case "clear-operator":
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
