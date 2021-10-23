import { degreesToRadians } from "../mathHelper.js";
import { GameObject } from "./gameObject.js";


export class Player extends GameObject{
    constructor(x,y,speed) {
        super(x+10,y+10,20);
        this.x = x;
        this.y = y;

        this.centerx = x-10;
        this.centery = y-10;
        this.direction=0;
        this.speed = speed;
        this.waka_angle = 40;

        this.cycle_length = 500;
    }
    draw(cnv,ctx) {
        ctx.strokeStyle='black';
        ctx.lineWidth = 5;
        ctx.moveTo(this.x,this.y);
        
        var x1=20*Math.cos(degreesToRadians(this.direction+90+this.waka_angle))+this.x;
        var y1=20*Math.sin(degreesToRadians(this.direction+90+this.waka_angle))+this.y;
        ctx.lineTo(x1,y1);

        ctx.moveTo(this.x,this.y);

        var x2=20*Math.cos(degreesToRadians(this.direction+90 - this.waka_angle))+this.x;
        var y2=20*Math.sin(degreesToRadians(this.direction+90 - this.waka_angle))+this.y;
        ctx.lineTo(x2, y2);
        
        ctx.moveTo(this.x,this.y);
        ctx.arc(this.x,this.y, 20,degreesToRadians(this.direction+90+this.waka_angle),degreesToRadians(this.direction+90 - this.waka_angle));
        ctx.stroke();
    }
    move() {

        this.x -= this.speed * Math.sin(degreesToRadians(this.direction));
        this.y += this.speed * Math.cos(degreesToRadians(this.direction));
        
        this.centerx = this.x - 10;
        this.centery = this.y - 10;

        var x = this.centerx; 
        x -= 10*Math.sin(degreesToRadians(this.direction));
        var y = this.centery;
        y += 10*Math.cos(degreesToRadians(this.direction));
        this.moveBound(x,y);
        
    }
    update(timestamp) {

        this.waka_angle = (timestamp % this.cycle_length)/this.cycle_length;

        this.waka_angle = Math.cos(this.waka_angle * Math.PI * 2)+1;

        this.waka_angle = this.waka_angle * 20;
    }
    destroy() {
        delete this;
    }
}
