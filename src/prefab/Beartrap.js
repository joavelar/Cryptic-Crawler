class Beartrap extends Phaser.GameObjects.Sprite{
    constructor(scene, x, y, texture, frame){
        super(scene, x, y, texture, frame);
        scene.add.existing(this);
        this.moveSpeed = 1;
    }

    update() {
        //move left 
        this.x -= this.moveSpeed;
        //wrap around left
        if(this.x <= 0 - this.width){
            this.x = game.config.width;
        }
    }
}
