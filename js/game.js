class Game {
    constructor() {
        this.startScreen = document.getElementById("game-intro");
        this.gameScreen = document.getElementById("game-screen");
        this.endScreen = document.getElementById("game-end");
        this.livesLabel = document.getElementById("lives");
        this.scoreLabel = document.getElementById("score");
        this.speedXLabel = document.getElementById("speed-x");
        this.speedYLabel = document.getElementById("speed-y");
        this.player = null;
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
        this.player = new Player(this.gameScreen, 200, 500, 100, 150, "./images/car.png", 2);
        this.gameScreen.style.width = this.width + "px";
        this.gameScreen.style.height = this.height + "px";
        this.startScreen.style.display = "none";
        this.gameScreen.style.display = "block";
        this.gameIntervalId = setInterval(this.gameLoop.bind(this), this.gameLoopFrecuency);
    }

    endGame() {
        this.player.element.remove();
        this.obstacles.forEach((obstacle) => obstacle.element.remove());

        this.gameIsOver = true;

        this.gameScreen.style.display = "none";
        this.endScreen.style.display = "block";
    }

    update() {
        this.player.move();

        if (this.spawnObstacleCheck()) {
            let speed = 3;
            this.generateObstacle(speed);
        }

        this.collissionCheck();

        this.setLabels();

        const drag = 0.01;
        this.player.directionX -= drag * Math.sign(this.player.directionX);
        this.player.directionY -= drag * Math.sign(this.player.directionY);

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
        if (this.obstacles.length > 1) {
            return false;
        }
        return Math.random() < 0.05;
    }

    generateObstacle(speed) {
        const width = 100;
        const height = 150;
        const x = Math.random() * this.width - width * 0.5;
        const y = -height;
        const obstacle = new Obstacle(this.gameScreen, x, y, width, height, "./images/redCar.png", speed);
        this.obstacles.push(obstacle);
    }

    collissionCheck() {
        for (let i = this.obstacles.length - 1; i >= 0; i--) {
            const obstacle = this.obstacles[i];

            obstacle.move()
            let deleteObstacle = false;
            if (this.player.didCollide(obstacle)) {
                this.lives--;
                deleteObstacle = true;
            }
            else if (obstacle.y > this.height + obstacle.height) {
                this.score++;
                deleteObstacle = true;
            }
            if (deleteObstacle) {
                obstacle.element.remove();
                this.obstacles.splice(i, 1);
            }
        }
    }

    setLabels() {
        this.livesLabel.innerText = this.lives;
        this.scoreLabel.innerText = this.score;
        this.speedXLabel.innerText = this.player.directionX.toFixed(2);
        this.speedYLabel.innerText = this.player.directionY.toFixed(2);
    }

    handleKeydown(e) {
        if (this.gameIsOver) {
            return;
        }

        const key = e.key;
        const possibleKeys = [
            "ArrowLeft",
            "ArrowUp",
            "ArrowRight",
            "ArrowDown",
            "w", "a", "s", "d",
        ];

        if (possibleKeys.includes(key)) {
            e.preventDefault();

            switch (key) {
                case "ArrowLeft":
                case "a":
                    this.player.directionX = -1;
                    break;
                case "ArrowRight":
                case "d":
                    this.player.directionX = 1;
                    break;
                case "ArrowUp":
                case "w":
                    this.player.directionY = -1;
                    break;
                case "ArrowDown":
                case "s":
                    this.player.directionY = 1;
                    break;
            }
        }
    }
}