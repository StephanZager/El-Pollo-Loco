class Chicken extends MovableObject {
    energy = 5;
    height = 80;
    width = 70;
    y = 350;
    
    IMAGES_WALK = [
        'img/3_enemies_chicken/chicken_normal/1_walk/1_w.png',
        'img/3_enemies_chicken/chicken_normal/1_walk/2_w.png',
        'img/3_enemies_chicken/chicken_normal/1_walk/3_w.png'
    ];

    IMAGES_DEAD = [
        'img/3_enemies_chicken/chicken_normal/2_dead/dead.png'
    ];


    constructor() {
        super().loadImage('img/3_enemies_chicken/chicken_normal/1_walk/1_w.png');
        this.loadImages(this.IMAGES_WALK);
        this.loadImages(this.IMAGES_DEAD);

        this.x = 200 + Math.random() * 500;

        this.speed = 0.15 + Math.random() * 0.25;
        this.animate();

        this.offset = {
            top: 0,
            bottom: 0,
            left: 0,
            right: 0,
        }
    }

    animate() {
        this.moveLeftChicken()
        this.setStoppableInterval(() => this.walkChickenImages(), 200);
        this.isDeadChicken();

    }

    walkChickenImages() {
        this.playAnimation(this.IMAGES_WALK);
    }

    moveLeftChicken() {
        setInterval(() => {
            this.moveLeft();
        }, 1000 / 60);
    }

    isDeadChicken() {
      
        setInterval(() => {
            if (this.energy <= 0) {
                
                this.playAnimationOnce(this.IMAGES_DEAD);
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
                clearInterval(this.intervalIds[0]);
            }
        }, 40);
    }

}