// 1. Get the screen (input box)
const screen = document.getElementById("screen");

// 2. Get all buttons
const buttons = document.querySelectorAll("button");

let justCalculated = false;
let value;

// 3. Add a click event to each button
buttons.forEach((button) => {
  button.addEventListener("click", () => {
    value = button.textContent; // The text on the button (e.g. "7", "+", "=")

    function handleDecimal() {
      if (value == "." && screen.value == "") {
        value = "0.";
      }
      else if (value === ".") {
        let expressionParts = screen.value.split(/[+\-*/]/);
        let currentNum = expressionParts[expressionParts.length - 1];
        if (currentNum.includes(".")) {
          value = "";
        }
        else {
          value = ".";
        }
      }
      return;
    }

    if (justCalculated === true) {
      if (!isNaN(value) || value === ".") {
        screen.value = "";
        handleDecimal();
        justCalculated = false;
        screen.value += value;
      } else if (value === "C") {
        screen.value = "";
        justCalculated = false;
      } else {
        handleDecimal();
        screen.value += value;
        justCalculated = false;
      }
    } else {
      // 4. Handle the clear button
      if (value === "C") {
        screen.value = "";
        justCalculated = false;
      }
      // 5. Handle the equal button
      else if (value === "=") {
        try {
          screen.value = screen.value.replaceAll("÷", "/").replaceAll("×", "*");
          screen.value = eval(screen.value); // Evaluate math expression
          justCalculated = true;
        } catch {
          screen.value = "Error";
        }
      }
      // 6. Otherwise, add the button's text to the screen
      else {
        handleDecimal();
        screen.value += value;
      }
    }
  });
});
