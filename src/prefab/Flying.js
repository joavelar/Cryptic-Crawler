class Flying extends Phaser.GameObjects.Sprite {
    constructor(scene, x, y, texture) {
        super(scene, x, y, texture)
        scene.add.existing(this);
        this.moveSpeed = 6;
        this.scale = 0.5;
        this.baseY = y;
        this.width = 0;
        this.height = 0;
    }

    getRandomInt(max) {//https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/random
        return Math.floor(Math.random() * max);
      }

    update() {
        let Lanes = [403,167,290];
        // move left and sin wave
        this.x -= this.moveSpeed;
        this.y = this.baseY + Math.sin(this.x/60)*30;
        // wrap around from left edge to right edge
        if(this.x <= 0 - this.width) {
            this.baseY = Lanes[this.getRandomInt(3)];
            this.x = game.config.width;
        }
    }

    //position reset
    reset() {
        let Lanes = [403,167,290];
        this.baseY = Lanes[this.getRandomInt(3)]-10;
        this.x = game.config.width;
    }
}