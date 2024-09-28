/**
 * Represents a coin in the game.
 * 
 */
class Coin extends MovableObject {
    
    y = 100; 
          
    /**
     * Creates an instance of Coin.
     * Initializes the coin with a given x-coordinate and random y-coordinate.
     * @param {number} x - The x-coordinate of the coin.
     * 
     */
    constructor(x){
        super().loadImage('img/8_coin/coin_1.png');
        this.x = x;
        this.y = 10 + Math.random() * 120;
        this.offset = {
            top: 30,
            bottom: 30,
            left: 30,
            right: 30,
        }
    }
}