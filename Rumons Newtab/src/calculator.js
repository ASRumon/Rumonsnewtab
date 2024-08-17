document.addEventListener('DOMContentLoaded', function() {
    const display = document.getElementById('display');
    const buttons = document.querySelectorAll('.btn');
    const clearButton = document.getElementById('btn-clear');
    const equalsButton = document.getElementById('btn-equals');

    let currentInput = '';
    let operatorClicked = false;

    buttons.forEach(button => {
        button.addEventListener('click', () => {
            const buttonText = button.textContent;

            // Clear display if error message is shown
            if (display.value === 'Error') {
                display.value = '';
            }

            if (buttonText === 'C') {
                clearDisplay();
            } else if (buttonText === '=') {
                evaluateExpression();
            } else if (buttonText === '.') {
                addDecimal();
            } else {
                updateDisplay(buttonText);
            }
        });
    });

    function updateDisplay(value) {
        if (display.value === '0' || operatorClicked) {
            display.value = value;
            operatorClicked = false;
        } else {
            display.value += value;
        }
        currentInput += value;
    }

    function clearDisplay() {
        display.value = '';
        currentInput = '';
        operatorClicked = false;
    }

    function addDecimal() {
        if (!display.value.includes('.')) {
            display.value += '.';
            currentInput += '.';
        }
    }

    function evaluateExpression() {
        try {
            const result = math.evaluate(currentInput);
            display.value = result;
            currentInput = result.toString(); // store result as current input for further operations
        } catch (error) {
            display.value = 'Error';
            currentInput = ''; // clear current input on error
        }
        operatorClicked = false;
    }
});
