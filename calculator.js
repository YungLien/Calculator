// Basic arithmetic operations
function add(num1, num2) {
    return num1 + num2;
}

function subtract(num1, num2) {
    return num1 - num2;
}

function multiply(num1, num2) {
    return num1 * num2;
}

function divide(num1, num2) {
    if (num2 === 0) {
        alert("Cannot divide by zero");
        return null; // Avoid division by zero
    }
    return num1 / num2;
}

// Function to operate based on the selected operator
function operate(firstnum, operator, secondnum) {
    switch (operator) {
        case '+':
            return add(firstnum, secondnum);
        case '-':
            return subtract(firstnum, secondnum);
        case '*':
            return multiply(firstnum, secondnum);
        case '/':
            return divide(firstnum, secondnum);
        default:
            return null;
    }
}

// Variables to store input values and operator
let displayValue = ''; // Current input value
let firstOperand = null; // First operand
let currentOperator = null; // Current operator
let fullExpression = ''; // Full expression to be displayed

// Get reference to display element
const display = document.querySelector('input');

// Get references to all buttons

const buttons = {
    numbers: [
        document.querySelector('#btn0'),
        document.querySelector('#btn1'),
        document.querySelector('#btn2'),
        document.querySelector('#btn3'),
        document.querySelector('#btn4'),
        document.querySelector('#btn5'),
        document.querySelector('#btn6'),
        document.querySelector('#btn7'),
        document.querySelector('#btn8'),
        document.querySelector('#btn9')
    ],
    operators: {
        add: document.querySelector('#btnadd'),
        subtract: document.querySelector('#btnSubstract'),
        multiply: document.querySelector('#btnMultiply'),
        divide: document.querySelector('#btnDivide')
    },
    equal: document.querySelector('#btnEqual'),
    clear: document.querySelector('#btnClear'),
    dot: document.querySelector('#btnDot'),
    backspace: document.querySelector('#btnBackspace')
};

// Event handler for number button clicks
function handleNumberClick(number) {
    if (currentOperator && firstOperand !== null) {
        displayValue += number;
        fullExpression = `${firstOperand} ${currentOperator} ${displayValue}`;
    } else {
        displayValue += number;
        fullExpression = displayValue;
    }
    display.value = fullExpression;
}

// Event handler for operator button clicks
function handleOperatorClick(operator) {
    if (firstOperand === null) {
        firstOperand = parseFloat(displayValue);
        currentOperator = operator;
        fullExpression = `${firstOperand} ${currentOperator}`;
        displayValue = '';
    } else if (currentOperator) {
        const result = operate(firstOperand, currentOperator, parseFloat(displayValue));
        firstOperand = result;
        currentOperator = operator;
        displayValue = '';
        fullExpression = `${result} ${currentOperator}`;
    }
    display.value = fullExpression;
}

// Event handler for the equal button
function handleEqualClick() {
    if (firstOperand !== null && currentOperator !== null) {
        const result = operate(firstOperand, currentOperator, parseFloat(displayValue));
        displayValue = String(result);
        fullExpression = displayValue;
        display.value = displayValue;
        firstOperand = null;
        currentOperator = null;
    }
}

// Event handler for the clear button
function handleClearClick() {
    displayValue = '';
    firstOperand = null;
    currentOperator = null;
    fullExpression = '';
    display.value = '';
}

// Event handler for the dot button to add decimals
function handleDotClick() {
    if (!displayValue.includes('.')) {
        displayValue += '.';
        display.value = fullExpression += '.';
    }
}

// Event handler for the backspace button to delete the last character
function handleBackspaceClick() {
    displayValue = displayValue.slice(0, -1);
    fullExpression = fullExpression.slice(0, -1);
    display.value = fullExpression;
}

// Bind event listeners for number buttons
buttons.numbers.forEach((btn, index) => {
    btn.addEventListener('click', () => handleNumberClick(String(index)));
});

// Bind event listeners for operator buttons
buttons.operators.add.addEventListener('click', () => handleOperatorClick('+'));
buttons.operators.subtract.addEventListener('click', () => handleOperatorClick('-'));
buttons.operators.multiply.addEventListener('click', () => handleOperatorClick('*'));
buttons.operators.divide.addEventListener('click', () => handleOperatorClick('/'));

// Bind event listeners for other buttons
buttons.equal.addEventListener('click', handleEqualClick);
buttons.clear.addEventListener('click', handleClearClick);
buttons.dot.addEventListener('click', handleDotClick);
buttons.backspace.addEventListener('click', handleBackspaceClick);
