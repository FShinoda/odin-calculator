/// FUNCTIONS /////////
function add(a, b){
    return a+b;
};

function subtract(a, b){
    return a-b;
};

function multiply(a, b){
    return a*b;
};

function divide(a, b){
    return a/b;
};

function operate(operator, firstNumber, secondNumber){
    switch(operator){
        case "+":
            return add(firstNumber, secondNumber);
        case "-":
            return subtract(firstNumber, secondNumber);
        case "*":
        case "x":
            return multiply(firstNumber, secondNumber);
        case "/":
            return divide(firstNumber, secondNumber);
        default:
            return "probably an error";
    }
};

function addToDisplay(eventTarget){
    displayDiv.innerHTML += eventTarget.innerHTML;
    displayValue = displayDiv.innerHTML;
}



/// GLOBALS ///////
const operatorsList = ["+", "-", "x", "/"];
const buttonsDiv = document.querySelector("#calculatorInput");
const displayDiv = document.querySelector("#calculatorDisplay");
const displayValue = "";

/// MAIN /////////
buttonsDiv.addEventListener('click', (event) => {
    if(event.target.id === "calculatorInput") return; // prevent processing the parent of buttons

    switch(event.target.innerText){
        case "=":
            operate();
            break;
        case "C":
            clearDisplay();
            break;
        default:
            addToDisplay(event.target);
            break;
    };
})