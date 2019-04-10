PlayState = {};

window.onload = function () {
    let game = new Phaser.Game(960,600,Phaser.AUTO,'game');
    game.state.add('play', PlayState);
    game.state.start('play');
};

// 게임에서 사용할 사운드, 이미지와 같은 리소스 로드
PlayState.preload = function () {
  this.game.load.image('background', 'images/background.png');
};
