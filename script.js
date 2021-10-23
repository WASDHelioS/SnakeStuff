
    const canvas = document.getElementById("canvas");

    if(!canvas.getContext) {
    }
    const ctx = canvas.getContext('2d');

const margin = 10;
const cycleLength=1000;
var width = 200;
var x = 200;
var y= 200;

var shape;

class Line {
    constructor(lx,ly, ctx) {
        this.lx = lx;
        this.ly = ly;

        ctx.beginPath();
        ctx.moveTo(200,250);
        ctx.lineTo(lx,ly);
        ctx.stroke();

        ctx.beginPath();
        ctx.moveTo(200,150);
        ctx.lineTo(lx,ly);
        ctx.stroke();

        ctx.beginPath();
        ctx.moveTo(150,200);
        ctx.lineTo(lx,ly);
        ctx.stroke();

        ctx.beginPath();
        ctx.moveTo(250,200);
        ctx.lineTo(lx,ly);
        ctx.stroke();

    }
}

class Triangle {

}

class Circle {
    constructor(lx,ly,ra,ctx) {
        ctx.beginPath();
        ctx.arc(lx,ly,ra,0,2*Math.PI);
        ctx.stroke();
    }
}

function draw(lx,ly) {
        // set line stroke and line width
        ctx.strokeStyle = 'red';
        ctx.lineWidth = 5;
        // draw a red line
        switch(shape) {
            case "circle":
                new Circle(lx,ly,10,ctx);
                break;
            case "triangle":
                break;
            case "lines":
                new Line(lx,ly,ctx);
                break;
        }
}

function update(progress) {
    ctx.clearRect(0,0,canvas.width,canvas.height);
}

function loop(timestamp) {
    
    const cycleCompletion =
        (timestamp % cycleLength) / cycleLength;

    const cos = Math.cos(cycleCompletion * Math.PI * 2);
    const cosMapped = (cos/2+0.5) * width + (x/2);

    const sin = Math.sin(cycleCompletion*Math.PI*2);
    const sinMapped = (sin/2+0.5)* width + (y/2);

    update();
    draw(sinMapped,cosMapped);

    window.requestAnimationFrame(loop);
}

var lastRender = 0;
window.requestAnimationFrame(loop);

window.onload=function() {
    document.getElementById('shapeButton').addEventListener("click", function() {
        var select = document.getElementById('shape');
        shape = select.options[select.selectedIndex].value;
    });
}
