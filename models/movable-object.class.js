/**
 * Represents a movable object in the game.
 * 
 */
class MovableObject extends DrawableObject {

    bottles = 0;
    coins = 0;
    speed = 0.1;
    energy = 200;
    lastHit = 0;
    otherDirection = false;
    speedY = 0;
    isNoHit = false;
    idle = false;
    intervalIds = [];
    acceleration = 2.5;

    /**
     * Offset for collision detection.
     *  
     */
    offset = {
        top: 0,
        bottom: 0,
        left: 0,
        right: 0
    };

    /**
     * Applies gravity to the object.
     * 
     */
    applyGravity() {
        setInterval(() => {
            if (this.isAboveGround() || this.speedY > 0) {
                this.y -= this.speedY;
                this.speedY -= this.acceleration;
                if (!(this instanceof ThrowableObject) && this.y > 180) {
                    this.y = 180;
                    this.speedY = 0;
                }
            }
        }, 1000 / 25);
    };

    /**
     * Checks if the object is above the ground.
     * @returns {boolean} True if the object is above the ground, false otherwise.
     * 
     */
    isAboveGround() {
        if (this instanceof ThrowableObject) {
            return true;
        } else if (this.isDead()) {
            return false;
        } else {
            return this.y < 180;
        }
    };

    /**
     * Checks if the object is colliding with another object.
     * @param {MovableObject} mo - The other movable object.
     * @returns {boolean} True if the objects are colliding, false otherwise.
     * 
     */
    isColliding(mo) {
        return (
            this.x + this.width - this.offset.right > mo.x + mo.offset.left &&
            this.y + this.height - this.offset.bottom > mo.y + mo.offset.top &&
            this.x + this.offset.left < mo.x + mo.width - mo.offset.right &&
            this.y + this.offset.top < mo.y + mo.height - mo.offset.bottom
        );
    };

    /**
     * Checks if the object is colliding with another object while jumping.
     * @param {MovableObject} mo - The other movable object.
     * @returns {boolean} True if the objects are colliding while jumping, false otherwise.
     * 
     */
    isCollidingJumping(mo) {
        return (
            this.y + this.height - this.offset.bottom > mo.y + mo.offset.top &&
            this.y + this.height - this.offset.bottom < mo.y + mo.offset.top + mo.height &&
            this.x + this.width - this.offset.right > mo.x + mo.offset.left &&
            this.x + this.offset.left < mo.x + mo.width - mo.offset.right
        );
    };

    /**
     * Moves the object to the right.
     * 
     */
    moveRight() {
        this.x += this.speed;
    };

    /**
    * Moves the object to the left.
    * 
    */
    moveLeft() {
        this.x -= this.speed;
    };

    /**
     * Sets a stoppable interval.
     * @param {Function} fn - The function to execute.
     * @param {number} time - The interval time in milliseconds.
     * 
     */
    setStoppableInterval(fn, time) {
        let intervalId = setInterval(fn, time);
        this.intervalIds.push(intervalId);
    };

    /**
     * Clears all stoppable intervals.
     * 
     */
    clearAllIntervals() {
        this.intervalIds.forEach(clearInterval);
    };

    /**
     * Makes the object jump.
     * 
     */
    jump() {
        this.currentImage = 0;
        this.speedY = 30;
    };

    /**
     * Sets the object to a no-hit state for a short duration.
     * 
     */
    noHit() {
        this.isNoHit = true;
        setTimeout(() => {
            this.isNoHit = false;
        }, 300);
    };

    /**
     * Reduces the object's energy when hit.
     * 
     */
    hit() {
        let currentTime = new Date().getTime();
        if (!this.isNoHit && (currentTime - this.lastHit >= 300)) {
            this.energy -= 5;
            if (this.energy <= 0) {
                this.energy = 0;
                this.currentImage = 0;
                this.isNoHit = true;
            } else {
                this.lastHit = currentTime;
            };
        };
    };

    /**
     * Checks if the object is hurt.
     * @returns {boolean} True if the object is hurt, false otherwise.
     * 
     */
    isHurt() {
        let timepassed = new Date().getTime() - this.lastHit;
        timepassed = timepassed / 1000;
        return timepassed < 0.5;
    };

    /**
     * Checks if the object is dead.
     * @returns {boolean} True if the object is dead, false otherwise.
     * 
     */
    isDead() {
        return this.energy == 0;
    };
}