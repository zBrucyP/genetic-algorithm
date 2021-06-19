class Organism {
    constructor() {
        let r = random();
        let startX = r * windowWidth;

        this.pos = createVector(startX, 50);
        this.velocity = p5.Vector.random2D();
        this.maxSpeed = 5;
        this.dna = new DNA();
        this.velocityIndex = 0;
        this.fitness = 0;
        this.dead = false;
        this.hitGoal = false;
    }


    draw() {
        if (!this.dead) {
            //console.log(this.pos.y + " | " + height+ " | " + windowHeight);
            point(this.pos);
            strokeWeight(15);

            if(goal.intersects(this.pos.x, this.pos.y)) this.hitGoal = true;
        }
    }

    updatePosition() {
        if (!this.dead && !this.hitGoal) {
            this.pos.add(this.velocity);
            this.velocity.add(this.dna.genes[this.velocityIndex]);
            this.velocity.limit(this.maxSpeed);
            this.velocityIndex++;
        }
    }

    checkIfDead() {
        if (this.pos.x > width
            || this.pos.x < 0
            || this.pos.y > height
            || this.pos.y < 0) {
                this.dead = true;
        }
    }

    calculateFitnessScore() {
        if (goal.intersects(this.pos.x, this.pos.y)) {
            this.fitness = 1;
        } else if (this.dead) {
            this.fitness = .01;
        } else {
            let distance = dist(this.pos.x, this.pos.y, goal.x, goal.y);
            this.fitness = 1 - (distance / height);
        }
    }

    addToMatingPoolNaturalSelection() {
        let selectionFactor = Math.trunc(this.fitness * 100);
        for(let j = 0; j < selectionFactor; j++) {
            matingPool.push(this);
        }
    }

    getDNA() {
        return this.dna;
    }

    setDNA(newDNA) {
        this.dna = newDNA;
    }
}