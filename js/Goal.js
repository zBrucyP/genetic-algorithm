class Goal {
    constructor(x, y, w, h) {
        this.x = x;
        this.y = y;
        this.w = w;
        this.h = h;
    }

    draw() {
        rect(this.x, this.y, this.w, this.h);
    }

    intersects(x, y) {
        if (x >= this.x 
            && x <= this.x + this.w 
            && y >= this.y 
            && y <= this.y + this.h) {
                return true;
            }
        return false;
    }
    
}