import { Drawable } from "./Drawables/drawable.js";
import { Food } from "./Drawables/food.js";
import { GameObject } from "./Drawables/gameObject.js";
import { MenuObject } from "./Drawables/menuObject.js";
import {CollisionHandler} from "./collisionHandler.js";
import { Button } from "./Drawables/button.js";
import {Player} from "./Drawables/player.js";

export class Engine {
    constructor(fps) {
        this.fps = fps;
        this.fpsInterval = 0;
        this.startTime;
        this.now=0;
        this.then;
        this.elapsed;
        this.cnv = this.getCanvas();
        this.ctx = this.getCtx();
        this.collisionHandler = new CollisionHandler();
    }

    getCanvas() {
        return document.getElementById("snake");
    }

    getCtx() {
        var canvas = document.getElementById("snake");
        if(canvas.getContext) {
            return canvas.getContext('2d');
        }
    }


    //Draw functionality:
    //Checks what properties this object has: if its an array, start looping and drawing.
    //                                        if said array contains gameObjects & hitbox mode is enabled, draw hitbox too
    //lastly draw player if present
    // Hardly differentiates between what specifically to draw, tries to keep generic.

    draw(object, mode) {        
        for(var property in object) {
            if(Array.isArray(object[property])) {
                for(var obj of object[property]) {
                    this.ctx.beginPath();
                    obj.draw(this.cnv,this.ctx);
                    this.ctx.stroke();
                    if(obj instanceof GameObject && mode) {
                        this.ctx.beginPath();
                        obj.drawBound(this.cnv,this.ctx);
                        this.ctx.stroke();
                    }
                }
            } else if(object[property] instanceof Player){
                this.ctx.beginPath();
                object[property].draw(this.cnv,this.ctx);
                this.ctx.stroke();
                if(mode) {
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

    getMousePos(event) {
        var rect = this.cnv.getBoundingClientRect();
        return {
            x: event.clientX - rect.left,
            y: event.clientY - rect.top
        }
    }

    generateFood(currentAmount) {
        if(currentAmount < 5) {
            if((Math.random() * 1000) > 990) {
                var x = Math.random()*this.cnv.width;
                if(x < 20) {x=20;} else if(x > this.cnv.width-20){ x= this.cnv.width-20;}

                var y = Math.random()*this.cnv.height;
                if(y < 20) {y=20;} else if(y > this.cnv.height-20){ y= this.cnv.height-20; }

                var size = Math.random()*20;
                if(size < 10) { size = 10;}
                var cycle_length = Math.random()* 1500;
                if(cycle_length < 500) {cycle_length = 500; }
                return new Food(x,y,size,cycle_length);
            }
        }
        return null;
    }

    checkCollision(objects, scoreHandler) {
        //sorting for breaking early when player x < obj.hbx, cause if player x < obj.hbx, any obj after that will also not need to be checked
        return this.collisionHandler.handleCollision(objects,scoreHandler);
    }

    checkOutOfBounds(player) {
      if(player.x > this.cnv.width || player.y > this.cnv.height || player.x < 0 || player.y < 0) {
        return true;
      }
    }

    isMouseInside(pos, rect) {
        return pos.x > rect.x && pos.x < rect.x+rect.width && pos.y < rect.y+rect.height && pos.y > rect.y;
    }
}
