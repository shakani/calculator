/***********/
/* METHODS */
/***********/
// simple calculator operations
function add(firstArgument, secondArgument) {
    return firstArgument+secondArgument;
}

function subtract(firstArgument, secondArgument) {
    return firstArgument-secondArgument;
}

function multiply(firstArgument, secondArgument) {
    return firstArgument*secondArgument;
}

function divide(firstArgument, secondArgument) {
    return firstArgument/secondArgument;
}

// calculator operate function
function operate(firstArgument, op, secondArgument) {
    switch(op) {
        case '+':
            return add(firstArgument, secondArgument);
        case '-':
            return subtract(firstArgument, secondArgument);
        case '*':
            return multiply(firstArgument, secondArgument);
        case '/':
            return divide(firstArgument, secondArgument);
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

    if (display.textContent.length > 8) {
        return;
    }

    let hasOperatorAlready = false;
    if (ops.includes(charToAppend)) { // if we're placing an operator, check if there's already one
        for(let i = 1; i < display.textContent.length; i++) { // start from 1 to exclude negative sign on numbers
            if (ops.includes(display.textContent[i])) {
                hasOperatorAlready = true;
                break;
            }
        }
        if(hasOperatorAlready) { evaluateDisplay(); }
    }

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
    // filter out undefined
    expression = expression.filter((c) => !/^[a-zA-z]/.test(c));
    if (expression.slice(-1)[0] === '=') {
        expression.pop(); // remove equals sign
    }
    let result = evaluateExpression(expression);
    setDisplayValue(result);
}

// only need to handle binary operator expressions
// how to handle negative numbers?
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
        if (expression.slice(-1)[0] === '-') { // we hit a minus sign; check if there's a number before me in the expression
            // check if this is a negative sign
            // negative sign on second argument occurs if there's an operator before the '-' sign
            lastTwoChars = expression.slice(-2);
            // lastTwoChars could be length 1 (if at beginning of expression) or length 2
            // if it's length 1, then its first element is an operator ('-')  and we add this to the stack
            // otherwise it's length 2; it's a negative sign if we have an operator preceding it as the first element of lastTwoChars
            // we also push the negative sign to stack in this case
            if (operations.includes(lastTwoChars[0])) {
                stack.push(expression.pop());
            }
        }

        // stack now contains second argument in reverse order (with a negative sign if needed)

        op = expression.pop();
        // take the operator
        let firstArgument = ''; let secondArgument = ''; 
        firstArgument = expression.join(''); // first argument is taken from the expression
        while (stack.length > 0) {
            secondArgument += stack.pop();
        }
        firstArgument = parseFloat(firstArgument);
        secondArgument = parseFloat(secondArgument);
        let result = (op) ? operate(firstArgument, op, secondArgument) : secondArgument;
        return result;
    }
}

/***********/
/*   DOM   */
/***********/
// let numberContainer = document.querySelector('.numbers');

// for (let i = 0; i < 10; i++) {
//     let btn = document.createElement('button');
//     btn.classList.add(`btn-${i}`);
//     btn.textContent = i;
//     btn.addEventListener('click', () => appendDisplayValue(i));
//     numberContainer.appendChild(btn);
// }

// let operationContainer = document.querySelector('.operations');

// operations = ['+', '-', '*', '/', '=', 'AC'];
// operationsClass = ['add', 'subtract', 'multiply', 'divide', 'equals', 'clear'];

// for (let i = 0; i < operations.length; i++) {
//     let btn = document.createElement('button');
//     btn.classList.add(operationsClass[i]);
//     btn.textContent = operations[i];
//     btn.addEventListener('click', () => appendDisplayValue(operations[i]));
//     operationContainer.appendChild(btn);
// }

// // let clearBtn = document.querySelector('.clear');
// // clearBtn.addEventListener('click', () => setDisplayValue('0'));

// let equalsBtn = document.querySelector('.equals');
// equalsBtn.addEventListener('click', () => evaluateDisplay());

/****** NEW DOM ******/
let buttonContainer = document.querySelector('.button-container');
let buttonMapping = [Array.from('789/'), Array.from('456*'), Array.from('123-'), Array.from('.0=+')]

for (let i = 0; i < 4; i++) {
    let row = document.createElement('div');
    row.classList.add(`row-${i}`);
    for(let j = 0; j < 4; j++) {
        let btn = document.createElement('button');
        btn.classList.add(`btn-${i}-${j}`);

        let buttonLabel = buttonMapping[i][j];

        btn.textContent = buttonLabel;
        if (Array.from('1234567890+-*/').includes(buttonLabel)) { // numbers and operations
            btn.addEventListener('click', () => appendDisplayValue(buttonLabel));
        }

        row.appendChild(btn);
    }
    buttonContainer.appendChild(row);
}

let clearBtn = document.querySelector('.clear');
clearBtn.addEventListener('click', () => setDisplayValue('0'));

let deleteBtn = document.querySelector('.delete');
deleteBtn.addEventListener('click', () => {
    let displayNow = getDisplayValue();
    if (displayNow.length == 1) {
        setDisplayValue(0);
    }
    else {
        setDisplayValue( displayNow.slice(0, -1) ); // delete last character
    }
});

let equalsBtn = document.querySelector('.btn-3-2');
equalsBtn.addEventListener('click', () => evaluateDisplay());

console.log(buttonMapping);