const cols = 4;
let size;
let speed;
let frequency;
const scale = 0.5
const keys = ["ArrowLeft", "ArrowUp", "ArrowDown", "ArrowRight"];
let angles;
let player;
const acceleration = 0.07;
const FREQUENCY = 1500;
const SPEED = 5;
let brainData;

function preload() {
    brainData = loadJSON('brain.json');
}

function setup() {
    createCanvas(600, 800);
    frequency = FREQUENCY;
    speed = SPEED;
    size = width / cols;
    angles = [-HALF_PI, 0, PI, HALF_PI];

    let brain = NeuralNetwork.deserialize(brainData);
    player = new Player(brain);

    startAdding();
}

function startAdding() {
    setTimeout(startAdding, frequency);
    let i = floor(random(4));
    player.bullets.push(new Bullet(i));
}


function draw() {
    background(0);

    for (let i = player.bullets.length - 1; i >= 0; i--) {
        player.bullets[i].update();
        if (player.bullets[i].y > height - size) {
            if (!player.bullets[i].below)
                p.score--;
                player.bullets[i].below = true;
        }
        if (player.bullets[i].y > height) {
            player.bullets.splice(i, 1);
        }
    }

    if (player.bullets.length > 0) {                
        player.think();
    }

    for (let i = player.bullets.length - 1; i >= 0; i--) {
        player.bullets[i].show();
    }
    for (let i = 0; i < cols; i++) {
        player.arrows[i].show();
    }


    fill(255);
    noStroke();
    textSize(100);
    textAlign(CENTER, CENTER);

    text('Score: ' + player.score, 0, height - size, width, size);

    if (player.score < 0) {
        noStroke();
        fill(255)
        textSize(150);
        background(0);
        text("GAME OVER", 0, 0, width, height);
        noLoop();
    }
}

function harder() {
    if(speed < size*scale/2)
        speed += acceleration;
    if (frequency > 400)
        frequency -= 25;
}

// function keyPressed() {
//     if (keys.indexOf(key) > -1) {
//         for (let i = 0; i < cols; i++) {
//             for (let j = bullets.length - 1; j >= 0; j--) {
//                 if (isInside(arrows[i], bullets[j])) {
//                     if (key === arrows[i].key) {
//                         if (!bullets[j].below) {
//                             bullets.splice(j, 1);
//                             score++;
//                             harder();
//                         }
//                     }
//                     else {
//                         if (!bullets[j].below) {
//                             bullets[j].below = true;
//                             score--;
//                         }
//                     }
//                     return;
//                 } else if (key === arrows[i].key && bullets[j].y > arrows[i].y - size && bullets[j].y < arrows[i].y + size) {
//                     if (!bullets[j].below) {
//                         bullets[j].below = true;
//                         score--;
//                     }
//                 }
//             }
//         }
//         score--;
//     }
// }