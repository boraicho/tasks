'use strict';
function CanvasDisplay(parent, level) {
    this.canvas = document.createElement('canvas');
    this.canvas.width = level.width * scale;
    this.canvas.height = level.height * scale + 50;
    parent.appendChild(this.canvas);
    this.cx = this.canvas.getContext('2d');
    this.cx.fillStyle = '#000000';
    this.cx.fillRect(0, 0, this.canvas.width, this.canvas.height);
    this.level = level;
    this.drawFrame();
}

CanvasDisplay.prototype.clearDisplay = function() {
    this.cx.fillStyle = '#000000';
    this.cx.fillRect(0, 0, this.canvas.width, this.canvas.height);
};

CanvasDisplay.prototype.drawFrame = function() {
    this.clearDisplay();
    this.drawBackground();
    this.drawActors();
};

CanvasDisplay.prototype.drawBackground = function() {
    this.drawLife();
    this.drawScore();
    for (var i = 0; i < this.level.grid.length; i += 1) {
        for (var j = 0; j < this.level.grid[i].length; j += 1) {
            var x = j * scale,
                y = i * scale;
            if (this.level.grid[i][j] === null) {
                continue;
            }
            else if (this.level.grid[i][j] === '-') {
                this.cx.fillStyle = '#0000aa';
                this.cx.fillRect(x, y, scale, halfScale);
            }
            else if (this.level.grid[i][j] === '_') {
                this.cx.fillStyle = '#0000aa';
                this.cx.fillRect(x, y + halfScale, scale, halfScale);
            }
            else if (this.level.grid[i][j] === '[') {
                this.cx.fillStyle = '#0000aa';
                this.cx.fillRect(x, y, halfScale, scale);
            }
            else if (this.level.grid[i][j] === ']') {
                this.cx.fillStyle = '#0000aa';
                this.cx.fillRect(x + halfScale, y, halfScale, scale);
            }
            else if (this.level.grid[i][j] === '1') {
                this.cx.beginPath();
                this.cx.moveTo(x, y);
                this.cx.lineTo(x + scale, y);
                this.cx.lineTo(x + scale, y + halfScale);
                this.cx.lineTo(x + halfScale, y + halfScale);
                this.cx.lineTo(x + halfScale, y + scale);
                this.cx.lineTo(x, y + scale);
                this.cx.fillStyle = '#0000aa';
                this.cx.fill();
            }
            else if (this.level.grid[i][j] === '2') {
                this.cx.beginPath();
                this.cx.moveTo(x, y);
                this.cx.lineTo(x + scale, y);
                this.cx.lineTo(x + scale, y + scale);
                this.cx.lineTo(x + halfScale, y + scale);
                this.cx.lineTo(x + halfScale, y + halfScale);
                this.cx.lineTo(x, y + halfScale);
                this.cx.fillStyle = '#0000aa';
                this.cx.fill();
            }
            else if (this.level.grid[i][j] === '3') {
                this.cx.beginPath();
                this.cx.moveTo(x, y);
                this.cx.lineTo(x, y + scale);
                this.cx.lineTo(x + scale, y + scale);
                this.cx.lineTo(x + scale, y + halfScale);
                this.cx.lineTo(x + halfScale, y + halfScale);
                this.cx.lineTo(x + halfScale, y);
                this.cx.fillStyle = '#0000aa';
                this.cx.fill();
            }
            else if (this.level.grid[i][j] === '4') {
                this.cx.beginPath();
                this.cx.moveTo(x + scale, y);
                this.cx.lineTo(x + scale, y + scale);
                this.cx.lineTo(x, y + scale);
                this.cx.lineTo(x, y + halfScale);
                this.cx.lineTo(x + halfScale, y + halfScale);
                this.cx.lineTo(x + halfScale, y);
                this.cx.fillStyle = '#0000aa';
                this.cx.fill();
            }
            else if (this.level.grid[i][j] === '5') {
                this.cx.fillStyle = '#0000aa';
                this.cx.fillRect(x, y + halfScale, halfScale, halfScale);
            }
            else if (this.level.grid[i][j] === '6') {
                this.cx.fillStyle = '#0000aa';
                this.cx.fillRect(x + halfScale, y + halfScale, halfScale, halfScale);
            }
            else if (this.level.grid[i][j] === '7') {
                this.cx.fillStyle = '#0000aa';
                this.cx.fillRect(x, y, halfScale, halfScale);
            }
            else if (this.level.grid[i][j] === '8') {
                this.cx.fillStyle = '#0000aa';
                this.cx.fillRect(x + halfScale, y, halfScale, halfScale);
            }
        }
    }
};

CanvasDisplay.prototype.drawFood = function(x, y, width) {
    var color = '#c695b0';
    this.drawCircle(x, y, width, color)
};

CanvasDisplay.prototype.drawPlayer = function(x, y, width) {
    var color = '#dbd84a';
    this.drawCircle(x, y, width, color);
};

CanvasDisplay.prototype.drawActors = function() {
    this.level.actors.forEach(function(actor) {
        var width = actor.size.x * scale,
            height = actor.size.y * scale,
            x = actor.pos.x * scale,
            y = actor.pos.y * scale,
            skin = actor.skin;
        if (actor.type === 'player') {
            x += 7;
            y += 7;
            this.drawPlayer(x, y, width);
        }
        else if (actor.type === 'food') {
            x += halfScale;
            y += halfScale;
            this.drawFood(x, y, width);
        }
        else if (actor.type === 'ghost') {
            this.drawGhost(x, y, skin);
        }
    }, this);
};

CanvasDisplay.prototype.clear = function() {
    this.canvas.parentNode.removeChild(this.canvas);
};

CanvasDisplay.prototype.drawCircle = function(x, y, width, color) {
    this.cx.beginPath();
    this.cx.arc(x, y, width, 0, 2 * Math.PI, false);
    this.cx.fillStyle = color;
    this.cx.fill();
    this.cx.stroke();
};

CanvasDisplay.prototype.drawGhost = function(x, y, skin) {
    var img = new Image(),
        self = this;
    img.src = "assets/img/ghost.png";
    if (skin === 'b') {
        self.cx.drawImage(img, 0, 0, 28, 20, x, y, 28, 20);
    }
    // else if (skin === 'p') {
    //     self.cx.drawImage(img, 0, 30, 28, 20, x, y, 28, 20);
    // }
    // else if (skin === 'i') {
    //     self.cx.drawImage(img, 0, 59, 28, 20, x, y, 28, 20);
    // }
    // else if (skin === 'c') {
    //     self.cx.drawImage(img, 0, 88, 28, 20, x, y, 28, 20);
    // }
};

CanvasDisplay.prototype.drawLife = function() {
    for (var i = 1; i < this.level.life + 1; i += 1) {
        var x = 20 * i,
            y = 520,
            radius = 8,
            color = '#dbd84a';
        this.drawCircle(x, y, radius, color);
    }
};

CanvasDisplay.prototype.drawScore = function() {
    this.cx.fillStyle = "#fff";
    this.cx.font = "italic 16px Arial";
    this.cx.fillText('score: ' + this.level.score, 350, 525);
};