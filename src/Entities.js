/**
 * Created by cesumilo on 22/04/2017.
 */

/**
 * Important !
 * We start from the post that each object is a circle.
 */
var Circle = function (pos, radius, mass, init_v) {
    var obj = {};
    obj.pos = pos;
    obj.oldPos = pos;
    obj.radius = radius;
    obj.v = (typeof init_v !== 'undefined') ? init_v : [0, 0];
    obj.a = [0, 0];
    obj.mass = mass;
    obj.renderPos = pos;

    obj.intersect = function (other) {
        const distance = Math.sqrt(Math.pow(obj.pos[0] - other.pos[0], 2) + Math.pow(obj.pos[1] - other.pos[1], 2));
        return (distance < (obj.radius + other.radius));
    };

    obj.computeGravitation = function (other) {
        const G = 1 /*6.67384 * Math.pow(10, -11) */;
        const distance = Math.sqrt(Math.pow(obj.pos[0] - other.pos[0], 2) + Math.pow(obj.pos[1] - other.pos[1], 2));
        var gravitationF = G * other.mass / Math.pow(distance, 2);

        if (gravitationF.toString() === "NaN")
            gravitationF = 0;

        const direction = [other.pos[0] - obj.pos[0], other.pos[1] - obj.pos[1]];
        const dir_length = Math.sqrt(Math.pow(direction[0], 2) + Math.pow(direction[1], 2));
        var normalized_dir = [direction[0] / dir_length, direction[1] / dir_length];

        normalized_dir[0] *= gravitationF;
        normalized_dir[1] *= gravitationF;

        return (normalized_dir);
    };

    obj.update = function (forces) {
        obj.oldPos = obj.pos;

        for (var i = 0; i < forces.length; i++) {
            obj.v[0] += forces[i][0];
            obj.v[1] += forces[i][1];
        }

        obj.pos[0] += obj.v[0];
        obj.pos[1] += obj.v[1];
    };

    obj.render = function (ctx, lagOffset) {
        const renderX = (obj.pos[0] - obj.oldPos[0]) * lagOffset + obj.oldPos[0];
        const renderY = (obj.pos[1] - obj.oldPos[1]) * lagOffset + obj.oldPos[1];

        ctx.beginPath();
        ctx.arc(renderX, renderY, radius, 0, 2 * Math.PI, false);
        ctx.fillStyle = 'black';
        ctx.fill();
        ctx.lineWidth = 5;
        ctx.strokeStyle = 'black';
        ctx.stroke();
    };

    return obj;
};


var Star = function(pos, radius, mass) {
    return Circle(pos, radius, mass);
};

var Planet = function(pos, radius, mass) {
    return Circle(pos, radius, mass);
};

var Particle = function(pos, radius, mass) {
    return Circle(pos, radius, mass);
};
