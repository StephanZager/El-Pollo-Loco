class Clouds extends MovableObject {
    y = 30;
    height = 400;
    width = 700;

    constructor() {
        super().loadImage('img/5_background/layers/4_clouds/1.png');
        this.x = Math.random() * 500;
        this.animate();
    }

    animate() { 
        setInterval(() => {
            this.x -= 0.1;   
        }, 1000 / 60);
        
    }
}