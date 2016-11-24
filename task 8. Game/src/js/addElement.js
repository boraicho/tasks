'use strict';
function addElement(name, className) {
    var addElement = document.createElement(name);
    if (className) {
        addElement.className = className;
    }
    return addElement;
}