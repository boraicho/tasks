'use strict';
function Food(pos) {
    this.pos = pos.plus(new Vector(0, 0));
    this.size = new Vector(0.2, 0.2);
}

Food.prototype.type = 'food';