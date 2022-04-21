class Knight extends Phaser.GameObjects.Container {
    constructor(scene) {
        super(scene);        
        this.isFiring = false;      //swinging weapon
        this.torso = new Phaser.GameObjects.Rectangle(scene, 0, -5, 10, 10, 0xFF0000);
        this.legs = new Phaser.GameObjects.Rectangle(scene, 0, 5, 10, 10, 0xFFFFFF);
        this.add(this.torso);
        this.add(this.legs);
    }

}