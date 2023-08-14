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

/***********/
/*   DOM   */
/***********/
let numberContainer = document.querySelector('.numbers');

for (let i = 0; i < 10; i++) {
    let btn = document.createElement('button');
    btn.classList.add('btn-${i}');
    btn.textContent = i;
    numberContainer.appendChild(btn);
}

let operationContainer = document.querySelector('.operations');

operations = ['+', '-', '*', '/', '=', 'AC'];
operationsClass = ['add', 'subtract', 'multiply', 'divide', 'equals', 'clear'];

for (let i = 0; i < operations.length; i++) {
    let btn = document.createElement('button');
    btn.classList.add(operationsClass[i]);
    btn.textContent = operations[i];
    operationContainer.appendChild(btn);
}