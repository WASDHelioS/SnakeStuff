import { InputManager } from "./inputManager.js";

/**
 * handles input: What happens when user does a thing?
 */

export class InputHandler extends InputManager{
    constructor(){
      super();
    }

    /**
     * 
     * @param {*} player Player to manipulate direction
     * @param {*} turning_speed Param to manipulate player direction certain amount
     * @param {*} mode Current mode: boolean hitboxmode
     * @returns current mode
     */

    handleInput(player, turning_speed) {
        if(super.keyDown("ArrowLeft")) {
            if(player.direction < 0+turning_speed) {
              player.direction = 360 - turning_speed;
            } else {
              player.direction -= turning_speed;
            }
        } else if(super.keyDown("ArrowRight")) {
            if(player.direction > (360-turning_speed-1)) {
              player.direction = 0;
            } else {
              player.direction += turning_speed;
            }
        }
        if(super.keyDown("ShiftLeft")) {
            return true;
        } else {
            return false;
        }
    }
}
