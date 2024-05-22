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
    displayDiv.innerHTML += text;
    displayValue = displayDiv.innerHTML;
};

function deleteLast(){
    displayDiv.innerHTML = displayDiv.innerHTML.slice(0, -1);
    displayValue = displayDiv.innerHTML;
}

function organizeDisplayInfo(){
    if(displayValue.slice(0, 1) == '-'){ // first number is negative
        let numbers = displayValue.slice(1).split(currentOperator);
        return [currentOperator, (-1 * (+numbers[0])), numbers[1]];
    }

    let numbers = displayValue.split(currentOperator);
    return [currentOperator, numbers[0], numbers[1]];
}

function clearDisplay(insertZero=true){
    insertZero ? displayDiv.innerHTML = "0" : displayDiv.innerHTML = ""
    currentOperator = '';
};

/// GLOBALS ///////
const operatorsList = ["+", "-", "x", "/"];
const buttonsDiv = document.querySelector("#calculatorInput");
const displayDiv = document.querySelector("#calculatorDisplay");
let displayValue = "";
let currentOperator = "";

/// MAIN /////////
buttonsDiv.addEventListener('click', (event) => {
    if(event.target.id === "calculatorInput") return; // prevent processing the parent of buttons

    if(operatorsList.includes(event.target.innerHTML)){
        let numbers, leftNumber, rightNumber;
        numbers = organizeDisplayInfo().slice(1, 3);
        leftNumber = numbers[0];
        rightNumber = numbers[1];
        console.log(numbers)

        if(currentOperator && leftNumber && rightNumber){
            addToDisplay(operate(currentOperator, leftNumber, rightNumber));
        } 
        else if (currentOperator && leftNumber && !rightNumber){
            deleteLast(event.target.innerHTML);
        }
            
        currentOperator = event.target.innerHTML;
    }

    switch(event.target.innerText){
        case "=":
            let numbers, leftNumber, rightNumber;
            numbers = organizeDisplayInfo().slice(1, 3);
            leftNumber = numbers[0];
            rightNumber = numbers[1];
            
            // TODO: make logic 7+8- cases
            // TODO: block div by 0
            // TODO: block insertion of multiple 0s
            if(leftNumber && rightNumber){
                addToDisplay(operate(currentOperator, leftNumber, rightNumber));
            }
            break;
        case "C":
            clearDisplay();
            break;
        default:
            addToDisplay(event.target.innerHTML);
            break;
    };
})