class Coin extends MovableObject {
    y = 100;

    

    

    constructor(){
        super().loadImage('img/8_coin/coin_1.png');
        this.x = 150 + Math.random() * 1900;
        this.y = 150 + Math.random() * 120;
        this.offset = {
            top: 100,
            bottom: 100,
            left: 100,
            right: 100,
        }
    }
}