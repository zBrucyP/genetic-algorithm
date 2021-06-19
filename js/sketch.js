let fr = 60; //starting FPS
let frameCount = 0;
let generationCount = 0;
let endRoundFrameCount = 300;
let goal = null;
let organisms = [];
let matingPool = [];
let mutationRate = .1;
const organismCount = 30;


function setup() {
    createCanvas(windowWidth, windowHeight);
    frameRate(fr);
    initializeOrganisms();
    goal = new Goal(windowWidth/2, windowHeight*.85, 50, 50);
  }

function draw() {
    background(230);
    frameCount++;
    textSize(25);
    text(`Frame: ${frameCount}`, windowWidth*.05, windowHeight*.1);
    text(`Generation: ${generationCount}`, windowWidth*.05, windowHeight*.9);
    text(`Average Fitness: ${getAverageFitness()}`, windowWidth*.05, windowHeight*.95);
    if (frameCount > endRoundFrameCount) {
        endRound();
    }
    goal.draw();
    drawOrganisms();
    updateOrganismPosition();
}

// 1. create initial generation
function initializeOrganisms() {
    for(let i = 0; i < organismCount; i++) {
        organisms.push(new Organism());
    }
}



//https://towardsdatascience.com/introduction-to-genetic-algorithms-including-example-code-e396e98d8bf3
//https://dev.to/lukegarrigan/genetic-algorithms-in-javascript-mc3


// 5. Mutation


function drawOrganisms() {
    for (let i = 0; i < organisms.length; i++) {
        organisms[i].checkIfDead();
        organisms[i].draw();
    }
}

function updateOrganismPosition() {
    for (let i = 0; i < organisms.length; i++) {
        organisms[i].updatePosition();
    }
}

function endRound() {
    noLoop();
    frameCount = 0;
    generationCount++;

    for (let i = 0; i < organisms.length; i++) {
        // 2. Calculate Organism's fitness
        // How close was organism to the goal?
        organisms[i].calculateFitnessScore();

        // 3. Selection
        // The better the fitness score of an org, the more likely they will reproduce
        organisms[i].addToMatingPoolNaturalSelection();
    }

    for(let j = 0; j < organisms.length; j++) {
        // 4. Reproduction
        // replace each org from current gen with offspring from mating pool
        organisms[j] = generateOffspringFromMatingPool();
    }

    // clear mating pool for next round
    matingPool = [];    

    if (generationCount < 2) {

        loop();
    }
}

function getAverageFitness() {
    let sum = 0;
    for (let i = 0; i < organisms.length; i++) {
        sum += organisms[i].fitness;
    }
    return (sum / organisms.length).toFixed(2);
}

function generateOffspringFromMatingPool() {
    // get random indexes to pick parents
    randomDadIndex = Math.trunc(random(matingPool.length));
    randomMomIndex = Math.trunc(random(matingPool.length));
    
    // get lucky parents
    dad = matingPool[randomDadIndex];
    mom = matingPool[randomMomIndex];

    // get resulting DNA from parents' reproduction
    offspringDNA = DNA.reproduce(mom.getDNA(), dad.getDNA());

    // create and return new organism
    offspring = new Organism();
    offspring.setDNA(offspringDNA);
    return offspring;
}