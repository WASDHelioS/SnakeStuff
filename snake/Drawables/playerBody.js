import { degreesToRadians } from "../Utils/mathHelper.js";
import { GameObject } from "./gameObject.js";

export class PlayerBody extends GameObject{
    constructor(player, first) {
        if(!first) {
            super(player.x-10,player.y-10,10);
        } else {
            super(null,null,null);
        }
        this.player = player;

        this.x = player.x -  -Math.sin(degreesToRadians(player.direction));
        this.y = player.y -  -Math.cos(degreesToRadians(player.direction));

        this.direction=player.direction;        
        this.speed = player.speed;
        this.minDistance = 1;
        this.maxDistance = 4;
        this.first = first;
    }

    draw(cnv,ctx) {
        ctx.strokeStyle='black';
        ctx.lineWidth = 5;
        ctx.moveTo(this.x,this.y);
        
        ctx.arc(this.x,this.y,5,0,2*Math.PI);
        ctx.closePath();
        ctx.stroke();
    }
    
    move(time) {
        time/=30;

        var dx = this.player.x - this.x;
        if(dx > 30) {
            dx = 30;
        } else if (dx < -30) {
            dx = -30;
        }

        var dy = this.player.y - this.y;
        if(dy > 30) {
            dy = 30;
        } else if(dy < -30) {
            dy = -30;
        }

        var length = Math.sqrt(dx*dx + dy*dy)+ this.minDistance;
        if(length ) {
            if(length > 40) { length = 40; }
            if(length < 30) { length = 30; }
            dx /= length;
            dy /= length;
        }
        //figure out how to keep max distance
            this.x += dx * this.speed;
            this.y += dy * this.speed;
        if(!this.first) {
            this.moveBound(this.x-5,this.y-5);
        }
    }
    destroy() {
        this.player = null;
        delete this;
    }
}