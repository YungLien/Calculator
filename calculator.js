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

const operate = function (firstnum, operator, secondnum) {
    if (operator === '+') {
        return add(firstnum, secondnum);
    }
    if (operator === '-') {
        return subtract(firstnum, secondnum);
    }
    if (operator === '*') {
        return multiply(firstnum, secondnum);
    }
    if (operator === '/') {
        return divide(firstnum, secondnum);
    }
};

let displayValue = ''; // To store current input value
let firstOperand = null; // To store the first operand
let currentOperator = null; // To store the current operator
let fullExpression = ''; // To store the full expression to be displayed

const display = document.querySelector('input');

const btn0 = document.querySelector('#btn0');
const btn1 = document.querySelector('#btn1');
const btn2 = document.querySelector('#btn2');
const btn3 = document.querySelector('#btn3');
const btn4 = document.querySelector('#btn4');
const btn5 = document.querySelector('#btn5');
const btn6 = document.querySelector('#btn6');
const btn7 = document.querySelector('#btn7');
const btn8 = document.querySelector('#btn8');
const btn9 = document.querySelector('#btn9');
const btnadd = document.querySelector('#btnadd');
const btnSubstract = document.querySelector('#btnSubstract');
const btnMultiply = document.querySelector('#btnMultiply');
const btnDivide = document.querySelector('#btnDivide');
const btnEqual = document.querySelector('#btnEqual');
const btnClear = document.querySelector('#btnClear');

// Number button click event handler
const handleNumberClick = (number) => {
    if (currentOperator && firstOperand !== null) {
        displayValue += number;
        fullExpression = `${firstOperand} ${currentOperator} ${displayValue}`;
    } else {
        displayValue += number;
        fullExpression = displayValue;
    }
    display.value = fullExpression;
};

// Operator button click event handler
const handleOperatorClick = (operator) => {
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
};

// Equal button click event handler
const handleEqualClick = () => {
    if (firstOperand !== null && currentOperator !== null) {
        const result = operate(firstOperand, currentOperator, parseFloat(displayValue));
        displayValue = String(result);
        fullExpression = displayValue;
        display.value = displayValue;
        firstOperand = null;
        currentOperator = null;
    }
};

// Clear button click event handler
const handleClearClick = () => {
    displayValue = '';
    firstOperand = null;
    currentOperator = null;
    fullExpression = '';
    display.value = '';
};

// Bind event listeners
btn0.addEventListener('click', () => handleNumberClick('0'));
btn1.addEventListener('click', () => handleNumberClick('1'));
btn2.addEventListener('click', () => handleNumberClick('2'));
btn3.addEventListener('click', () => handleNumberClick('3'));
btn4.addEventListener('click', () => handleNumberClick('4'));
btn5.addEventListener('click', () => handleNumberClick('5'));
btn6.addEventListener('click', () => handleNumberClick('6'));
btn7.addEventListener('click', () => handleNumberClick('7'));
btn8.addEventListener('click', () => handleNumberClick('8'));
btn9.addEventListener('click', () => handleNumberClick('9'));

btnadd.addEventListener('click', () => handleOperatorClick('+'));
btnSubstract.addEventListener('click', () => handleOperatorClick('-'));
btnMultiply.addEventListener('click', () => handleOperatorClick('*'));
btnDivide.addEventListener('click', () => handleOperatorClick('/'));

btnEqual.addEventListener('click', handleEqualClick);
btnClear.addEventListener('click', handleClearClick);