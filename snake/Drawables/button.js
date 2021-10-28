import { MenuObject } from "./menuObject.js";

export class Button extends MenuObject{
    constructor(cnv) {
        super();
        this.width= 200;
        this.height=100;
        this.x = 0;
        this.y = 0;
    }
    draw(cnv,ctx) {
        this.x = (cnv.height/2) - (this.width/2);
        this.y = (cnv.width/2) - (this.height/2);
        ctx.strokeStyle='black';
        ctx.lineWidth = 2;
        ctx.rect(this.x,this.y,this.width,this.height);
        ctx.closePath();


        //TODO: rainbow text cycler
        //TODO: Draw each character individually in order to offset

        ctx.font = "16px Arial";
        ctx.fillStyle =  "#FF00FF";
        var txt=ctx.measureText("PLAY FUCKIN SNAEK");
        ctx.fillText("PLAY FUCKIN SNAEK",this.x+(this.width - txt.width)/2,this.y + this.height/2);
        ctx.stroke();
    }
    update() {

    }
    destroy() {
        delete this;
    }
}
