/***********/
/* METHODS */
/***********/
// simple calculator operations
function add(a, b) {
    return a+b;
}

function subtract(a, b) {
    return a-b;
}

function multiply(a, b) {
    return a*b;
}

function divide(a, b) {
    return a/b;
}

// calculator operate function
function operate(a, op, b) {
    switch(op) {
        case '+':
            return add(a, b);
        case '-':
            return subtract(a, b);
        case '*':
            return multiply(a, b);
        case '/':
            return divide(a, b);
        default: 
            return 'ERROR';
    }
}

// Display methods
function getDisplayValue() {
    let display = document.querySelector('.display');
    return display.textContent;
}

function setDisplayValue(newDisplayValue) {
    let display = document.querySelector('.display');
    display.textContent = newDisplayValue;
}

function appendDisplayValue(charToAppend) {
    let display = document.querySelector('.display');
    display.textContent += charToAppend;
}

function evaluateDisplay() { // happens when you hit equals
    let expression = getDisplayValue().split("");
    if (expression.slice(-1) === '=') {
        expression.pop(); // get rid of equals sign
    }
    // get first value
    let a = 0; let b = 0; // containers for first and second values
    placeValue = 0;
    while ( /^[0-9]/.test(expression.slice(-1)) ) { // while the last character of expression is a number, 
        let digit = parseInt(expression.pop());
        b += (digit * 10**placeValue);
        placeValue++;
    }
    // get operation
    placeValue = 0;
    op = expression.pop();
    // get second value
    while ( /^[0-9]/.test(expression.slice(-1)) ) { // while the last character of expression is a number, 
        let digit = parseInt(expression.pop());
        a += (digit * 10**placeValue);
        placeValue++;
    }
    let result = operate(a, op, b);
    setDisplayValue(result);
}

/***********/
/*   DOM   */
/***********/
let numberContainer = document.querySelector('.numbers');

for (let i = 0; i < 10; i++) {
    let btn = document.createElement('button');
    btn.classList.add(`btn-${i}`);
    btn.textContent = i;
    btn.addEventListener('click', () => appendDisplayValue(i));
    numberContainer.appendChild(btn);
}

let operationContainer = document.querySelector('.operations');

operations = ['+', '-', '*', '/', '=', 'AC'];
operationsClass = ['add', 'subtract', 'multiply', 'divide', 'equals', 'clear'];

for (let i = 0; i < operations.length; i++) {
    let btn = document.createElement('button');
    btn.classList.add(operationsClass[i]);
    btn.textContent = operations[i];
    btn.addEventListener('click', () => appendDisplayValue(operations[i]));
    operationContainer.appendChild(btn);
}

let clearBtn = document.querySelector('.clear');
clearBtn.addEventListener('click', () => setDisplayValue('0'));

let equalsBtn = document.querySelector('.equals');
equalsBtn.addEventListener('click', () => evaluateDisplay());