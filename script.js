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
    let roundedValue = newDisplayValue.toString();
    if (roundedValue.length > 8) {
        roundedValue = roundedValue.slice(0, 8);
    }
    display.textContent = roundedValue;
}

function appendDisplayValue(charToAppend) {
    let display = document.querySelector('.display');
    if (display.textContent === '0') {
        display.textContent = charToAppend;
    }
    else {
        display.textContent += charToAppend;
    }
}

function evaluateDisplay() {
    let expression = getDisplayValue().split("");
    expression.pop(); // remove equals sign
    console.log(expression);
    let result = evaluateDisplay(expression);
    setDisplayValue(result);
}

function evaluateExpression(expression) { // expression is an array type
    stack = []; 
    operations = ['+', '-', '*', '/'];
    while (!operations.includes(expression.slice(-1))) { // while top of expression is a number, keep adding to stack
        stack.push(expression.pop());
    }
    if (expression === '') { // no operator in expression
        let result = '';
        for(let i = 0; i < stack.length; i++) {
            result += stack.pop();
        }
        return parseFloat(result); 
    }
    else { // operator in expression
        operator = expression.pop();
        let firstArgument = '';
        for (let i = 0; i < firstArgument.length; i++) {
            firstArgument += stack.pop();
        }
        firstArgument = parseFloat(firstArgument); // convert first argument to a float from stack
        secondArgument = evaluateDisplay(expression); // evaluate the rest of the expression
        return operate(firstArgument, operator, secondArgument);
    }
}

// function evaluateDisplayOld() { // happens when you hit equals
//     let expression = getDisplayValue().split("");
//     console.log(expression);

//     let a = ''; let b = ''; // containers for first and second values
//     let i = 0; // iterator through string
//     ops = ['+', '-', '*', '/', '='];

//     // get first value
//     while (!ops.includes(expression[i])) { // keep reading string until we hit an operator
//         a += expression[i];
//         i++;
//         // if(i > 10**3) {
//         //     console.log('broke a');
//         //     break;
//         // }
//     }

//     // get operator
//     op = expression[i]; i++; 

//     // get second value
//     while (!ops.includes(expression[i])) { // keep reading string until we hit an operator
//         b += expression[i];
//         i++;
//         if(i == expression.length) {
//             break;
//         }
//     }
//     a = parseFloat(a); b = parseFloat(b);

//     let result = operate(a, op, b);
//     setDisplayValue(result);
// }

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