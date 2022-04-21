class Menu extends Phaser.Scene {
    constructor() {
        super("menuScene")
    }
    create() {
        this.add.text(20, 20, "Crypt Crawler Menu Scene");
        this.scene.start("playScene");
    }
}