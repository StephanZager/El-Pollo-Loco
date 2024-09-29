/**
 * Represents the game world.
 * 
 */
class World {

    character = new Character();
    boss = new Endboss();
    level = level1;
    canvas;
    statusBar = new StatusBar();
    coinBar = new StatusCoinBar();
    bottleBar = new StatusBottleBar();
    throwableObject = [];
    keyboard;

    /**
     * The canvas rendering context.
     * @type {CanvasRenderingContext2D}
     */
    ctx;

    /**
     * The x-coordinate of the camera.
     * @type {number}
     */
    camera_x = 0;

    /**
     * Creates an instance of World.
     * @param {HTMLCanvasElement} canvas - The canvas element to render the game.
     * 
     */
    constructor(canvas) {
        this.ctx = canvas.getContext('2d');
        this.canvas = canvas;
        this.keyboard = keyboard;
        this.draw();
        this.setWorld();
        this.run();
    };

    /**
     * Sets the world reference for the character.
     * 
     */
    setWorld() {
        this.character.world = this;
    };

    /**
     * Runs the game loop, checking for collisions and other game logic.
     * 
     */
    run() {
        setInterval(() => {
            this.checkCollision();
        }, 100);
    };

    /**
     * Checks for various types of collisions in the game.
     * 
     */
    checkCollision() {
        this.checkCharacterEnemyCollision();
        this.checkCharacterJumpingCollision();
        this.checkThrowableObjectCollision();
        this.updateCharacterStatusBar();
        this.checkThrowObject();
        this.checkCoinObject();
        this.checkBottleObject();
    };

    /**
     * Checks for collisions between the character and coins.
     * 
     */
    checkCoinObject() {
        this.level.coin.forEach((coin, index) => {
            if (this.character.isColliding(coin)) {
                playSound('coin', 'collect');
                this.coinBar.collectCoin(index, this.level.coin);
            }
        });
    };

    /**
    * Checks for collisions between the character and bottles.
    * 
    */
    checkBottleObject() {
        this.level.bottle.forEach((bottle, index) => {
            if (this.character.isColliding(bottle)) {
                playSound('bottle', 'collect');
                this.bottleBar.collectBottle(index, this.level.bottle);
            }
        });
    };

    /**
     * Checks if the character throws a bottle.
     * 
     */
    checkThrowObject() {
        if (this.character.isHurt()) {
            return;
        }

        if (this.keyboard.D && this.bottleBar.bottles > 0) {
            let bottle = new ThrowableObject(this.character.x + 100, this.character.y + 100);
            playSound('bottle', 'throw');
            this.throwableObject.push(bottle);
            this.bottleBar.setPercentage(this.bottleBar.bottles - 1);
        }
    }

    /**
     * Checks for collisions between the character and enemies.
     * 
     */
    checkCharacterEnemyCollision() {
        this.level.enemies.forEach((enemy) => {
            if (this.character.isColliding(enemy)) {
                if (enemy instanceof Endboss) {
                    enemy.endbossAttack();
                    enemy.hadFirtstContact = true;
                    enemy.speed = 0;
                }
            } else {
                if (enemy instanceof Endboss && enemy.hadFirtstContact) {
                    enemy.clearAllIntervals();
                    enemy.animate();
                    enemy.hadFirtstContact = false;
                    enemy.speed = 3 + Math.random() * 0.25;
                }
            }
        });
    };

    /**
    * Checks for collisions between the character and enemies when jumping.
    * 
    */
    checkCharacterJumpingCollision() {
        this.level.enemies.forEach((enemy) => {           
            if (this.character.isCollidingJumping(enemy) && this.character.speedY < 0) {
                if (enemy instanceof Chicken || enemy instanceof SmallChicken) {
                    stopSound('chicken', 'die');
                    playSound('chicken', 'die');
                    enemy.hit();
                    this.character.noHit();
                    this.character.speedY = 20; 
                }
            }
        });
    };

    /**
     * Checks for collisions between throwable objects and enemies.
     * 
     */
    checkThrowableObjectCollision() {
        this.throwableObject.forEach((bottle, bottleIndex) => {
            this.level.enemies.forEach((enemy, index) => {
                if (bottle.isColliding(enemy)) {
                    stopSound('bottle', 'crack');
                    playSound('bottle', 'crack');
                    enemy.hit();
                    enemy.noHit();
                    bottle.bottleSplash();
                    setTimeout(() => {
                        this.throwableObject.splice(bottleIndex, 1);
                    }, 300);
                }
            });
        });
    };

    /**
     * Updates the character's status bar based on collisions with enemies.
     * 
     */
    updateCharacterStatusBar() {
        this.level.enemies.forEach((enemy) => {
            if (this.character.isColliding(enemy)) {
                this.character.hit();
                this.statusBar.setPercentage(this.character.energy);
            }
        });
    };


    /**
     * Draws the game world on the canvas.
     * 
     */
    draw() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.ctx.translate(this.camera_x, 0);
        this.addObjectToMap(this.level.backgroundObjects);
        this.addObjectToMap(this.level.clouds);
        this.addObjectToMap(this.level.coin);
        this.addObjectToMap(this.level.bottle);
        this.ctx.translate(-this.camera_x, 0);
        this.addToMap(this.statusBar);
        this.addToMap(this.coinBar);
        this.addToMap(this.bottleBar);
        this.ctx.translate(this.camera_x, 0);
        this.addObjectToMap(this.level.enemies);
        this.addToMap(this.character);
        this.addObjectToMap(this.throwableObject);
        this.ctx.translate(-this.camera_x, 0);

        let self = this;
        requestAnimationFrame(function () {
            self.draw();
        });
    };

    /**
     * Adds an array of objects to the map.
     * @param {Array} objects - The objects to add to the map.
     * 
     */
    addObjectToMap(objects) {
        objects.forEach(o => {
            this.addToMap(o);
        })
    };

    /**
     * Adds a single object to the map.
     * @param {Object} mo - The object to add to the map.
     * 
     */
    addToMap(mo) {
        if (mo.otherDirection) {
            this.flipImage(mo);
        };

        mo.draw(this.ctx);
        mo.drawFrame(this.ctx);

        if (mo.otherDirection) {
            this.flipImageBack(mo);
        };
    };

    /**
     * Flips an image horizontally.
     * @param {Object} mo - The object to flip.
     * 
     */
    flipImage(mo) {
        this.ctx.save();
        this.ctx.translate(mo.width, 0);
        this.ctx.scale(-1, 1);
        mo.x = mo.x * -1;
    };

    /**
     * Flips an image back to its original orientation.
     * @param {Object} mo - The object to flip back.
     * 
     */
    flipImageBack(mo) {
        mo.x = mo.x * -1;
        this.ctx.restore();
    };
}