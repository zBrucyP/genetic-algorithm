class DNA {
    constructor(generateGenes=true) {
        if (generateGenes) {
            this.genes = this.createGenes();
        } else {
            this.genes = [];
        }
    }

    createGenes() {
        let result = [];
        for (let i = 0; i < maxEndRoundFrameCount; i++ ) {
            result.push(p5.Vector.random2D());
        }
        return result;
    }

    // crossover two sets of dna
    static reproduce(momDNA, dadDNA) {
        let offspringDNA = new DNA(false);
        for (let i = 0; i < momDNA.genes.length; i++) {
            let mutate = random();
            if (mutate < mutationRate) {
                offspringDNA.genes.push(p5.Vector.random2D());
            } 
            else if (i % 2 === 0) {
                offspringDNA.genes.push(momDNA.genes[i]);
            } 
            else {
                offspringDNA.genes.push(dadDNA.genes[i]);
            }
        }
        return offspringDNA;
    }
}