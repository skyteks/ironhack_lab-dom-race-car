class Obstacle {
    constructor(gameScreen, x, y, width, height, imgSrc, speed) {
        this.gameScreen = gameScreen;
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
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
        this.y += this.speed;
        this.updatePosition();
    }

    updatePosition() {
        this.element.style.left = this.x + "px";
        this.element.style.top = this.y + "px";
    }
}