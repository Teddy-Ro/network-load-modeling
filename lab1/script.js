
const resultEl = document.getElementById('result');
const expressionEl = document.getElementById('expression');

let currentInput = '0';     
let previousInput = '';       
let operator = null;          
let shouldResetScreen = false;
let lastExpression = '';

function updateDisplay() {
    resultEl.textContent = currentInput; 
    expressionEl.textContent = lastExpression;
}

function formatNumber(num) {
    if (num.toString().length > 9) {
        return parseFloat(num).toExponential(5);
    }

    return num.toString();
}

function inputDigit(digit) {
    if (shouldResetScreen) {
        currentInput = digit;
        shouldResetScreen = false;
    } else {
        if (currentInput === '0' && digit !== '.') {
            currentInput = digit;
        } else {
            if (currentInput.length >= 9) return;
            currentInput += digit;
        }
    }
    updateDisplay();
}

function inputDecimal() {
    if (shouldResetScreen) {
        currentInput = '0.';
        shouldResetScreen = false;
        updateDisplay();
        return;
    }
    if (!currentInput.includes('.')) {
        currentInput += '.';
    }
    updateDisplay();
}

function handleOperator(op) {
    const current = parseFloat(currentInput);

    if (operator && !shouldResetScreen) {
        const result = calculate(parseFloat(previousInput), current, operator);
        currentInput = formatNumber(result);
        updateDisplay();
    }

    previousInput = currentInput;
    operator = op;
    shouldResetScreen = true;

    const opSymbols = { '/': '÷', '*': '×', '-': '−', '+': '+' };
    lastExpression = previousInput + ' ' + (opSymbols[op] || op);
    updateDisplay();

    highlightOperator(op);
}

function calculate(a, b, op) {
    switch (op) {
        case '+': return a + b;
        case '-': return a - b;
        case '*': return a * b;
        case '/': return b !== 0 ? a / b : 'Error';
        default: return b;
    }
}

function handleEquals() {
    if (!operator) return;

    const current = parseFloat(currentInput);
    const prev = parseFloat(previousInput);
    const opSymbols = { '/': '÷', '*': '×', '-': '−', '+': '+' };

    lastExpression = previousInput + ' ' + (opSymbols[operator] || operator) + ' ' + currentInput + ' =';

    const result = calculate(prev, current, operator);
    currentInput = formatNumber(result);
    operator = null;
    previousInput = '';
    shouldResetScreen = true;

    updateDisplay();
    clearOperatorHighlight();
}

function handleBackspace() {
    if (shouldResetScreen) {
        currentInput = '0';
        shouldResetScreen = false;
    } else {
        if (currentInput.length > 1) {
            currentInput = currentInput.slice(0, -1);
            if (currentInput === '-') {
                currentInput = '0';
            }
        } else {
            currentInput = '0';
        }
    }
    updateDisplay();
}

function clearAll() {
    currentInput = '0';
    previousInput = '';
    operator = null;
    shouldResetScreen = false;
    lastExpression = '';
    updateDisplay();
    clearOperatorHighlight();
}

function toggleSign() {
    if (currentInput === '0') return;
    if (currentInput.startsWith('-')) {
        currentInput = currentInput.slice(1);
    } else {
        currentInput = '-' + currentInput;
    }
    updateDisplay();
}

function handlePercent() {
    currentInput = formatNumber(parseFloat(currentInput) / 100);
    updateDisplay();
}

function highlightOperator(op) {
    clearOperatorHighlight();
    document.querySelectorAll('.calc-btn.op[data-value]').forEach(btn => {
        if (btn.dataset.value === op) {
            btn.classList.add('active');
        }
    });
}

function clearOperatorHighlight() {
    document.querySelectorAll('.calc-btn.op').forEach(btn => {
        btn.classList.remove('active');
    });
}


document.querySelectorAll('.calc-btn').forEach(btn => {
    btn.addEventListener('click', () => {
        const action = btn.dataset.action;
        const value = btn.dataset.value;

        if (btn.classList.contains('digit') && !action) {
            inputDigit(value);
            clearOperatorHighlight();
        } else if (action === 'decimal') {
            inputDecimal();
            clearOperatorHighlight();
        } else if (action === 'operator') {
            handleOperator(value);
        } else if (action === 'equals') {
            handleEquals();
        } else if (action === 'clear') {
            clearAll();
        } else if (action === 'sign') {
            toggleSign();
        } else if (action === 'percent') {
            handlePercent();
        } else if (action === 'erase') {
            handleBackspace();
        }
    });
});

document.addEventListener('keydown', (e) => {
    if (e.key >= '0' && e.key <= '9') {
        inputDigit(e.key);
        clearOperatorHighlight();
    } else if (e.key === '.') {
        inputDecimal();
    } else if (['+', '-', '*', '/'].includes(e.key)) {
        handleOperator(e.key);
    } else if (e.key === 'Enter' || e.key === '=') {
        e.preventDefault();
        handleEquals();
    } else if (e.key === 'Escape') {
        clearAll();
    } else if (e.key === 'Backspace') {
        if (currentInput.length > 1) {
            currentInput = currentInput.slice(0, -1);
        } else {
            currentInput = '0';
        }
        updateDisplay();
    } else if (e.key === '%') {
        handlePercent();
    }
});

updateDisplay();