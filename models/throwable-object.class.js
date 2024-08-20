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

    constructor(x, y) {
        super().loadImage('img/6_salsa_bottle/bottle_rotation/1_bottle_rotation.png');
        this.loadImages(this.IMAGES_ROTATION);
        this.loadImages(this.IMAGES_SPLASH);
        this.x = x;
        this.y = y;
        this.height = 60;
        this.width = 50;
        this.throw();


    }

    throw() {
        this.speedY = 30;
        this.applyGravity();
        this.setStoppableInterval(() => {
            this.x += 10;
        }, 25);
        this.setStoppableInterval(() => this.bottleRotation(), 80);

    };

    bottleSplash() {
        this.speedY = 0;
        this.acceleration = 0;
        this.clearAllIntervals();
        this.setStoppableInterval(() => {
            this.playAnimation(this.IMAGES_SPLASH);
        }, 50);
    }

    bottleRotation() {
        this.playAnimation(this.IMAGES_ROTATION);
    }

}