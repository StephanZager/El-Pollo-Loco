class Endboss extends MovableObject {
    world;
    energy = 20;
    height = 400;
    width = 300;
    y = 50;
    x = 2000;
    hadFirtstContact = false;
    firstContactCompleted = false;
    bossAnimationFisrstContact = false;
    engreyAnimationPlayed = false;
    speed = 2;
    currentImage = 0;
    offset = {
        top: 50,
        bottom: 10,
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
       
        this.setStoppableInterval(() => {
            if (!this.firstContactCompleted) {
                return;
            }
            if (this.isDead()) {
                this.endbossDead();
            } else if (this.isHurt()) {
                this.endbossHurt();
            } else if (this.isAttacking) {
                this.endbossAttack();
            } else {
                this.endbossWalkImages(); 
            }
        }, 150);    
      
        this.setStoppableInterval(() => {
            if (this.firstContactCompleted && !this.isDead() && !this.isHurt() && !this.isAttacking) {
                this.endbossMove();
            }
        }, 1000 / 60);  
    }
        
    handleFirstContact() {
        let i = 0;
        this.setStoppableInterval(() => {
            this.firstContact();
            if (this.hadFirstContact && !this.bossAnimationFisrstContact) {
                if (!this.engreyAnimationPlayed && i < this.IMAGES_ENGREY.length) {
                    if (i == 5){
                        playSound('chicken', 'die');
                    }
                    this.endbossEngreyImages();
                    i++;
                } else {
                    this.engreyAnimationPlayed = true;
                    this.bossAnimationFisrstContact = true;
                    this.firstContactCompleted = true;
                }
            }
        }, 250);
    }


    endbossWalk() {        
        this.endbossWalkImages();        
        this.endbossMove();
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
            playSound('chicken', 'die');         
            this.playAnimation(this.IMAGES_HURT);          
        }
    }

    endbossAttack() {
        this.setStoppableInterval(() => {
            playSound('chicken', 'attack');
            this.clearAllIntervals();
            this.bossAnimationFisrstContact = false;
            this.playAnimation(this.IMAGES_ATTACK);
        }, 100);

    }

    endbossDead() {
       if (this.isDead()) {                                   
            this.playAnimation(this.IMAGES_DEAD);
            if (this.currentImage == this.IMAGES_DEAD.length) {
                winGame();
            }
          setInterval(() => {
              this.y += 1;
         }, 100);
        }
    }
 
    firstContact() {
        if (world.character.x > 1500 && !this.hadFirstContact) {
            this.hadFirstContact = true;
        }
    }


}



