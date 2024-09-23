class Coin extends MovableObject {
    y = 100; 
          

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