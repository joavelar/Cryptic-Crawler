class Menu extends Phaser.Scene {
    constructor() {
        super("menuScene")
    }
    preload(){
        //load menu image
        this.load.image('menu','./asset/UserInt/Menu.png')
    }
    create() {

        //create the menu image
        this.Menu = this.add.sprite(game.config.width/2, game.config.height/2, 'menu')

        //define the w key
        keyW = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W)

        //placeholder skip past menu into playscene
        this.scene.start("playScene");
    }
    update(){
        //press w to start game
        if(Phaser.Input.Keyboard.JustDown(keyW)){
            this.scene.start("playScene");
        }
    }
}