let muteSound = false;

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

function playSound(category, sound) {
    sounds[category][sound].play();
}

function stopSound(category, sound) {
    sounds[category][sound].pause();
    sounds[category][sound].currentTime = 0;
}

function soundButton() {
    let soundButton = document.getElementById('soundButton');

    if (muteSound == false) {
        muteSounds();
        muteSound = true;
        soundButton.classList.add('muted'); // Fügen Sie die Klasse hinzu
    } else {
        unmuteSounds();
        muteSound = false;
        soundButton.classList.remove('muted'); // Entfernen Sie die Klasse
    }
}

function muteSounds() {
    for (let category in sounds) {
        for (let sound in sounds[category]) {
            let audio = sounds[category][sound];
            audio.muted = true;
        }
    }
}

function unmuteSounds() {
    for (let category in sounds) {
        for (let sound in sounds[category]) {
            let audio = sounds[category][sound];
            audio.muted = false;
        }
    }
}
