class Level {
    enemies;
    clouds;
    backgroundObjects;
    coin;
    bottle;
    level_end_x = 2100;

    constructor(enemies, clouds, backgroundObjects, coin, bottle) {
        this.bottle = bottle;
        this.coin = coin;
        this.enemies = enemies;
        this.clouds = clouds;
        this.backgroundObjects = backgroundObjects;
    }
}