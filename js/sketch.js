let fr = 60; //starting FPS
let frameCount = 0;
let generationCount = 0;
let goal = null;
const organismCount = 15;
const organisms = [];


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
    if (frameCount > 300) {
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

// 3. Selection

// 4. Reproduction

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
        organisms[i].calculateFitnessScore();
        organisms[i].resetPosition();
    }

    loop();
}