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
        this.add.rectangle(0, 197, game.config.width, borderPadding*2, 0x00FF00).setOrigin(0, 0);

        //this.player1 = this.add.rectangle(10, 480-(borderPadding*3)- 10, 10, 10, 0xFFF).setOrigin(0.5);
        this.knight = new Knight(this, 100, 100);
        this.knight.setPosition(15, 438);
        console.log('height of level 1',480-(borderPadding*3));
        console.log(this.knight.Lives);
        this.add.existing(this.knight);

        // initialize score
        this.p1Score = 0;
        //display score
        let scoreConfig = {
            fontFamily: 'Courier',
            fontSize: '28px',
            backgroundColor: '#F3B141',
            color: '#843605',
            align: 'right',
            padding: {
                top: 5,
                bottom: 5,
            },
            fixedWidth: 100
        }
        this.scoreLeft = this.add.text(550, borderPadding*2, this.p1Score, scoreConfig);
        
    
    }
    update() {
        //this.knight.angle += 1;
        //this.knight.torso.angle += 1; moves the upper torso
        //this.knight.y -= 1;
        this.knight.update()
        this.p1Score +=1;
        console.log(this.p1Score)
        this.scoreLeft.text = this.p1Score;
    }
}