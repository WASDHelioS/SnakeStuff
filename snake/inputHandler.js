import { InputManager } from "./inputManager.js";

export class InputHandler{
    constructor(){
        this.inputManager = new InputManager();
    }

    handleInput(player, turning_speed, mode) {
        if(this.inputManager.keyDown("ArrowLeft")) {
            if(player.direction < 0+turning_speed) {
              player.direction = 360 - turning_speed;
            } else {
              player.direction -= turning_speed;
            }
        } else if(this.inputManager.keyDown("ArrowRight")) {
            if(player.direction > (360-turning_speed-1)) {
              player.direction = 0;
            } else {
              player.direction += turning_speed;
            }
        }
        if(this.inputManager.keyDown("ShiftLeft")) {
            mode=true;
        } else {
            mode=false;
        }
        return mode;
    }
}
