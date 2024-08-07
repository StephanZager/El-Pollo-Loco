class Bottle extends MovableObject{

    height = 100;
    width = 80;

    constructor(imagePath, x, y){
        super().loadImage(imagePath);
        this.x = 200 + Math.random() * 1900;
        this.y = y;
        this.offset = {
            top: 10,
            bottom: 10,
            left: 30,
            right: 30,
        }
    }
}