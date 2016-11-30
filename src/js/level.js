'use strict';
function Level(plan) {
    this.getGameObjects(plan);
}

Level.prototype.getGameObjects = function (plan) {
    var actorChars = {
        '@': Player,
        'o': Coin
    };
    this.width = plan[0].length;
    this.height = plan.length;
    this.grid = [];
    this.actors = [];

    for (var y = 0; y < this.height; y += 1) {
        var line = plan[y],
            gridLine = [];
        for (var x = 0; x < this.width; x += 1) {
            var ch = line[x],
                fieldType = null,
                Actor = actorChars[ch];
            if (Actor) {
                this.actors.push(new Actor(new Vector(x, y), ch));
            }
            else {
                switch (ch) {
                    case '~':
                        fieldType = 'water';
                        break;
                    case 'w':
                        fieldType = 'waterFull';
                        break;
                    case '-':
                        fieldType = 'landTopCenter';
                        break;
                    case '\\':
                        fieldType = 'landTopLeft';
                        break;
                    case '/':
                        fieldType = 'landTopRight';
                        break;
                    case '|':
                        fieldType = 'landCenter';
                        break;
                    case '(':
                        fieldType = 'landLeft';
                        break;
                    case ')':
                        fieldType = 'landRight';
                        break;
                    case '_':
                        fieldType = 'landBot';
                        break;
                    case '[':
                        fieldType = 'landBotLeft';
                        break;
                    case ']':
                        fieldType = 'landBotRight';
                        break;
                }
            }
            // else if (ch === 'x') {
            //     fieldType = 'wall';
            // }
            // else if (ch === '!') {
            //     fieldType = 'lava';
            // }
            // else if (ch === '~') {
            //     fieldType = 'water';
            // }
            // else if (ch === 'w') {
            //     fieldType = 'fWater';
            // }
            // else if (ch === '') {
            //     fieldType = 'water';
            // }
            gridLine.push(fieldType);
        }
        this.grid.push(gridLine);
    }

    this.player = this.actors.filter(function (actor) {
        return actor.type == 'player';
    })[0];
    this.status = this.finishDelay = null;
}

Level.prototype.isFinished = function () {
    return this.status != null && this.finishDelay < 0;
};

Level.prototype.obstacleAt = function (pos, size) {
    var xStart = Math.floor(pos.x),
        xEnd = Math.ceil(pos.x + size.x),
        yStart = Math.floor(pos.y),
        yEnd = Math.ceil(pos.y + size.y);
    if (xStart < 0 || xEnd > this.width || yStart < 0) {
        return 'wall';
    }
    if (yEnd > this.height) {
        return 'lava';
    }
    for (var y = yStart; y < yEnd; y += 1) {
        for (var x = xStart; x < xEnd; x += 1) {
            var fieldType = this.grid[y][x];
            if (fieldType) {
                return fieldType
            }
        }
    }
};

Level.prototype.actorAt = function (actor) {
    for (var i = 0; i < this.actors.length; i += 1) {
        var other = this.actors[i];
        if (other != actor &&
            actor.pos.x + actor.size.x > other.pos.x &&
            actor.pos.x < other.pos.x + other.size.x &&
            actor.pos.y + other.size.y > other.pos.y &&
            actor.pos.y < other.pos.y + other.size.y) {
            return other;
        }
    }
};

Level.prototype.animate = function (step, keys) {
    if (this.status != null) {
        this.finishDelay -= step;
    }
    while (step > 0) {
        var thisStep = Math.min(step, maxStep);
        this.actors.forEach(function (actor) {
            actor.act(thisStep, this, keys);
        }, this);
        step -= thisStep;
    }
};

Level.prototype.act = function (step, level) {
    var newPos = this.pos.plus(this.speed.times(step));
    if (!level.obstacleAt(newPos, this.size)) {
        this.pos = newPos;
    }
    else if (this.repeatPos) {
        this.pos = this.repeatPos;
    }
    else {
        this.speed = this.speed.times(-1);
    }
};

Level.prototype.playerTouched = function (type, actor) {
    if (type === 'lava' && this.status === null) {
        this.status = 'lost';
        this.finishDelay = 1;
    }
    else if (type === 'coin') {
        this.actors = this.actors.filter(function (other) {
            return other != actor;
        });
        if (!this.actors.some(function (actor) {
            return actor.type === 'coin';
        })) {
            this.status = 'won';
            this.finishDelay = 1;
        }
    }
};