/// FUNCTIONS ------------------
function add(a, b){
    return (+a)+(+b);
};
function subtract(a, b){
    return (+a)-(+b);
};
function multiply(a, b){
    return (+a)*(+b);
};
function divide(a, b){
    return (+a)/(+b);
};

function operate(){};

function addNumber(){};

function addOperator(){};

function addDecimalDot(){};

function clearLast(){};

function clearAll(){};


/// GLOBALS ------------------
const operatorsList = ["+", "-", "x", "/"]
    , buttonsDiv = document.querySelector("#calculatorInput")
    , displayDiv = document.querySelector("#calculatorDisplay");

let displayValue = 0,
    currentOperator = '';


/// MAIN ------------------
buttonsDiv.addEventListener('click', (event) => {
    if(event.target.id === "calculatorInput") return; // prevent processing the parent of buttons
    if(displayValue == "!DIV" && event.target.innerText !== "C") return; // lock inputing when calculator display !DIV

    switch(event.target.innerText){
        case "=":
            operate();
            break;
        case "C":
            clearAll();
            break;
        case "+":
        case "-":
        case "/":
        case "x":
            addOperator();
            break;
        case ".":
            addDecimalDot();
            break;
        default:
            addNumber();
            break;
    };


});