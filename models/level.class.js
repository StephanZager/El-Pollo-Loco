class Level {
    enemies;
    clouds;
    backgroundObjects;
    coin;
    level_end_x = 2100;

    constructor(enemies, clouds, backgroundObjects, coin) {
        this.coin = coin;
        this.enemies = enemies;
        this.clouds = clouds;
        this.backgroundObjects = backgroundObjects;
    }
}