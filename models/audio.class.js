class GameAudio {
    sounds = {

        character: {
            walking: new Audio('audio/walk.mp3'),
            hurt: new Audio('audio/character_hurt.mp3'),
            jump: new Audio('audio/jump.mp3'),
            long_idle: new Audio('audio/long_idle.mp3'),
        },

        chicken: {
            die: new Audio('audio/enemie_die.mp3'),
        },

        coin: {
            collect: new Audio('audio/coin.mp3'),
        },
        bottle: {
            throw: new Audio('audio/throw.mp3'),
            collect: new Audio('audio/bottle_collect.mp3'),
            crack: new Audio('audio/bottle_crack.mp3'),
        },

    }

    playSound(category, sound) {
        
            this.sounds[category][sound].play();
        
    }
}