class Bar extends MovableObject {
    height = 60;
    width = 200;
    x = 30;
    y = 1;

    IMAGES_HEALTH_BAR = [
        'img/7_statusbars/1_statusbar/2_statusbar_health/blue/0.png',
        'img/7_statusbars/1_statusbar/2_statusbar_health/blue/20.png',
        'img/7_statusbars/1_statusbar/2_statusbar_health/blue/40.png',
        'img/7_statusbars/1_statusbar/2_statusbar_health/blue/60.png',
        'img/7_statusbars/1_statusbar/2_statusbar_health/blue/80.png',
        'img/7_statusbars/1_statusbar/2_statusbar_health/blue/100.png',
    ];

    IMAGES_COIN_BAR = [
        'img/7_statusbars/1_statusbar/1_statusbar_coin/blue/0.png',
        'img/7_statusbars/1_statusbar/1_statusbar_coin/blue/20.png',
        'img/7_statusbars/1_statusbar/1_statusbar_coin/blue/40.png',
        'img/7_statusbars/1_statusbar/1_statusbar_coin/blue/60.png',
        'img/7_statusbars/1_statusbar/1_statusbar_coin/blue/80.png',
        'img/7_statusbars/1_statusbar/1_statusbar_coin/blue/100.png',
    ];

    constructor() {
        super().loadImage('img/7_statusbars/1_statusbar/2_statusbar_health/blue/100.png');
        
        this.loadImages(this.IMAGES_HEALTH_BAR);
        this.loadImages(this.IMAGES_COIN_BAR);
    }

    aktualiesierungsHealtBart(){
        if(this.hit() <= 80){
            this.loadImage('img/7_statusbars/1_statusbar/2_statusbar_health/blue/80.png')
        }
    }
}