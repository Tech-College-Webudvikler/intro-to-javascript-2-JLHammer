// main.js
const input = document.getElementById("userInputValue");
const select1 = document.getElementById("userSelectValue1");
const select2 = document.getElementById("userSelectValue2");
const response = document.getElementById("userResponse");
const swapBtn = document.getElementById("swapBtn");

// Prevent selecting the same currency in both selects
function disableDuplicate() {
  const val1 = select1.value;
  const val2 = select2.value;

  // Enable all options first
  [...select1.options].forEach((opt) => (opt.disabled = false));
  [...select2.options].forEach((opt) => (opt.disabled = false));

  // Disable the opposite selected value
  const option1 = [...select1.options].find((opt) => opt.value === val2);
  if (option1) option1.disabled = true;

  const option2 = [...select2.options].find((opt) => opt.value === val1);
  if (option2) option2.disabled = true;
}

// Perform conversion safely
function calculate() {
  const amount = parseFloat(input.value);
  if (isNaN(amount)) {
    response.textContent = "Indtast et gyldigt beløb";
    return;
  }

  const [rate1Str, cur1] = select1.value.split(" ");
  const [rate2Str, cur2] = select2.value.split(" ");

  const rate1 = parseFloat(rate1Str);
  const rate2 = parseFloat(rate2Str);

  if (isNaN(rate1) || isNaN(rate2) || rate2 === 0) {
    response.textContent = "Kan ikke beregne valuta";
    return;
  }

  const inDKK = amount * rate1;
  const converted = inDKK / rate2;

  response.textContent = `${amount} ${cur1} = ${converted.toFixed(2)} ${cur2}`;
}

// Swap currencies safely
function swapCurrencies() {
  // Store currently selected values
  const val1 = select1.value;
  const val2 = select2.value;

  // Enable all options temporarily so assignment works
  [...select1.options].forEach((opt) => (opt.disabled = false));
  [...select2.options].forEach((opt) => (opt.disabled = false));

  // Swap values
  select1.value = val2;
  select2.value = val1;

  // Now disable duplicate options
  disableDuplicate();

  // Recalculate
  calculate();
}

// Event listeners
input.addEventListener("input", calculate);
select1.addEventListener("change", () => {
  disableDuplicate();
  calculate();
});
select2.addEventListener("change", () => {
  disableDuplicate();
  calculate();
});
swapBtn.addEventListener("click", swapCurrencies);

// Init disables and calculation on page load
disableDuplicate();
calculate();
