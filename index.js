theme = 1;
input = 0;
output = 325903000;
const operators = ["div", "decimal", "plus", "minus", "mul"];
operator = null;

const body = document.querySelector("body");
const themeSwitch = document.querySelector(".switch");
const themeSwitchSlider = document.querySelector(".switch__slider");
const calcOutput = document.querySelector(".calc__output");

const commaFormatter = Intl.NumberFormat("en");
const scientificFormatter = Intl.NumberFormat("en", { notation: "scientific" });

themeSwitch.addEventListener("click", toggleTheme);
document.querySelector(".calc__button--reset").addEventListener("click", reset);
document
  .querySelector(".calc__button--del")
  .addEventListener("click", deleteNumber);
for (i = 0; i < 10; i++) {
  key = document.querySelector(`.calc__button--${i}`);
  key.addEventListener("click", addNumberToInput);
}
for (i = 0; i < operators.length; i++) {
  key = document.querySelector(`.calc__button--${operators[i]}`);
  key.operator = operators[i];
  key.addEventListener("click", updateOperator);
}

function toggleTheme() {
  oldTheme = theme;
  theme = (theme % 3) + 1;
  body.classList.replace(`theme-${oldTheme}`, `theme-${theme}`);
  themeSwitchSlider.style.transform = `translateX(${24 * (theme - 1)}px)`;
}

function updateOperator() {
  operator = this.operator;
}

function deleteNumber() {
  if (input !== 0) {
    removeNumberFromInput();
  } else {
    reset();
  }
}

function reset() {
  input = 0;
  output = 0;
  updateConsole(output);
}

function addNumberToInput() {
  number = Number(this.innerHTML);
  if (input === 0) {
    input = number;
  } else {
    input = Number(String(input) + String(number));
  }
  updateConsole(input);
}

function removeNumberFromInput() {
  input = Number(String(input).slice(0, -1));
  updateConsole(input);
}

function updateConsole(number) {
  // Print a number to the output screen
  consoleStr = commaFormatter.format(number);
  calcOutput.innerHTML = `${consoleStr}`;
}
