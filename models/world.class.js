class World {

    character = new Character();
    boss = new Endboss();
    level = level1;
    canvas;
    ctx;
    keyboard;
    camera_x = 0;
    statusBar = new StatusBar();
    coinBar = new StatusCoinBar();
    bottleBar = new StatusBottleBar();
    throwableObject = [];



    constructor(canvas) {
        
        this.ctx = canvas.getContext('2d');
        this.canvas = canvas;
        this.keyboard = keyboard;
        this.draw();
        this.setWorld();
        this.run();
    }



    setWorld() {
        this.character.world = this;
    }

    run() {

        setInterval(() => {
            this.checkCollision();
            this.checkThrowObject();
            this.checkCoinObject();
            this.checkBottleObject();
        }, 100);
    }

    checkCoinObject() {
        this.level.coin.forEach((coin, index) => {
            if (this.character.isColliding(coin)) {
                playSound('coin', 'collect');
                this.coinBar.collectCoin(index, this.level.coin);  // hier überge ich this. .. weil cih dann nicht drauf zuggeifen kann                                                                               
            }
        });
    }

    checkBottleObject() {
        this.level.bottle.forEach((bottle, index) => {
            if (this.character.isColliding(bottle)) {
                playSound('bottle', 'collect');
                this.bottleBar.collectBottle(index, this.level.bottle);  // hier überge ich this. .. weil cih dann nicht drauf zuggeifen kann                                                                               
            }
        });
    }

    checkThrowObject() {
        if (this.keyboard.D && this.bottleBar.bottles > 0) {
            let bottle = new ThrowableObject(this.character.x + 100, this.character.y + 100);
            playSound('bottle', 'throw');
            this.throwableObject.push(bottle);
            this.bottleBar.setPercentage(this.bottleBar.bottles - 1); // bootle bar ist die classe dann kann ich da auch hin ;) weil oben ich das definiere

        }
    }

    checkCollision() {
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
                    enemy.speed = 2 + Math.random() * 0.25;
                }
            }
        });

        this.level.enemies.forEach((enemy) => {
            if (this.character.isCollidingJumping(enemy) && this.character.y > 80) {
                if (enemy instanceof Chicken || enemy instanceof SmallChicken) {
                    playSound('chicken', 'die');
                    enemy.hit();
                    this.character.noHit();
                    this.character.speedY = 5;
                }
            }
        });

        this.throwableObject.forEach((bottle, bottleIndex) => {
            this.level.enemies.forEach((enemy, index) => {
                if (bottle.isColliding(enemy)) {  
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

        this.level.enemies.forEach((enemy) => {
            if (this.character.isColliding(enemy)) {
                this.character.hit();                
                this.statusBar.setPercentage(this.character.energy);
            }
        });
    }



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
    }

    addObjectToMap(objects) {
        objects.forEach(o => {
            this.addToMap(o);
        })
    }

    addToMap(mo) {
        if (mo.otherDirection) {
            this.flipImage(mo);
        }

        mo.draw(this.ctx);
        mo.drawFrame(this.ctx);

        if (mo.otherDirection) {
            this.flipImageBack(mo);
        }
    }

    flipImage(mo) {
        this.ctx.save();
        this.ctx.translate(mo.width, 0);
        this.ctx.scale(-1, 1);
        mo.x = mo.x * -1;
    }

    flipImageBack(mo) {
        mo.x = mo.x * -1;
        this.ctx.restore();
    }
}