let savedValue = "";

let input = document.getElementById("userInputValue");
let select = document.getElementById("userSelectValue");
let response = document.getElementById("userResponse");

console.log("Input element:", input);
console.log("Select element:", select);
console.log("Response element:", response);

function userInput(event) {
  console.log("Event:", event);
  savedValue = event.target.value;
  console.log("Saved:", savedValue);
}

function selectCurrency(event) {
  console.log("Event:", event);
  let selectedCurrency = event.target.value;
  console.log("Saved:", selectedCurrency);
  const [rate, currency] = selectedCurrency.split(" ");
  savedValue *= rate;
  console.log("Calculated value:", savedValue, currency);
}

input.addEventListener("change", userInput);
select.addEventListener("change", selectCurrency);
