class Menu extends Phaser.Scene {
    constructor() {
        super("menuScene")
    }
    preload(){
        //load menu image
        this.load.image('menu','./asset/UserInt/Menu.png')

        //load all the audio elements
        this.load.audio('getHP','./asset/Audio/collect_health.wav')
        this.load.audio('kill','./asset/Audio/destroy_enemy.wav')
        this.load.audio('die','./asset/Audio/die.wav')
        this.load.audio('atk','./asset/Audio/stab.wav')
        this.load.audio('switch','./asset/Audio/switch_lanes.wav')
        this.load.audio('dmg','./asset/Audio/take_damage.wav')
        this.load.audio('bgm','./asset/Audio/possible_bgm.wav')
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
            this.sound.play('dmg')
        }
    }
}