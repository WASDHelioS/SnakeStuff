import { GameObject } from "../Drawables/gameObject.js";
import { Player } from "../Drawables/player.js";

export class Renderer{
    constructor(cnv,ctx){
        this.cnv = cnv;
        this.ctx = ctx;
        this.mode = false;
    }

    //Draw functionality:
    //Checks what properties this object has: if its an array, start looping and drawing.
    //                                        if said array contains gameObjects & hitbox mode is enabled, draw hitbox too
    //lastly draw player if present
    // Hardly differentiates between what specifically to draw, tries to keep generic.
    draw(object) {        
        for(var property in object) {
            if(Array.isArray(object[property])) {
                for(var obj of object[property]) {
                    this.ctx.beginPath();
                    obj.draw(this.cnv,this.ctx);
                    this.ctx.stroke();
                    if(obj instanceof GameObject && this.mode) {
                        this.ctx.beginPath();
                        obj.drawBound(this.cnv,this.ctx);
                        this.ctx.stroke();
                    }
                }
            } else if(object[property] instanceof Player){
                this.ctx.beginPath();
                object[property].draw(this.cnv,this.ctx);
                this.ctx.stroke();
                if(this.mode) {
                    this.ctx.beginPath();
                    object[property].drawBound(this.cnv,this.ctx);
                    this.ctx.stroke();
                }
            }
        }
    }

    drawScore(score) {
        this.ctx.font = "16px Arial";
        this.ctx.fillStyle =  "#0095DD";
        this.ctx.fillText("Score : " + score,10,20);
        this.ctx.stroke();
    }

    //updates each specific object in object: if object has array properties, loop through and update,
    //lastly update player.
    update(object, timestamp) {
        this.ctx.clearRect(0,0,this.cnv.width,this.cnv.height);
        
        for(var property in object) {
            if(Array.isArray(object[property])) {
                for(var obj of object[property]) {
                    obj.update(timestamp);
                }
            } else if(object[property] instanceof Player) {
                object[property].update(timestamp);
            }
        }
    }
}