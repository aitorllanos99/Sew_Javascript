"use strict";

class Calculator {
    constructor() {
        this.memory = 0;
    }

    display(digit) {
        let display = document.getElementById("pantalla");
        if (display.value === '0') {
            display.value = digit;
        } else {
            display.value += digit;
        }
    }

    cleanDisplay() {
        const display = document.getElementById("pantalla");
        display.value = "0";
    }

    result() {
        const display = document.getElementById("pantalla");
        display.value = eval(display.value);
        this.memory = 0;
    }

    addMemory() {
        try {
            const display = document.getElementById("pantalla");
            this.memory += eval(display.value);
            this.cleanDisplay();
        } catch (e) {
            alert('Wrong value, please check it')
        }
    }

    minusMemory() {
        try {
            const display = document.getElementById("pantalla");
            this.memory -= eval(display.value);
            this.cleanDisplay();
        } catch (e) {
            alert('Wrong value, please check it')
        }
    }

    showMemory() {
        const display = document.getElementById("pantalla");
        display.value = this.memory;
    }
}

let calculator = new Calculator();