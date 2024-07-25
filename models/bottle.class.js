class Bottle extends MovableObject{

    constructor(imagePath, x, y){
        super().loadImage(imagePath);
        this.x = 200 + Math.random() * 1900;
        this.y = y;
    }
}