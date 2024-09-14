let canvas;
let world;
let keyboard = new Keyboard();
let background = new Image();
let movableObjects = new MovableObject();




async function init() {

    // image for the load screen
    initLevel1();
    canvas = document.getElementById('canvas');
    world = new World(canvas, keyboard);
    // image remove load screen
}

async function startGame() {
    await init();
    let canvasScreen = document.getElementById('canvasScreen');
    let startScreen = document.getElementById('startScreen');
    startScreen.classList.add('d-none');
    canvasScreen.classList.remove('d-none');
    
}

function lostGame() {
    console.log('new game');
    let lostGame = document.getElementById('lostGame');
    lostGame.style.display = 'flex';
    movableObjects.clearAllIntervals();
    for (let i = 1; i < 9999; i++) {
        window.clearInterval(i);
    }
};

function winGame(){
    console.log('win game');
    let wonGame = document.getElementById('wonGame');
    wonGame.style.display = 'flex';
    movableObjects.clearAllIntervals();
    for (let i = 1; i < 9999; i++) {
        window.clearInterval(i);
    }
}



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