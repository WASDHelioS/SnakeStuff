import { Food } from "../Drawables/food.js";
import {CollisionHandler} from "./collisionHandler.js";
import { InputHandler } from "./inputHandler.js";
import { Renderer } from "./renderer.js";

export class Engine {
    constructor(fps) {
        this.fps = fps;
        this.fpsInterval = 0;
        this.startTime;
        this.now=0;
        this.then;
        this.elapsed;
        this.cnv = this.getCanvas();
        this.collisionHandler = new CollisionHandler();
        this.inputHandler = new InputHandler();
        this.renderer = new Renderer(this.cnv,this.getCtx());
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

    renderObjects(objects, timestamp) {
        this.renderer.update(objects,timestamp);
        this.renderer.draw(objects);
    }

    renderScore(scoreHandler) {
        this.renderer.drawScore(scoreHandler);
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

    handleInput(player, turning_speed) {
        this.renderer.mode = this.inputHandler.handleInput(player,turning_speed);
    }
}
