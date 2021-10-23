import { Button } from "./Drawables/button.js";
import { Engine } from "./engine.js";
import { InputManager } from "./inputManager.js";
import { Player } from "./Drawables/player.js";
import { PlayerBody } from "./Drawables/playerBody.js";

var ctx;
var cnv;

var state;
var engine;

var button;
var buttonDrawn;

var inputManager = new InputManager();
var drawable = [];
const speed = 4;
const turning_speed = 3;

var mode;

var fps = 60;
var now;
var then = window.performance.now();
var interval = 1000/fps;
var delta;

var score;
var dead;
var player;
var playerBody = [];

var food = [];  //todo: add random food generation up to x amount of food,
                //todo: add food to this array, drop em into drawable afterwards.
                //todo: add collision checking
                //todo: add growing snake

window.onload= function() {
    init();
    initMenu();
    //Binding the click event on the canvas
    cnv.addEventListener('click', function(evt) {
        var mousePos = engine.getMousePos(cnv, evt);

        if(state == "onLoad") {
            if (engine.isMouseInside(mousePos,button)) {
                state = "started";
                initStartGame();
            }   
        }
    }, false);
}

function init() {
    engine = new Engine(60);
    cnv = engine.getCanvas();
    ctx = engine.getCtx();
    initMenu();
    
    requestAnimationFrame(loop);
}

function initMenu() {
    score = 0;
    button = new Button(cnv);
    drawable.push(button);
    state="onLoad";
    buttonDrawn = false;

}

function initStartGame() {

    for(var i = 0; i < drawable.length; ++i) {
        drawable[i].destroy();
    }
    drawable = [];

    player= new Player(cnv.width/2,cnv.height/2,speed);

    drawable.push(player);
}

function loop(timestamp) {
    now = window.performance.now();
    delta = now - then;
    if(delta > interval) {
        then = now - (delta % interval);
        if(state=="onLoad") {
            if(!buttonDrawn) {
                engine.update(drawable,cnv,ctx,timestamp);
                engine.draw(drawable,cnv,ctx);
                buttonDrawn=true;                
            }
        }

        //START GAME
        if(state == "started"){
            if(dead) {
                dead=false;
            }

            player.move();
            for(var body of playerBody) {
                body.move();
            }

            if(inputManager.keyDown("ArrowLeft")) {
                if(player.direction < 0+turning_speed) {
                    player.direction = 360 - turning_speed;
                } else {
                    player.direction -= turning_speed;
                }
            } else if(inputManager.keyDown("ArrowRight")) {
                if(player.direction > (360-turning_speed-1)) {
                    player.direction = 0;
                } else {
                    player.direction += turning_speed;
                }
            }

            if(inputManager.keyDown("ShiftLeft")) {
                mode=true;
            } else {
                mode=false;
            }

            var newfood = engine.generateFood(food.length,cnv,ctx);
            if(newfood != null) {
                food.push(newfood);
                drawable.push(newfood);
            }

            var foodcollision = engine.checkCollision(player,food);
            if(foodcollision != null) {
                food = food.filter(food => food !== foodcollision);
                drawable = drawable.filter(food => food !== foodcollision);
                
                var newBody;
                if(playerBody.length == 0) {
                    newBody = new PlayerBody(player, playerBody.length == 0);
                } else {
                    newBody = new PlayerBody(playerBody[playerBody.length-1],false);
                }
                playerBody.push(newBody);
                drawable.push(newBody);
                ++score;
            }

            var bodyCollision = engine.checkCollision(player, playerBody);
            if(bodyCollision != null) {
                dead = true;
            }

            engine.update(drawable,cnv,ctx,timestamp);

            engine.draw(drawable,cnv,ctx, mode);
            engine.drawScore(score,cnv,ctx);

            if(player.x > cnv.width || player.y > cnv.height || player.x < 0 || player.y < 0) {
                dead = true;
            }

            //END GAME
            if(dead) {
                state = "onLoad";
                for(var i = 0; i < drawable.length; ++i) {
                    drawable[i].destroy();
                    drawable[i] = null;
                }
                for(var i = 0; i < food.length; ++i) {
                    food[i].destroy();
                    food[i] = null;
                }
                for(var i = 0; i < playerBody.length; ++i) {
                    playerBody[i].destroy();
                    playerBody[i] = null;
                }
                drawable = [];
                food = [];
                playerBody = [];
                initMenu();
            }
        }
    }
    requestAnimationFrame(loop);
}