'use strict';
function Ghost(pos, ch) {
    this.pos = pos.plus(new Vector(0, 0));
    this.size = new Vector(1, 1);
    this.speed = new Vector(0, 0);
    this.skin = ch;
    this.moveTo = '';
    this.lastMove;
    this.countWalk = 0;
    this.timer = 0;
}

Ghost.prototype.type = 'ghost';

Ghost.prototype.move = function(step, level) {
    this.speed.x = 0;
    this.speed.y = 0;
    var motion;
    if (this.moveTo === 'left') {
        this.speed.x -= playerSpeed;
    }
    else if (this.moveTo === 'right') {
        this.speed.x += playerSpeed;
    }
    else if (this.moveTo === 'top') {
        this.speed.y -= playerSpeed;
    }
    else {
        this.speed.y += playerSpeed;
    }
    motion = new Vector(this.speed.x * step, this.speed.y * step);
    this.pos = this.pos.plus(motion);
};

Ghost.prototype.act = function(step, level, keys, player) {
    var top = this.pos.plus(new Vector(0, -1)),
        left = this.pos.plus(new Vector(-1, 0)),
        right = this.pos.plus(new Vector(1, 0)),
        bottom = this.pos.plus(new Vector(0, 1)),
        player = player,
        direction = ['left', 'right', 'top', 'bottom'],
        newDirection,
        random;
    if (this.pos.x < 0.1) {
        this.pos = this.pos.plus(new Vector(27, 0));
    }
    else if (this.pos.x > 27.9) {
        this.pos = this.pos.plus(new Vector(-27, 0));
    }
    if (!this.canWalk(this.pos.x, this.pos.y, level, this.moveTo)) {
        if (this.canWalk(this.pos.x, this.pos.y, level, 'bottom') && this.moveTo !== 'top' && player.pos.y > this.pos.y) {
            this.lastMove = this.moveTo;
            this.moveTo = 'bottom';
            this.move(step, level);
        }
        else if (this.canWalk(this.pos.x, this.pos.y, level, 'right') && this.moveTo !== 'left' && player.pos.x > this.pos.x) {
            this.lastMove = this.moveTo;
            this.moveTo = 'right';
            this.move(step, level);
        }
        else if (this.canWalk(this.pos.x, this.pos.y, level, 'top') && this.moveTo !== 'bottom' && player.pos.y < this.pos.y) {
            this.lastMove = this.moveTo;
            this.moveTo = 'top';
            this.move(step, level);
        }
        else if (this.canWalk(this.pos.x, this.pos.y, level, 'left') && this.moveTo !== 'right' && player.pos.x < this.pos.x) {
            this.lastMove = this.moveTo;
            this.moveTo = 'left';
            this.move(step, level);
        }
        else if (this.canWalk(this.pos.x, this.pos.y, level, 'left') && this.moveTo !== 'right') {
            this.lastMove = this.moveTo;
            this.moveTo = 'left';
            this.move(step, level);
        }
        else if (this.canWalk(this.pos.x, this.pos.y, level, 'right') && this.moveTo !== 'left') {
            this.lastMove = this.moveTo;
            this.moveTo = 'right';
            this.move(step, level);
        }
        else if (this.canWalk(this.pos.x, this.pos.y, level, 'top') && this.moveTo !== 'top') {
            this.lastMove = this.moveTo;
            this.moveTo = 'right';
            this.move(step, level);
        }
        else if (this.canWalk(this.pos.x, this.pos.y, level, 'bottom') && this.moveTo !== 'bottom') {
            this.lastMove = this.moveTo;
            this.moveTo = 'right';
            this.move(step, level);
        }

    }
    else {
        this.move(step, level);
    }
};

Ghost.prototype.canWalk = function(x, y, level, direction) {
    var grid = level.grid,
        wall1,
        wall2,
        wall3 = null,
        startX = x * scale,
        endX = x * scale + 28,
        startY = y * scale,
        endY = y * scale + 20;
    x = Math.round(x);
    y = Math.round(y);
    if (direction === 'left') {
        wall1 = y * scale - halfScale;
        wall2 = (y + 1) * scale + halfScale;
        wall3 = grid[y][x - 1];
        if (startY > wall1 && endY < wall2) {
            if (wall3 !== null) {
                wall3 = x * scale - halfScale;
                if (startX < wall3 + 2) {
                    return false;
                }
            }
            return true;
        }
        return false;
    }
    else if (direction === 'right') {
        wall1 = y * scale - halfScale;
        wall2 = (y + 1) * scale + halfScale;
        wall3 = grid[y][x + 1];
        if (startY > wall1 && endY < wall2) {
            if (wall3 !== null) {
                wall3 = x * scale - halfScale;
                if (startX > wall3 - 2) {
                    return false;
                }
            }
            return true;
        }
        return false;
    }
    else if (direction === 'top') {
        wall1 = x * scale - halfScale;
        wall2 = (x + 1) * scale + halfScale;
        wall3 = grid[y - 1][x];
        if (startX > wall1 && endX < wall2) {
            if (wall3 !== null) {
                wall3 = y * scale - halfScale;
                if (startY < wall3 + 2) {
                    return false;
                }
            }
            return true;
        }
        return false;
    }
    else if (direction === 'bottom') {
        wall1 = x * scale - halfScale;
        wall2 = (x + 1) * scale + halfScale;
        wall3 = grid[y + 1][x];
        if (startX > wall1 && endX < wall2) {
            if (wall3 !== null) {
                wall3 = (y + 1) * scale + halfScale;
                if (endY > wall3 - 2) {
                    return false;
                }
            }
            return true;
        }
        return false;
    }
};

Ghost.prototype.countCanWalk = function(x, y, level, direction) {
    if (this.canWalk(x, y, level, direction)) {
        this.countWalk += 1;
    }
    return true;
};