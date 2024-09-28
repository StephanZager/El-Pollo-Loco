/**
 * Represents a throwable object in the game.
 * 
 */
class ThrowableObject extends MovableObject {

    isFalling = true;

    IMAGES_ROTATION = [
        'img/6_salsa_bottle/bottle_rotation/1_bottle_rotation.png',
        'img/6_salsa_bottle/bottle_rotation/2_bottle_rotation.png',
        'img/6_salsa_bottle/bottle_rotation/3_bottle_rotation.png',
        'img/6_salsa_bottle/bottle_rotation/4_bottle_rotation.png'
    ];

    IMAGES_SPLASH = [
        'img/6_salsa_bottle/bottle_rotation/bottle_splash/1_bottle_splash.png',
        'img/6_salsa_bottle/bottle_rotation/bottle_splash/2_bottle_splash.png',
        'img/6_salsa_bottle/bottle_rotation/bottle_splash/3_bottle_splash.png',
        'img/6_salsa_bottle/bottle_rotation/bottle_splash/4_bottle_splash.png',
        'img/6_salsa_bottle/bottle_rotation/bottle_splash/5_bottle_splash.png',
        'img/6_salsa_bottle/bottle_rotation/bottle_splash/6_bottle_splash.png',
    ];

    /**
     * Creates an instance of ThrowableObject.
     * Initializes the throwable object with default values and loads the images.
     * @param {number} x - The x-coordinate of the throwable object.
     * @param {number} y - The y-coordinate of the throwable object.
     * 
     */
    constructor(x, y) {
        super().loadImage('img/6_salsa_bottle/bottle_rotation/1_bottle_rotation.png');
        this.loadImages(this.IMAGES_ROTATION);
        this.loadImages(this.IMAGES_SPLASH);
        this.x = x;
        this.y = y;
        this.height = 60;
        this.width = 50;
        this.throw();
        this.world = world;
    };

    /**
     * Throws the object by setting its initial speed and applying gravity.
     * 
     */
    throw() {
        this.speedY = 30;
        this.applyGravity();
        this.setStoppableInterval(() => {
            this.x += 10;
        }, 25);
        this.setStoppableInterval(() => this.bottleRotation(), 80);

    };

    /**
     * Plays the bottle splash animation and stops the object's movement.
     * 
     */
    bottleSplash() {
        this.isFalling = false;
        this.speedY = 0;
        this.acceleration = 0;
        this.clearAllIntervals();
        this.setStoppableInterval(() => {
            this.playAnimation(this.IMAGES_SPLASH);
        }, 50);
    };

    /**
     * Plays the bottle rotation animation.
     * 
     */
    bottleRotation() {
        this.playAnimation(this.IMAGES_ROTATION);
    };
}