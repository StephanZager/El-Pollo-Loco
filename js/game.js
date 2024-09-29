let canvas;
let world;
let keyboard = new Keyboard();
let background = new Image();
let movableObjects = new MovableObject();

/**
 * Initializes the game.
 * 
 */
function init() {
    checkOrientation();
    initLevel1();
    canvas = document.getElementById('canvas');
    world = new World(canvas, keyboard);
    checkMobileDevice();
};

/**
 * Switches to the canvas screen and hides the start screen.
 * 
 */
function showCanvasScreen() {
    let canvasScreen = document.getElementById('canvas');
    let startScreen = document.getElementById('startScreen');
    startScreen.classList.add('d-none');
    canvasScreen.classList.remove('d-none');
}

/**
 * Starts the game.
 * 
 */
function startGame() {
    init();
    showCanvasScreen();

    let buttonTop = document.getElementById('buttonRightTop');
    let headline = document.getElementById('headline');

    buttonTop.style.display = 'flex';
    headline.style.display = 'none';

    playSound('game', 'game');
}

/**
 * Handles the game over scenario.
 * 
 */
function lostGame() {
    let lostGame = document.getElementById('lostGame');
    lostGame.style.display = 'flex';

    lostGameSound();
    clearAllGameIntervals();

    setTimeout(() => {
        document.getElementById('resumeMenuGame').style.display = 'flex';
    }, 2000);
};

/**
 * Clears all intervals in the game.
 * 
 */
function clearAllGameIntervals() {
    movableObjects.clearAllIntervals();
    for (let i = 1; i < 9999; i++) {
        window.clearInterval(i);
    }
}

/**
 * Plays and Stop the sound for losing the game.
 * 
 */
function lostGameSound() {
    stopSound('enboss', 'showdown');
    stopSound('game', 'game');
    playSound('game', 'gameOver');
};

/**
 * Handles the game win scenario.
 * 
 */
function winGame() {
    let wonGame = document.getElementById('wonGame');
    wonGame.style.display = 'flex';

    playWinSounds();
    clearAllGameIntervals();

    setTimeout(() => {
        document.getElementById('resumeMenuGame').style.display = 'flex';
    }, 2000);
};

/**
 * Plays the sounds for winning the game.
 * 
 */
function playWinSounds() {
    stopSound('enboss', 'showdown');
    playSound('game', 'gameWon');
};

/**
 * Hides game-related UI elements.
 * 
 */
function hideRestartGameElements() {
    document.getElementById('lostGame').style.display = 'none';
    document.getElementById('wonGame').style.display = 'none';
    document.getElementById('resumeMenuGame').style.display = 'none';
};

/**
 * Restarts the game.
 * 
 */
function restartGame() {
    hideRestartGameElements();
    stopGameSoundsMenu();
    startGame();
};

/**
 * Stops all game sounds for the Menu.
 * 
 */
function stopGameSoundsMenu() {
    stopSound('game', 'gameOver');
    stopSound('game', 'gameWon');
    stopSound('game', 'game');
    stopSound('enboss', 'showdown');
    stopSound('character', 'long_idle');
};

/**
 * Switches to the start screen and hides the canvas screen.
 */
function showStartScreen() {
    let canvasScreen = document.getElementById('canvas');
    let startScreen = document.getElementById('startScreen');
    startScreen.classList.remove('d-none');
    canvasScreen.classList.add('d-none');
};

/**
 * Hides game-related UI elements.
 * 
 */
function hideToTheMenuElements() {
    document.getElementById('buttonRightTop').style.display = 'none';
    document.getElementById('buttonBottomMobile').style.display = 'none';
    document.getElementById('lostGame').style.display = 'none';
    document.getElementById('wonGame').style.display = 'none';
    document.getElementById('resumeMenuGame').style.display = 'none';
};

/**
 * Handles the transition to the menu.
 * 
 */
function totheMenu() {
    showStartScreen();
    stopGameSoundsMenu();
    clearAllGameIntervals();
    hideToTheMenuElements();

    document.getElementById('headline').style.display = 'flex';
};

/**
 * Shows the steering menu.
 * 
 */
function showSteering() {
    let navBar = document.getElementById('menuBar');
    let steering = document.getElementById('menuSteering');
    let returMenu = document.getElementById('menuReturn');

    steering.style.display = 'flex';
    navBar.style.display = 'none';
    returMenu.style.display = 'flex';
};

/**
 * Returns to the main menu.
 * 
 */
function returnMenu() {
    let impressum = document.getElementById('impressum');

    let navBar = document.getElementById('menuBar');
    let steering = document.getElementById('menuSteering');
    let returMenu = document.getElementById('menuReturn');

    impressum.style.display = 'none';
    steering.style.display = 'none';
    navBar.style.display = 'flex';
    returMenu.style.display = 'none';
};

/**
 * Shows the impressum menu.
 * 
 */
function showImpressum() {
    let navBar = document.getElementById('menuBar');
    let impressum = document.getElementById('impressum');
    let returMenu = document.getElementById('menuReturn');

    impressum.style.display = 'flex';
    navBar.style.display = 'none';
    returMenu.style.display = 'flex';
};


