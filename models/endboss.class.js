class Endboss extends MovableObject {

    height = 400;
    width = 300;
    y = 50;
    x = 2000;

    IMAGES_WALK = [
        'img/4_enemie_boss_chicken/2_alert/G5.png',
        'img/4_enemie_boss_chicken/2_alert/G6.png',
        'img/4_enemie_boss_chicken/2_alert/G7.png',
        'img/4_enemie_boss_chicken/2_alert/G8.png',
        'img/4_enemie_boss_chicken/2_alert/G9.png',
        'img/4_enemie_boss_chicken/2_alert/G10.png',
        'img/4_enemie_boss_chicken/2_alert/G11.png',
        'img/4_enemie_boss_chicken/2_alert/G12.png'
    ];

    constructor() {
        super().loadImage(this.IMAGES_WALK[0]);
        this.loadImages(this.IMAGES_WALK);        
        this.animate();
        this.playAnimation(this.IMAGES_WALK);
    }

    animate() {

        setInterval(() => {
            this.playAnimation(this.IMAGES_WALK);
        }, 200);

    }
}