(function () {
    "use strict";
    var button = document.getElementById("EnterTextInput"),
        value = document.getElementById("TextInput"),
        inspection = /([\-]?((\d.\d+)|(\d+.\d+)|(\d+))[\D.]*?[-+\/*]{1} ?)+(((\d.\d+)|(\d+.\d+)|(\d+))[\D.]*?=[\D.]*)/g,
        allNumbers = /[ ]*?[\-\+/*][ ]*[\-]?[ ]*[\d][.]*[\d]*/ig,
        firstNumber = /[\-]?[\d]+[.]*[\d]*/,
        mathString,
        input,
        array,
        result,
        firstNum;

    button.onclick = calculate;

    function calculate() {
        var i;

        input = value.value;
        mathString = input.match(inspection);
        if (mathString) {
            firstNum = firstNumber.exec(mathString);
            result = 0;
            input = input.replace(/ /g, '');
            array = input.match(allNumbers);
            for (i = 0; i < array.length; i += 1) {
                var char = array[i].substring(0, 1),
                    char1 = array[i].substring(1) * 1;
                switch (char) {
                    case '+':
                        result = result + char1;
                        break;
                    case '-':
                        result = result - char1;
                        break;
                    case '*':
                        result = result * char1;
                        break;
                    case '/':
                        result = result / char1;
                        break;
                }
            }
            writeResult();
        }
        else {
            writeError();
        }
    };

    function writeResult() {
        var div = document.createElement('div'),
            body = document.getElementById('Body');
        div.innerHTML = "Результат:" + result;
        body.appendChild(div);
        result = 0;
    }

    function writeError() {
        var div = document.createElement('div'),
            body = document.getElementById('Body');
        div.innerHTML = "либо забыли =, либо программа слишком тупая что бы такое посчитать";
        body.appendChild(div);
    }

})();