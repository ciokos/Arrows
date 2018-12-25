let arrows;
let bullets;
const cols = 4;
let size;
let speed = 5;
let frequency = 2000;
let score = 0;
let scale = 0.6
let keys;
let acceleration = 0.15;

function setup() {
    createCanvas(600, 800);
    background(0);
    arrows = [];
    bullets = [];
    size = width / cols;
    keys = ["ArrowLeft", "ArrowUp", "ArrowDown", "ArrowRight"];
    let angles = [-HALF_PI, 0, PI, HALF_PI];
    for (let i = 0; i < cols; i++) {
        let w = new Arrow(keys[i], i * size, height - (2 * size), size, angles[i], i);
        arrows.push(w);
    }
    startAdding();
}

function startAdding() {
    setTimeout(startAdding, frequency);
    let i = floor(random(4));
    bullets.push(new Bullet(i));
}



function draw() {
    background(0);
    for (let i = bullets.length - 1; i >= 0; i--) {
        bullets[i].show();
        bullets[i].update();
        if (bullets[i].y > height - size) {
            if (!bullets[i].below)
                score--;
            bullets[i].below = true;
        }
        if (bullets[i].y > height) {
            bullets.splice(i, 1);
        }
    }
    for (let i = 0; i < cols; i++) {
        arrows[i].show();
    }

    fill(255);
    noStroke();
    textSize(100);
    textAlign(CENTER, CENTER);
    text(score, 0, height - size, width, size);

    if (score < 0) {
        noStroke();
        fill(255)
        textSize(150);
        background(0);
        text("GAME OVER", 0, 0, width, height);
        noLoop();
    }

}

function harder() {
    speed+=acceleration;
    if(frequency>400){
        frequency-=20;
    }
}

function keyPressed() {
    if (keys.indexOf(key) > -1) {
        for (let i = 0; i < cols; i++) {
            for (let j = bullets.length - 1; j >= 0; j--) {
                if (isInside(arrows[i], bullets[j])) {
                    if (key === arrows[i].key) {
                        if (!bullets[j].below) {
                            bullets.splice(j, 1);
                            score++;
                            harder();
                        }
                    }
                    else {
                        if (!bullets[j].below) {
                            bullets[j].below = true;
                            score--;
                        }
                    }
                    return;
                } else if (key === arrows[i].key && bullets[j].y > arrows[i].y - size && bullets[j].y < arrows[i].y + size) {
                    if (!bullets[j].below) {
                        bullets[j].below = true;
                        score--;
                    }
                }
            }
        }
        score--;
    }
}