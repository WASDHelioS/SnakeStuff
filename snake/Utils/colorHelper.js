

export class ColorHelper{
    constructor(){}
    radianbow(rad, pastelStrength = 128)
    {
        const PIT = Math.PI * 2;
        const PIT3 = PIT / 3;

        var rem = 255 - pastelStrength

        var r = Math.sin((rad)) * rem + pastelStrength
        var g = Math.sin((rad) + PIT3) * rem + pastelStrength
        var b = Math.sin((rad) + PIT3 * 2) * rem + pastelStrength

        return "rgb(" + r + "," + g + "," + b + ")";
    }
}