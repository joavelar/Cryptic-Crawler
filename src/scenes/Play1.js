class Play extends Phaser.Scene {
    constructor() {
        super("playScene");
    }

    preload() {
        //load background image
        this.load.image('background', './asset/Enviroment/Background.png');

        //load platform image
        this.load.image('upperPlatform', './asset/Enviroment/PlatformLanes TopNMid.png')
        this.load.image('lowerPlatform', './asset/Enviroment/PlatformLanes Bottom.png')

        //knight image
        this.load.spritesheet('kTorso', './asset/PlayerAssets/PlayerTorsoSheet.png', {frameWidth: 128,
        frameHieght: 128, startFrame: 0, endFrame: 4});
        //beartrap spritesheet
        this.load.spritesheet('trap', './asset/EnemyAssets/BeartrapSheet.png', {frameWidth: 64,
        frameHieght: 32, startFrame: 0, endFrame: 4});

        //load beartrap
        this.load.image('beartrap', './asset/EnemyAssets/Beartrap.png');
    }

    getRandomInt(max) {//https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/random
        return Math.floor(Math.random() * max);
      }

    create() {
        //place tile sprite
        this.background = this.add.tileSprite(0, 0, 720, 480, 'background').setOrigin(0, 0);
        
        //for random lanes
        let Lanes = [438,192,315];
        console.log(Lanes[this.getRandomInt(3)])
        // function getRandomInt(max) {//https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/random
        //     return Math.floor(Math.random() * max);
        //   }

        //define keys
        keyW = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W);
        keyS = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S);


        this.add.text(20, 20, "cryptic crawler play scene1");
        this.add.rectangle(10, borderPadding, game.config.width - 20, borderUISize*1.8, 0x767676).setOrigin(0, 0);
        //lower level start level
        this.lowPlatform = this.add.tileSprite(0, 448, 0, 480, 'lowerPlatform').setOrigin(0,0);
        //second level
        this.midPlatform = this.add.tileSprite(0, 324, 0, 480, 'upperPlatform').setOrigin(0,0);
        //upper level
        this.hiPlatform = this.add.tileSprite(0, 201, 0, 480, 'upperPlatform').setOrigin(0,0);

        //animation for run 
        this.anims.create({
            key: 'run',
            frames: this.anims.generateFrameNumbers('kTorso', {start:0, end: 4, first:
            0}),
            frameRate: 7,
            repeat: -1
        })
        
        //animation for beartrap 
        this.anims.create({
            key: 'btrap',
            frames: this.anims.generateFrameNumbers('trap', {start:0, end: 4, first:
            0}),
            frameRate: 5
        })
        //this.player1 = this.add.rectangle(10, 480-(borderPadding*3)- 10, 10, 10, 0xFFF).setOrigin(0.5);
        this.knight = new Knight(this, 100, 100);

        this.knight.setPosition(15, 438);

        //this.knight.torso = this.add.sprite(this.knight.x, this.knight.y-100, 'kTorso').setOrigin(0, 0);
        //this.knight.torso.anims.play('run');//this.add.tileSprite(this.knight.x, this.knight.y, 640, 128, 'kTorso').setOrigin(0,0);
        //console.log(this.knight.torso);

        //console.log('height of level 1',480-(borderPadding*3));
        //console.log(this.knight.Lives);
        this.add.existing(this.knight);

        //add beartrap
        this.beartrap1 = new Beartrap(this, game.config.width, Lanes[this.getRandomInt(3)]-10, 'beartrap', 0).setOrigin(0, 0);
        //make the monster
        //For some reason Monster is not defined?
        this.monster = new Monster(this, 300, 100);
        this.monster.setPosition(724,Lanes[this.getRandomInt(3)]);
        this.add.existing(this.monster);
        console.log('width',this.monster.width);
        console.log('height',this.monster.height);

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

        this.healthLeft = this.add.text(350, borderPadding*2, this.knight.Lives, scoreConfig);
        
    
    }
    update() {
        //move tile from right to left
        this.background.tilePositionX += 1.5;

        //update beartrap
        this.beartrap1.update();
        this.monster.x -= 1;

        //move platform to right to left
        this.lowPlatform.tilePositionX += 1.5;
        this.midPlatform.tilePositionX += 1.5;
        this.hiPlatform.tilePositionX += 1.5;
        this.monster.update();

        //this.knight.angle += 1;
        //this.knight.torso.angle += 1; moves the upper torso
        //this.knight.y -= 1;
        this.knight.update()
        // if(Phaser.Input.Keyboard.JustDown(keyW) && this.knight.torso.y >= 193) {//&& this.y == 438
        //     this.knight.torso.y -= 123;
        // }else if (Phaser.Input.Keyboard.JustDown(keyS) && this.knight.torso.y <= 437) {
        //     this.knight.torso.y += 123;
        // }
        this.p1Score +=1;
        //console.log(this.p1Score)
        this.scoreLeft.text = this.p1Score;
        if(this.p1Score == 1000){
            this.knight.Lives -= 1;
            this.healthLeft.text = Math.floor(this.knight.Lives);
        }

        //check collision with obstacle
        if(this.checkCollision(this.knight, this.beartrap1)){
            // this.knight.Lives = this.knight.Lives-1/60;
            // this.healthLeft.text = this.knight.Lives;
            //this.knight.reset();
            
            //this.shipExplode(this.ship03);
            this.trapFunc(this.beartrap1)
            console.log('hit beartarap');
        }
        if(this.checkCollision(this.knight,this.monster)) {
            console.log('hit monster');
        }
    }

    checkCollision(knight, obs) {
        // simple AABB checking
        if (knight.x < obs.x + obs.width &&
            knight.x + knight.width > obs.x &&
            knight.y < obs.y + obs.height &&
            knight.height + knight.y > obs.y) {
                return true;
            }
        else {
            return false;
        }
    }

    trapFunc(trap){
        trap.alpha = 0;
        //create
        let snap = this.add.sprite(trap.x-27, trap.y, 'beartrap').setOrigin(0, 0);
        snap.anims.play('btrap');
        snap.on('animationcomplete', () => {
            trap.reset();
            trap.alpha = 1;
            snap.destroy();
        })
        trap.reset();

        this.knight.Lives -= 1;
        this.healthLeft.text = Math.floor(this.knight.Lives);
    }
}