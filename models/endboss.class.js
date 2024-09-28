/**
 * Represents the end boss in the game.
 * 
 */
class Endboss extends MovableObject {
    world;
    energy = 20;
    height = 400;
    width = 300;
    y = 50;
    x = 3100;
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

    /**
     * Creates an instance of Endboss.
     * 
     */
    constructor() {
        super().loadImage(this.IMAGES_ENGREY[0]);
        this.loadImages(this.IMAGES_ENGREY);
        this.loadImages(this.IMAGES_WALK);
        this.loadImages(this.IMAGES_DEAD);
        this.loadImages(this.IMAGES_HURT);
        this.loadImages(this.IMAGES_ATTACK);
        this.animate();
    };

    /**
     * Animates the end boss.
     * 
     */
    animate() {
        this.handleFirstContact();
        this.startAnimationIntervals();
        this.startMovementInterval();
    };

    /**
     * Starts the animation intervals for the end boss.
     * 
     */
    startAnimationIntervals() {
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
        }, 160);
    };

    /**
     * Starts the movement interval for the end boss.
     * 
     */
    startMovementInterval() {
        this.setStoppableInterval(() => {
            if (this.firstContactCompleted && !this.isDead() && !this.isHurt() && !this.isAttacking) {
                this.endbossMove();
            }
        }, 1000 / 60);
    };

    /**
     * Character the first contact with the end boss.
     * 
     */
    handleFirstContact() {
        let i = 0;
        this.setStoppableInterval(() => {
            this.firstContact();
            if (this.hadFirstContact && !this.bossAnimationFisrstContact) {
                if (!this.engreyAnimationPlayed && i < this.IMAGES_ENGREY.length) {
                    this.playFirstContactSounds();
                    if (i == 5) {
                        playSound('chicken', 'die');
                    }
                    this.endbossEngreyImages();
                    i++;
                } else {
                    this.setFirstContactFlags();
                }
            }
        }, 250);
    };

    /**
     * Plays the sounds for the first contact with the end boss.
     * 
     */
    playFirstContactSounds() {
        stopSound('game', 'game');
        playSound('enboss', 'showdown');
        playSound('enboss', 'first');
    };

    /**
     * Sets the flags indicating the first contact with the end boss is completed.
     * 
     */
    setFirstContactFlags() {
        this.engreyAnimationPlayed = true;
        this.bossAnimationFisrstContact = true;
        this.firstContactCompleted = true;
    };

    /**
     * Handles the walking animation and movement of the end boss.
     * 
     */
    endbossWalk() {
        this.endbossWalkImages();
        this.endbossMove();
    };

    /**
     * Moves the end boss to the left.
     * 
     */
    endbossMove() {
        this.moveLeft();
    };

    /**
     * Plays the walking animation for the end boss.
     * 
     */
    endbossWalkImages() {
        this.playAnimation(this.IMAGES_WALK);
    };

    /**
     * Plays the energy animation for the end boss.
     * 
     */
    endbossEngreyImages() {
        this.playAnimation(this.IMAGES_ENGREY);
    };

    /**
     * Plays the hurt animation for the end boss.
     * 
     */
    endbossHurt() {
        if (this.isHurt()) {
            playSound('chicken', 'die');
            this.playAnimation(this.IMAGES_HURT);
        }
    };

    /**
     * Plays the attack animation for the end boss.
     * 
     */
    endbossAttack() {
        this.setStoppableInterval(() => {
            playSound('chicken', 'attack');
            this.clearAllIntervals();
            this.playAnimation(this.IMAGES_ATTACK);
        }, 80);
    };

    /**
     * Plays the dead animation for the end boss.
     * 
     */
    endbossDead() {
        if (this.isDead()) {
            this.playAnimation(this.IMAGES_DEAD);
            playSound('enboss', 'die');
            if (this.currentImage == this.IMAGES_DEAD.length) {
                winGame();
            }
            setInterval(() => {
                this.y += 1;
            }, 100);
        }
    };

    /**
     * Checks if the first contact with the end boss has occurred.
     * 
     */
    firstContact() {
        if (world.character.x > 2600 && !this.hadFirstContact) {
            this.hadFirstContact = true;
        }
    };
}



