let firstNumber = 0;
let secondNumber = 0;
let operator = "";
let firstNumberDecimal = false;
let secondNumberDecimal = false;

function operate(a, b, operator) {
  switch (operator) {
    case "+":
      return a + b;
    case "-":
      return a - b;
    case "*":
      return a * b;
    case "/":
      return a / b;
  }
}

let count = false; //set states for inputs false for first state: get num and then get opreator second for second number
//DOM manipulate
const display = document.querySelector(".display");
const symbols = document.querySelector(".symbols");
symbols.addEventListener("click", function (event) {
  let target = event.target;
  if (
    target.getAttribute("class") == "number" ||
    target.getAttribute("class") == "number operator"
  ) {
    let displayValue = target.innerText; //get the symbol clicked
    if (target.getAttribute("id") == "Backspace") {
      let num = display.innerText;
      num = num.toString(); //convert to string so it can be sliced
      num = num.slice(0, num.length - 1); //remove the last one
      if (count == false) {
        firstNumber = num;
        display.innerText = firstNumber; //display the converted number
        return;
      } else {
        secondNumber = num;
        display.innerText = secondNumber;
        return;
      }
    }
    if (displayValue == "AC") {
      //if AC reset all
      display.innerText = "";
      count = false;
      firstNumber = secondNumber = 0;
      operator = "";
      firstNumberDecimal = secondNumberDecimal = false;
      return;
    }
    //when clicked equal
    if (displayValue == "=") {
      let result = operate(
        parseFloat(firstNumber),
        parseFloat(secondNumber),
        operator
      );
      secondNumber = 0; //reset the second number so that the next operation can be done immediately
      display.innerText = parseFloat(result.toFixed(4));
      count = false; //start to ask for operator
      firstNumber = result; //put the first number
      secondNumberDecimal = false; //reset the decimals of second number but not of first
      return;
    }
    //condition for decimal
    if (displayValue == ".") {
      if (count == false && !firstNumberDecimal) {
        firstNumber = firstNumber + "."; //appends a decimal and convertes to string
        firstNumberDecimal = true;
        display.innerText = firstNumber;
        return;
      } else if (count == true && !secondNumberDecimal) {
        secondNumber = secondNumber + ".";
        secondNumberDecimal = true;
        display.innerText = secondNumber;
        return;
      } else return;
    }
    if (count == false) {
      if (!isNaN(displayValue)) {
        if (firstNumberDecimal) {
          //if decimal then string so parsefloat and get the string to number format
          firstNumber = firstNumber + displayValue;
        } else {
          firstNumber = firstNumber * 10 + +displayValue;
        }
        display.innerText = firstNumber;
      } else {
        //get the operator
        operator = displayValue;
        display.innerText = displayValue;
        count = true;
        return;
      }
    }
    if (count == true) {
      if (!isNaN(displayValue)) {
        if (secondNumberDecimal) {
          secondNumber = secondNumber + displayValue;
        } else secondNumber = secondNumber * 10 + +displayValue;
        display.innerText = secondNumber;
      }
    }
  }
});
const body = document.querySelector("body");
body.addEventListener("keydown", function (event) {
  let key = event.key;
  let ele = document.getElementById(key);

  ele.click();
});

//styling on press
symbols.addEventListener("mousedown", function (event) {
  event.target.style.cssText =
    "border-color:rgb(127, 116, 124); font-size:30px; box-shadow:0px 0px;";
});
symbols.addEventListener("mouseup", function (event) {
  event.target.style.cssText = "border-color:black;";
});
