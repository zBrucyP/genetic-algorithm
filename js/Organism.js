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
    }


    draw() {
        if (!this.dead) {
            console.log(this.pos.y);
            point(this.pos);
            strokeWeight(15);
        }
    }

    updatePosition() {
        if (!this.dead) {
            this.pos.add(this.velocity);
            this.velocity.add(this.dna.genes[this.velocityIndex]);
            this.velocity.limit(this.maxSpeed);
            this.velocityIndex++;
        }
    }

    resetPosition() {
        
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
            this.fitness = 0;
        } else {
            let distance = dist(this.pos.x, this.pos.y, goal.x, goal.y);
            //console.log(distance / height);
        }
    }
}