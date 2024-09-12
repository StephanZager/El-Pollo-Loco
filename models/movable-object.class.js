class MovableObject extends DrawableObject {
    bottles = 0;
    coins = 0;
    speed = 0.1;
    otherDirection = false;
    speedY = 0;
    acceleration = 2.5;
    energy = 100;
    lastHit = 0;
    isNoHit = false;
    idle = false;
    intervalIds = [];
    currentImage = 0;

    offset = {
        top: 0,
        bottom: 0,
        left: 0,
        right: 0
    }

    applyGravity() {
        setInterval(() => {
            if (this.isAboveGround() || this.speedY > 0) {
                this.y -= this.speedY;
                this.speedY -= this.acceleration;
            }
        }, 1000 / 25);
    }

    isAboveGround() {
        if (this instanceof ThrowableObject) {
            return true;
        } else {
            return this.y < 180
        }
    }

    isColliding(mo) {
        return (
            this.x + this.width - this.offset.right > mo.x + mo.offset.left &&
            this.y + this.height - this.offset.bottom > mo.y + mo.offset.top &&
            this.x + this.offset.left < mo.x + mo.width - mo.offset.right &&
            this.y + this.offset.top < mo.y + mo.height - mo.offset.bottom
        );
    }

    isCollidingJumping(mo) {
        return (
            this.y + this.height - this.offset.bottom > mo.y + mo.offset.top &&
            this.y + this.height - this.offset.bottom < mo.y + mo.offset.top + mo.height &&
            this.x + this.width - this.offset.right > mo.x + mo.offset.left &&
            this.x + this.offset.left < mo.x + mo.width - mo.offset.right
        );
    }

    moveRight() {
        this.x += this.speed;
    }

    moveLeft() {
        this.x -= this.speed;
    }

    playAnimation(images) {

        let i = this.currentImage % images.length;
        let path = images[i];
        this.img = this.imageCache[path];
        this.currentImage++;
    }

    playAnimationOnce(images) {
        let i = this.currentImage % images.length;
        let path = images[i];
        this.img = this.imageCache[path];
        this.currentImage++;
        if (i == images.length - 1) {
            this.currentImage = images.length - 1;
            clearInterval(this.intervalIds[0]);
        }

    }

    setStoppableInterval(fn, time) {
        let intervalId = setInterval(fn, time);
        this.intervalIds.push(intervalId);
    };

    clearAllIntervals() {
        this.intervalIds.forEach(clearInterval);
    };

    jump() {
        this.speedY = 30;
    }

    noHit() {
        this.isNoHit = true;
        setTimeout(() => {
            this.isNoHit = false;
        }, 300);
    }

    hit() {
        if (!this.isNoHit) {
            this.energy -= 5;
            if (this.energy < 0) {
                this.energy = 0;
            } else {
                this.lastHit = new Date().getTime();
            }
        }
    }

    isHurt() {
        let timepassed = new Date().getTime() - this.lastHit;
        timepassed = timepassed / 1000;
        return timepassed < 0.5;
    }

    isDead() {
        return this.energy == 0;
    }

    stopFalling() {
        setTimeout(() => {
            this.speedY = 0;
            this.acceleration = 0;
            this.clearAllIntervals();
        }, 50);

    }

}