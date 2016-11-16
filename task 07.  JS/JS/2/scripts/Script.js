(function () {
    "use strict";
    var button = document.getElementById("EnterTextInput"),
        value = document.getElementById("TextInput"),
        char,
        input;

    button.onclick = textTransform;

    function textTransform() {
        var m,
            chars,
            onlyWords = [],
            countWord = 1,
            separatedString,
            regForSeparator = /[^.,;:!? ]+/g;

        input = value.value
        separatedString = input.split(/[.,;:!? ]{1}/g);
        onlyWords = separatedString.filter(function (item) {
            return item.length > 0;
        });
        for (var i = 0; i < onlyWords.length - 1; i += 1) {
            chars = onlyWords[i].toString();
            for (var j = 0; j < chars.length; j += 1) {
                char = chars[j];
                m = i + 1;
                for (m; m < onlyWords.length; m += 1) {
                    if (~onlyWords[m].indexOf(char)) {
                        countWord += 1;
                    }
                }
                if (countWord == onlyWords.length) {
                    deleteChar();
                }
                countWord = 1;
            }
        }
        writeResult();
    };

    function deleteChar() {
        var g = 0,
            k = 0,
            end;
        while (g !== -1) {
            g = input.indexOf(char);
            if (g === -1) {
                break;
            }
            k = g + 1;
            if (g === 0) {
                end = end + input.slice(1);
            }
            end = input.slice(0, g);
            end = end + input.slice(g + 1);
            input = end;
        }
        return input;
    }

    function writeResult() {
        var div = document.getElementById('Input');
        div.innerHTML = "Результат:" + input;
    }
})();