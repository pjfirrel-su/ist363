class Circle {
    constructor(x, y, diameter) {
        this.x = x;
        this.y = y;
        this.diameter = diameter;
        this.isRising = true
        this.isGrowing = true
        this.color = null;
        this.colorFrom = color(0,14,84);
        this.colorTo = color(247,105,0);
        this.lerpAmount = 0;
    }
    draw() {
        fill(this.color);
        circle(this.x, this.y, this.diameter);
    }
    update() {
        // initivial value, min, max, outputMin, outputMax
        this.lerpAmount = map(this.diameter, minDiameter, maxDiameter, 0 , 1); //.45

        this.color = lerpColor(this.colorFrom, this.colorTo, this.lerpAmount);

        if (this.isRising) {
            this.y -= 2;
        } else {
            this.y *= 1.05;
        }

        if (this.isGrowing) {
            this.diameter += 1;
        } else {
            this.diameter -= 1;
        }
        // maximum boundary
        if (this.diameter > maxDiameter) {
            this.isGrowing = false;
        }
        // minimum boundary
        if (this.diameter < minDiameter) {
            this.isGrowing = true;
        }

        //top boundary
        if (this.y <= (this.diameter / 2)) {
            this.isRising = false;
        }
        //bottom boundary
        if (this.y >= (canvas.height - this.diameter / 2)) {
            this.isRising = true;
        }
    }
}