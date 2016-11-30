'use strict';
var scale = 20,
    maxStep = 0.05,
    wobbleSpeed = 8,
    wobbleDist = 0.07,
    playerXSpeed = 7,
    gravity = 30,
    jumpSpeed = 17,
    arrowCodes = {
        37: 'left',
        38: 'up',
        39: 'right'
    },
    arrows = trackKeys(arrowCodes);
if (typeof module != "undefined" && module.exports)
    module.exports = GAME_LEVELS;

runGame(GAME_LEVELS, DOMDisplay);
// runGame(GAME_LEVELS, CanvasDisplay);
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
            var timeStep = Math.min(time - lastTime, 100) / 1000;
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
    var display = new Display(document.body, level);
    runAnimation(function (step) {
        level.animate(step, arrows);
        display.drawFrame(step);
        if (level.isFinished()) {
            display.clear();
            if (andThen) {
                andThen(level.status);
            }
            return false;
        }
    });
}

function runGame(plans, Display) {
    function startLevel(n) {
        runLevel(new Level(plans[n]), Display, function (status) {
            if (status === 'lost') {
                startLevel(n);
            }
            else if (n < plans.length - 1) {
                startLevel(n + 1);
            }
            else {
                console.log('You win!');
            }
        });
    }
    startLevel(0);
}