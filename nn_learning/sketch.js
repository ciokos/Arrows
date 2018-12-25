const cols = 4;
let size;
let speed;
let frequency;
const scale = 0.6
const keys = ["ArrowLeft", "ArrowUp", "ArrowDown", "ArrowRight"];
let angles;
const acceleration = 0.15;
let players = [];
let savedPlayers = [];
let bestPlayer;
const POPULATION = 9000;
const FREQUENCY = 850;
const SPEED = 10;
let counter = 2;

function setup() {
    createCanvas(600, 800);
    frequency = FREQUENCY;
    speed = SPEED;
    size = width / cols;

    angles = [-HALF_PI, 0, PI, HALF_PI];
    for (let i = 0; i < POPULATION; i++) {
        players.push(new Player());
    }
    startAdding();
}

function startAdding() {
    setTimeout(startAdding, frequency);
    let i = floor(random(4));
    for (let p of players) {
        p.bullets.push(new Bullet(i));
    }
}

function keyPressed() {
    if(key==='S') {
        saveJSON(bestPlayer.brain, 'brain.json');
    }
}


function draw() {
    background(0);

    for (let j = 0; j < counter; j++) {
        for (let i = players.length - 1; i >= 0; i--) {
            if (players[i].score < 0) {
                savedPlayers.push(players.splice(i, 1)[0]);
            }
        }
        if (players.length <= 0) {
            console.log('New Generation');
            nextGeneration();
        }

        for (let p of players) {
            for (let i = p.bullets.length - 1; i >= 0; i--) {
                p.bullets[i].update();
                if (p.bullets[i].y > height - size) {
                    if (!p.bullets[i].below)
                        p.score = - 1;
                    p.bullets[i].below = true;
                }
                if (p.bullets[i].y > height) {
                    p.bullets.splice(i, 1);
                }
            }
        }
        for (let p of players) {
            if (p.bullets.length > 0) {
                if (p.bullets.length === 1)
                    if (p.bullets[0].below === true)
                        continue;
                p.think();
            }
        }
    }
    let maxScore = -Infinity;
    for (let p of players) {
        if (p.score > maxScore) {
            maxScore = p.score;
            bestPlayer = p;
        }

    }

    for (let i = bestPlayer.bullets.length - 1; i >= 0; i--) {
        bestPlayer.bullets[i].show();
    }
    for (let i = 0; i < cols; i++) {
        bestPlayer.arrows[i].show();
    }


    fill(255);
    noStroke();
    textSize(70);
    textAlign(CENTER, CENTER);

    text('Max Score: ' + maxScore, 0, height - size, width, size);

    // if (score < 0) {
    //     noStroke();
    //     fill(255)
    //     textSize(150);
    //     background(0);
    //     text("GAME OVER", 0, 0, width, height);
    //     noLoop();
    // }
}

function harder() {
    // speed += acceleration;
    // if (frequency > 400) {
    //     frequency -= 20;
    // }
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