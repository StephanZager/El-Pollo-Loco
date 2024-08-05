class Level {
    enemies;
    clouds;
    backgroundObjects;
    coin;
    bottle;
    bar;
    level_end_x = 2100;

    constructor(enemies, clouds, backgroundObjects, coin, bottle, bar) {
        this.bottle = bottle;
        this.coin = coin;
        this.enemies = enemies;
        this.clouds = clouds;
        this.backgroundObjects = backgroundObjects;
        
    }
}