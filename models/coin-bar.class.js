class StatusCoinBar extends DrawableObject {

    height = 60;
    width = 200;

    IMAGES_COIN_BAR = [
        'img/7_statusbars/1_statusbar/1_statusbar_coin/blue/0.png',
        'img/7_statusbars/1_statusbar/1_statusbar_coin/blue/20.png',
        'img/7_statusbars/1_statusbar/1_statusbar_coin/blue/40.png',
        'img/7_statusbars/1_statusbar/1_statusbar_coin/blue/60.png',
        'img/7_statusbars/1_statusbar/1_statusbar_coin/blue/100.png',
    ];

    world;

    constructor() {
        super();

        this.loadImages(this.IMAGES_COIN_BAR);
        this.x = 20;
        this.y = 40;
        this.setPercentage(0);
    }

    setPercentage(coins) {
        this.coins = coins;
        let imagePath = this.IMAGES_COIN_BAR[this.resolveImageIndex()];
        this.img = this.imageCache[imagePath];
    }

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
    }

    collectCoin(index, coin) {
        if (this.coins <= 4) {
            this.coins++;
            this.setPercentage(this.coins);
            coin.splice(index, 1);
            return this.coins;
        }
    }

}