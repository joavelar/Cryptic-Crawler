class Monster extends Phaser.GameObjects.Container{
    constructor(scene){
        super(scene);
        this.body = scene.add.sprite(-40, -100, 'monster').setOrigin(0, 0);
        //new Phaser.GameObjects.Rectangle(scene, 0, -5, 10, 10, 0x0000FF);
        this.add(this.body);
        this.moveSpeed = 1.5;
        this.width = 80;
        this.height = 80;
    }

    getRandomInt(max) {//https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/random
        return Math.floor(Math.random() * max);
      }

    update(){
        let Lanes = [438,192,315];
        //move left 
        this.x -= this.moveSpeed;
        //wrap around left
        if(this.x <= 0 - this.width){
            this.y = Lanes[this.getRandomInt(3)];
            this.x = game.config.width;
        }
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

    reset(){
        let Lanes = [438,192,315];
        this.y = Lanes[this.getRandomInt(3)]-10
        this.x = game.config.width;
    }
}