'use strict';
let display = document.querySelector('.display-inner'),
    displayResult = document.querySelector('.display-result'),
    buttons = document.querySelectorAll('button'),
    antenna = document.querySelector('.antenna'),
    displayText = '',
    savedValueBeforePaste = '',
    isPaste = false;

buttons.forEach(i => i.addEventListener('click', function () {
    displayText = this.innerText;
    antenna.classList.add('active')
    if (displayText === '=') {
        result()
    } else if (displayText === 'C') {
        clearAll()
    } else if (displayText === 'x') {
        displayText = '*';
        display.value += displayText;
    } else {
        display.value += displayText;
    }
}));

document.addEventListener('keydown', function (event) {
    if (event.code === 'Enter' || event.code === 'NumpadEnter') {
        event.preventDefault();
        result()
    }
});

document.addEventListener('keydown', function (event) {
    if (event.code === 'KeyC') {
        event.preventDefault();
        clearAll()
    }
});

display.addEventListener('paste', function () {
    savedValueBeforePaste = display.value;
    isPaste = true;
});

display.addEventListener('input', function () {
    if (!display.value) return;
    if (isPaste) {
        if (display.value.search(/[^\d-+*/.()]/g) !== -1) {
            display.value = savedValueBeforePaste;
            isPaste = false;
            savedValueBeforePaste = '';
        }
    } else {
        let lastValue = display.value[display.value.length - 1]
        if (lastValue.search(/\d|[-+*/.()]/) === -1) {
            display.value = display.value.slice(0, -1)
        }
    }
    antenna.classList.add('active')
});

function result() {
    let getResult = new Function(`return ${display.value}`)
    displayResult.innerText = 'result: ' + getResult()
    // displayResult.innerText = globalThis.eval(display.innerText)
}

function clearAll() {
    displayResult.innerText = 'result: '
    display.value = ''
    antenna.classList.remove('active')
}






