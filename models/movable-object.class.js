class MovableObject extends DrawableObject {
    bottles = 0;
    coins = 0;
    speed = 0.1;
    otherDirection = false;
    speedY = 0;
    acceleration = 2.5;
    energy = 200;
    lastHit = 0;
    isNoHit = false;
    idle = false;
    intervalIds = [];
    offset = {
        top: 0,
        bottom: 0,
        left: 0,
        right: 0
    }

    playAnimation(images) {
        let i = this.currentImage % images.length;
        let path = images[i];
        this.img = this.imageCache[path];
        this.currentImage++;
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

    setStoppableInterval(fn, time) {
        let intervalId = setInterval(fn, time);
        this.intervalIds.push(intervalId);
    };

    clearAllIntervals() {
        this.intervalIds.forEach(clearInterval);
    };

    jump() {
        this.currentImage = 0;
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
            if (this.energy <= 0) {
                this.energy = 0;
                this.currentImage = 0;
                this.isNoHit = true;
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
}