class Character extends MovableObject {
    energy = 200;
    jumpSoundPlaying = false;
    jumpInterval = null;
    idleTimeout = null;
    y = 80;
    height = 250;
    speed = 5;
    offset = {
        top: 120,
        bottom: 0,
        left: 10,
        right: 10,
    }

    IMAGES_WALK = [
        'img/2_character_pepe/2_walk/W-21.png',
        'img/2_character_pepe/2_walk/W-22.png',
        'img/2_character_pepe/2_walk/W-23.png',
        'img/2_character_pepe/2_walk/W-24.png',
        'img/2_character_pepe/2_walk/W-25.png',
        'img/2_character_pepe/2_walk/W-26.png'
    ];

    IMAGES_JUMPING = [
        'img/2_character_pepe/3_jump/J-31.png',
        'img/2_character_pepe/3_jump/J-32.png',
        'img/2_character_pepe/3_jump/J-33.png',
        'img/2_character_pepe/3_jump/J-34.png',
        'img/2_character_pepe/3_jump/J-35.png',
        'img/2_character_pepe/3_jump/J-36.png',
        'img/2_character_pepe/3_jump/J-37.png',
        'img/2_character_pepe/3_jump/J-37.png',
        'img/2_character_pepe/3_jump/J-39.png'
    ];

    IMAGES_Dead = [
        'img/2_character_pepe/5_dead/D-51.png',
        'img/2_character_pepe/5_dead/D-52.png',
        'img/2_character_pepe/5_dead/D-53.png',
        'img/2_character_pepe/5_dead/D-54.png',
        'img/2_character_pepe/5_dead/D-55.png',
        'img/2_character_pepe/5_dead/D-56.png',
        'img/2_character_pepe/5_dead/D-57.png',
    ];

    IMAGES_HURT = [
        'img/2_character_pepe/4_hurt/H-41.png',
        'img/2_character_pepe/4_hurt/H-42.png',
        'img/2_character_pepe/4_hurt/H-43.png'
    ];

    IMAGES_IDEL = [
        'img/2_character_pepe/1_idle/idle/I-1.png',
        'img/2_character_pepe/1_idle/idle/I-2.png',
        'img/2_character_pepe/1_idle/idle/I-3.png',
        'img/2_character_pepe/1_idle/idle/I-4.png',
        'img/2_character_pepe/1_idle/idle/I-5.png',
        'img/2_character_pepe/1_idle/idle/I-6.png',
        'img/2_character_pepe/1_idle/idle/I-7.png',
        'img/2_character_pepe/1_idle/idle/I-8.png',
        'img/2_character_pepe/1_idle/idle/I-9.png',
        'img/2_character_pepe/1_idle/idle/I-10.png'
    ];

    IMAGES_IDEL_LONG = [
        'img/2_character_pepe/1_idle/long_idle/I-11.png',
        'img/2_character_pepe/1_idle/long_idle/I-12.png',
        'img/2_character_pepe/1_idle/long_idle/I-13.png',
        'img/2_character_pepe/1_idle/long_idle/I-14.png',
        'img/2_character_pepe/1_idle/long_idle/I-15.png',
        'img/2_character_pepe/1_idle/long_idle/I-16.png',
        'img/2_character_pepe/1_idle/long_idle/I-17.png',
        'img/2_character_pepe/1_idle/long_idle/I-18.png',
        'img/2_character_pepe/1_idle/long_idle/I-19.png',
        'img/2_character_pepe/1_idle/long_idle/I-20.png',
    ];
    world;

    walking_sound = new Audio('audio/walk.mp3');
    hurt_sound = new Audio('audio/character_hurt.mp3');
    jump_sound = new Audio('audio/jump.mp3');
    long_idle_sound = new Audio('audio/long_idle.mp3');



    constructor() {
        super().loadImage('img/2_character_pepe/2_walk/W-21.png');
        this.currentImage = 0;
        this.loadImages(this.IMAGES_IDEL);
        this.loadImages(this.IMAGES_IDEL_LONG);
        this.loadImages(this.IMAGES_WALK);
        this.loadImages(this.IMAGES_JUMPING);
        this.loadImages(this.IMAGES_Dead);
        this.loadImages(this.IMAGES_HURT);
        this.applyGravity();
        this.animate();
    }

    animate() {
        this.setStoppableInterval(() => this.characterMovements(), 1000 / 60);
        this.setStoppableInterval(() => this.idleAnimation(), 600);
        this.setStoppableInterval(() => this.stateAnimations(), 50);
        this.setStoppableInterval(() => this.deadAnimation(), 120);
    }

    idleAnimation() {
        let currentTime = new Date().getTime();
        if (!this.world.keyboard.RIGHT && !this.world.keyboard.LEFT && !this.world.keyboard.SPACE) {
            if (this.idle) {
                this.playAnimation(this.IMAGES_IDEL_LONG);
                playSound('character', 'long_idle');
            } else {
                stopSound('character', 'long_idle');
                this.playAnimation(this.IMAGES_IDEL);
                if (!this.idleStartTime) {
                    this.idleStartTime = currentTime;
                } else if (currentTime - this.idleStartTime >= 10000) {
                    this.idle = true;
                }
            }
        } else {
            this.idleStartTime = null;
            this.idle = false;
        }
    }

    characterMovements() {
        if (this.world.keyboard.RIGHT && this.x < this.world.level.level_end_x) {
            this.moveRight();
            this.otherDirection = false;
            this.idle = false;
            this.idleStartTime = null;
        }

        if (this.world.keyboard.LEFT && this.x > 0) {
            this.moveLeft();
            this.otherDirection = true;
            this.idle = false;
            this.idleStartTime = null;
        }

        if (this.world.keyboard.SPACE && !this.isAboveGround()) {
            this.jump();
            this.idle = false;
            this.idleStartTime = null;
        }
        this.world.camera_x = -this.x + 100;
    }



    stateAnimations() {
        if (this.isDead()) {
            return;
        } else if (this.isHurt()) {
            playSound('character', 'hurt');
            this.playAnimation(this.IMAGES_HURT);
        } else if (this.isAboveGround()) {
            if (!this.jumpSoundPlaying) {
                playSound('character', 'jump');
                this.jumpSoundPlaying = true;
            }
            this.updateJumpAnimation();
        } else {
            if (this.world.keyboard.RIGHT || this.world.keyboard.LEFT) {
                this.playAnimation(this.IMAGES_WALK);
                playSound('character', 'walking');
            }
            this.jumpSoundPlaying = false;
        }
    }

    deadAnimation() {
        if (this.isDead()) {
            console.log(this.currentImage);
            this.playAnimation(this.IMAGES_Dead);
            if (this.currentImage == this.IMAGES_Dead.length) {
                lostGame();
            }
            this.speed = 0;
            this.y -= 100;
            this.y += 120;
        }
    }

    updateJumpAnimation() {
        if (this.speedY > 0) {
            if (this.currentImage > 3) {
                this.currentImage = 3;
            }
        } else {
            if (this.speedY > -30) {
                if (this.currentImage > 4) {
                    this.currentImage = 7;
                }
            } else {
                if (this.currentImage > this.IMAGES_JUMPING.length - 1) {
                    this.currentImage = this.IMAGES_JUMPING.length - 1;
                }
            }
        }
        this.playAnimation(this.IMAGES_JUMPING);

    }

}