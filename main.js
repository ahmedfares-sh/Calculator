//selecting buttons to colllect data
const numbers = document.querySelectorAll(".number");
const operations = document.querySelectorAll(".calcolation");
const deletebtn = document.getElementById("del");
const equals = document.getElementById("equals");
const clearbtn = document.getElementById("clear");

//declaring to output variables
const preScreen = document.getElementById("prev");
const currScreen = document.getElementById("result");

//declaring variables to store input
let prevNumber = "";
let currNumber = "";
let operation;
//it will be triggered win an operation is chosen
let opStatus = false;

// declaring the functions we need

//to collect numbers
function appendNumber(num) {
  if (!opStatus) {
    if (num === "." && prevNumber.includes(".")) return;
    prevNumber += num;
  } else {
    if (num === "." && currNumber.includes(".")) return;
    currNumber += num;
  }
  displayOnScreeen();
}

//to display on screens
function displayOnScreeen() {
  if (!opStatus) {
    currScreen.innerText = prevNumber;
  } else {
    currScreen.innerText = currNumber;
    preScreen.innerText = prevNumber + " " + operation;
  }
}

//to choose operation
function chooseOperation(op) {
  operation = op;
}

//to compute prev and curr then pass it to result screen
function compute(first, second) {
  let result;
  first = parseFloat(first) || 0;
  second = parseFloat(second) || 0;
  switch (operation) {
    case "+":
      result = first + second;
      break;
    case "-":
      result = first - second;
      break;
    case "*":
      first = parseFloat(first) || 1;
      second = parseFloat(second) || 1;
      result = first * second;
      break;
    case "÷":
      result = first / second;
      first = parseFloat(first) || 1;
      second = parseFloat(second) || 1;
      break;
  }
  return result;
}

//applying foreach on numbers so we are able to addEvent listeners

function clear() {
  prevNumber = "";
  currNumber = "";
  operation = undefined;
  opStatus = false;
  preScreen.textContent = "";
  currScreen.textContent = "";
}

//delete last number

function deleteNum() {
  if (opStatus) {
    currNumber = currNumber.slice(0, -1) || 0;
  } else {
    prevNumber = prevNumber.slice(0, -1) || 0;
  }
  currScreen.innerText.slice(0, -1);
}

//LOOP OVER ALL THE FUNCTIONS + ADD EVENT LISTENERS SO THAT YOU CAN collect data and aplly operations
numbers.forEach((btn) => {
  btn.addEventListener("click", () => {
    appendNumber(btn.textContent);
  });
});

operations.forEach((btn) => {
  btn.addEventListener("click", () => {
    if (opStatus) {
      prevNumber = compute(prevNumber, currNumber);
      currNumber = "" || 0;
      displayOnScreeen();
    }

    opStatus = true;
    chooseOperation(btn.innerText);
    displayOnScreeen();
  });
});

equals.addEventListener("click", () => {
  if (prevNumber !== "" || currNumber !== "") {
    let result = compute(prevNumber, currNumber);
    preScreen.innerText = prevNumber + " " + operation + " " + currNumber;
    currScreen.innerText = result;
  }
});

deletebtn.addEventListener("click", () => {
  deleteNum(currScreen.innerText);
});

clearbtn.addEventListener("click", clear);
