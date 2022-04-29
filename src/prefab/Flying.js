class Flying extends Phaser.GameObjects.Sprite {
    constructor(scene, x, y, texture) {
        super(scene, x, y, texture)
        scene.add.existing(this);
        this.moveSpeed = 1;
        this.scale = 0.5;
    }

    getRandomInt(max) {//https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/random
        return Math.floor(Math.random() * max);
      }

    update() {
        let Lanes = [438,192,315];
        // move left
        this.x -= this.moveSpeed;
        // wrap around from left edge to right edge
        if(this.x <= 0 - this.width) {
            this.y = Lanes[this.getRandomInt(3)];
            this.x = game.config.width;
        }
    }

    //position reset
    reset() {
        let Lanes = [438,192,315];
        this.y = Lanes[this.getRandomInt(3)]-10;
        this.x = game.config.width;
    }
}