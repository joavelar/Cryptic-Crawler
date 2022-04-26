class Knight extends Phaser.GameObjects.Container {
    constructor(scene, legs) {
        super(scene);        
        this.isSwinging = false;      //swinging weapon
        this.Lives = 3;               //set lives to 3
        this.torso = //new Phaser.GameObjects.Rectangle(scene, 0, -5, 10, 10, 0xFF0000);
        this.legs = scene.add.sprite(-60, -100, 'Legs').setOrigin(0, 0);
        //console.log(this.legs.anims);
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

    reset() {
        this.y = this.y; 
        this.x = this.x;
    }

}