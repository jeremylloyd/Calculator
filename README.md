# Frontend Mentor - Calculator app solution

This is a solution to the [Calculator app challenge on Frontend Mentor](https://www.frontendmentor.io/challenges/calculator-app-9lteq5N29).

## Overview

### The challenge

Users should be able to:

- See the size of the elements adjust based on their device's screen size
- Perform mathmatical operations like addition, subtraction, multiplication, and division
- Adjust the color theme based on their preference
- **Bonus**: Have their initial theme preference checked using `prefers-color-scheme` and have any additional changes saved in the browser

### Screenshot

![](./design/mobile-design-theme-1.jpg)
![](./design/mobile-design-theme-2.jpg)
![](./design/mobile-design-theme-3.jpg)

### Links

- Solution URL: [Github](https://github.com/jeremylloyd/Calculator)
- Live Site URL: [Github Pages](https://jeremylloyd.github.io/Calculator/)

## My process

### Built with

- HTML
- CSS (BEM)
- Vanilla JS

### What I learned

- CSS Grid
  - Use grid over `flex-wrap` when the structure of the interface is more important than the sizing of the elements
  - In the parent, use `grid-template: repeat(5, 1fr) / repeat(4, 1fr);` to define the size of grids
  - In the child elements, use `grid-area: [row-start] / [col-start] / [row-end] / [col-end]`, `grid-column: [col-start] / [col-end]` or `grid-row: [row-start] / [row-end]`
- Colour themes
  - The BEM convention would require adding a modifier class to every single element, so it's instead easier to use class inheritance [only for this purpose](https://en.bem.info/methodology/css/#nested-selectors). But try to avoid it otherwise
    - Give a "theme-[name]" class to the body
    - Set the primary theme colours to variables in that class's CSS
    - Use those variables in the other HTML elements as you normally would
    - When a new theme is needed, simply adjust the body's class and adjust the primary colours in the new theme
- JS
  - The `Number` object type isn't perfect for storing numbers with many decimal places, and it can't safely store integers larger than `2**53-1`. The `BigInt` type can do large integers well (for cryptography, etc.) but can't store floats and can't be added with other `Number` objects.
  - The following number formatter is pretty good for printing numbers on the screen:
    ```
    let commaFormatter = Intl.NumberFormat("en", {
      maximumFractionDigits: Math.max(15, dp),
    });
    ```
