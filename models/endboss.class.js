class Endboss extends MovableObject {
    energy = 20;
    height = 400;
    width = 300;
    y = 50;
    x = 2000;
    hadFirtstContact = false;


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

    IMAGES_DEAD = [
        'img/4_enemie_boss_chicken/5_dead/G24.png',
        'img/4_enemie_boss_chicken/5_dead/G25.png',
        'img/4_enemie_boss_chicken/5_dead/G26.png',
    ]

    IMAGES_HURT = [
        'img/4_enemie_boss_chicken/4_hurt/G21.png',
        'img/4_enemie_boss_chicken/4_hurt/G22.png',
        'img/4_enemie_boss_chicken/4_hurt/G23.png',
    ];

    IMAGES_ATTACK = [
        'img/4_enemie_boss_chicken/3_attack/G13.png',
        'img/4_enemie_boss_chicken/3_attack/G14.png',
        'img/4_enemie_boss_chicken/3_attack/G15.png',
        'img/4_enemie_boss_chicken/3_attack/G16.png',
        'img/4_enemie_boss_chicken/3_attack/G17.png',
        'img/4_enemie_boss_chicken/3_attack/G18.png',
        'img/4_enemie_boss_chicken/3_attack/G19.png',
        'img/4_enemie_boss_chicken/3_attack/G20.png',
    ];

    constructor() {
        super().loadImage(this.IMAGES_ENGREY[0]);
        this.loadImages(this.IMAGES_ENGREY);
        this.loadImages(this.IMAGES_WALK);
        this.loadImages(this.IMAGES_DEAD);
        this.loadImages(this.IMAGES_HURT);
        this.loadImages(this.IMAGES_ATTACK);
        this.speed = 1 + Math.random() * 0.25;
        this.animate();
        console.log(this.intervalIds);

    }

    animate() {
        this.setStoppableInterval(() => this.endbossWalkImages(), 150);
        this.setStoppableInterval(() => this.endbossMove(), 1000 / 60,);
        this.setStoppableInterval(() => this.endbossEngreyImages(), 900);
        this.setStoppableInterval(() => this.endbossHurt(), 100);
        this.setStoppableInterval(() => this.endbossDead(), 500);
       
    }

    endbossMove() {
        this.moveLeft();
    }

    endbossWalkImages() {
        this.playAnimation(this.IMAGES_WALK);
    }

    endbossEngreyImages() {
        this.playAnimation(this.IMAGES_ENGREY);
    }

    endbossHurt() {
        if (this.isHurt()) {
            this.playAnimation(this.IMAGES_HURT);
        }
    }

    endbossAttack() {
        
        this.setStoppableInterval(() => {
            this.clearAllIntervals();
            this.playAnimation(this.IMAGES_ATTACK);
            clearInterval(this.intervalIds[0]);
            clearInterval(this.intervalIds[1]);
            clearInterval(this.intervalIds[2]);
            clearInterval(this.intervalIds[3]);

        },100);

    }

    endbossDead() {
        if (this.isDead()) {
            this.playAnimationOnce(this.IMAGES_DEAD);
            this.speed = 0;
            clearInterval(this.intervalIds[0]);
            clearInterval(this.intervalIds[1]);
            clearInterval(this.intervalIds[2]);
            clearInterval(this.intervalIds[3]);
            clearInterval(this.intervalIds[5]);
            setInterval(() => {
                this.y += 5;
            }, 50);
        }

    }
}