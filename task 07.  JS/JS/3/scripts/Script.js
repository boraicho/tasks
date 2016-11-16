(function () {
    "use strict";
    var button = document.getElementById("EnterTextInput"),
        value = document.getElementById("TextInput"),
        regForFormatDate = /y{4}|y{2}(?!y)|M{1,4}|d{1,2}|H{1,2}|h{1,2}|m{1,2}|s{1,2}/g,
        regForSearchDate = /(\d{1,4}[,. :\-_][ ]*){6}/g,
        input,
        array,
        arrayWithOutGap = [],
        dateArray,
        dateString,
        date,
        format,
        formatArray,
        formatElement,
        i,
        monthEN = {
            1: "January",
            2: "February",
            3: "March",
            4: "April",
            5: "May",
            6: "June",
            7: "July",
            8: "August",
            9: "September",
            10: "October",
            11: "November",
            12: "December"
        },
        monthRU = {
            1: "Январь",
            2: "Февраль",
            3: "Март",
            4: "Апрель",
            5: "Май",
            6: "Июнь",
            7: "Июль",
            8: "Август",
            9: "Сентябрь",
            10: "Октябрь",
            11: "Ноябрь",
            12: "Декабрь"
        };

    button.onclick = GetFormatedDate;
    
    function GetFormatedDate () {
        input = value.value;
        date = getDate();
        format = input.replace(regForSearchDate, "");
        formatArray = format.match(regForFormatDate);
        for (i = 0; i < formatArray.length; i += 1) {
            formatElement = formatArray[i].toString();
            replaceFormatToDate();
        }
        writeResult();
    };

    function replaceFormatToDate() {
        format = format.replace(formatArray[i], transformDate());
        return format;
    }

    function getClientLanguage() {
        if (navigator.language == "ru") {
            return monthRU;
        }
        if (navigator.language == "en-US") {
            return monthEN;
        }
    }

    function transformDate() {
        var months = getClientLanguage();
        switch (formatElement) {
            case 'yy':
                var shortYear = date.getFullYear().toString();
                return shortYear.substr(2);
            case 'yyyy':
                return date.getFullYear();
            case 'M':
                return date.getMonth();
            case 'MM':

                if (date.getMonth() < 10) {
                    return "0" + date.getMonth();
                }
                else {
                    return date.getMonth();
                }
            case 'MMM':
                return months[date.getMonth()].substr(0, 3);
            case 'MMMM':
                return months[date.getMonth()];
            case 'd':
                return date.getDate();
            case 'dd':
                if (date.getDate() < 10) {
                    return "0" + date.getDate();
                }
                else {
                    return date.getDate();
                }
            case 'H':
                return date.getHours();
            case 'HH':
                if (date.getHours() < 10) {
                    return "0" + date.getHours();
                }
                else {
                    return date.getHours();
                }
            case 'h':
                if (date.getHours() > 12) {
                    return date.getHours() - 12;
                }
                else {
                    return date.getHours();
                }
            case 'hh':

                if (date.getHours() < 10) {
                    return "0" + date.getHours();
                }
                if (date.getHours() > 12) {
                    return date.getHours() - 12;
                }
                else {
                    return date.getHours();
                }
            case 'm':
                return date.getMinutes();
            case 'mm':
                if (date.getMinutes() < 10) {
                    return "0" + date.getMinutes();
                }
                else {
                    return date.getMinutes();
                }
            case 's':
                return date.getSeconds();
            case 'ss':
                if (date.getSeconds() < 10) {
                    return "0" + date.getSeconds();
                }
                else {
                    return date.getSeconds();
                }
        }
    }

    function getDate() {
        dateArray = input.match(regForSearchDate);
        dateArray = dateArray[0].toString().split(/[.,;:!? ]{1}/g);
        arrayWithOutGap = dateArray.filter(function (item) {
            return item > 0;
        });

        return new Date(arrayWithOutGap[0], arrayWithOutGap[1], arrayWithOutGap[2], arrayWithOutGap[3], arrayWithOutGap[4], arrayWithOutGap[5]);
    }

    function writeResult() {
        var div = document.getElementById('Input');
        div.innerHTML = format;
    }
})();