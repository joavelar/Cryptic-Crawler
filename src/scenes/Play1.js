class Play extends Phaser.Scene {
    constructor() {
        super("playScene");
    }

    create() {
        //define keys
        keyW = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W);
        keyS = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S);


        this.add.text(20, 20, "cryptic crawler play scene1");
        this.add.rectangle(10, borderPadding, game.config.width - 20, borderUISize*1.8, 0x767676).setOrigin(0, 0);
        //lower level start level
        this.add.rectangle(0, 480-(borderPadding*3), game.config.width, borderPadding*2, 0x00FF00).setOrigin(0, 0);
        //second level
        this.add.rectangle(0, 320, game.config.width, borderPadding*2, 0x00FF00).setOrigin(0, 0);
        //upper level
        this.add.rectangle(0, 190, game.config.width, borderPadding*2, 0x00FF00).setOrigin(0, 0);

        //this.player1 = this.add.rectangle(10, 480-(borderPadding*3)- 10, 10, 10, 0xFFF).setOrigin(0.5);
        this.knight = new Knight(this, 100, 100);
        this.knight.setPosition(15, 438);
        console.log(480-(borderPadding*3)-5);
        this.add.existing(this.knight);
    
    }
    update() {
        //this.knight.angle += 1;
        //this.knight.torso.angle += 1; moves the upper torso
        //this.knight.y -= 1;
        this.knight.update()
    }
}