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
        return res == "Infinity" ? "Ошибка!" : res;
    }
    return "Ошибка!";
};

test('calc test', () => {
    expect(calc("2+3*4")).toBe(14);
    expect(calc("3/0")).toBe("Ошибка!");
    expect(calc("2+")).toBe("Ошибка!");
    expect(calc("2.5+3.7")).toBe(6.2);
    expect(calc("999999999999999+1")).toBe(1000000000000000);
});