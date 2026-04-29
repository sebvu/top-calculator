function Calculator() {
  // public

  /*
   use calcOpsHolder to store operator and nextNum
   calculate currNum = currNum {operator} nextNum

   will ignore trailing ops, feature!
  */
  this.operate = () => {
    let currNum = parseFloat(currOperators[0]);
    let calcOpsHolder = [];

    for (let i = 1; i < currOperators.length; i++) {
      calcOpsHolder.push(currOperators[i]);

      if (i % 2 === 0) {
        let nextNum = parseFloat(calcOpsHolder[1]);
        let operator = calcOpsHolder[0];

        currNum = calculateWithOperation(currNum, nextNum, operator);

        if (currNum === null) {
          return null; // ensure currNum being null is caught
        }

        // flush calcOpsHolder after usage
        calcOpsHolder = [];
      }
    }

    // flush currOperators, and add new sum
    currOperators = [];

    // set .toFixed() then remove trailing 0's with parseFloat
    let roundedCurrNum = parseFloat(currNum.toFixed(5));

    currOperators.push(roundedCurrNum.toString()); // MUST PAST STRING
  };
  this.pushOp = (op) => {
    let topOpIsNaN = isNaN(parseFloat(currOperators.at(-1)));
    let newOpIsNaN = isNaN(parseFloat(op));

    switch (true) {
      // if top is a number, op is NaN
      // if op is ".", if top does not include "." append. else if the LAST digit is ".", do nothing.
      // if op is not ".", just append normally
      case !topOpIsNaN && newOpIsNaN:
        if (op === ".") {
          if (!currOperators.at(-1).includes(".")) {
            currOperators[currOperators.length - 1] += op;
          } else if (currOperators.at(-1).at(-1) === ".") {
            break; //
          }
        } else {
          currOperators.push(op);
        }
        break;

      // if op is a number, push normally
      case topOpIsNaN && !newOpIsNaN:
        currOperators.push(op);
        break;

      // if top and op is number, just append op to top
      case !topOpIsNaN && !newOpIsNaN:
        currOperators[currOperators.length - 1] += op;
        break;

      // if top and op is NaN, only add if "." prepeneded w/a zero and top does not END with a "."
      case topOpIsNaN && newOpIsNaN:
        if (op === ".") currOperators.push(0 + op);
        break;
    }
  };
  this.popOp = () => {
    if (currOperators.length === 0) return;

    let topOp = currOperators.at(-1);

    if (topOp.length > 1) {
      // since numbers are one str entry, substring end out
      currOperators[currOperators.length - 1] = topOp.substring(
        0,
        topOp.length - 1,
      );
    } else {
      // simply pop the op entry
      currOperators.pop();
    }
  };
  this.clearOp = () => {
    currOperators = [];
  };
  this.getOps = () => {
    console.log(currOperators);
    return currOperators.join(" ");
  };

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
      case "^":
        return power(num1, num2);
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
  let power = (num1, num2) => num1 ** num2;
  let modulo = (num1, num2) => num1 % num2;
}

function main() {
  // js declerations are hoisted to the top of their context 🙏
  function updateTextContent() {
    let newTextContent = calc.getOps();

    if (newTextContent === "") newTextContent = DEFAULT_DISPLAY_TEXT;

    calcDisplaySpan.textContent = newTextContent;
  }

  const DEFAULT_DISPLAY_TEXT = "Insert";
  const opsCtn = document.getElementById("ops-container");
  const utilCtn = document.getElementById("utility-container");
  const calcDisplaySpan = document.querySelector(
    "#calculator-display-container span",
  );
  let calc = new Calculator(); // calculator object handling all logic

  calcDisplaySpan.textContent = DEFAULT_DISPLAY_TEXT;

  // utilities to do operations with the calculator
  utilCtn.addEventListener("click", (e) => {
    let target = e.target;
    let res = ""; // return code holder

    switch (target.id) {
      case "equal-operator":
        console.log("equal operator is clicked");
        res = calc.operate();
        if (res === null) {
          console.error("operate returned null");
        }
        break;
      case "pop-operator":
        console.log("pop operator is clicked");
        calc.popOp();
        break;
      case "clear-operator":
        console.log("clear operator is clicked");
        calc.clearOp();
        break;
      default:
    }

    updateTextContent();
  });

  // insert whatever ops are clicked (number and operators are interchangeably referred to as ops):
  opsCtn.addEventListener("click", (e) => {
    let target = e.target;

    // verify a button is actually clicked, then push its content
    if (target.localName === "button") {
      let newOp = target.textContent;
      console.log(newOp);
      calc.pushOp(newOp);
    }

    updateTextContent();
  });
}

main();
