

function updateOrganismCount(newOrganismCount) {
    organismCount = Math.trunc(newOrganismCount);
}

function updateMutationRate(newValue) {
    mutationRate = Math.trunc(newValue) / 100;
}

function updateGenerationLength(newLength) {
    if (newLength > maxEndRoundFrameCount) newLength = maxEndRoundFrameCount;
    endRoundFrameCount = Math.trunc(newLength);
}

function updateSpeed(newValue) {
    fr = Math.trunc(newValue);
} 

function restartGame() {
    initializeGame();
}