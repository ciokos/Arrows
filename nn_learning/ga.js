function nextGeneration() {
    // new population
    calculateFitness();
    for (let i = 0; i < POPULATION; i++) {
        players.push(pickPlayer());
    }
    savedPlayers = [];
    speed = SPEED;
    frequency = FREQUENCY;
}

function pickPlayer() {

    let index = 0;
    let r = random(1);

    while(r>0){
        r = r - savedPlayers[index].fitness;
        index++;
    }
    index--;

    let parent = savedPlayers[index];

    let child = new Player(parent.brain);
    return child;
}

function calculateFitness() {
    for(p of savedPlayers) {
        p.maxScore = pow(p.maxScore,2);
    }

    let sum = 0;
    for(p of savedPlayers) {
        sum+=p.maxScore;
    }
    for(p of savedPlayers) {
        p.fitness = p.maxScore/sum;
    }
}