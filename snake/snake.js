import { Button } from "./Drawables/button.js";
import { Engine } from "./engine.js";
import { InputManager } from "./inputManager.js";
import { Player } from "./Drawables/player.js";
import {ScoreHandler} from "./scoreHandler.js";
import { InputHandler } from "./inputHandler.js";


var state;
var engine;

var button;
var buttonDrawn;

var inputHandler = new InputHandler(new InputManager());


//object containing all gameobjects, can add more if needed.
var gameObjects = {
  food: [],
  body: [],
  player: Player,
};

var menuObjects = {
  buttons: [],
};


const speed = 4;
const turning_speed = 3;


//mode, hitbox > no hitbox. Key=LeftShift
var mode;

var scoreHandler;


//fps things
var fps = 60;
var now;
var then = window.performance.now();
var interval = 1000/fps;
var delta;


//exported function to make sure we have an entry point to start game
export function refresh() {
  if(document.getElementById('snake')) {
    init();
    initMenu();
    //Binding the click event on the canvas
    engine.getCanvas().addEventListener('click', function (evt) {
      var mousePos = engine.getMousePos(evt);

      if (state == "onLoad") {
        if (engine.isMouseInside(mousePos, button)) {
          state = "started";
          initStartGame();
        }
      }
    }, false);
  }
}

//window.onload= function() {refresh();}

function init() {
    gameObjects.player=null;
    gameObjects.food=[];
    gameObjects.body=[];

    menuObjects.buttons=[];

    engine = new Engine(60);
    scoreHandler = new ScoreHandler();
    initMenu();

    requestAnimationFrame(loop);
}

function initMenu() {
    scoreHandler.score = 0;
    button = new Button();
    menuObjects.buttons.push(button);
    state="onLoad";
    buttonDrawn = false;

}

function initStartGame() {
  for(var property in menuObjects) {
    if(Array.isArray(menuObjects[property])) {
      for(var obj of menuObjects[property]) {
        obj.destroy();
        obj = [];
      }
    }
  }
    gameObjects.player = new Player(engine.getCanvas().width/2,engine.getCanvas().height/2,speed);

}

function loop(timestamp) {
    now = window.performance.now();
    delta = now - then;
    if(delta > interval) {
        then = now - (delta % interval);
        //DRAW BUTTON
        if(state=="onLoad") {
            if(!buttonDrawn) {
                engine.update(menuObjects,timestamp);
                engine.draw(menuObjects);
                buttonDrawn=true;
            }
        }

        //START GAME
        if(state == "started"){

          //MOVE ALL
          gameObjects.player.move();
          for(var body of gameObjects.body) {
            body.move();
          }

          //HANDLE INPUT
          mode = inputHandler.handleInput(gameObjects.player,turning_speed, mode);

          //GENERATE FOOD AND POPULATE LIST
          var newfood = engine.generateFood(gameObjects.food.length);
          if(newfood != null) {
            gameObjects.food.push(newfood);
          }

          //COLLISION CHECK
          var collision = engine.checkCollision(gameObjects,scoreHandler);

          //OOB CHECK
          if(engine.checkOutOfBounds(gameObjects.player) || collision === true) {
            state = "ended";
          }

          //UD
          engine.update(gameObjects,timestamp);
          engine.draw(gameObjects, mode);
          engine.drawScore(scoreHandler.score);



          //END GAME
          if(state == "ended") {
            state = "onLoad";
            for(var i = 0; i < gameObjects.length; ++i) {
              gameObjects[i].destroy();
              gameObjects[i] = null;
            }
            gameObjects.food=[];
            gameObjects.body=[];
            gameObjects.player=null;
            initMenu();
          }
        }
    }
    requestAnimationFrame(loop);
}
