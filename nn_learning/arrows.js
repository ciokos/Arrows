class Arrow {
    constructor(key, x, y, size, angle, col) {
        this.key = key;
        this.x = x
        this.y = y;
        this.size = size
        this.angle = angle;
        this.col = col;
    }
    show() {
        drawArrow(this.angle, this.x, this.y, this.size);
    }
}

class Bullet {
    constructor(col) {
        this.col = col;
        this.y = -size;
        this.below = false;
    }
    show() {
        noStroke();
        if (!this.below) {
            fill(0, 0, 255, 128);
        } else {
            fill(255, 0, 0, 128);
        }
        rect(this.col * size, this.y, size - 5, size - 5);
    }
    update() {
        this.y += speed;
    }
}

function drawArrow(angle, x, y, size) {
    stroke(255);
    strokeWeight(5);
    push();
    let offset = size / 2;
    translate(x + offset, y + offset);
    offset *= scale;
    rotate(angle);
    line(0, -offset, 0, offset);
    line(0, -offset, -offset, 0);
    line(0, -offset, offset, 0);
    pop();
}

function isInside(arrow, bullet) {
    if (bullet.col !== arrow.col)
        return false;
    if (bullet.y < arrow.y - size * (1-scale)/2)
        return false
    if (bullet.y > arrow.y + size * (1-scale)/2)
        return false;
    return true;
}