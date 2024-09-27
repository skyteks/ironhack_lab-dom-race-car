window.onload = function () {
    const startButton = document.getElementById("start-button");
    const restartButton = document.getElementById("restart-button");

    startButton.addEventListener("click", function () {
        startGame();
    });
    restartButton.addEventListener("click", () => location.reload());

    function startGame() {
        console.log("start game");
        const game = new Game();
        window.addEventListener("keydown", (e) => game.handleKeydown(e));
        game.start();
    }
};

function clamp(number, min, max) {
    return Math.max(min, Math.min(number, max));
}
