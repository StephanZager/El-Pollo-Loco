class Character extends MovableObject {

    y = 180;
    height = 250;
    speed = 5;
    IMAGES_WALK = [
        'img/2_character_pepe/2_walk/W-21.png',
        'img/2_character_pepe/2_walk/W-22.png',
        'img/2_character_pepe/2_walk/W-23.png',
        'img/2_character_pepe/2_walk/W-24.png',
        'img/2_character_pepe/2_walk/W-25.png',
        'img/2_character_pepe/2_walk/W-26.png'
    ]
    world;
    
    constructor() {
        super().loadImage('img/2_character_pepe/2_walk/W-21.png');
        this.loadImages(this.IMAGES_WALK);

        this.animate();
    }

    animate() {

        setInterval(() => {
            if (this.world.keyboard.RIGHT){
                this.x += this.speed;
                this.otherDirection = false;
            }

            if (this.world.keyboard.LEFT){
                this.x -= this.speed;
                this.otherDirection = true;
            }
        }, 1000 / 60);

        setInterval(() => {

            if (this.world.keyboard.RIGHT || this.world.keyboard.LEFT) {

                let i = this.currentImage % this.IMAGES_WALK.length;
                let path = this.IMAGES_WALK[i];
                this.img = this.imageCache[path];
                this.currentImage++;
            }
        }, 50);
    }





jump() {

}
}