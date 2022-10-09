theme = 1;

const body = document.querySelector("body");
const themeSwitch = document.querySelector(".switch");
const themeSwitchSlider = document.querySelector(".switch__slider");

themeSwitch.addEventListener("click", toggleTheme);

function toggleTheme() {
  oldTheme = theme;
  theme = (theme % 3) + 1;
  body.classList.replace(`theme-${oldTheme}`, `theme-${theme}`);
  themeSwitchSlider.style.transform = `translateX(${24 * (theme - 1)}px)`;
}
