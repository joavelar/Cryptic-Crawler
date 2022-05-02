//Title: Crypt Crawler
//Authors: Tomas Hickman, Jose Velarde-Ruiz, Jonathan Hung
//Date Completed: 5/2/2022
//Creative Tilt: Dark Fantasy inspired endless runner where players can aim and attack monsters
//, or change lanes to evade the monsters until they die. 
// very proud of getting mouse aim to work, and making the song sound nice

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
let keyW, keyS, keyR, keyM;
