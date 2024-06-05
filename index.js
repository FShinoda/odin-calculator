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

function fixDecimalPlaces(total){
    if(total % 10 != 0){
        return parseFloat(total.toFixed(2));
    } else { 
        return total;
    }
};

function verifyOperationStructure(leftNumber, rightNumber){
    if(leftNumber && rightNumber && currentOperator){
        return true;
    } 

    return false;
}

function operate(){
    let operation, leftNumber, rightNumber, total;

    operation = displayValue.split(currentOperator);
    leftNumber = operation[0];
    rightNumber = operation[1];

    if (verifyOperationStructure(leftNumber, rightNumber)){
        switch(currentOperator){
            case "+":
                total = fixDecimalPlaces(add(leftNumber, rightNumber));
                break;
            case "-":
                total = fixDecimalPlaces(subtract(leftNumber, rightNumber));
                break;
            case "x":
                total = fixDecimalPlaces(multiply(leftNumber, rightNumber));
                break;
            case "/":
                if(rightNumber == 0){
                    total = "!DIV";
                    break;
                };
                total = fixDecimalPlaces(divide(leftNumber, rightNumber));
                break;
            default:
                total = "probably an error";
        }
    
        changeDisplay(total);
        currentOperator = '';
        rightNumber = '';
        leftNumber = '';
    }
};

function addNumber(number){
    if(displayValue == '0'){
        changeDisplay(number, append=false);
    } else {
        changeDisplay(number, append=true);
    }
};

function addOperator(operator){
    if(operatorsList.includes(displayValue.slice(-1)) || displayValue.slice(-1) == '.'){
        changeDisplay(displayValue.slice(0, -1));
    } else if(currentOperator){ // && validoperation
        operate();
    };
    changeDisplay(operator, append=true);
    currentOperator = operator;
};

function verifyDotExistence(){
    if(currentOperator){ 
        return displayValue.split(currentOperator)[1].includes('.')
    } else {
        return displayValue.includes('.')
    }
}

function addDecimalDot(decimalDot){
    if(!verifyDotExistence()){ // dot not exist
        if(displayValue.slice(-1) == '.'){
            changeDisplay(displayValue.slice(0, -1));
        } else if (operatorsList.includes(displayValue.slice(-1))){
            changeDisplay('0', append=true);
        };
        
        changeDisplay(decimalDot, append=true);
    }
};

function clearLast(){
    changeDisplay(displayValue.slice(0, -1));
};

function clearAll(){
    changeDisplay('');
};

function resetDisplay(){
    changeDisplay('0');
    currentOperator = '';
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

let displayValue = '0'
    , currentOperator = '';


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