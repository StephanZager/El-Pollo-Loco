/**
 * Represents the status bar for coins in the game.
 * 
 */
class StatusCoinBar extends DrawableObject {

    height = 40;
    width = 200;

    IMAGES_COIN_BAR = [
        'img/7_statusbars/1_statusbar/1_statusbar_coin/blue/0.png',
        'img/7_statusbars/1_statusbar/1_statusbar_coin/blue/20.png',
        'img/7_statusbars/1_statusbar/1_statusbar_coin/blue/40.png',
        'img/7_statusbars/1_statusbar/1_statusbar_coin/blue/60.png',
        'img/7_statusbars/1_statusbar/1_statusbar_coin/blue/100.png',
    ];

    /**
     * Creates an instance of StatusCoinBar.
     * Initializes the status bar with default values and loads the images.
     * 
     */
    constructor() {
        super();
        this.loadImages(this.IMAGES_COIN_BAR);
        this.x = 20;
        this.y = 30;
        this.setPercentage(0);
    };
    
    /**
     * Sets the percentage of the coin status bar based on the number of coins.
     * @param {number} coins - The number of coins collected.
     * 
     */
    setPercentage(coins) {
        this.coins = coins;
        let imagePath = this.IMAGES_COIN_BAR[this.resolveImageIndex()];
        this.img = this.imageCache[imagePath];
    };

    /**
     * Resolves the image index based on the number of coins.
     * @returns {number} The index of the image to be displayed.
     * 
     */
    resolveImageIndex() {
        if (this.coins >= 4) {
            return 4;
        } else if (this.coins >= 3) {
            return 3;
        } else if (this.coins >= 2) {
            return 2;
        } else if (this.coins >= 1) {
            return 1;
        } else {
            return 0;
        }
    };

    /**
     * Collects a coin and updates the status bar.
     * 
     * @param {number} index - The index of the coin in the array.
     * @param {Array} coin - The array of coins.
     * @returns {number} The updated number of coins.
     * 
     */
    collectCoin(index, coin) {
        if (this.coins >= 4) {
            stopSound('coin', 'collect');
        }
        if (this.coins <= 3) {
            this.coins++;
            this.setPercentage(this.coins);
            coin.splice(index, 1);
            return this.coins;
        }
    };
}