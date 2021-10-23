
import { ColorHelper } from "../colorHelper.js";
import { GameObject } from "./gameObject.js";


export class Food extends GameObject{
    constructor(x,y,size,cycle_length) {
        super(x-size,y-size,size*2);
        this.x=x;
        this.y=y;
        this.size = size;
        this.currentSize = size;
        this.cycle_length = cycle_length; // randomized between a set of numbers to vary growing and shrinking.
        this.color_cycle_length = cycle_length * 10;


        this.length;

        this.color= "rgb(1,1,1)";

        this.colorHelper = new ColorHelper();
    }

    draw(cnv,ctx) {
        ctx.strokeStyle=this.color;
        ctx.lineWidth = 5;
        ctx.arc(this.x,this.y,this.currentSize,0,2*Math.PI);
        ctx.closePath();
        ctx.stroke();
    }

    update(timestamp) {
        this.length = (timestamp % this.cycle_length)/this.cycle_length;
        this.currentSize = Math.cos(this.length * Math.PI * 2)+this.size-2;

        this.length = (timestamp % this.color_cycle_length)/ this.color_cycle_length;
        this.color = this.colorHelper.radianbow(this.length * Math.PI * 2);
        console.log(this.color);
    }
    
    destroy() {
        delete this;
    }
}