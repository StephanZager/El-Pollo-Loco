/**
 * Represents a small chicken in the game.
 * 
 */
class SmallChicken extends MovableObject {

    energy = 5;
    height = 60;
    width = 50;
    y = 360;

    offset = {
        top: 10,
        bottom: 0,
        left: 10,
        right: 10,
    }

    IMAGES_WALK = [
        'img/3_enemies_chicken/chicken_small/1_walk/1_w.png',
        'img/3_enemies_chicken/chicken_small/1_walk/2_w.png',
        'img/3_enemies_chicken/chicken_small/1_walk/3_w.png'
    ];

    IMAGES_DEAD = [
        'img/3_enemies_chicken/chicken_small/2_dead/dead.png'
    ];

    /**
     * Creates an instance of SmallChicken.
     * Initializes the small chicken with default values and loads the images.
     * 
     */
    constructor() {
        super().loadImage('img/3_enemies_chicken/chicken_small/1_walk/1_w.png');
        this.loadImages(this.IMAGES_WALK);
        this.loadImages(this.IMAGES_DEAD);
        this.x = 250 + Math.random() * 2500;
        this.speed = 0.20 + Math.random() * 0.25;
        this.animate();
    };

    /**
     * Animates the small chicken by moving it to the left and playing the walking animation.
     * 
     */
    animate() {
        this.moveLeftChicken()
        this.setStoppableInterval(() => this.walkChickenImages(), 200);
        this.isDeadChicken();
    };

    /**
     * Plays the walking animation for the small chicken.
     * 
     */
    walkChickenImages() {
        this.playAnimation(this.IMAGES_WALK);
    };

    /**
     * Moves the small chicken to the left.
     * 
     */
    moveLeftChicken() {
        setInterval(() => {
            this.moveLeft();
        }, 1000 / 60);
    };

    /**
     * Checks if the small chicken is dead and plays the dead animation if it is.
     * Stops the chicken's movement and makes it fall down.
     * 
     */
    isDeadChicken() {
        setInterval(() => {
            if (this.energy <= 0) {
                this.playAnimation(this.IMAGES_DEAD);
                this.speed = 0;
                this.offset = {
                    top: 300,
                    bottom: 0,
                    left: 0,
                    right: 0,
                }
                setInterval(() => {
                    this.y += 3;
                }, 300);
            }
        }, 40);
    };
}