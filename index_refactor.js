/// FUNCTIONS ------------------
function add(a, b){
    return (+a)+(+b);
};
function subtract(a, b){
    return (+a)-(+b);
};
function multiply(a, b){
    console.log((+a))
    return (+a)*(+b);
};
function divide(a, b){
    return (+a)/(+b);
};

function operate(){
    let operation, leftNumber, rightNumber, total;

    operation = displayValue.split(currentOperator);
    leftNumber = operation[0];
    rightNumber = operation[1];
    console.log(leftNumber, rightNumber, currentOperator)

    switch(currentOperator){
        case "+":
            total = add(leftNumber, rightNumber);
            break;
        case "-":
            total = subtract(leftNumber, rightNumber);
            break;
        case "x":
            total = multiply(leftNumber, rightNumber);
            break;
        case "/":
            total = divide(leftNumber, rightNumber);
            break;
        default:
            total = "probably an error";
    }

    changeDisplay(total);
};

function addNumber(number){
    if(displayValue == '0'){
        changeDisplay(number, append=false);
    } else {
        changeDisplay(number, append=true);
    }
};

function addOperator(operator){
    if(operatorsList.includes(displayValue.slice(-1))){
        changeDisplay(displayValue.slice(0, -1));
    };
    changeDisplay(operator, append=true);
    currentOperator = operator;
};

function addDecimalDot(decimalDot){
    if(displayValue.slice(-1) == '.'){
        changeDisplay(displayValue.slice(0, -1));
    };
    changeDisplay(decimalDot, append=true);
};

function clearLast(){};

function clearAll(){
    changeDisplay('');
};

function resetDisplay(){
    changeDisplay('0');
};

function changeDisplay(newValue, append=false){
    if(append){
        displayValue += newValue + "";
        displayDiv.innerHTML += newValue + "";
    } else {
        displayValue = newValue + "";
        displayDiv.innerHTML = newValue + "";
    }
};


/// GLOBALS ------------------
const operatorsList = ["+", "-", "x", "/"]
    , buttonsDiv = document.querySelector("#calculatorInput")
    , displayDiv = document.querySelector("#calculatorDisplay");

let displayValue = '0',
    currentOperator = '';


/// MAIN ------------------
buttonsDiv.addEventListener('click', (event) => {
    let newInput = event.target.innerText;

    if(event.target.id === "calculatorInput") return; // prevent processing the parent of buttons
    if(displayValue == "!DIV" && newInput !== "C") return; // lock inputing when calculator display !DIV

    switch(event.target.innerText){
        case "=":
            operate();
            break;
        case "C":
            resetDisplay();
            break;
        case "+":
        case "-":
        case "/":
        case "x":
            addOperator(newInput);
            break;
        case ".":
            addDecimalDot(newInput);
            break;
        default:
            addNumber(newInput);
            break;
    };


});