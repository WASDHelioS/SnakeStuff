import { Drawable } from "./Drawables/drawable.js";
import { Food } from "./Drawables/food.js";
import { GameObject } from "./Drawables/gameObject.js";
import { MenuObject } from "./Drawables/menuObject.js";

export class Engine {
    constructor(fps) {
        this.fps = fps;
        this.fpsInterval = 0;
        this.startTime;
        this.now=0;
        this.then;
        this.elapsed;
        this.drawable;
        this.cnv;
        this.ctx;
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

    draw(drawable, cnv, ctx, mode) {
        for(let i = 0; i < drawable.length; ++i) {
            if(drawable[i] instanceof Drawable) {
                
                ctx.beginPath();
                
                if(drawable[i] instanceof GameObject) {
                    ctx.beginPath();
                    drawable[i].draw(cnv,ctx);
                    if(mode){
                        ctx.beginPath();
                        drawable[i].drawBound(cnv,ctx);
                    }
                } else if(drawable[i] instanceof MenuObject) {
                    drawable[i].draw(cnv,ctx);
                }
                ctx.stroke();
            }
        }
    }

    drawScore(score, cnv, ctx) {
        ctx.font = "16px Arial";
        ctx.fillStyle =  "#0095DD";
        ctx.fillText("Score : " + score,10,20);
        ctx.stroke();
    }

    update(drawable,cnv,ctx, timestamp) {
        ctx.clearRect(0,0,cnv.width,cnv.height);
        for(let i = 0; i < drawable.length; i++) {
            if(drawable[i] instanceof Drawable) {
                drawable[i].update(timestamp);
            }
        }
    }

    getMousePos(cnv, event) {
        var rect = cnv.getBoundingClientRect();
        return {
            x: event.clientX - rect.left,
            y: event.clientY - rect.top
        }
    }

    generateFood(currentAmount,cnv,ctx) {
        if(currentAmount < 5) {
            if((Math.random() * 1000) > 990) {
                var x = Math.random()*cnv.width;
                if(x < 20) {x=20;} else if(x > cnv.width-20){ x= cnv.width-20;}

                var y = Math.random()*cnv.height;
                if(y < 20) {y=20;} else if(y > cnv.height-20){ y= cnv.height-20; }

                var size = Math.random()*20;
                if(size < 10) { size = 10;}
                var cycle_length = Math.random()* 1500;
                if(cycle_length < 500) {cycle_length = 500; }
                return new Food(x,y,size,cycle_length);
            }
        }
        return null;
    }

    checkCollision(player, objects) {
        //sorting for breaking early when player x < obj.hbx, cause if player x < obj.hbx, any obj after that will also not need to be checked
        var temp =[];
        temp = objects.slice();
        temp.sort(this.compareObjectsByX);

        for(var obj of temp) {
            if(player.hbx_max <= obj.hbx_min) {
                break;
            } else {
                if((player.hbx_min >= obj.hbx_min && player.hbx_min <= obj.hbx_max &&
                    player.hby_min >= obj.hby_min && player.hby_min <= obj.hby_max) ||

                    (player.hbx_max >= obj.hbx_min && player.hbx_max <= obj.hbx_max
                    && player.hby_min >= obj.hby_min && player.hby_min <= obj.hby_max) ||

                    (player.hbx_min >= obj.hbx_min && player.hbx_min <= obj.hbx_max &&
                    player.hby_max >= obj.hby_min && player.hby_max <= obj.hby_max) ||
                    
                    (player.hbx_max >= obj.hbx_min && player.hbx_max <= obj.hbx_max &&
                    player.hby_max >= obj.hby_min && player.hby_max <= obj.hby_max)) {
                    return obj;
                }
            }
        }
        return null;
    }

    compareObjectsByX(a,b) {
        if(a.x < b.x) {
            return -1;
        } else if(a.x > b.x) {
            return 1;
        }
        return 0;
    }

    isMouseInside(pos, rect) {
        return pos.x > rect.x && pos.x < rect.x+rect.width && pos.y < rect.y+rect.height && pos.y > rect.y; 
    }
    /*
        initKeyEventListeners: function(player,spd) {
            if(player != null) {
                document.addEventListener('keydown',(e) => {

                    if(e.code === "ArrowLeft") {
                        if(player.direction < 0+spd) {
                            player.direction = 360 - spd;
                        } else {
                            player.direction -= spd;
                        }
                    }

                    if(e.code === "ArrowRight") {
                        console.log(player.direction);
                    
                        if(player.direction > (360-spd-1)) {
                            player.direction = 0;
                        } else {
                            player.direction += spd;
                        }
                    }
                });
            
            }
        }
        ,*/
}