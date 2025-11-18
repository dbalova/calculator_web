import '../styles/main.scss';

let screen = document.querySelector(".calculator__screen");
const buttons = document.querySelectorAll(".num-button");
const equals = document.querySelector(".equals-button");

buttons.forEach(button => {
    button.addEventListener("click", (e) => {
        switch (e.target.innerText) {
            case "C":
                screen.innerText = "0";
                break;
            default:
                if (screen.innerText === "0" && !isNaN(e.target.innerText)) {
                    screen.innerText = e.target.innerText;
                } else {
                    if (isNaN(e.target.innerText) && isNaN(screen.innerText.charAt(screen.innerText.length - 1))) {
                        screen.innerText = screen.innerText.slice(0, -1);
                        screen.innerText += e.target.innerText;
                    }
                    else { screen.innerText += e.target.innerText; }
                }
        }
    });
});

equals.addEventListener("click", () => screen.innerText = calc(screen.innerText));

function calc(expression) {
    let nums = [];
    let currentNum = '';
    let operator = '';
    if (!isNaN(expression.charAt(expression.length - 1))) {
        for (let i = 0; i <= expression.length; i++) {
            if (!isNaN(expression[i]) || expression[i]=='.') {
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
        return res == 'Infinity' ? 'Ошибка!' : res;
    }
    return 'Ошибка!';
};