class Level {
    enemies;
    clouds;
    backgroundObjects;
    coin;
    bottle;
    bar;
    level_end_x = 3200;

    constructor(enemies, clouds, backgroundObjects, coin, bottle) {
        this.bottle = bottle;
        this.coin = coin;
        this.enemies = enemies;
        this.clouds = clouds;
        this.backgroundObjects = backgroundObjects;
        
    }
}