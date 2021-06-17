class DNA {
    constructor() {
        this.genes = this.createGenes();
    }

    createGenes() {
        let result = [];
        for (let i = 0; i < 1111; i++ ) {
            result.push(p5.Vector.random2D());
        }
        return result;
    }
}