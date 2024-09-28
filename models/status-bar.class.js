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

    
    constructor() {
        super();
        this.loadImages(this.IMAGES_HEALTH_BAR);        
        this.x = 20;
        this.y = 0;
        this.setPercentage(100);
    }
    

    setPercentage(percentage) {
        this.percentage = percentage;
        let imagePath = this.IMAGES_HEALTH_BAR[this.resolveImageIndex()];        
        this.img = this.imageCache[imagePath];
    }

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
    }

}