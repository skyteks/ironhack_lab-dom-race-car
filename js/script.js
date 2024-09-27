window.onload = function () {
  const startButton = document.getElementById("start-button");
  const restartButton = document.getElementById("restart-button");

  startButton.addEventListener("click", function () {
    startGame();
  });

  function startGame() {
    console.log("start game");
    const game = new Game();
    game.start();
  }

  window.addEventListener("keydown", handleKeydown);
  function handleKeydown(e) {
    const key = e.key;
    const possibleKeys = [
      "ArrowLeft",
      "ArrowUp",
      "ArrowRight",
      "ArrowDown",
    ];

    if (possibleKeys.includes(key)) {
      e.preventDefault();

      switch (key) {
        case "ArrowLeft":
          game.player.directionX = -1;
          break;
        case "ArrowRight":
          game.player.directionX = 1;
          break;
        case "ArrowUp":
          game.player.directionY = -1;
          break;
        case "ArrowDown":
          game.player.directionY = 1;
          break;
      }
    }
  }
};

function clamp(number, min, max) {
  return Math.max(min, Math.min(number, max));
}
