theme = 1;
input = null;
output = null;
const operators = ["div", "plus", "minus", "mul"];
operator = null;
decimalPlace = 0;
let outputDp;

const body = document.querySelector("body");
const themeSwitch = document.querySelector(".switch");
const themeSwitchSlider = document.querySelector(".switch__slider");
const calcOutput = document.querySelector(".calc__output");

reset();
updateConsole(output);

themeSwitch.addEventListener("click", toggleTheme);
document.querySelector(".calc__button--reset").addEventListener("click", reset);
document
  .querySelector(".calc__button--del")
  .addEventListener("click", processDelete);
for (i = 0; i < 10; i++) {
  key = document.querySelector(`.calc__button--${i}`);
  key.number = i;
  key.addEventListener("click", processNumber);
}
for (i = 0; i < operators.length; i++) {
  key = document.querySelector(`.calc__button--${operators[i]}`);
  key.operator = operators[i];
  key.addEventListener("click", processOperator);
}
document
  .querySelector(".calc__button--equals")
  .addEventListener("click", processEquals);
document
  .querySelector(".calc__button--decimal")
  .addEventListener("click", processDecimal);

function toggleTheme() {
  oldTheme = theme;
  theme = (theme % 3) + 1;
  body.classList.replace(`theme-${oldTheme}`, `theme-${theme}`);
  themeSwitchSlider.style.transform = `translateX(${24 * (theme - 1)}px)`;
}

function updateConsole(number, dp = 0) {
  // Print a number to the output screen
  let commaFormatter = Intl.NumberFormat("en", {
    maximumFractionDigits: Math.max(15, dp),
  });
  consoleStr = commaFormatter.format(number);
  calcOutput.innerHTML = `${consoleStr}`;
}

function processNumber() {
  if (!operator) {
    output = null;
    outputDp = 0;
  }
  if (!input && !decimalPlace) {
    input = this.number;
  } else {
    if (decimalPlace) {
      term = this.number / 10 ** decimalPlace;
      input += term;
      decimalPlace += 1;
    } else {
      input = input * 10 + this.number;
    }
  }
  updateConsole(input, decimalPlace - 1);
}

function processOperator() {
  if (output === null) {
    output = input;
  } else if (input !== null) {
    // Number is added to ensure user can't mess with the input. I'm not sure of the best practice way to check this
    output = calculate(output, input, operator);
    updateConsole(output);
  }

  operator = this.operator;
  outputDp = decimalPlace;
  input = null;
  decimalPlace = 0;
}

function processEquals() {
  if (input) {
    if (operator) {
      output = calculate(output, input, operator);
    } else {
      output = input;
    }
    outputDp = decimalPlace;
    updateConsole(output);
  }
  input = null;
  operator = null;
  decimalPlace = 0;
}

function processDecimal() {
  decimalPlace = 1;
}

function reset() {
  input = null;
  output = null;
  operator = null;
  decimalPlace = 0;
  updateConsole(output);
}

function calculate(a, b, op) {
  if (op === "plus") {
    return a + b;
  } else if (op === "minus") {
    return a - b;
  } else if (op === "mul") {
    return a * b;
  } else if (op === "div") {
    return a / b;
  }
}

function processDelete() {
  if (input) {
    input = Number(String(input).slice(0, -1));
    decimalPlace = Math.max(0, decimalPlace - 1);
    updateConsole(input, decimalPlace - 1);
  } else {
    reset();
  }
}
