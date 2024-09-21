class Endboss extends MovableObject {
    world;
    energy = 20;
    height = 400;
    width = 300;
    y = 50;
    x = 2000;
    hadFirtstContact = false;
    bossAnimationFisrstContact = false;
    engreyAnimationPlayed = false;
    speed = 2 + Math.random() * 0.25;
    offset = {
        top: 50,
        bottom: 0,
        left: 35,
        right: 10,
    }


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
        this.animate();
    }

    animate() {
        this.handleFirstContact();
        this.setStoppableInterval(() => this.endbossHurt(), 120);
        this.setStoppableInterval(() => this.endbossDead(), 500);
    }

    handleFirstContact() {
        let i = 0;
        let firstContact = this.setStoppableInterval(() => {
            this.firstContact();
            if (this.hadFirstContact && !this.bossAnimationFisrstContact) {
                if (!this.engreyAnimationPlayed && i < this.IMAGES_ENGREY.length) {
                    this.endbossEngreyImages();
                    i++;
                } else {
                    this.engreyAnimationPlayed = true;
                    clearInterval(firstContact);
                    this.bossAnimationFisrstContact = true;
                    this.setStoppableInterval(() => this.endbossWalkImages(), 150);
                    this.setStoppableInterval(() => this.endbossMove(), 1000 / 60);
                }
            }
        }, 250);
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
            clearInterval(this.intervalIds[0]);
            this.playAnimation(this.IMAGES_HURT);
            
        }
    }

    endbossAttack() {
        this.setStoppableInterval(() => {
            this.clearAllIntervals();
            this.bossAnimationFisrstContact = false;
            this.playAnimation(this.IMAGES_ATTACK);

        }, 150);

    }

    endbossDead() {
        if (this.isDead()) {
            this.speed = 0;
            clearInterval(this.intervalIds[0]);
            clearInterval(this.intervalIds[1]);
            clearInterval(this.intervalIds[3]);
            clearInterval(this.intervalIds[4]);
            this.playAnimationOnce(this.IMAGES_DEAD);
            setInterval(() => {
                this.y += 10;
            }, 50);
            winGame();
        }
    }

    firstContact() {
        if (world.character.x > 1500 && !this.hadFirstContact) {
            this.hadFirstContact = true;
        }
    }
}