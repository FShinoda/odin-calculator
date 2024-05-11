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
            return "cago"
    }
};

/// MAIN /////////
let firstNumber = 10
    , secondNumber = 2
    , operator = '/';

console.log(operate(operator, firstNumber, secondNumber));