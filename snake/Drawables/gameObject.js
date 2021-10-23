import { Drawable } from "./drawable.js";

export class GameObject extends Drawable{
    constructor(x,y, size){
        super();
        this.hbwidth = size;
        this.hbheight = size;
        this.hbx = x;
        this.hby = y;
        this.hbx_min = x;
        this.hbx_max = x + this.hbwidth;
        this.hby_min = y;
        this.hby_max = y + this.hbheight;
    }

    drawBound(cnv,ctx){
        ctx.strokeStyle = 'red';
        ctx.lineWidth=2;
        ctx.moveTo(this.hbx,this.hby);
        ctx.rect(this.hbx_min,this.hby_min,this.hbwidth,this.hbheight);
        ctx.stroke();
    }
    moveBound(x,y) {
        this.hbx = x;
        this.hby = y;     
        this.hbx_min= x;
        this.hbx_max=x + this.hbwidth;
        this.hby_min = y;
        this.hby_max = y + this.hbheight;
    }
}