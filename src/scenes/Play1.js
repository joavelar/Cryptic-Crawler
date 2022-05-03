class Play extends Phaser.Scene {
    constructor() {
        super("playScene");
    }

    preload() {
        //load audio again (since I can't load it from Menu)
        this.load.audio('getHP','./asset/Audio/collect_health.wav')
        this.load.audio('kill','./asset/Audio/destroy_enemy.wav')
        this.load.audio('die','./asset/Audio/die.wav')
        this.load.audio('atk','./asset/Audio/stab.wav')
        this.load.audio('switch','./asset/Audio/switch_lanes.wav')
        this.load.audio('dmg','./asset/Audio/take_damage.wav')
        this.load.audio('bgm','./asset/Audio/possible_bgm.wav')

        //load background image
        this.load.image('background', './asset/Enviroment/Background.png');

        //load platform image
        this.load.image('upperPlatform', './asset/Enviroment/PlatformLanes TopNMid.png')
        this.load.image('lowerPlatform', './asset/Enviroment/PlatformLanes Bottom.png')

        //knight image
        this.load.spritesheet('Arms', './asset/PlayerAssets/OLDPlayerArmsAndHead.png', {frameWidth: 192,
        frameHeight: 128, startFrame: 0, endFrame: 4});
        this.load.spritesheet('Legs', './asset/PlayerAssets/PlayerTorsoSheet.png', {frameWidth: 128,
        frameHeight: 128, startFrame: 0, endFrame: 4});
        this.load.spritesheet('Spear', './asset/PlayerAssets/PlayerSpear.png', {frameWidth: 192,
        frameHeight: 128, startFrame: 0, endFrame: 4});
        
        //knight actions
        this.load.spritesheet('Vault','./asset/PlayerAssets/PlayerVaultNoEffects.png',{frameWidth: 192,frameHeight: 160, startFrame: 0, endFrame: 4});
        this.load.spritesheet('Fall','./asset/PlayerAssets/PlayerFall.png',{frameWidth: 192,frameHeight: 160, startFrame: 0, endFrame: 1});

        //ground enemy
        this.load.spritesheet('monster', './asset/EnemyAssets/EnemySheet.png', {frameWidth: 128,
        frameHeight: 128, startFrame: 0, endFrame: 4});

        //beartrap spritesheet
        this.load.spritesheet('trap', './asset/EnemyAssets/BeartrapSheet.png', {frameWidth: 64,
        frameHeight: 32, startFrame: 0, endFrame: 4});

        //load beartrap
        this.load.image('beartrap', './asset/EnemyAssets/Beartrap.png');

        //load flying enemy 
        this.load.spritesheet('flyMonster', './asset/EnemyAssets/FlyingEnemySheet.png',{frameWidth: 128,
        frameHeight: 128, startFrame: 0, endFrame:4});

        //load life points
        this.load.spritesheet('lifePoint', './asset/UserInt/LifePointSheet.png',{frameWidth: 64,
            frameHeight: 64, startFrame: 0, endFrame:9});

        //load life pickup
        this.load.spritesheet('pickUp', './asset/UserInt/LifePickup.png',{frameWidth: 64,
            frameHeight: 64, startFrame: 0, endFrame:4});
        
    }

    getRandomInt(max) {//https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/random
        return Math.floor(Math.random() * max);
      }

    //function to add flying monster
    addFlying() {
        let Lanes = [403,167,290];
        this.flying = new Flying(this, game.config.width, Lanes[this.getRandomInt(3)], 'flyMonster');
        this.flying.anims.play('fly');
        console.log('fwidth:', this.flying.width);

    }
    spawnLife(){
        let Lanes = [383,147,270];
        this.LP = new Life(this, game.config.width, Lanes[this.getRandomInt(3)]+20, 'pickUp')
        this.LP.here = true;
        this.LP.anims.play('pickUpPoint');
    }

    create() {
        //configuration code for audio
        let musicConfig = {
            volume: 0.5,
        }

        //game over flag
        this.gameOver = false;
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
        keyM = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.M);
        keyR = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.R);

        this.add.text(20, 20, "cryptic crawler play scene1");
        this.add.rectangle(10, borderPadding, game.config.width - 20, borderUISize*1.8, 0x767676).setOrigin(0, 0);
        //lower level start level
        this.lowPlatform = this.add.tileSprite(0, 448, 0, 480, 'lowerPlatform').setOrigin(0,0);
        //second level
        this.midPlatform = this.add.tileSprite(0, 324, 0, 480, 'upperPlatform').setOrigin(0,0);
        //upper level
        this.hiPlatform = this.add.tileSprite(0, 201, 0, 480, 'upperPlatform').setOrigin(0,0);

        //animation for knight attacking
        this.anims.create({
            key: 'attack',
            frames: this.anims.generateFrameNumbers('Arms', {start: 0, end: 4, first:
                0}),
            frameRate: 10,
        });

        //define attack state
        this.attackState = false;

        //animation for the lifepoints
        this.anims.create({
            key: 'lifePoint',
            frames: this.anims.generateFrameNumbers('lifePoint', {start: 0, end: 4, first:
                0}),
            frameRate: 15,
        });

        //animation for when lifepoints are depleted
        this.anims.create({
            key: 'deathPoint',
            frames: this.anims.generateFrameNumbers('lifePoint', {start: 4, end: 8, first:
                6}),
            frameRate: 8,
        });

        this.anims.create({
            key: 'deathPoint2',
            frames: this.anims.generateFrameNumbers('lifePoint', {start: 8, end: 8, first:
                8}),
            frameRate: 1,
        });

        //animation for the life pick ups
        this.anims.create({
            key: 'pickUpPoint',
            frames: this.anims.generateFrameNumbers('pickUp', {start: 0, end: 4, first:
                0}),
            frameRate: 8,
        });

        //animation for knight not attacking
        this.anims.create({
            key: 'idle',
            frames: this.anims.generateFrameNumbers('Arms', {start: 0, end: 0, first:
                0}),
            frameRate: 1,
        });

        //animation for knight vaulting
        this.anims.create({
            key: 'vault',
            frames: this.anims.generateFrameNumbers('Vault', {start: 1, end: 4, first:
                0}),
            frameRate: 8,
        });

        //animation for knight falling
        this.anims.create({
            key: 'fall',
            frames: this.anims.generateFrameNumbers('Fall', {start: 1, end: 1, first:
                1}),
            frameRate: 30,
        });

        //animation for flying monster
        this.anims.create({
            key: 'fly',
            frames: this.anims.generateFrameNumbers('flyMonster', {start: 0, end: 4, first:
            0}),
            frameRate: 5,
            repeat: -1
        })
        //animation for knight run 
        this.anims.create({
            key: 'run',
            frames: this.anims.generateFrameNumbers('Legs', {start:0, end: 4, first:
            0}),
            frameRate: 12,
            repeat: -1
        })
        //animation for beartrap 
        this.anims.create({
            key: 'btrap',
            frames: this.anims.generateFrameNumbers('trap', {start:0, end: 4, first:
            0}),
            frameRate: 5
        })

        //animation for monster
        this.anims.create({
            key: 'crawl',
            frames: this.anims.generateFrameNumbers('monster', {start:0, end: 4, first:
            0}),
            frameRate: 6,
            repeat: -1
        })
        //this.player1 = this.add.rectangle(10, 480-(borderPadding*3)- 10, 10, 10, 0xFFF).setOrigin(0.5);
        this.knight = new Knight(this);

        this.knight.setPosition(15, 438);

        this.knight.scale = 0.5;
        console.log('K width',this.knight.width);
        console.log('K height',this.knight.height);

        this.knight.legs.anims.play('run');

        //console.log('height of level 1',480-(borderPadding*3));
        //console.log(this.knight.Lives);
        this.add.existing(this.knight);

        //add beartrap
        this.beartrap1 = new Beartrap(this, game.config.width, Lanes[this.getRandomInt(3)]-10, 'beartrap', 0).setOrigin(0, 0);
        this.beartrap2 = "unspawned";

        //make the monster
        this.monster = new Monster(this, 300, 100);
        this.monster.scale = 0.65;
        this.monster.setPosition(1024,Lanes[this.getRandomInt(3)]);
        this.monster.body.play('crawl')
        this.add.existing(this.monster);
        console.log('width',this.monster.width);
        console.log('height',this.monster.height);

        //make flier
        this.flyingCheck = "unspawned";

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

        this.healthLeft = this.add.text(4000, borderPadding*2, this.knight.Lives, scoreConfig);
        
        this.debugRects = this.add.group();
        
        //create lifepoints
        this.lifePoint1 = this.add.sprite(20, 10, 'lifePoint').setOrigin(0, 0);
        this.lifePoint2 = this.add.sprite(70, 10, 'lifePoint').setOrigin(0, 0);
        this.lifePoint3 = this.add.sprite(120, 10, 'lifePoint').setOrigin(0, 0);

        this.lifePoint1.play('lifePoint');
        this.lifePoint2.play('lifePoint');
        this.lifePoint3.play('lifePoint');

        this.lifePoint1Played = false;
        this.lifePoint2Played = false;
        this.lifePoint3Played = false;
        //create pickUps 


        //start music
        this.backgroundMusic = this.sound.add('bgm')
        this.backgroundMusic.loop = true;
        this.backgroundMusic.play();
        //create 
        this.isAttacking = false;
        if (this.isAttacking == false){
            this.input.on('pointerdown', ()=> {
                this.knight.spear.play('attack')
            });   
        }


    }
    update() {

        //checking if attack is done or not.
        if(this.knight.spear.isPlaying){
            this.isAttacking = true;
        } else {
            this.isAttacking = false;
        }
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
        }
        this.debugRects.clear(true,true);
        if(!this.gameOver){
            //move tile from right to left
            this.background.tilePositionX += 1.5;

            this.monster.x -= 1;

            //update beartrap
            this.beartrap1.update();
            if(this.p1Score > 250){
                if (this.beartrap2 == "unspawned") {
                    this.beartrap2 = new Beartrap(this, game.config.width, [[428,182,305]][this.getRandomInt(3)], 'beartrap', 0).setOrigin(0, 0);
                    this.beartrap2.reset();
                }
                this.beartrap2.update();
            }

            if(this.p1Score > 5000) {
                if(this.flyingCheck == "unspawned"){
                    this.flyingCheck = "spawned";
                    this.addFlying();
                }
                this.flying.update();
            } 
            this.monster.update();
            this.knight.update()
        

       
            //move platform to right to left
            this.lowPlatform.tilePositionX += 1.5;
            this.midPlatform.tilePositionX += 1.5;
            this.hiPlatform.tilePositionX += 1.5;
            
            this.p1Score +=1;
        }

        //lifepoint checking
        if (this.lifePoint1Played == false){
            this.lifePoint1.on('animationcomplete', () => {
                if(this.knight.Lives >= 1){
                    this.lifePoint1.play('lifePoint');
                }else{
                    this.lifePoint1.play('deathPoint');
                    this.lifePoint1Played = true;
                }            
            });
        }else{
            this.lifePoint1.play('deathPoint2')
        };
        if (this.lifePoint2Played == false){
            this.lifePoint2.on('animationcomplete', () => {
                if(this.knight.Lives >= 2){
                    this.lifePoint2.play('lifePoint');
                }else{
                    this.lifePoint2.play('deathPoint');
                    this.lifePoint2Played = true;
                    ;
                }            
            });
        }else{
            this.lifePoint2.play('deathPoint2')
        };

        if (this.lifePoint3Played == false){
            this.lifePoint3.on('animationcomplete', () => {
                if(this.knight.Lives == 3){
                    this.lifePoint3.play('lifePoint');
                }else{
                    this.lifePoint3.play('deathPoint');
                    this.lifePoint3Played = true;
                    ;
                }            
            });
        }else{
            this.lifePoint3.play('deathPoint2')
        };

        //Game Over state
        if(this.gameOver){
            this.add.text(game.config.width/2, game.config.height/2, 'GAME OVER', scoreConfig).setOrigin(0.5);
            this.add.text(game.config.width/2, game.config.height/2 + 64, 'Press (R) to Restart or (M) to Menu', scoreConfig).setOrigin(0.5);
            //this.add.text(game.config.width/2, game.config.height/2 + 128, 'Playing Again Without Refresh Hold Down', scoreConfig).setOrigin(0.5);
            //this.add.text(game.config.width/2, game.config.height/2 + 192, 'Left Mouse Button', scoreConfig).setOrigin(0.5);
            if(this.gameOver && Phaser.Input.Keyboard.JustDown(keyR)){
                this.scene.restart();
            }
            if(this.gameOver && Phaser.Input.Keyboard.JustDown(keyM)){
                this.scene.start("menuScene");
            }
        }
        
        //this.knight.angle += 1;
        //this.knight.torso.angle += 1; //moves the upper torso
        //this.knight.y -= 1;
        
        // if(Phaser.Input.Keyboard.JustDown(keyW) && this.knight.torso.y >= 193) {//&& this.y == 438
        //     this.knight.torso.y -= 123;
        // }else if (Phaser.Input.Keyboard.JustDown(keyS) && this.knight.torso.y <= 437) {
        //     this.knight.torso.y += 123;
        // }

        //click detection
        
        if(this.input.activePointer.isDown && this.attackState == false){
            this.knight.spear.play('attack');
            this.sound.add('atk').play();
            this.attackState = true;
            console.log('attack');
        }
        

        this.knight.spear.on('animationcomplete', () => {
            this.knight.spear.play('idle');
            this.attackState = false;   
        })

        if(this.knight.isJumping){
            this.knight.spear.alpha = 0;
            this.knight.legs.play('vault');
         }
        
        this.knight.legs.on('animationcomplete', () => {
            this.knight.spear.alpha = 1;
            this.knight.legs.play('run')
        })

        if(this.knight.isFalling){
            this.knight.spear.alpha = 0;
            this.knight.legs.play('fall');
         }
        
        this.knight.legs.on('animationcomplete', () => {
            this.knight.spear.alpha = 1;
            this.knight.legs.play('run')
        })

        
        //console.log(this.p1Score)
        this.scoreLeft.text = this.p1Score;
        if(this.p1Score > 5000 && this.knight.maxLives == 3){
            if(this.knight.Lives == 3){
                this.knight.maxLives -= 1;
                this.knight.Lives -= 1;
                this.healthLeft.text = Math.floor(this.knight.Lives);
            }else{
                this.knight.maxLives -= 1;
            }
            
        }

        // check colliosion for given life
        if((this.p1Score != 0)&&(this.p1Score % 5000 == 0)){
            //call func to drop fireball
            this.spawnLife();
        }
        if(this.p1Score > 5000 && this.LP.here == true){
            if(this.checkCollision(this.knight, this.LP)){
                this.LP.destroy();
                this.LP.here = false
                if(this.knight.Lives < this.knight.maxLives){
                    this.knight.Lives += 1;
                    if(this.knight.Lives == 2){
                        this.lifePoint2Played=false;
                    }
                    if(this.knight.Lives == 3){
                        this.lifePoint3Played = false;
                    }
                }
            }
            this.LP.update();
        }

        //check collision with obstacle
        if(this.checkCollision(this.knight, this.beartrap1)){
            // this.knight.Lives = this.knight.Lives-1/60;
            // this.healthLeft.text = this.knight.Lives;
            //this.knight.reset();
            
            //this.shipExplode(this.ship03);
            this.trapFunc(this.beartrap1)
            console.log('hit beartarap');
            if(this.knight.Lives == 0){
                this.sound.add('die').play();
                this.backgroundMusic.stop();
                this.gameOver = true;
            }
        }
        if(this.p1Score > 250) {
            if(this.checkCollision(this.knight, this.beartrap2)){
                // this.knight.Lives = this.knight.Lives-1/60;
                // this.healthLeft.text = this.knight.Lives;
                //this.knight.reset();
                
                //this.shipExplode(this.ship03);
                this.trapFunc(this.beartrap2)
                console.log('hit beartarap');
                if(this.knight.Lives == 0){
                    this.sound.add('die').play();
                    this.backgroundMusic.stop();
                    this.gameOver = true;
                }
            }
        }
        if(this.checkCollision(this.knight,this.monster)) {
            this.sound.add('dmg').play();
            console.log('hit monster');
            this.knight.Lives -= 1;
            this.healthLeft.text = this.knight.Lives
            this.monster.reset();
            if(this.knight.Lives == 0){
                this.sound.add('die').play();
                this.backgroundMusic.stop();
                this.gameOver = true;
            }
        }

        //check collision with spear and enemy
        this.spearX = Math.cos(this.knight.angleDeg/60+5.99)*50  + this.knight.x+20;
        this.spearY = Math.sin(this.knight.angleDeg/60+5.99)*50  + this.knight.y-20;
        if(this.checkSpearCollision(this.spearX,this.spearY,this.monster) && this.attackState) {
            console.log('stabbed monster');
            this.p1Score = this.p1Score + 500
            this.monster.reset();
            this.sound.add('kill').play();
        }

        if(keyR.isDown){
            console.log(this.spearX-this.monster.x);
        }





        if(this.p1Score > 5000){
            console.log("a");
            if(this.flyingCheck == "unspawned"){
                console.log("b");
                this.flyingCheck = "spawned";
                this.addFlying();
                console.log("c");
                this.flying.update();
            }
            console.log("d");
            this.flying.width = 64;
            this.flying.height = 64;
            if(this.checkCollision(this.knight, this.flying)){
                this.sound.add('dmg').play();
                console.log('hit flying monster');
                this.knight.Lives -= 1;
                this.healthLeft.text = this.knight.Lives
                this.flying.reset();
                if(this.knight.Lives == 0){
                    this.sound.add('die').play();
                    this.backgroundMusic.stop();
                    this.gameOver = true;
                }
            }
            if(this.checkSpearCollision(this.spearX,this.spearY,this.flying) && this.attackState) {
                console.log('stabbed flying');
                this.p1Score = this.p1Score + 1000
                this.flying.reset();
                this.sound.add('kill').play();
            }
        }
    }

    checkCollision(knight, obs) {
        //this.debugRects.add(new Phaser.GameObjects.Rectangle(this, obs.x, obs.y, obs.width, obs.height, 0xFF0000, 0.2), true);
        //this.debugRects.add(new Phaser.GameObjects.Rectangle(this, knight.x, knight.y, knight.width, knight.height, 0x00FF00, 0.2), true);
        // simple AABB checking
        if (knight.x < obs.x + obs.width &&
            knight.x + knight.width > obs.x &&
            knight.y < obs.y + obs.height &&
            knight.y + knight.height > obs.y) {
                return true;
            }
        else {
            return false;
        }
    }

    checkSpearCollision(x, y, obs) {
        this.xBuffer = 10;
        this.yBuffer = 40;
        //this.debugRects.add(new Phaser.GameObjects.Ellipse(this, x, y, 10, 10, 0x00FF00, 1), true);
        //this.debugRects.add(new Phaser.GameObjects.Rectangle(this, x, y, this.xBuffer, this.yBuffer, 0x00FF00, 0.2), true);
        // simple AABB checking
        if (x < obs.x + obs.width &&
            x+this.xBuffer > obs.x &&
            y < obs.y + obs.height &&
            y+this.yBuffer > obs.y) {
                return true;
            }
        else {
            return false;
        }
    }

    trapFunc(trap){
        trap.alpha = 0;
        //create
        let snap = this.add.sprite(trap.x-65, trap.y, 'beartrap').setOrigin(0, 0);
        snap.anims.play('btrap');
        //play hit sound effect
        this.sound.play('dmg')
        snap.on('animationcomplete', () => {
            trap.reset();
            trap.alpha = 1;
            snap.destroy();
        })
        trap.reset();

        this.knight.Lives -= 1;
        this.healthLeft.text = Math.floor(this.knight.Lives);
        if(this.knight.Lives == 0){
            this.sound.add('die').play();
            this.gameOver = true;
        }
    }
}