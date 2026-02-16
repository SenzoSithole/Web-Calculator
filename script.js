// 1. Get the screen (input box)
const screen = document.getElementById("screen");

// 2. Get all buttons
const buttons = document.querySelectorAll("button");

let justCalculated = false;
let value;

// Handle decimal logic and some if not all edge cases (e.g ".3" = "0.3")
function handleDecimal(value, screenValue) {
  // If not a decimal, return as-is
  if (value !== ".") return value;

  // If screen is empty → start number
  if (screenValue === "") return "0.";

  const lastChar = screenValue.slice(-1);
  const operators = "+-÷×";

  // If last char is an operator → start new number
  if (operators.includes(lastChar)) return "0.";

  // Split by operators to get current number
  const parts = screenValue.split(/[+\-÷×]/);
  const currentNum = parts[parts.length - 1];

  // If current number already has a decimal → block
  if (currentNum.includes(".")) return null;

  // Otherwise, allow decimal
  return ".";
}

function handleDelete() {
  // If the screen is empty, do nothing
  if (screen.value === "") return;

  // If a calculation has just been completed, delete clears everything
  if (justCalculated) {
    // Works if justCalculated = true
    screen.value = ""; // Need to change to erase last text input from last calculated expression
    justCalculated = false;
    return;
  }

  // If it's not the first two cases it means there's an expression being typed, this erases the last text input in the expression
  screen.value = screen.value.slice(0, -1);
}

function handleClear() {
  screen.value = ""; // Whatever is on the screen, erase it
  justCalculated = false;
}

function handleDelete() {
  if (screen.value === "") return;

  if (justCalculated) { // Clear the answer ifit has just been calculated
    screen.value = "";
    justCalculated = false;
    return;
  }

  screen.value = screen.value.slice(0, -1); // Remove last entered input in the current working expression
}

function handleEquals() {
  if (justCalculated) return;

  try {
    justCalculated = true;
    screen.value = screen.value.replaceAll("÷", "/").replaceAll("×", "*");

    screen.value = eval(screen.value);
  } catch {
    screen.value = "Error";
  }
}

function handleNumber(value) {
  if (justCalculated) {
    screen.value = "";
    justCalculated = false;
  }
  screen.value += value;
}

function handleDecimalInput() {
  if (justCalculated) {
    screen.value = "";
    justCalculated = false;
  }

  const result = handleDecimal(".", screen.value);
  if (result === null) return;

  screen.value += result;
}

function handleOperator(value) {
  if (screen.value === "" && value !== "-") return;
  justCalculated = false;
  screen.value += value;
}

function dispatchInput(value) {
  if (value === "C") return handleClear();
  if (value === "DEL") return handleDelete();
  if (value === "=") return handleEquals();
  if (value === ".") return handleDecimalInput();
  if (!isNaN(value)) return handleNumber(value);
  return handleOperator(value);
}


// 3. Add a click event to each button
buttons.forEach(button => {
  button.addEventListener("click", () => {
    dispatchInput(button.textContent);
  });
});



// --------------------------STILL REFACTORING SO I WILL NOT BE REMOVING THE BELOW CODE SOON-------------------



    //   value = button.textContent; // The text on the button (e.g. "7", "+", "=")

    //   if (justCalculated === true) {
    //     // Avoid entering the equal sign ("=") as text into the screen after calculation
    //     if (value === "=") return;
    //     // This is to check if the expression should continue or start a new one
    //     // If the input is an operator or decimal, continue expression
    //     // Else, start a new expression if the next input is a number
    //     if (!isNaN(value) || value === ".") {
    //       justCalculated = false;
    //       screen.value = ""; //Clear screen first if input is a number
    //       const result = handleDecimal(value, screen.value);
    //       if (result === null) return;
    //       screen.value += result;
    //     } else if (value === "C") {
    //       justCalculated = false;
    //       screen.value = "";
    //     } else if (value === "DEL") {
    //       handleDelete();
    //     } else {
    //       const result = handleDecimal(value, screen.value);
    //       justCalculated = false;
    //       if (result === null) return;
    //       screen.value += result;
    //     }
    //   } else {
    //     // 4. Handle the clear button
    //     if (value === "C") {
    //       justCalculated = false;
    //       screen.value = "";
    //     }
    //     // 4.5 Handle the delete button
    //     else if (value === "DEL") {
    //       handleDelete();
    //     }

    //     // 5. Handle the equal button
    //     else if (value === "=") {
    //       try {
    //         justCalculated = true;
    //         screen.value = screen.value
    //           .replaceAll("÷", "/")
    //           .replaceAll("×", "*");
    //         screen.value = eval(screen.value); // Evaluate math expression
    //       } catch {
    //         screen.value = "Error";
    //       }
    //     }
    //     // 6. Otherwise, add the button's text to the screen
    //     else {
    //       const result = handleDecimal(value, screen.value);
    //       if (result === null) return;
    //       screen.value += result;
    //     }
    //   }

//Next is fixing the multiple operator entry bug
