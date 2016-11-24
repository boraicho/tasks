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
    // 2015, 2, 4, 5, 7, 8 yyyy_MM_dd HH_mm_ss 
    button.onclick = GetFormatedDate;

    function GetFormatedDate() {
        input = value.value;
        date = getDate();
        format = input.replace(regForSearchDate, "");
        formatArray = format.match(regForFormatDate);
        date.format(formatArray);
        writeResult();
    };


    Date.prototype.format = function (formatArray) {
        var self = this;
        for (i = 0; i < formatArray.length; i += 1) {
            formatElement = formatArray[i].toString();
            replaceFormatToDate();
        }

        function replaceFormatToDate() {
            format = format.replace(formatArray[i], transformDate());
            return format;
        }

        function transformDate() {
            var months = getClientLanguage();
            switch (formatElement) {
                case 'yy':
                    var shortYear = self.getFullYear().toString();
                    return shortYear.substr(2);
                case 'yyyy':
                    return self.getFullYear();
                case 'M':
                    return self.getMonth();
                case 'MM':
                    if (self.getMonth() < 10) {
                        return "0" + date.getMonth();
                    }
                    else {
                        return self.getMonth();
                    }
                case 'MMM':
                    return months[self.getMonth()].substr(0, 3);
                case 'MMMM':
                    return months[self.getMonth()];
                case 'd':
                    return self.getDate();
                case 'dd':
                    if (self.getDate() < 10) {
                        return "0" + self.getDate();
                    }
                    else {
                        return self.getDate();
                    }
                case 'H':
                    return self.getHours();
                case 'HH':
                    if (self.getHours() < 10) {
                        return "0" + self.getHours();
                    }
                    else {
                        return self.getHours();
                    }
                case 'h':
                    if (self.getHours() > 12) {
                        return self.getHours() - 12;
                    }
                    else {
                        return self.getHours();
                    }
                case 'hh':
                    if (self.getHours() < 10) {
                        return "0" + self.getHours();
                    }
                    if (self.getHours() > 12) {
                        return self.getHours() - 12;
                    }
                    else {
                        return self.getHours();
                    }
                case 'm':
                    return self.getMinutes();
                case 'mm':
                    if (self.getMinutes() < 10) {
                        return "0" + self.getMinutes();
                    }
                    else {
                        return self.getMinutes();
                    }
                case 's':
                    return self.getSeconds();
                case 'ss':
                    if (self.getSeconds() < 10) {
                        return "0" + self.getSeconds();
                    }
                    else {
                        return self.getSeconds();
                    }
            }

            function getClientLanguage() {
                if (navigator.language == "ru") {
                    return monthRU;
                }
                if (navigator.language == "en-US") {
                    return monthEN;
                }
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