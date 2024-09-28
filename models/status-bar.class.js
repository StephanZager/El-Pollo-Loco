/**
 * Represents the status bar for health in the game.
 * 
 */
class StatusBar extends DrawableObject {

    height = 40;
    width = 200;
    percentage = 100;

    IMAGES_HEALTH_BAR = [
        'img/7_statusbars/1_statusbar/2_statusbar_health/blue/0.png',
        'img/7_statusbars/1_statusbar/2_statusbar_health/blue/20.png',
        'img/7_statusbars/1_statusbar/2_statusbar_health/blue/40.png',
        'img/7_statusbars/1_statusbar/2_statusbar_health/blue/60.png',
        'img/7_statusbars/1_statusbar/2_statusbar_health/blue/80.png',
        'img/7_statusbars/1_statusbar/2_statusbar_health/blue/100.png',
    ];

    /**
     * Creates an instance of StatusBar.
     * Initializes the status bar with default values and loads the images.
     * 
     */
    constructor() {
        super();
        this.loadImages(this.IMAGES_HEALTH_BAR);
        this.x = 20;
        this.y = 0;
        this.setPercentage(100);
    };

    /**
     * Sets the percentage of the health status bar.
     * @param {number} percentage - The percentage of health to be displayed.
     * 
     */
    setPercentage(percentage) {
        this.percentage = percentage;
        let imagePath = this.IMAGES_HEALTH_BAR[this.resolveImageIndex()];
        this.img = this.imageCache[imagePath];
    };

    /**
     * Resolves the image index based on the percentage of health.
     * @returns {number} The index of the image to be displayed.
     * 
     */
    resolveImageIndex() {
        if (this.percentage == 100) {
            return 5;
        } else if (this.percentage > 100) {
            return 4;
        } else if (this.percentage > 60) {
            return 3;
        } else if (this.percentage > 40) {
            return 2;
        } else if (this.percentage > 20) {
            return 1;
        } else {
            return 0;
        }
    };
}