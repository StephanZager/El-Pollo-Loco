/**
 * Represents a background object in the game, extending the MovableObject class.
 * 
 */
class BackgroundObject extends MovableObject {

    width = 720;
    height = 480;

    /**
     * Creates an instance of BackgroundObject.
     * 
     * @param {string} imagePath - The path to the image for the background.
     * @param {number} x - The initial x-coordinate of the background object.
     * 
     */
    constructor(imagePath, x) {
        super().loadImage(imagePath);
        this.x = x;
        this.y = 480 - this.height;
    }
}