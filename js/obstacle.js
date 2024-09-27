class Obstacle extends Component {
    constructor(gameScreen, x, y, width, height, imgSrc, speed) {
        super(gameScreen, x, y, width, height, imgSrc, speed);

    }

    move() {
        this.y += this.speed;
        this.updatePosition();
    }
}