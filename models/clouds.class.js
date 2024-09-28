/**
 * Represents the clouds in the game.
 * 
 */
class Clouds extends MovableObject {

    y = 30;
    height = 400;
    width = 700;

    /**
     * Creates an instance of Clouds.
     * Initializes the clouds with a given x-coordinate and starts the animation.
     * 
     * @param {number} x - The x-coordinate of the clouds.
     * 
     */
    constructor(x) {
        super().loadImage('img/5_background/layers/4_clouds/1.png');
        this.x = x;
        this.animate();
    };

    /**
     * Animates the clouds by moving them to the left.
     * 
     */
    animate() {
        setInterval(() => {
            this.moveLeft();
        }, 1000 / 60);
    };
}