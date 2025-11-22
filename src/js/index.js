import '../styles/main.scss';

let screen = document.querySelector(".calculator__screen");
const buttons = document.querySelectorAll(".num-button");
const equals = document.querySelector(".equals-button");
let isResult = false;
const possibleValues = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '.', '+', '-', '*', '/'];

buttons.forEach(button => {
    button.addEventListener("click", (e) => {
        if (screen.innerText == "Ошибка!") {
            screen.innerText = "0";
            isResult = false;
        }
        screen.innerText = buttonProcessing(e.target.innerText, screen.innerText);
        isResult = false;
    });
});

function buttonProcessing(currentButton, screenText) {
    switch (currentButton) {
        case "C":
            screenText = "0";
            break;
        default:
            if (screenText === "0" && !isNaN(currentButton)) {
                screenText = currentButton;
            } else {
                if (isResult == true && !isNaN(currentButton)) {
                    screenText = currentButton;
                } else {
                    if (isNaN(currentButton) && isNaN(screenText.charAt(screenText.length - 1))) {
                        screenText = screenText.slice(0, -1);
                        screenText += currentButton;
                    }
                    else {screenText += currentButton;}
                }
            }
    }
    return screenText;
}

equals.addEventListener("click", () => {
    isResult = true;
    screen.innerText = calc(screen.innerText);
});

document.addEventListener("keydown", (e) => {
    e.preventDefault();
    if (screen.innerText == "Ошибка!") {
        screen.innerText = "0";
        isResult = false;
    }
    if (e.key === 'Enter') {
        isResult = true;
        screen.innerText = calc(screen.innerText);
        return;
    }
    if (e.key === 'Escape') {
        screen.innerText = "0";
        isResult = false;
        return;
    }
    console.log(possibleValues.includes(e.key));
    if (possibleValues.includes(e.key)) {
        screen.innerText= buttonProcessing(e.key, screen.innerText);
        isResult = false;
    }
});

function calc(expression) {
    let nums = [];
    let currentNum = '';
    let operator = '';
    if (!isNaN(expression.charAt(expression.length - 1))) {
        for (let i = 0; i <= expression.length; i++) {
            if (!isNaN(expression[i]) || expression[i] == '.') {
                currentNum += expression[i];
                continue;
            }
            currentNum = Number(currentNum);
            switch (operator) {
                case '-': nums.push(-currentNum);
                    break;
                case '/': nums.push(nums.pop() / currentNum);
                    break;
                case '*':
                    nums.push(nums.pop() * currentNum);
                    break;
                default:
                    nums.push(currentNum);
                    break;
            }
            operator = expression[i];
            currentNum = '';
        }
        let res = nums.reduce((a, b) => a + b);
        return res == "Infinity" ? "Ошибка!" : res;
    }
    return "Ошибка!";
};

