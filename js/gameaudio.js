let muteSound = false;

/**
 * json array with all the sounds.
 * 
 */

let sounds = {
    menu: {
        startScreen: new Audio('audio/menu_audio.mp3'),
    },
    game: {
        game: new Audio('audio/game_music.mp3'),
        gameOver: new Audio('audio/game_over.mp3'),
        gameWon: new Audio('audio/win_audio.mp3'),
    },
    character: {
        walking: new Audio('audio/walk.mp3'),
        hurt: new Audio('audio/character_hurt.mp3'),
        jump: new Audio('audio/jump.mp3'),
        long_idle: new Audio('audio/long_idle.mp3'),
        die: new Audio('audio/character_die.mp3'),
    },
    enboss: {
        first: new Audio('audio/first.mp3'),
        die: new Audio('audio/enboss_die.mp3'),
        showdown: new Audio('audio/showdown.mp3'),
    },
    chicken: {
        die: new Audio('audio/enemie_die.mp3'),
        attack: new Audio('audio/endboss-attack.mp3'),
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

/**
 * play sound
 *   
 * @param {string} category - category of the sound in json array
 * @param {string} sound  
 *   
 */
function playSound(category, sound) {
    sounds[category][sound].play();
}

/**
 * stop sound
 *   
 * @param {string} category - category of the sound in json array
 * @param {string} sound
 *    
 */
function stopSound(category, sound) {
    sounds[category][sound].pause();
    sounds[category][sound].currentTime = 0;

}

/**
 * button for muting the sound in the canvas
 * 
 */

function soundButton() {
    let soundButton = document.getElementById('soundButton');

    if (muteSound == false) {
        muteSounds();
        muteSound = true;
        soundButton.classList.add('muted');
    } else {
        unmuteSounds();
        muteSound = false;
        soundButton.classList.remove('muted');
    }
}

/**
 * mute sound
 * 
 */
function muteSounds() {
    for (let category in sounds) {
        for (let sound in sounds[category]) {
            let audio = sounds[category][sound];
            audio.muted = true;
        }
    }
}

/**
 * unmute sound
 * 
 */
function unmuteSounds() {
    for (let category in sounds) {
        for (let sound in sounds[category]) {
            let audio = sounds[category][sound];
            audio.muted = false;
        }
    }
}
