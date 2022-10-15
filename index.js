theme = 1;
input = null;
output = null;
const operators = ["div", "plus", "minus", "mul"];
operator = null;

const body = document.querySelector("body");
const themeSwitch = document.querySelector(".switch");
const themeSwitchSlider = document.querySelector(".switch__slider");
const calcOutput = document.querySelector(".calc__output");

const commaFormatter = Intl.NumberFormat("en");
const scientificFormatter = Intl.NumberFormat("en", { notation: "scientific" });

updateConsole(output);

themeSwitch.addEventListener("click", toggleTheme);
document.querySelector(".calc__button--reset");
document.querySelector(".calc__button--del");
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

function toggleTheme() {
  oldTheme = theme;
  theme = (theme % 3) + 1;
  body.classList.replace(`theme-${oldTheme}`, `theme-${theme}`);
  themeSwitchSlider.style.transform = `translateX(${24 * (theme - 1)}px)`;
}

function updateConsole(number) {
  // Print a number to the output screen
  consoleStr = commaFormatter.format(number);
  calcOutput.innerHTML = `${consoleStr}`;
}

function processNumber() {
  if (!operator) {
    output = null;
  }
  if (!input) {
    input = this.number;
  } else {
    input = Number(String(input) + String(this.number));
  }
  updateConsole(input);
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
  input = null;
}

function processEquals() {
  if (input) {
    if (operator) {
      output = calculate(output, input, operator);
    } else {
      output = input;
    }
    updateConsole(output);
  }
  input = null;
  operator = null;
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
