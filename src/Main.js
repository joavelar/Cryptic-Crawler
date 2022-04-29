let config = {
    type: Phaser.CANVAS,
    width: 720,
    height: 480,
    scene: [Menu, Play]
}
let game = new Phaser.Game(config);

//set UI sizes
let borderUISize = game.config.height / 13;
let borderPadding = borderUISize / 3;

//reserve keyboard vars and mouse vars
let keyW, keyS;
