class Game {
    constructor() {
        this.startScreen = document.getElementById("game-intro");
        this.gameScreen = document.getElementById("game-screen");
        this.endScreen = document.getElementById("game-end");
        this.player = new Player(this.gameScreen, 200, 500, 100, 150, "./images/car.png", 1);
        this.height = 600;
        this.width = 500;
        this.obstacles = [];
        this.score = 0;
        this.lives = 3;
        this.gameIsOver = false;
        this.gameIntervalId;
        this.gameLoopFrecuency = 1000 / 60;
    }

    start() {
        this.gameScreen.width = this.width;
        this.gameScreen.height = this.height;
        this.startScreen.style.display = "none";
        this.gameScreen.style.display = "block";
        this.gameIntervalId = setInterval(this.gameLoop.bind(this), this.gameLoopFrecuency);
    }

    endGame() {
        this.player.element.remove();
        this.obstacles.forEach((obstacle) => obstacle.element.remove());

        this.gameIsOver = true;

        this.gameScreen.style.display = "none";
        this.gameEndScreen.style.display = "block";
    }

    update() {
        this.player.move();

        if (this.spawnObstacleCheck()) {
            let speed = 3;
            this.generateObstacle(speed);
        }

        for (let i = this.obstacles.length - 1; i >= 0; i--) {
            const obstacle = this.obstacles[i];

            obstacle.move()
            let deleteObstacle = false;
            if (this.player.didCollide(obstacle)) {
                this.lives--;
                deleteObstacle = true;
            }
            else if (obstacle.x > this.height) {
                this.score++;
                deleteObstacle = true;
            }
            if (deleteObstacle) {
                obstacle.element.remove();
                this.obstacles.splice(i, 1);
            }
        }

        if (this.lives == 0) {
            this.endGame();
        }
    }

    gameLoop() {
        this.update();
        if (this.gameIsOver) {
            clearInterval(this.gameIntervalId);
        }
    }

    spawnObstacleCheck() {
        return Math.random() < 0.02;
    }

    generateObstacle(speed) {
        const obstacle = new Obstacle(this.gameScreen, 200, 500, 100, 150, "./images/redCar.png", speed);
        this.obstacles.push(obstacle);
    }

    collissionCheck(a, b) {

    }
}