let level1;

/**
 * Initialize level 1 with all the elements.
 * 
 */
function initLevel1() {
    level1 = new Level(
        [
            new Chicken(),
            new SmallChicken(),
            new Chicken(),
            new SmallChicken(),
            new Chicken(),
            new SmallChicken(),
            new Chicken(),
            new SmallChicken(),
            new Chicken(),
            new SmallChicken(),
            new Chicken(),
            new SmallChicken(),
            new Chicken(),
            new SmallChicken(),
            new Chicken(),
            new SmallChicken(),
            new Chicken(),
            new SmallChicken(),
            new Chicken(),
            new SmallChicken(),
            new Endboss()

        ],
        [
            new Clouds(0),
            new Clouds(719),
            new Clouds(719 * 2),
            new Clouds(719 * 3),
            new Clouds(719 * 4),
            new Clouds(719 * 5),
            new Clouds(719 * 6),
            new Clouds(719 * 7),
        ],
        [
            new BackgroundObject('img/5_background/layers/air.png', -719),
            new BackgroundObject('img/5_background/layers/3_third_layer/2.png', -719),
            new BackgroundObject('img/5_background/layers/2_second_layer/2.png', -719),
            new BackgroundObject('img/5_background/layers/1_first_layer/2.png', -719),

            new BackgroundObject('img/5_background/layers/air.png', 0),
            new BackgroundObject('img/5_background/layers/3_third_layer/1.png', 0),
            new BackgroundObject('img/5_background/layers/2_second_layer/1.png', 0),
            new BackgroundObject('img/5_background/layers/1_first_layer/1.png', 0),
            new BackgroundObject('img/5_background/layers/air.png', 719),
            new BackgroundObject('img/5_background/layers/3_third_layer/2.png', 719),
            new BackgroundObject('img/5_background/layers/2_second_layer/2.png', 719),
            new BackgroundObject('img/5_background/layers/1_first_layer/2.png', 719),

            new BackgroundObject('img/5_background/layers/air.png', 719 * 2),
            new BackgroundObject('img/5_background/layers/3_third_layer/1.png', 719 * 2),
            new BackgroundObject('img/5_background/layers/2_second_layer/1.png', 719 * 2),
            new BackgroundObject('img/5_background/layers/1_first_layer/1.png', 719 * 2),
            new BackgroundObject('img/5_background/layers/air.png', 719 * 3),
            new BackgroundObject('img/5_background/layers/3_third_layer/2.png', 719 * 3),
            new BackgroundObject('img/5_background/layers/2_second_layer/2.png', 719 * 3),
            new BackgroundObject('img/5_background/layers/1_first_layer/2.png', 719 * 3),

            new BackgroundObject('img/5_background/layers/air.png', 719 * 4),
            new BackgroundObject('img/5_background/layers/3_third_layer/1.png', 719 * 4),
            new BackgroundObject('img/5_background/layers/2_second_layer/1.png', 719 * 4),
            new BackgroundObject('img/5_background/layers/1_first_layer/1.png', 719 * 4),
            new BackgroundObject('img/5_background/layers/air.png', 719 * 5),
            new BackgroundObject('img/5_background/layers/3_third_layer/2.png', 719 * 5),
            new BackgroundObject('img/5_background/layers/2_second_layer/2.png', 719 * 5),
            new BackgroundObject('img/5_background/layers/1_first_layer/2.png', 719 * 5),

            new BackgroundObject('img/5_background/layers/air.png', 719 * 6),
            new BackgroundObject('img/5_background/layers/3_third_layer/1.png', 719 * 6),
            new BackgroundObject('img/5_background/layers/2_second_layer/1.png', 719 * 6),
            new BackgroundObject('img/5_background/layers/1_first_layer/1.png', 719 * 6),
            new BackgroundObject('img/5_background/layers/air.png', 719 * 7),
            new BackgroundObject('img/5_background/layers/3_third_layer/2.png', 719 * 7),
            new BackgroundObject('img/5_background/layers/2_second_layer/2.png', 719 * 7),
            new BackgroundObject('img/5_background/layers/1_first_layer/2.png', 719 * 7)
        ],
        [                       
            new Coin(223),
            new Coin(976),                     
            new Coin(1999),
            new Coin(1539),                
        ],
        [
            new Bottle('img/6_salsa_bottle/1_salsa_bottle_on_ground.png', 250, 330),
            new Bottle('img/6_salsa_bottle/2_salsa_bottle_on_ground.png', 555, 330),
            new Bottle('img/6_salsa_bottle/salsa_bottle.png', 359, 60),
            new Bottle('img/6_salsa_bottle/salsa_bottle.png', 666, 60),
            new Bottle('img/6_salsa_bottle/salsa_bottle.png', 976, 60),
            new Bottle('img/6_salsa_bottle/salsa_bottle.png', 1023, 60),
            new Bottle('img/6_salsa_bottle/1_salsa_bottle_on_ground.png', 1555, 330),
            new Bottle('img/6_salsa_bottle/2_salsa_bottle_on_ground.png', 1900, 330),
            new Bottle('img/6_salsa_bottle/salsa_bottle.png', 800, 40),
            new Bottle('img/6_salsa_bottle/salsa_bottle.png', 2055, 40),
            new Bottle('img/6_salsa_bottle/salsa_bottle.png', 2555, 40),
            new Bottle('img/6_salsa_bottle/2_salsa_bottle_on_ground.png', 2755, 330),
        ],

    );

}

