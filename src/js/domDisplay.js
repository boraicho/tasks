'use strict';
function DOMDisplay(parent, level) {
    this.wrap = parent.appendChild(addElement('div', 'game'));
    this.level = level;

    this.wrap.appendChild(this.drawBackground());
    this.actorLayer = null;
    this.drawFrame();
}

DOMDisplay.prototype.drawBackground = function () {
    var table = addElement('table', 'background');
    table.style.width = this.level.width * scale + 'px';
    this.level.grid.forEach(function (row) {
        var rowAddElement = table.appendChild(addElement('tr'));
        rowAddElement.style.height = scale + 'px';
        /*сделать массив td и запихнуть целиком*/
        row.forEach(function (type) {
            rowAddElement.appendChild(addElement('td', type))
        });
    });
    return table;
};

DOMDisplay.prototype.drawActors = function () {
    var wrap = addElement('div');
    this.level.actors.forEach(function (actor) {
        var rect = wrap.appendChild(addElement('div', 'actor ' + actor.type));
        rect.style.width = actor.size.x * scale + 'px';
        rect.style.height = actor.size.y * scale + 'px';
        rect.style.left = actor.pos.x * scale + 'px';
        rect.style.top = actor.pos.y * scale + 'px';
    });
    return wrap;
};

DOMDisplay.prototype.drawFrame = function () {
    if (this.actorLayer) {
        this.wrap.removeChild(this.actorLayer);
    }
    this.actorLayer = this.wrap.appendChild(this.drawActors());
    this.wrap.className = 'game ' + (this.level.status || '');
    this.scrollPlayerIntoView();
}

DOMDisplay.prototype.scrollPlayerIntoView = function () {
    var width = this.wrap.clientWidth,
        height = this.wrap.clientHeight,
        margin = width / 3,
        left = this.wrap.scrollLeft,
        right = left + width,
        top = this.wrap.scrollTop,
        bottom = top + height,
        player = this.level.player,
        center = player.pos.plus(player.size.times(0.5)).times(scale);
    if (center.x < left + margin) {
        this.wrap.scrollLeft = center.x - margin;
    }
    else if (center.x > right - margin) {
        this.wrap.scrollLeft = center.x + margin - width;
    }
    if (center.y < top + margin) {
        this.wrap.scrollTop = center.y - margin;
    }
    else if (center.y > bottom - margin) {
        this.wrap.scrollTop = center.y + margin - height;
    }
};

DOMDisplay.prototype.clear = function () {
    this.wrap.parentNode.removeChild(this.wrap);
};