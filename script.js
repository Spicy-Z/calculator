// DOM Selectors
const number = document.querySelector(".number-container");
const scrn = document.querySelector(".screen");
const operator = document.querySelector(".operator-container");
const opr = document.querySelectorAll(".operator");

//Global Variables
let operation;
let value;
let firstNumber;
let secondNumber;
let result;

//Calculations
function add(a, b) {
  return parseFloat(a) + parseFloat(b);
}

function subtract(a, b) {
  return parseFloat(a) - parseFloat(b);
}

function multiply(a, b) {
  return parseFloat(a) * parseFloat(b);
}

function divide(a, b) {
  if (a == 0 && b == 0) {
    return "ermmmm what the sigma";
  } else return parseFloat(a) / parseFloat(b);
}
function operate(operator, a, b) {
  switch (operator) {
    case "add":
      return add(a, b);
    case "subtract":
      return subtract(a, b);
    case "multiply":
      return multiply(a, b);
    case "divide":
      return divide(a, b);
    default:
      return "erm what the smegma";
  }
}

// Numbers-Decimal-Negative Buttons Event Listener
number.addEventListener("click", (e) => {
  const id = e.target.id;
  if (value != undefined && value.length > 19) {
    e.preventDefault();
  } 
  else if (id != "num-container" && id != "switch" && id != "decimal") {
    value = value ? value + "" + id : id;
    scrn.textContent = value;
  } 
  else if (id == "switch") {
    value = value * -1;
    scrn.textContent = value;
  } 
  else if (id == "decimal") {
    if (value.includes(".")) {
      id.preventDefault();
    }
    value = value + ".";
    scrn.textContent = value;
  }
});

// Operation Event Listener
operator.addEventListener("click", (e) => {
  scrn.textContent = "|";
  const id = e.target.id;
  if (
    id != "equals" && id != "clear" && id != "opr-container" &&
    id != "clear-container" && id != "backspace"
  ) {
    if (firstNumber !== undefined && value !== undefined) {
      result = operate(operation, firstNumber, value);
      scrn.textContent = result;
      firstNumber = result;
      operation = undefined;
      value = undefined;
    }

    operation = id;

    opr.forEach((o) => {
      if (o != id) o.style.filter = "brightness(100%)";
    });

    e.target.style.filter = "brightness(130%)";
    firstNumber = firstNumber !== undefined ? firstNumber : value;
    value = undefined;
  } 
  else if (
    id == "clear" && id != "opr-container" && id != "clear-container"
  ) {
    opr.forEach((o) => {
      o.style.filter = "brightness(100%)";
    });
    value = undefined;
    operation = undefined;
    firstNumber = undefined;
    secondNumber = undefined;
    scrn.textContent = "|";
  } 
  else if (id == "equals" && id != "opr-container" && id != "clear-container") {
    secondNumber = value;
    if (firstNumber !== undefined && secondNumber !== undefined) {
      result = operate(operation, firstNumber, secondNumber);
      scrn.textContent = result;
      opr.forEach((o) => {
        o.style.filter = "brightness(100%)";
      });
      operation = undefined;
      secondNumber = undefined;
      firstNumber = result;
      value = undefined;
    }
  } 
  else if (id == "backspace" && id != "opr-container" && id != "clear-container"
  ) {
    value = value.substring(0, value.length - 1);
    scrn.textContent = value;
  }
});
