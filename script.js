const clearHistory = document.getElementById("clearHistory");
clearHistory.addEventListener("click", () => {
  history.innerHTML = "";
});
const themeToggle = document.getElementById("themeToggle");
themeToggle.addEventListener("click", () => {
  document.body.classList.toggle("light-mode");
  if (document.body.classList.contains("light-mode")) {
    themeToggle.textContent = "🌙 Dark Mode";
  } else {
    themeToggle.textContent = "☀️ Light Mode";
  }
});
const history = document.getElementById("history");
const display = document.getElementById("display");
const buttons = document.querySelectorAll("button");
buttons.forEach(button => {
  button.addEventListener("click", () => {
    handleInput(button.textContent);
  });
});
document.addEventListener("keydown", (event) => {
  let key = event.key;
  if (key === "Enter") key = "=";
  if (key === "Backspace") key = "DEL";
  if (key === "Escape") key = "AC";
  handleInput(key);
});
function handleInput(value) {
  // Clear
  if (value === "AC") {
    display.value = "";
    return;
  }
  // Delete
  if (value === "DEL") {
    display.value = display.value.slice(0, -1);
    return;
  }
  // Plus / Minus
  if (value === "+/-") {
    if (display.value === "" || display.value === "Error") {
      return;
    }
    const number = Number(display.value);
    if (!Number.isNaN(number)) {
      display.value = number * -1;
    }
    return;
  }
  // Percentage
  if (value === "%") {
    if (display.value === "" || display.value === "Error") {
      return;
    }
    try {
      const result = eval(display.value) / 100;
      display.value = result;
    } catch {
      display.value = "Error";
    }
    return;
  }
  // Equal
  if (value === "=") {
    if (display.value === "" || display.value === "Error") {
      return;
    }
    try {
      const result = eval(display.value);
      if (!Number.isFinite(result)) {
        display.value = "Error";
      } else {
        history.innerHTML += `
                    <div class="history-item">
                        ${display.value} = ${result}
                    </div>
                `;
        display.value = result;
      }
    } catch {
      display.value = "Error";
    }
    return;
  }
  // Numbers and operators
  if (/^[0-9+\-*/.]$/.test(value)) {
    display.value += value;
  }
}