
// ============================================
// КАЛЬКУЛЯТОР (по методичке iu5git lab1/lab2)
// ============================================
const resultEl = document.getElementById('result');
const expressionEl = document.getElementById('expression');

let currentInput = '0';      // текущее число на экране
let previousInput = '';       // предыдущее число
let operator = null;          // текущий оператор
let shouldResetScreen = false;
let lastExpression = '';

// ---- Обновление дисплея ----
function updateDisplay() {
    resultEl.textContent = currentInput;
    expressionEl.textContent = lastExpression;
}

// ---- Форматирование числа ----
function formatNumber(num) {
    if (num.toString().length > 12) {
        return parseFloat(num).toExponential(5);
    }
    return num.toString();
}

// ---- Обработка цифры ----
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

// ---- Обработка десятичной точки ----
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

// ---- Обработка оператора ----
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

    // Символы для дисплея
    const opSymbols = { '/': '÷', '*': '×', '-': '−', '+': '+' };
    lastExpression = previousInput + ' ' + (opSymbols[op] || op);
    updateDisplay();

    // Подсветка активного оператора
    highlightOperator(op);
}

// ---- Вычисление ----
function calculate(a, b, op) {
    switch (op) {
        case '+': return a + b;
        case '-': return a - b;
        case '*': return a * b;
        case '/': return b !== 0 ? a / b : 'Error';
        default: return b;
    }
}

// ---- Равно ----
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

// ---- Стирание последнего символа (Backspace) ----
function handleBackspace() {
    // Если на экране результат вычисления (нажали =), то стирание просто обнуляет экран
    if (shouldResetScreen) {
        currentInput = '0';
        shouldResetScreen = false;
    } else {
        // Если длина больше 1 символа - отрезаем последний
        if (currentInput.length > 1) {
            currentInput = currentInput.slice(0, -1);
            // Если после стирания остался только минус (например было -5), то делаем 0
            if (currentInput === '-') {
                currentInput = '0';
            }
        } else {
            // Если осталась одна цифра, превращаем её в 0
            currentInput = '0';
        }
    }
    updateDisplay();
}

// ---- Очистка (AC) ----
function clearAll() {
    currentInput = '0';
    previousInput = '';
    operator = null;
    shouldResetScreen = false;
    lastExpression = '';
    updateDisplay();
    clearOperatorHighlight();
}

// ---- Смена знака +/- ----
function toggleSign() {
    if (currentInput === '0') return;
    if (currentInput.startsWith('-')) {
        currentInput = currentInput.slice(1);
    } else {
        currentInput = '-' + currentInput;
    }
    updateDisplay();
}

// ---- Процент ----
function handlePercent() {
    currentInput = formatNumber(parseFloat(currentInput) / 100);
    updateDisplay();
}

// ---- Подсветка оператора ----
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

// ============================================
// Привязка событий к кнопкам
// ============================================
document.querySelectorAll('.calc-btn').forEach(btn => {
    btn.addEventListener('click', () => {
        const action = btn.dataset.action;
        const value = btn.dataset.value;

        if (btn.classList.contains('digit') && !action) {
            // Нажата цифра
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

// ============================================
// Поддержка клавиатуры
// ============================================
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

// Инициализация
updateDisplay();