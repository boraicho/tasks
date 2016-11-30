'use strict';
function Level(plan) {
    this.getGameObjects(plan);
}

Level.prototype.getGameObjects = function(plan) {
    var actorChars = {
        '@': Player,
        '.': Food,
        't': Teleport,
        'b': Ghost,
        'p': Ghost,
        'i': Ghost,
        'c': Ghost
    };
    this.width = plan[0].length;
    this.height = plan.length;
    this.grid = [];
    this.actors = [];
    this.actorsArray;
    this.life = 3;
    this.score = 0;

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
            else if (ch === " ") {
                fieldType = null;
            }
            else {
                fieldType = ch;
            }
            gridLine.push(fieldType);
        }
        this.grid.push(gridLine);
    }
    this.actorsArray = this.actors;

    this.player = this.actors.filter(function(actor) {
        return actor.type == 'player';
    })[0];
    this.status = this.finishDelay = null;
}

Level.prototype.isFinished = function() {
    return this.status != null && this.finishDelay < 0;
};

Level.prototype.obstacleAt = function(pos, size) {
    var xStart = Math.floor(pos.x),
        xEnd = Math.ceil(pos.x + size.x),
        yStart = Math.floor(pos.y),
        yEnd = Math.ceil(pos.y + size.y),
        fieldType;
    for (var y = yStart; y < yEnd; y += 1) {
        for (var x = xStart; x < xEnd; x += 1) {
            fieldType = this.grid[y][x];
            if (fieldType) {
                return fieldType
            }
        }
    }
};

Level.prototype.actorAt = function(actor) {
    var other;
    for (var i = 0; i < this.actors.length; i += 1) {
        other = this.actors[i];
        if (other != actor &&
            actor.pos.x + actor.size.x > other.pos.x &&
            actor.pos.x < other.pos.x + other.size.x &&
            actor.pos.y + other.size.y > other.pos.y &&
            actor.pos.y < other.pos.y + other.size.y) {
            return other;
        }
    }
};

Level.prototype.animate = function(step, keys) {
    if (this.status != null) {
        this.finishDelay -= step;
    }
    while (step > 0) {
        var thisStep = Math.min(step, maxStep);
        this.actors.forEach(function(actor) {
            if (actor.type != 'food' && actor.type != 'teleport') {
                actor.act(thisStep, this, keys, this.player);
            }
        }, this);
        step -= thisStep;
    }
};

Level.prototype.act = function(step, level) {
    var newPos = this.pos.plus(this.speed.times(step));
    if (!level.obstacleAt(newPos, this.size)) {
        this.pos = newPos;
    }
    else {
        this.speed = this.speed.times(-1);
    }
};

Level.prototype.playerTouched = function(type, actor, player) {
    if (type === 'ghost' && this.status === null) {
        player.pos = new Vector(13.6, 23);
        actor.pos = new Vector(13, 11);
        this.life -= 1;
        if (this.life === 0) {
            this.status = 'lost';
        }
        this.finishDelay = 1;
    }
    else if (type === 'teleport') {
        if (player.pos.x < 1) {
            var newPos = player.pos.plus(new Vector(27, 0));
            player.pos = newPos;
        }
        else if (player.pos.x > 27) {
            var newPos = player.pos.plus(new Vector(-27, 0));
            player.pos = newPos;
        }
    }
    else if (type === 'food') {
        this.actors = this.actors.filter(function(other) {
            return other != actor;
        });
        this.score += 1;
        if (!this.actors.some(function(actor) {
            return actor.type === 'food';
        })) {
            this.nextLevel();
            this.finishDelay = 1;
        }
    }
};

Level.prototype.nextLevel = function() {
    var player = this.actors.filter(function(actor) {
        return actor.type === 'player';
    }),
        ghost = this.actors.filter(function(actor) {
            return actor.type === 'ghost';
        });
    this.actorsArray.forEach(function(actor) {
        if (actor.type === 'player') {
            actor.pos = player[0].pos;
        }
        else if (actor.type === 'ghost') {
            actor.pos = ghost[0].pos;
        }
    }, this);
    this.actors = this.actorsArray;
};