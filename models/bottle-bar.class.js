/**
 * Represents the status bar for bottles in the game, showing the player's progress in collecting bottles.
 *
 */
class StatusBottleBar extends DrawableObject {

    height = 40;
    width = 200;

    IMAGES_BOTTLE_BAR = [
        'img/7_statusbars/1_statusbar/3_statusbar_bottle/blue/0.png',
        'img/7_statusbars/1_statusbar/3_statusbar_bottle/blue/20.png',
        'img/7_statusbars/1_statusbar/3_statusbar_bottle/blue/40.png',
        'img/7_statusbars/1_statusbar/3_statusbar_bottle/blue/60.png',
        'img/7_statusbars/1_statusbar/3_statusbar_bottle/blue/100.png',
    ];

    /**
     * Creates an instance of StatusBottleBar.
     * Initializes the bottle bar with default values and loads the images.
     * 
     */
    constructor() {
        super();
        this.loadImages(this.IMAGES_BOTTLE_BAR);
        this.x = 20;
        this.y = 69;
        this.setPercentage(0);
    };

    /**
     * Set the percentage of the bottle bar.
     * 
     * @param {number} bottles - Number of bottles.
     * 
     */
    setPercentage(bottles) {
        this.bottles = bottles;
        let imagePath = this.IMAGES_BOTTLE_BAR[this.resolveImageIndex()];
        this.img = this.imageCache[imagePath];
    };

    /**
     * Resolve the image index, for the bottle bar.
     * 
     */
    resolveImageIndex() {
        if (this.bottles >= 4) {
            return 4;
        } else if (this.bottles >= 3) {
            return 3;
        } else if (this.bottles >= 2) {
            return 2;
        } else if (this.bottles >= 1) {
            return 1;
        } else {
            return 0;
        }
    };

    /**
    * Collects a bottle and updates the bottle count.
    * 
    * @param {number} index - The index of the bottle to be collected.
    * @param {Array} bottle - The array containing the bottles.
    * @returns {number} - The updated number of bottles collected.
    * 
    */
    collectBottle(index, bottle) {
        if (this.bottles >= 4) {
            stopSound('bottle', 'collect');
        }
        if (this.bottles <= 3) {
            this.bottles++;
            this.setPercentage(this.bottles);
            bottle.splice(index, 1);
            return this.bottles;
        }
    };
}