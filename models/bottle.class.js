/**
 * Represents a bottle in the game.
 * 
 */
class Bottle extends MovableObject {

    height = 100;
    width = 80;


    /**
     * Creates an instance of Bottle.
     * 
     * @param {string} imagePath - The path to the image of the bottle.
     * @param {number} x - The x-coordinate of the bottle.
     * @param {number} y - The y-coordinate of the bottle.
     * 
     */
    constructor(imagePath, x, y) {
        super().loadImage(imagePath);
        this.x = x;
        this.y = y;
        this.offset = {
            top: 10,
            bottom: 10,
            left: 30,
            right: 30,
        }
    }
}