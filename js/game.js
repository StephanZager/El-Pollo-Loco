let canvas;
let world;
let keyboard = new Keyboard();
let background = new Image();
let movableObjects = new MovableObject();


async function init() {
    checkOrientation();

    initLevel1();
    canvas = document.getElementById('canvas');
    world = new World(canvas, keyboard);

    checkMobileDevice();
    

}

async function startGame() {
    await init();
    let canvasScreen = document.getElementById('canvas');
    let startScreen = document.getElementById('startScreen');
    document.getElementById('button-right-top').style.display = 'flex';
    document.getElementById('headline').style.display = 'none';   
    startScreen.classList.add('d-none');
    canvasScreen.classList.remove('d-none');
    playSound('game', 'game');
}

function lostGame() {
    stopSound('enboss', 'showdown');
    stopSound('game', 'game');
    playSound('game', 'gameOver');

    let lostGame = document.getElementById('lostGame');
    lostGame.style.display = 'flex';


    movableObjects.clearAllIntervals();
    for (let i = 1; i < 9999; i++) {
        window.clearInterval(i);
    }

    setTimeout(() => {
        document.getElementById('resumeMenuGame').style.display = 'flex';
    }, 2000);
};

function winGame() {
    stopSound('enboss', 'showdown');
    playSound('game', 'gameWon');
    let wonGame = document.getElementById('wonGame');
    wonGame.style.display = 'flex';

    movableObjects.clearAllIntervals();
    for (let i = 1; i < 9999; i++) {
        window.clearInterval(i);
    }
    setTimeout(() => {
        document.getElementById('resumeMenuGame').style.display = 'flex';
    }, 2000);
}

function restartGame() {
    document.getElementById('lostGame').style.display = 'none';
    document.getElementById('wonGame').style.display = 'none';
    document.getElementById('resumeMenuGame').style.display = 'none';
    stopSound('game', 'gameOver');
    stopSound('game', 'gameWon');
    stopSound('game', 'game');
    stopSound('enboss', 'showdown');
    startGame();
}

function totheMenu() {
    document.getElementById('headline').style.display = 'flex';
    stopSound('game', 'gameOver');
    stopSound('game', 'gameWon');
    stopSound('game', 'game');
    stopSound('enboss', 'showdown');

    movableObjects.clearAllIntervals();
    for (let i = 1; i < 9999; i++) {
        window.clearInterval(i);
    }

    let canvasScreen = document.getElementById('canvas');
    let startScreen = document.getElementById('startScreen');
    document.getElementById('button-right-top').style.display = 'none';
    document.getElementById('button-bottom-mobile').style.display = 'none';
    document.getElementById('lostGame').style.display = 'none';
    document.getElementById('wonGame').style.display = 'none';
    document.getElementById('resumeMenuGame').style.display = 'none';
   
    startScreen.classList.remove('d-none');
    canvasScreen.classList.add('d-none');
}

function showSteering() {

    let navBar = document.getElementById('menuBar');
    let steering = document.getElementById('menuSteering');
    let returMenu = document.getElementById('menuReturn');

    steering.style.display = 'flex';
    navBar.style.display = 'none';
    returMenu.style.display = 'flex';
}

function returnMenu() {
    let impressum = document.getElementById('impressum');

    let navBar = document.getElementById('menuBar');
    let steering = document.getElementById('menuSteering');
    let returMenu = document.getElementById('menuReturn');
    impressum.style.display = 'none';

    steering.style.display = 'none';
    navBar.style.display = 'flex';
    returMenu.style.display = 'none';
}

function showImpressum() {
    let navBar = document.getElementById('menuBar');
    let impressum = document.getElementById('impressum');
    let returMenu = document.getElementById('menuReturn');

    impressum.style.display = 'flex';
    navBar.style.display = 'none';
    returMenu.style.display = 'flex';
}

function isMobileDevice() {
    return /Mobi|Android|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
}

function checkMobileDevice() {
    if (isMobileDevice()) {
        document.body.classList.add('mobile-device');
        document.getElementById('button-bottom-mobile').style.display = 'flex';
        document.getElementById('button-right-top').style.display = 'flex';
    } else {
        document.body.classList.remove('mobile-device');
        document.getElementById('button-bottom-mobile').style.display = 'none';
        document.getElementById('button-right-top').style.display = 'none';
    }
}

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
}



document.addEventListener('DOMContentLoaded', () => {
    checkOrientation();
    window.addEventListener('resize', checkOrientation);
});

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

// Event-Listener für Touch-Steuerung

document.addEventListener('DOMContentLoaded', () => {

    const leftButton = document.getElementById('left-button');
    const rightButton = document.getElementById('right-button');
    const upButton = document.getElementById('up-button');
    const throwButton = document.getElementById('throw-button');
    const soundButton = document.getElementById('soundButton');
    const menuButton = document.querySelector('#button-right-top img[src="img/10_Menu/mobile/menu.png"]');


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
            keyboard.SPACE = true; // Setzt die Leertaste
            preventDefault(event);
        });

        upButton.addEventListener('touchend', (event) => {
            keyboard.SPACE = false; // Setzt die Leertaste zurück
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
            soundButton.click(); // Simuliert einen Klick
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