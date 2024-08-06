class Endboss extends MovableObject {

    height = 400;
    width = 300;
    y = 50;
    x = 2000;

    IMAGES_WALK = [
        'img/4_enemie_boss_chicken/1_walk/G1.png',
        'img/4_enemie_boss_chicken/1_walk/G2.png',
        'img/4_enemie_boss_chicken/1_walk/G3.png',
        'img/4_enemie_boss_chicken/1_walk/G4.png'
    ];

    IMAGES_ENGREY = [
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
        super().loadImage(this.IMAGES_ENGREY[0]);
        this.loadImages(this.IMAGES_ENGREY);  
        this.loadImages(this.IMAGES_WALK);
        this.speed = 1 + Math.random() * 0.25;              
        this.animate();
        
        
    }

    animate() {

        setInterval(() => {           
            this.moveLeft();            
        }, 1000 / 60);

        setInterval(() => {
            this.playAnimation(this.IMAGES_WALK);
        }, 100);

        setInterval(() => {
            this.playAnimation(this.IMAGES_ENGREY);
        }, 900);

    }
}