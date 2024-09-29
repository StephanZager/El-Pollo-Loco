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