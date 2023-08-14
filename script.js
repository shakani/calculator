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
function operate(b, op, a) {
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
    let roundedValue = newDisplayValue.toString();
    if (roundedValue.length > 8) {
        roundedValue = roundedValue.slice(0, 8);
    }
    display.textContent = roundedValue;
}

function appendDisplayValue(charToAppend) {
    ops = ['+', '-', '*', '/'];
    let display = document.querySelector('.display');

    if (display.textContent === '0' && /^[0-9]/.test(charToAppend)) {
        display.textContent = charToAppend;
    }
    else if (ops.includes( display.textContent.slice(-1)[0] ) && ops.includes(charToAppend)) { // overwrite operators if needed
        display.textContent = display.textContent.slice(0, -1) + charToAppend;
    }
    else {
        display.textContent += charToAppend;
    }
}

function evaluateDisplay() {
    let expression = getDisplayValue().split("");
    expression.pop(); // remove equals sign
    let result = evaluateExpression(expression);
    setDisplayValue(result);
}

function evaluateExpression(expression) { // expression is an array type
    stack = []; 
    operations = ['+', '-', '*', '/'];
    if (expression === []) { // empty expression
        return 0;
    }
    else {
        while (expression.length > 0 && !operations.includes(expression.slice(-1)[0])) { 
            stack.push(expression.pop()); // populate stack with expression until we hit an operator or clear expression
        }
        if (expression.length == 0) { // no operator; clear stack
            let result = '';
            while (stack.length > 0) {
                result += stack.pop();
            }
            return parseFloat(result); 
        }
        else { // we have another expression to evaluate!
            // evaluate the number in the stack and store in secondArgument
            let secondArgument = ''; 
            for(let i = 0; i < stack.length; i++) {
                secondArgument += stack.pop();
            }
            secondArgument = parseFloat(secondArgument); 
            op = expression.pop();
            let result = operate(secondArgument, op, evaluateExpression(expression));
            return result;
        }
    }
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