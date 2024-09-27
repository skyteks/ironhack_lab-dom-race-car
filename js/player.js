class Player extends Component {
    constructor(gameScreen, x, y, width, height, imgSrc, speed) {
        super(gameScreen, x, y, width, height, imgSrc, speed);
    }

    move() {
        this.x += this.directionX * this.speed;
        this.y += this.directionY * this.speed;
        this.x = clamp(this.x, 10, this.gameScreen.offsetWidth - this.width - 10);
        this.y = clamp(this.y, 10, this.gameScreen.offsetHeight - this.height - 10);
        this.updatePosition();
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