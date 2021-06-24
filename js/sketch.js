// References:
// https://towardsdatascience.com/introduction-to-genetic-algorithms-including-example-code-e396e98d8bf3
// https://dev.to/lukegarrigan/genetic-algorithms-in-javascript-mc3

let fr = 90; //starting FPS
let frameCount = 0;
let generationCount = 1;
let endRoundFrameCount = 300;
let goal = null;
let organisms = [];
let matingPool = [];
let mutationRate = .01;
let averageFitnessLastRound = 0;
let medianFitnessLastRound = 0;
let numberSuccessLastRound = 0;
const organismCount = 50;


function setup() {
    let canvas = createCanvas(windowWidth, windowHeight);
    canvas.parent("p5Canvas")
    frameRate(fr);
    initializeOrganisms();
    goal = new Goal(width/2, height*.85, 50, 50);
  }

function draw() {
    background(230);
    frameCount++;

    frameRate(fr);

    // texts
    textSize(25);
    text(`Generation: ${generationCount}`, width*.05, height*.05);
    text(`Mutation Rate: ${mutationRate*100}%`, width*.05, height*.1);
    text(`Frame: ${frameCount}`, width*.05, height*.15);
    text(`Last Gen:`, width*.03, height*.8);
    text(`Num Succeeded: ${numberSuccessLastRound}`, width*.05, height*.85);
    text(`Average Fitness: ${averageFitnessLastRound}`, width*.05, height*.9);
    text(`Median Fitness: ${medianFitnessLastRound}`, width*.05, height*.95);

    // check end of generation round condition
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

    // measure generation performance
    const fitnessScores = organisms.map(org => org.fitness);
    averageFitnessLastRound = getAverageFitness(fitnessScores);
    medianFitnessLastRound = getMedianFitness(fitnessScores);
    getNumberSucceededLastRound();
    console.log(`${generationCount} | Average fitness: ${averageFitnessLastRound}`);
    console.log(`${generationCount} | Median fitness: ${medianFitnessLastRound}`);
    console.log(`${generationCount} | Num Succeeded: ${numberSuccessLastRound}`);

    for(let j = 0; j < organisms.length; j++) {
        // 4. Reproduction
        // 5. Mutation
        // replace each org from current gen with offspring from mating pool
        // give chance of mutation
        organisms[j] = generateOffspringFromMatingPool();
    }

    // clear mating pool for next round
    matingPool = [];

    loop();
}

function getAverageFitness(values) {
    let sum = values.reduce((acc, currVal) => acc + currVal);
    return (sum / values.length).toFixed(2);
}

function getMedianFitness(values) {
    if(values.length ===0) return 0;
  
    values.sort(function(a,b){
      return a-b;
    });
  
    var half = Math.floor(values.length / 2);
  
    if (values.length % 2)
      return values[half];
  
    return ((values[half - 1] + values[half]) / 2.0).toFixed(2);
}

function getNumberSucceededLastRound() {
    numberSuccessLastRound = 0;
    for(org of organisms) {
        if (org.hitGoal) {
            numberSuccessLastRound++;
        }
    }
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