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

