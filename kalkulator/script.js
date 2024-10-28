const calculatorScreen = document.querySelector('.calculator-screen');
let firstOperand = null;
let operator = null;
let waitingForSecondOperand = false;

function updateScreen(value) {
    calculatorScreen.value = value;
}

function handleDigit(digit) {
    if (waitingForSecondOperand) {
        updateScreen(digit);
        waitingForSecondOperand = false;
    } else {
        const currentValue = calculatorScreen.value === '0' ? digit : calculatorScreen.value + digit;
        updateScreen(currentValue);
    }
}

function handleOperator(nextOperator) {
    const inputValue = parseFloat(calculatorScreen.value);

    if (operator && waitingForSecondOperand) {
        operator = nextOperator;
        return;
    }

    if (firstOperand === null) {
        firstOperand = inputValue;
    } else if (operator) {
        const result = performCalculation[operator](firstOperand, inputValue);
        updateScreen(result);
        firstOperand = result;
    }

    waitingForSecondOperand = true;
    operator = nextOperator;
}

const performCalculation = {
    '+': (firstOperand, secondOperand) => firstOperand + secondOperand,
    '-': (firstOperand, secondOperand) => firstOperand - secondOperand,
    '*': (firstOperand, secondOperand) => firstOperand * secondOperand,
    '/': (firstOperand, secondOperand) => firstOperand / secondOperand,
};

function resetCalculator() {
    updateScreen('0');
    firstOperand = null;
    operator = null;
    waitingForSecondOperand = false;
}

document.querySelector('.calculator-keys').addEventListener('click', (event) => {
    const { target } = event;

    if (!target.matches('button')) return;

    if (target.classList.contains('operator')) {
        handleOperator(target.value);
    } else if (target.classList.contains('equal-sign')) {
        handleOperator('=');
    } else if (target.classList.contains('clear')) {
        resetCalculator();
    } else {
        handleDigit(target.value);
    }
});
