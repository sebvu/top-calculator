function Calculator() {
  // public

  /*
   use calcOpsHolder to store operator and nextNum
   calculate currNum = currNum {operator} nextNum

   will ignore trailing ops, feature!
  */
  this.operate = () => {
    if (currOperators.length === 0) return;

    let currNum = parseFloat(currOperators[0]);
    let calcOpsHolder = [];

    for (let i = 1; i < currOperators.length; i++) {
      calcOpsHolder.push(currOperators[i]);

      if (i % 2 === 0) {
        let nextNum = parseFloat(calcOpsHolder[1]);
        let operator = calcOpsHolder[0];

        if (nextNum.toString() === "0" && operator.toString() === "/") {
          currOperators = []; // flush line
          return 0; // return code for division by zero
        }

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

    currOperators.push(roundedCurrNum.toString()); // MUST PASS ONLY STRINGS TO currOperators

    return true; // successful operation
  };
  this.pushOp = (op, isInitialOutput) => {
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
            break; // exclude any operation if . is the last trailing char
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
        // flush initial output if overwritten by a number
        if (isInitialOutput === true) {
          currOperators = [];
          currOperators.push(op);
        } else {
          currOperators[currOperators.length - 1] += op;
        }
        break;

      // if top and op is NaN, only add if "." prepeneded w/a zero and top does not END with a "."
      case topOpIsNaN && newOpIsNaN:
        if (op === ".") currOperators.push("0" + op);
        break;
    }
  };
  this.popOp = () => {
    if (currOperators.length === 0) return;

    let topOp = currOperators.at(-1);

    // ensure not implicit conversion when comparing Infinity to string case
    if (topOp.length > 1 && !isNaN(topOp) && topOp != Infinity) {
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
  this.signSwitchOp = () => {
    if (isNaN(parseFloat(currOperators.at(-1)))) return;

    if (currOperators.at(-1).at(0) !== "-")
      currOperators[currOperators.length - 1] = "-" + currOperators.at(-1);
    else
      currOperators[currOperators.length - 1] = currOperators
        .at(-1)
        .substring(1);
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
  function postEventHandler(ret) {
    // handle res given mainly from operate() function
    switch (ret) {
      case null:
        console.error("operate returned null, broken operation detected");
        break;
      case 0:
        console.log("operate returned 0, division by 0 detected!");
        optDisplayTextHolder = DIVIDE_BY_ZERO_TEXT;
        break;
      case true:
        isInitialOutput = true;
        console.log("successful output");
        break;
      default:
        isInitialOutput = false; // non operate function turning output flag off
    }

    // update text
    let newTextContent =
      optDisplayTextHolder === "" ? calc.getOps() : optDisplayTextHolder;

    if (newTextContent === "") newTextContent = DEFAULT_DISPLAY_TEXT;

    calcDisplaySpan.textContent = newTextContent;

    optDisplayTextHolder = ""; // flush old text holder content
  }

  const DEFAULT_DISPLAY_TEXT = "_";
  const DIVIDE_BY_ZERO_TEXT = "YOUR A CHEEKY ONE :(";
  const opsCtn = document.getElementById("ops-container");
  const utilCtn = document.getElementById("utility-container");
  const calcDisplaySpan = document.querySelector(
    "#calculator-display-container span",
  );
  const validKeyboardInputList = Array.from(
    document.querySelectorAll("#ops-container button"),
  ).map((n) => n.textContent); // list of all valid keys

  let optDisplayTextHolder = ""; // optional filler field for displaying text
  let retCode; // return code holder from calculator
  let isInitialOutput = false; // flag is set so numbers can overwrite an initial output

  let calc = new Calculator(); // calculator object handling all logic

  calcDisplaySpan.textContent = DEFAULT_DISPLAY_TEXT;

  // utilities to do operations with the calculator
  utilCtn.addEventListener("click", (e) => {
    let target = e.target;
    let res; // return code holder

    switch (target.id) {
      case "equal-operator":
        console.log("equal operator is clicked");
        res = calc.operate();
        break;
      case "sign-switch-operator":
        console.log("sign switch operator is clicked");
        calc.signSwitchOp();
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
    postEventHandler(res);
  });

  // insert whatever ops are clicked (number and operators are interchangeably referred to as ops):
  opsCtn.addEventListener("click", (e) => {
    let target = e.target;

    // verify a button is actually clicked, then push its content
    if (target.localName === "button") {
      let newOp = target.textContent;
      console.log(newOp);
      calc.pushOp(newOp, isInitialOutput);
    }
    postEventHandler(retCode);
  });

  // handle direct keyboard input for anywhere on the body for specific keys
  document.querySelector("body").addEventListener("keydown", (e) => {
    let eKey = e.key;

    switch (true) {
      case validKeyboardInputList.includes(eKey):
        console.log(`keypressed ${eKey}`);
        calc.pushOp(e.key, isInitialOutput);
        break;
      case eKey === "Enter":
        console.log("keydown enter pressed");
        calc.operate();
        break;
      case eKey === "Backspace":
        console.log("keydown backspace pressed");
        calc.popOp();
        break;
    }
    postEventHandler(retCode);
  });
}

main();
