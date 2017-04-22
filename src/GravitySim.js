/**
 * Created by cesumilo on 18/04/2017.
 */

/**
 * Global variables.
 */
var canvas = document.getElementById("window-app");
canvas.setAttribute("width", "500");
canvas.setAttribute("height", "500");
var ctx = canvas.getContext("2d");
var sprites = [ Circle([400, 100], 5, 100), Circle([100, 100], 5, 100), Circle([200, 200], 5, 100, [ 0, 0 ]) ];
var fps = 60,
    start = Date.now(),
    frameDuration = 1000 / fps,
    lag = 0;

function mainLoop() {
    window.requestAnimationFrame(mainLoop);

    var current = Date.now(),
        elapsed = current - start;
    start = current;
    lag += elapsed;

    while (lag >= frameDuration) {
        update();
        lag -= frameDuration;
    }

    var lagOffset = lag / frameDuration;
    draw(lagOffset);

    actualFps = Math.floor(1000 / elapsed);
    document.getElementById("fps").innerText = "Fps : " + actualFps;
    document.getElementById("lag").innerText = "Lag : " + lag;
    document.getElementById("lagOffset").innerText = "Lag offset : " + lagOffset;
}

var test = 0;

function update() {
    for (var i = 0; i < sprites.length; i++) {
        var forces = [];
        for (var j = 0; j < sprites.length; j++) {
            if (i == j) continue;
            forces.push(sprites[i].computeGravitation(sprites[j]));
        }
        sprites[i].update(forces);
    }
}

function draw(lagOffset) {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    sprites.forEach(function(sprite) {
        ctx.save();
        sprite.render(ctx, lagOffset);
        ctx.restore();
    });
}

