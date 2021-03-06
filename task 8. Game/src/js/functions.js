'use strict';
var scale = 16,
    halfScale = scale / 2,
    maxStep = 0.01,
    playerSpeed = 10,
    arrowCodes = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    },
    arrows = trackKeys(arrowCodes),
    alert = document.getElementById('alert');
if (typeof module != "undefined" && module.exports)
    module.exports = GAME_LEVEL;

document.onkeyup = function(e) {
    if (e.keyCode === 13) {
        alert.classList.add('alertNone');
        runGame(GAME_LEVEL, CanvasDisplay);
    }
}

function trackKeys(codes) {
    var pressed = Object.create(null);
    function handler(event) {
        if (codes.hasOwnProperty(event.keyCode)) {
            var down = event.type === 'keydown';
            pressed[codes[event.keyCode]] = down;
            event.preventDefault();
        }
    }
    addEventListener('keydown', handler);
    addEventListener('keyup', handler);
    return pressed;
}

function runAnimation(frameFunc) {
    var lastTime = null;
    function frame(time) {
        var stop = false;
        if (lastTime != null) {
            var timeStep = Math.min(time - lastTime, 30) / 1000;
            stop = frameFunc(timeStep) === false;
        }
        lastTime = time;
        if (!stop) {
            requestAnimationFrame(frame);
        }
    }
    requestAnimationFrame(frame);
}

function runLevel(level, Display, andThen) {
    var display = new Display(document.getElementById('game'), level);
    runAnimation(function(step) {
        level.animate(step, arrows);
        display.drawFrame(step);
        if (level.isFinished()) {
            display.clear();
            if (andThen)
                andThen(level.status);
            return false;
        }
    });
}

function runGame(plans, Display) {
    function startLevel(n) {
        runLevel(new Level(plans[n]), Display, function(status) {
            if (status === 'lost') {
                alert.classList.remove('alertNone');
                alert.innerHTML = 'You lose, press enter to restart';
                document.onkeyup = function(e) {
                    if (e.keyCode === 13) {
                        alert.classList.add('alertNone');
                        startLevel(n);
                    }
                }
            }
        });
    }
    startLevel(0);
}
