/// FUNCTIONS /////////
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

function operate(operator, firstNumber, secondNumber){
    clearDisplay(false);
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

function addToDisplay(text){
    if (displayValue == 0) displayDiv.innerHTML = "";
    displayDiv.innerHTML += text;
    displayValue = displayDiv.innerHTML;
};

function deleteLast(){
    displayDiv.innerHTML = displayDiv.innerHTML.slice(0, -1);
    displayValue = displayDiv.innerHTML;
}

function organizeDisplayInfo(){
    if(displayValue.slice(0, 1) == '-'){ // first number is negative
        if(displayValue.slice(1) != ''){
            let numbers = displayValue.slice(1).split(currentOperator);
            return [currentOperator, (-1 * (+numbers[0])), numbers[1]];
        }
        return [currentOperator, undefined, undefined]
    }

    let numbers = displayValue.split(currentOperator);
    return [currentOperator, numbers[0], numbers[1]];
}

function clearDisplay(insertZero=true){
    if(insertZero){ // reset display state
        displayDiv.innerHTML = '0';
        displayValue = '0';
    } else { // clears display before add result mostly
        displayDiv.innerHTML = "";
        displayValue = '';
    }
    currentOperator = '';
    isNegative = false;
};

/// GLOBALS ///////
const operatorsList = ["+", "-", "x", "/"];
const buttonsDiv = document.querySelector("#calculatorInput");
const displayDiv = document.querySelector("#calculatorDisplay");
let displayValue = "0";
let currentOperator = "";
let isNegative = false;

/// MAIN /////////
buttonsDiv.addEventListener('click', (event) => {
    if(event.target.id === "calculatorInput") return; // prevent processing the parent of buttons
    if(displayValue == "!DIV" && event.target.innerText !== "C") return;


    if(operatorsList.includes(event.target.innerHTML)){
        let numbers, leftNumber, rightNumber;
        numbers = organizeDisplayInfo().slice(1, 3);
        leftNumber = numbers[0];
        rightNumber = numbers[1];

        if(currentOperator && leftNumber && rightNumber){
            addToDisplay(operate(currentOperator, leftNumber, rightNumber));
        } 
        else if (currentOperator && leftNumber && !rightNumber){
            deleteLast(event.target.innerHTML);
        } else if (event.target.innerHTML == "-" && displayValue == "0"){
            isNegative = true;
        }
        
        if(!isNegative){
            currentOperator = event.target.innerHTML;
        }
        isNegative = false;
    }

    switch(event.target.innerText){
        case "=":
            let numbers, leftNumber, rightNumber;
            numbers = organizeDisplayInfo().slice(1, 3);
            leftNumber = numbers[0];
            rightNumber = numbers[1];
            
            // TODO: can add negative numbers
            // TODO: cannot insert operators first (only -)
            // TODO: block insertion of multiple 0s
            // TODO: keyboard input
            // TODO: decimals
            if(rightNumber == 0){
                clearDisplay(false); 
                addToDisplay("!DIV")
                break;
            }
            if(leftNumber && rightNumber){
                addToDisplay(operate(currentOperator, leftNumber, rightNumber));
            }
            break;
        case "C":
            clearDisplay();
            break;
        default:
            if(operatorsList.includes(event.target.innerText) && displayValue== '-'){
                break;
            } else {
                addToDisplay(event.target.innerHTML);
            }
            break;
    };
})