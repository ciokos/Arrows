class Player {
    constructor(brain) {
        if (brain instanceof NeuralNetwork) {
            this.brain = brain.copy();
        } else {
            this.brain = new NeuralNetwork(3, 5, 5);
        }
        this.arrows = [];
        for (let i = 0; i < cols; i++) {
            let w = new Arrow(keys[i], i * size, height - (2 * size), size, angles[i], i);
            this.arrows.push(w);
        }
        this.bullets = [];
        this.score = 0;
        this.fitness = 0;
    }

    action(arrowCode) {
        for (let i = 0; i < cols; i++) {
            for (let j = this.bullets.length - 1; j >= 0; j--) {
                if (isInside(this.arrows[i], this.bullets[j])) {
                    if (arrowCode === this.arrows[i].key) {
                        if (!this.bullets[j].below) {
                            this.bullets.splice(j, 1);
                            this.score++;
                            harder();
                        }
                    }
                    else {
                        if (!this.bullets[j].below) {
                            this.bullets[j].below = true;
                            this.score--;
                        }
                    }
                    return;
                } else if (arrowCode === this.arrows[i].key && this.bullets[j].y > this.arrows[i].y - size && this.bullets[j].y < this.arrows[i].y + size) {
                    if (!this.bullets[j].below) {
                        this.bullets[j].below = true;
                        this.score--;
                    }
                }
            }
        }
        this.score--;
    }

    think() {
        let closest = null;
        for (let i = 0; i < this.bullets.length; i++) {
            if (this.bullets[i].below === false) {
                closest = this.bullets[i];
                break;
            }
        }
        let input = [closest.col / 4, closest.y / height, this.arrows[0].y / height];
        let output = this.brain.predict(input);

        noStroke();
        fill(255, 100);
        let txtsize = 40;
        textSize(txtsize);
        textAlign(LEFT, TOP);
        text('LEFT: ' + 100 * output[0].toFixed(2) + '%', 0, 0 * txtsize);
        text('UP: ' + 100 * output[1].toFixed(2) + '%', 0, 1 * txtsize);
        text('DOWN: ' + 100 * output[2].toFixed(2) + '%', 0, 2 * txtsize);
        text('RIGHT: ' + 100 * output[3].toFixed(2) + '%', 0, 3 * txtsize);
        text('NONE: ' + 100 * output[4].toFixed(2) + '%', 0, 4 * txtsize);


        let max = indexOfMax(output);
        switch (max) {
            case 0:
                this.action(keys[0])
                break;
            case 1:
                this.action(keys[1])
                break;
            case 2:
                this.action(keys[2])
                break;
            case 3:
                this.action(keys[3])
                break;
            case 4:
                break;
            default:
                console.log('somthing is not right here...');
        }
    }
}

function indexOfMax(arr) {
    if (arr.length === 0) {
        return -1;
    }

    var max = arr[0];
    var maxIndex = 0;

    for (var i = 1; i < arr.length; i++) {
        if (arr[i] > max) {
            maxIndex = i;
            max = arr[i];
        }
    }

    return maxIndex;
}