/**
 * keeps track of held down keys in _keysDown
 */

export class InputManager{
    constructor(){
        document.addEventListener('keydown', e => {this._onkeydown(e)});
        document.addEventListener('keyup', e => {this._onkeyup(e)});
    }
    '_keysDown' = {};

    _onkeydown(ev) {

        if(this.Controls[ev.code]) {
            this._keysDown[ev.code] = true;
        } 
        
        else if(this.Toggles[ev.code]){
            if(this._keysDown[ev.code]) {
                this._keysDown[ev.code] = false;
            } else {
                this._keysDown[ev.code] = true;
            }
        }
    }

    _onkeyup(ev) {

        if(this.Controls[ev.code]) {
            this._keysDown[ev.code] = false;
        }
    }

    keyDown(key) {
        return !!this._keysDown[key];
    }

    Controls = {
        "ArrowLeft":37,
        "ArrowUp":38,
        "ArrowRight":39,
        "ArrowDown":40
    };

    Toggles = {
        "ShiftLeft": 16,
    };
}