/**
 * Checks if the device is a mobile device.
 * @returns {boolean} True if the device is a mobile device, false otherwise.
 * 
 */
function isMobileDevice() {
    return /Mobi|Android|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
};

/**
 * Checks if the device is a mobile device and adjusts the UI accordingly.
 * 
 */
function checkMobileDevice() {
    if (isMobileDevice()) {
        document.body.classList.add('mobile-device');
        document.getElementById('buttonBottomMobile').style.display = 'flex';
        document.getElementById('buttonRightTop').style.display = 'flex';
    } else {
        document.body.classList.remove('mobile-device');
        document.getElementById('buttonBottomMobile').style.display = 'none';
        document.getElementById('buttonRightTop').style.display = 'none';
    }
};

/**
 * Checks the orientation of the device and adjusts the UI accordingly.
 * 
 */
function checkOrientation() {
    if (isMobileDevice()) {
        if (window.innerHeight > window.innerWidth) {
            document.getElementById('rotationMobile').style.display = 'flex';
            document.getElementById('menuSection').style.display = 'none';
            document.getElementById('canvasScreen').style.display = 'none';
        } else {
            document.getElementById('rotationMobile').style.display = 'none';
            document.getElementById('menuSection').style.display = 'flex';
            document.getElementById('canvasScreen').style.display = 'flex';
        }
    } else {
        document.getElementById('rotationMobile').style.display = 'none';
        document.getElementById('menuSection').style.display = 'flex';
        document.getElementById('canvasScreen').style.display = 'flex';
    }
};

/**
 * Event listener for the orientation of the device.
 * 
 */
document.addEventListener('DOMContentLoaded', () => {
    checkOrientation();
    window.addEventListener('resize', checkOrientation);
});

/**
 * Event listener for the keyboard.
 * 
 */
window.addEventListener('keydown', (event) => {
    if (event.keyCode == 39) {
        keyboard.RIGHT = true;
    };

    if (event.keyCode == 37) {
        keyboard.LEFT = true;
    };

    if (event.keyCode == 40) {
        keyboard.DOUWNT = true;
    };

    if (event.keyCode == 38) {
        keyboard.UP = true;
    };

    if (event.keyCode == 32) {
        keyboard.SPACE = true;
    };

    if (event.keyCode == 68) {
        keyboard.D = true;
    };

});

/**
 * Event listener for the keyboard.
 * 
 */
window.addEventListener('keyup', (event) => {
    if (event.keyCode == 39) {
        keyboard.RIGHT = false;
    };

    if (event.keyCode == 37) {
        keyboard.LEFT = false;
    };

    if (event.keyCode == 40) {
        keyboard.DOUWNT = false;
    };

    if (event.keyCode == 38) {
        keyboard.UP = false;
    };

    if (event.keyCode == 32) {
        keyboard.SPACE = false;
    };

    if (event.keyCode == 68) {
        keyboard.D = false;
    };

});

/**
 * Event listener for the mobile device.
 * 
*/
document.addEventListener('DOMContentLoaded', () => {

    const leftButton = document.getElementById('left-button');
    const rightButton = document.getElementById('right-button');
    const upButton = document.getElementById('up-button');
    const throwButton = document.getElementById('throw-button');
    const soundButton = document.getElementById('soundButton');
    const menuButton = document.querySelector('#buttonRightTop img[src="img/10_Menu/mobile/menu.png"]');


    function preventDefault(event) {
        event.preventDefault();
    }

    if (leftButton) {
        leftButton.addEventListener('touchstart', (event) => {
            keyboard.LEFT = true;
            preventDefault(event);
        });

        leftButton.addEventListener('touchend', (event) => {
            keyboard.LEFT = false;
            preventDefault(event);
        });

        leftButton.addEventListener('contextmenu', preventDefault);
    }

    if (rightButton) {
        rightButton.addEventListener('touchstart', (event) => {
            keyboard.RIGHT = true;
            preventDefault(event);
        });

        rightButton.addEventListener('touchend', (event) => {
            keyboard.RIGHT = false;
            preventDefault(event);
        });

        rightButton.addEventListener('contextmenu', preventDefault);
    }

    if (upButton) {
        upButton.addEventListener('touchstart', (event) => {
            keyboard.SPACE = true;
            preventDefault(event);
        });

        upButton.addEventListener('touchend', (event) => {
            keyboard.SPACE = false;
            preventDefault(event);
        });

        upButton.addEventListener('contextmenu', preventDefault);
    }

    if (throwButton) {
        throwButton.addEventListener('touchstart', (event) => {
            keyboard.D = true;
            preventDefault(event);
        });

        throwButton.addEventListener('touchend', (event) => {
            keyboard.D = false;
            preventDefault(event);
        });

        throwButton.addEventListener('contextmenu', preventDefault);
    }

    if (soundButton) {
        soundButton.addEventListener('touchstart', (event) => {
            soundButton.click();
            preventDefault(event);
        });

        soundButton.addEventListener('contextmenu', preventDefault);
    }

    if (menuButton) {
        menuButton.addEventListener('touchstart', (event) => {
            menuButton.click();
            preventDefault(event);
        });

        menuButton.addEventListener('contextmenu', preventDefault);
    }
});