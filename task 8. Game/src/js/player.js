'use strict';
function Player(pos) {
    this.pos = pos.plus(new Vector(0.6, 0));
    this.size = new Vector(0.8, 0.8);
    this.speed = new Vector(0, 0);
}

Player.prototype.type = 'player';

Player.prototype.moveX = function(step, level, keys) {
    var motion,
        newPos,
        obstacle;
    this.speed.x = 0;
    if (keys.left) {
        this.speed.x -= playerSpeed;
    }
    if (keys.right) {
        this.speed.x += playerSpeed;
    }
    motion = new Vector(this.speed.x * step, 0);
    newPos = this.pos.plus(motion);
    obstacle = level.obstacleAt(newPos, this.size);
    if (obstacle) {
        level.playerTouched(obstacle);
    }
    else {
        this.pos = newPos;
    }
};

Player.prototype.moveY = function(step, level, keys) {
    var motion,
        newPos,
        obstacle;
    this.speed.y = 0;
    if (keys.up) {
        this.speed.y -= playerSpeed;
    }
    if (keys.down) {
        this.speed.y += playerSpeed;
    }
    motion = new Vector(0, this.speed.y * step);
    newPos = this.pos.plus(motion);
    obstacle = level.obstacleAt(newPos, this.size);
    if (obstacle) {
        level.playerTouched(obstacle);
    }
    else {
        this.pos = newPos;
    }
};

Player.prototype.act = function(step, level, keys) {
    this.moveX(step, level, keys);
    this.moveY(step, level, keys);
    var otherActor = level.actorAt(this);
    if (otherActor) {
        level.playerTouched(otherActor.type, otherActor, this);
    }
    if (level.status === 'lost') {
        this.pos.y += step;
        this.size.y -= step;
    }
};