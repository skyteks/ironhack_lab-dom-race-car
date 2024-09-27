class Player {
    constructor(gameScreen, x, y, width, height, imgSrc, speed) {
        this.gameScreen = gameScreen;
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.directionX = 0;
        this.directionY = 0;
        this.element = document.createElement("img");
        this.gameScreen.appendChild(this.element);
        this.element.src = imgSrc;
        this.element.style.position = "absolute";
        this.element.style.width = this.width + "px";
        this.element.style.height = this.height + "px";
        this.element.style.left = this.x + "px";
        this.element.style.top = this.y + "px";
        this.speed = speed;
    }

    move() {
        this.x += this.directionX * this.speed;
        this.y += this.directionY * this.speed;
        this.x = clamp(this.x, 10, this.gameScreen.offsetWidth - this.width - 10);
        this.y = clamp(this.y, 10, this.gameScreen.offsetHeight - this.height - 10);
        this.updatePosition();
    }

    updatePosition() {
        this.element.style.left = this.x + "px";
        this.element.style.top = this.y + "px";
    }

    didCollide(obstacle) {
        const playerRect = this.element.getBoundingClientRect();
        const obstacleRect = obstacle.element.getBoundingClientRect();

        if (playerRect.left < obstacleRect.right &&
            playerRect.right > obstacleRect.left &&
            playerRect.top < obstacleRect.bottom &&
            playerRect.bottom > obstacleRect.top
        ) {
            return true;
        }
        return false;
    }
}