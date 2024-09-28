/**
 * Represents a level in the game.
 * 
 */
class Level {

    /**
     * Creates an instance of Level.
     * 
     */
    enemies;
    clouds;
    backgroundObjects;
    coin;
    bottle;
    bar;
    level_end_x = 3200;

    /**
     * Creates an instance of Level.
     * @param {Array} enemies - The enemies in the level.
     * @param {Array} clouds - The clouds in the level.
     * @param {Array} backgroundObjects - The background objects in the level.
     * @param {Array} coin - The coins in the level.
     * @param {Array} bottle - The bottles in the level.
     * 
     */
    constructor(enemies, clouds, backgroundObjects, coin, bottle) {
        this.bottle = bottle;
        this.coin = coin;
        this.enemies = enemies;
        this.clouds = clouds;
        this.backgroundObjects = backgroundObjects;
    }
}