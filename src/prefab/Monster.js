class Monster extends Phaser.GameObjects.Container{
    constructor(scene){
        super(scene);
        this.isSwinging = false;      //swinging weapon
        this.torso = new Phaser.GameObjects.Rectangle(scene, 0, -5, 10, 10, 0xFF0000);
        this.legs = new Phaser.GameObjects.Rectangle(scene, 0, 5, 10, 10, 0xFFFFFF);
        this.add(this.torso);
        this.add(this.legs);
    }
    update(){
        // if(MonsterID == 'flying'){
        //     this.x -= 5;
            
        //     if(this.x <= 0 - this.width){
        //         this.x = this.width
        //     }
        // }
        // if(MonsterID == 'crawling'){
        //     this.x -= 5;

        //     if(this.x <= 0 - this.width){
        //         this.x = this.width
        //     }
        //}
    }
}