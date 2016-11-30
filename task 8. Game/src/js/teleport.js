'use strict';
function Teleport(pos) {
    this.pos = pos.plus(new Vector(0, 0));
    this.size = new Vector(0.1, 1);
}

Teleport.prototype.type = 'teleport';