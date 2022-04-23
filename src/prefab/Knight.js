class Knight extends Phaser.GameObjects.Container {
    constructor(scene) {
        super(scene);        
        this.isSwinging = false;      //swinging weapon
        this.torso = new Phaser.GameObjects.Rectangle(scene, 0, -5, 10, 10, 0xFF0000);
        this.legs = new Phaser.GameObjects.Rectangle(scene, 0, 5, 10, 10, 0xFFFFFF);
        this.add(this.torso);
        this.add(this.legs);
    }
    
    update() {
        if(Phaser.Input.Keyboard.JustDown(keyW) && this.y >= 193) {//&& this.y == 438
            this.y -= 123;
            console.log(this.y);
        }else if (Phaser.Input.Keyboard.JustDown(keyS) && this.y <= 437) {
            this.y += 123;
            console.log(this.y)
        }
        //if(Phaser.Input.Keyboard.JustDown(keyW) && this.y == 315 ){
            //this.y -= 123;
           // console.log(this.y);
        //}
    }

}