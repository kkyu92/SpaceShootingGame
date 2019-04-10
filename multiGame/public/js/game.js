// const socket = io();

/////////////////////////////////////////////////////////////// 총알
var Bullet = new Phaser.Class({

    Extends: Phaser.Physics.Arcade.Image,

    initialize:

        function Bullet(scene) {
            Phaser.Physics.Arcade.Image.call(this, scene, 0, 0, 'bullet');

            // this.setOrigin(0.5,0.5).setDisplaySize(20,20);
            this.setBlendMode(1);
            this.setDepth(1);

            this.speed = 200;
            this.lifespan = 1000;

            this._temp = new Phaser.Math.Vector2();
            // this.setSize(10, 10, true);
        },

    fire: function (ship) {
        // 총알 시간(생명)
        this.lifespan = 1000;
        this.setActive(true);
        this.setVisible(true);
        this.setRotation(ship.rotation);
        this.setAngle(ship.body.rotation + 90);
        this.setPosition(ship.x, ship.y);
        this.body.reset(ship.x, ship.y);

        var angle = Phaser.Math.DegToRad(ship.body.rotation);

        this.scene.physics.velocityFromRotation(angle - 29.8, this.speed, this.body.velocity);

        // 총알 방향축에 대한 (속도)
        this.body.velocity.x *= 4;
        this.body.velocity.y *= 4;
    },

    update: function (time, delta) {
        this.lifespan -= delta;
        if (this.lifespan <= 0) {
            this.setActive(false);
            this.setVisible(false);
            this.body.stop();
        }
    }

});

var Menu = new Phaser.Class({

    Extends: Phaser.Scene,

    initialize:

        function Menu() {
            Phaser.Scene.call(this, 'menu');
        },
    preload: function () {
        this.load.image('phaser_title', '/public/img/phaser_background.png');
        // this.load.image('start_btn', 'img/game_start.png');
        this.load.image('vs', '/public/img/vs.png');
    },
    create: function () {
        this.phaser_title = this.add.image(400, 300, 'phaser_title');
        // this.start_btn = this.add.image(5, 5, 'start_btn');
        // this.start_btn.x = 400;
        // this.start_btn.y = 100;
        var clickButton;
        this.add.text(10, 10, '스페이스바를 눌러 게임을 시작하세요', {font: '16px Courier', fill: '#00ff00'});
        clickButton = this.add.text(300, 500, 'Game Start', {font: '40px Courier', fill: '#7983ff'});

        this.enterButtonHoverState = function () {
            clickButton.setText("");
            clickButton = this.add.text(300, 500, 'Game Start', {font: '40px Courier', fill: '#ffd400'});
        };
        this.enterButtonRestState = function () {
            clickButton.setText("");
            clickButton = this.add.text(300, 500, 'Game Start', {font: '40px Courier', fill: '#7983ff'});
        };
        this.enterButtonActiveState = function () {
            clickButton.setText("");
            clickButton = this.add.text(300, 500, 'Game Start', {font: '40px Courier', fill: '#00ffff'});
        };

        clickButton.setInteractive()
            .on('pointerover', () => this.enterButtonHoverState())
            .on('pointerout', () => this.enterButtonRestState())
            .on('pointerdown', () => this.enterButtonActiveState())
            .on('pointerup', () => {
                this.enterButtonHoverState();
                this.scene.start('demo', {id: 0, image: 'vs'});
            });

        this.input.keyboard.once('keyup_SPACE', function () {

            this.scene.start('demo', {id: 0, image: '/public/img/vs.png'});

        }, this);


        this.events.on('shutdown', this.shutdown, this);
    },

    shutdown: function () {
        //  We need to clear keyboard events, or they'll stack up when the Menu is re-run
        this.input.keyboard.shutdown();
    }

});
// 몇명에서 게임 할 것인가
var vsNum = new Phaser.Class({

    Extends: Phaser.Scene,

    initialize:

        function Menu() {
            Phaser.Scene.call(this, 'vsnum');
        },
    preload: function () {
        this.load.image('phaser_title', '/public/img/phaser_background.png');
        // this.load.image('start_btn', '/public/img/game_start.png');
        this.load.image('vs', '/public/img/vs.png');
    },
    create: function () {
        this.phaser_title = this.add.image(400, 300, 'phaser_title');
        // this.start_btn = this.add.image(5, 5, 'start_btn');
        // this.start_btn.x = 400;
        // this.start_btn.y = 100;
        var clickButton;
        this.add.text(10, 10, '스페이스바를 눌러 게임을 시작하세요', {font: '16px Courier', fill: '#00ff00'});
        clickButton = this.add.text(300, 500, 'Game Start', {font: '40px Courier', fill: '#7983ff'});

        this.enterButtonHoverState = function () {
            clickButton.setText("");
            clickButton = this.add.text(300, 500, 'Game Start', {font: '40px Courier', fill: '#ffd400'});
        };
        this.enterButtonRestState = function () {
            clickButton.setText("");
            clickButton = this.add.text(300, 500, 'Game Start', {font: '40px Courier', fill: '#7983ff'});
        };
        this.enterButtonActiveState = function () {
            clickButton.setText("");
            clickButton = this.add.text(300, 500, 'Game Start', {font: '40px Courier', fill: '#00ffff'});
        };

        clickButton.setInteractive()
            .on('pointerover', () => this.enterButtonHoverState())
            .on('pointerout', () => this.enterButtonRestState())
            .on('pointerdown', () => this.enterButtonActiveState())
            .on('pointerup', () => {
                this.enterButtonHoverState();
                this.scene.start('demo', {id: 0, image: 'vs'});
            });

        this.input.keyboard.once('keyup_SPACE', function () {

            this.scene.start('demo', {id: 0, image: 'img/vs.png'});

        }, this);


        this.events.on('shutdown', this.shutdown, this);
    },

    shutdown: function () {
        //  We need to clear keyboard events, or they'll stack up when the Menu is re-run
        this.input.keyboard.shutdown();
    }

});

let playerName = "";
var Demo = new Phaser.Class({

    Extends: Phaser.Scene,

    initialize:

        function Demo() {
            Phaser.Scene.call(this, {key: 'demo'});
        },

    init: function (data) {
        console.log('init', data);

        this.imageID = data.id;
        this.imageFile = data.image;
    },

    preload: function () {
        // this.load.image('pic' + this.imageID, 'assets/pics/' + this.imageFile);
        this.load.image('vs', '/public/img/vs.png');
        this.load.image('start', '/public/img/game_start.png');
        this.load.image('ship', '/public/img/spaceship_white.png');
    },

    create: function () {
        let self = this;
        this.socket = io();

        let vs, start;
        let redTeam, blueTeam, redShip, blueShip, fullRedTeam, fullBlueTeam;
        let myTeam;
        let redTeamCountText, blueTeamCountText;
        let redTeamCount;
        let blueTeamCount;

        redTeamCountText = this.add.text(100, 100, '', {font: '40px Courier', fill: '#ff4a50'});
        blueTeamCountText = this.add.text(500, 500, '', {font: '40px Courier', fill: '#7983ff'});

        // 플레이어 이름 받아오기
        // this.socket.on('myName', function (name) {
        //     console.log("플레이어 이름 받아오기: ", name);
        //     if (playerName === "") {
        //         console.log("이름 설정 완료");
        //         playerName = name;
        //     } else {
        //         console.log("else 부분 --> 이미 이름 설정이 완료된 클라이언트")
        //     }
        // });

        this.socket.emit('countTeam');

        // 누가 어떤 팀을 선택했는가 서버에서 받아온다
        this.socket.on('whatTeam', function (team) {
            redTeamCount = team.teamCountRed;
            blueTeamCount = team.teamCountBlue;
            redTeamCountText.setText(redTeamCount);
            blueTeamCountText.setText(blueTeamCount);
            if (redTeamCount < 2) {
                redTeam = self.add.text(100, 200, 'RED TEAM', {font: '40px Courier', fill: '#ffffff'});
                redTeam.setInteractive()
                    .on('pointerover', () => this.RedEnterButtonHoverState())
                    .on('pointerout', () => this.RedEnterButtonRestState())
                    .on('pointerdown', () => this.RedEnterButtonActiveState())
                    .on('pointerup', () => {
                        this.RedEnterButtonHoverState();
                        vs.setVisible(false);
                        start.setVisible(true).setTint('0xff0000');
                        redTeam.setText("");
                        redTeam = self.add.text(100, 200, 'RED TEAM', {font: '80px Courier', fill: '#ff0001'});
                        redShip.setVisible(true);
                        blueShip.setVisible(false);
                        myTeam = 3;
                    });
            } else {
                redTeam = self.add.text(100, 200, 'RED TEAM', {font: '40px Courier', fill: '#ffffff'});
                fullRedTeam = self.add.text(100, 150, 'FULL', {font: '40px Courier', fill: '#ff0001'});
            }
            if (blueTeamCount < 2) {
                blueTeam = self.add.text(500, 400, 'BLUE TEAM', {font: '40px Courier', fill: '#ffffff'});
                blueTeam.setInteractive()
                    .on('pointerover', () => this.enterButtonHoverState())
                    .on('pointerout', () => this.enterButtonRestState())
                    .on('pointerdown', () => this.enterButtonActiveState())
                    .on('pointerup', () => {
                        this.enterButtonHoverState();
                        vs.setVisible(false);
                        start.setVisible(true).setTint('0x00FFFF');
                        blueTeam.setText("");
                        blueTeam = self.add.text(400, 400, 'BLUE TEAM', {font: '80px Courier', fill: '#0056ff'});
                        redShip.setVisible(false);
                        blueShip.setVisible(true);
                        myTeam = 2;
                    });
            } else {
                blueTeam = self.add.text(500, 400, 'BLUE TEAM', {font: '40px Courier', fill: '#ffffff'});
                fullBlueTeam = self.add.text(500, 450, 'FULL', {font: '40px Courier', fill: '#0056ff'});
            }
            console.log("레드팀 카운트", redTeamCount);
            console.log("블루팀 카운트", blueTeamCount);
            // 블루팀 마우스 포인터
            this.enterButtonHoverState = function () {
                blueTeam.setText("");
                blueTeam = self.add.text(500, 400, 'BLUE TEAM', {font: '40px Courier', fill: '#7983ff'});
            };
            this.enterButtonRestState = function () {
                blueTeam.setText("");
                blueTeam = self.add.text(500, 400, 'BLUE TEAM', {font: '40px Courier', fill: '#ffffff'});
            };
            this.enterButtonActiveState = function () {
                blueTeam.setText("");
                blueTeam = self.add.text(500, 400, 'BLUE TEAM', {font: '40px Courier', fill: '#0056ff'});
            };

            //레드팀 마우스 포인터
            this.RedEnterButtonHoverState = function () {
                redTeam.setText("");
                redTeam = self.add.text(100, 200, 'RED TEAM', {font: '40px Courier', fill: '#ff4a50'});
            };
            this.RedEnterButtonRestState = function () {
                redTeam.setText("");
                redTeam = self.add.text(100, 200, 'RED TEAM', {font: '40px Courier', fill: '#ffffff'});
            };
            this.RedEnterButtonActiveState = function () {
                redTeam.setText("");
                redTeam = self.add.text(100, 200, 'RED TEAM', {font: '40px Courier', fill: '#ff0001'});
            };

            if (redTeamCount === 2 && blueTeamCount === 2) {
                redTeamCount = 0;
                blueTeamCount = 0;
                this.socket.emit('resetTeamCount');
            }
        });


        this.add.text(10, 10, '팀선택', {font: '16px Courier', fill: '#00ff00'});

        vs = this.add.image(400, 300, 'vs').setDisplaySize(100, 100);
        start = this.add.image(400, 300, 'start').setDisplaySize(100, 100).setVisible(false);
        redShip = this.add.image(200, 360, 'ship').setDisplaySize(200, 200).setTint('0xff0000').setVisible(false);
        blueShip = this.add.image(600, 300, 'ship').setDisplaySize(200, 200).setTint('0x4286f4').setVisible(false);

        // this.input.once('pointerup', function () {
        //     this.scene.start('sceneMainGame');
        // }, this);
        start.setInteractive()
            .on('pointerdown', () => {
                start.setTint('0xffffff');
            })
            .on('pointerup', () => {
                this.socket.emit('pickTeam', myTeam);
                this.scene.start('sceneMainGame', {key: 0, team: myTeam});
                this.socket.close();
            });
    }

});
// function preload() {
//
//
// }
var team;
var countdown = 3;
var gameCount = 30;

// 최종 점수
let endScore;
// 내가 획득한 별 아이템 수
let endStar = 0;
// 내가 획득한 총알 아이템 수
let endBulletBox = 0;
// 내가 맞은 횟수
let endHit = 0;
// 내가 팀을 맞춘 횟수
let teamShot = 0;
// 내가 적을 맞춘 횟수
let enemyShot = 0;
// 내가 쏜 총알
let allShot = 0;
let scooore = 0;

var SceneMainGame = new Phaser.Class({
    Extends: Phaser.Scene,
    initialize:
        function sceneMainGame() {
            Phaser.Scene.call(this, {key: 'sceneMainGame'});
        },
    init: function (data) {
        console.log('init', data);

        this.key = data.key;
        team = data.team;
        console.log('key: ', this.key);
        console.log('team: ', team);
    },
    preload: function () {
        // ...
        var progressBar = this.add.graphics();
        var progressBox = this.add.graphics();
        progressBox.fillStyle(0x222222, 0.8);
        progressBox.fillRect(240, 270, 320, 50);

        var width = this.cameras.main.width;
        var height = this.cameras.main.height;
        var loadingText = this.make.text({
            x: width / 2,
            y: height / 2 - 50,
            text: '로딩중....',
            style: {
                font: '20px monospace',
                fill: '#ffffff'
            }
        });
        loadingText.setOrigin(0.5, 0.5);

        var percentText = this.make.text({
            x: width / 2,
            y: height / 2 - 5,
            text: '0%',
            style: {
                font: '18px monospace',
                fill: '#ffffff'
            }
        });
        percentText.setOrigin(0.5, 0.5);

        var assetText = this.make.text({
            x: width / 2,
            y: height / 2 + 50,
            text: '우주선 불러오는 중...',
            style: {
                font: '18px monospace',
                fill: '#ffffff'
            }
        });

        assetText.setOrigin(0.5, 0.5);

        this.load.on('progress', function (value) {
            percentText.setText(parseInt(value * 100) + '%');
            progressBar.clear();
            progressBar.fillStyle(0xffffff, 1);
            progressBar.fillRect(250, 280, 300 * value, 30);
        });

        this.load.on('fileprogress', function (file) {
            assetText.setText('우주선 불러오는 중: ' + file.key);
            // if (file.key = 'file300') {
            //     assetText.setVisible(false);
            //     assetText1.setText('우주선 총알 지급중: '+file.key);
            // }
        });

        this.load.on('complete', function () {
            progressBar.destroy();
            progressBox.destroy();
            loadingText.destroy();
            percentText.destroy();
            assetText.destroy();
        });

        this.load.image('logo', '/public/img/spaceship_white.png');
        for (var i = 0; i < 100; i++) {
            this.load.image('file' + i, '/public/img/spaceship_white.png');
        }

        // 내 우주선
        this.load.image('ship', '/public/img/spaceship_white.png');
        // 상대방 우주선
        this.load.image('otherPlayer', '/public/img/ufo_white.png');
        // 별 점수
        this.load.image('star', '/public/img/star.png');
        // 총알 상자
        this.load.image('bulletBox', '/public/img/bullet.png');
        // 일반 총알
        this.load.image('bullet', '/public/img/bullet.png');
        // ...

    },
    create: function () {
        // ...
        var self = this;
        // this.socket = socket;
        this.socket = io();
        this.bullets = this.physics.add.group({
            classType: Bullet,
            maxSize: 1,
            runChildUpdate: true
        });
        this.enemybullets = this.physics.add.group({
            classType: Bullet,
            maxSize: 999999999,
            runChildUpdate: true
        });

        this.otherPlayers = this.physics.add.group();
        this.blueScoreText = this.add.text(16, 16, '', {fontSize: '24px', fill: '#4286f4'});
        this.redScoreText = this.add.text(584, 16, '', {fontSize: '24px', fill: '#FF0000'});
        this.myBulletText = this.add.text(16, 52, '', {fontSize: '16px', fill: '#38ff65'});
        this.countText = this.add.text(400, 32, '', {fontSize: '24px', fill: '#ffffff'});

        this.countNum3 = self.add.text(400, 300, '', {fontSize: '30px', fill: '#ffd400'});
        this.countNum3.setText('다른 플레이어들을 기다리는 중 입니다...').setOrigin(0.5, 0.5);

        this.input.keyboard.shutdown();


        // socket.on = 이벤트 리스너, 클라이언트에서 호출하여 서버에서 실행할 수 있음
        this.socket.on('bulletBoxLocation', function (bulletLocation) {
            if (self.bulletBox) self.bulletBox.destroy();
            self.bulletBox = self.physics.add.image(bulletLocation.x, bulletLocation.y, 'bulletBox').setOrigin(0.5, 0.5).setDisplaySize(30, 20);
            self.physics.add.overlap(self.ship, self.bulletBox, function () {
                endBulletBox++;
                this.socket.emit('bulletBoxCollected');
            }, null, self);
        });

        this.socket.on('starLocation', function (starLocation) {
            if (self.star) self.star.destroy();
            self.star = self.physics.add.image(starLocation.x, starLocation.y, 'star').setOrigin(0.5, 0.5).setDisplaySize(30, 30);
            self.physics.add.overlap(self.ship, self.star, function () {
                endStar++;
                this.socket.emit('starCollected');
            }, null, self);
        });

        this.socket.on('bulletMoved', function (playerInfo) {
            self.otherPlayers.getChildren().forEach(function (otherPlayer) {

                var bullet = self.enemybullets.get().setActive(true).setVisible(true).setDisplaySize(20, 10);
                if (playerInfo.playerId === otherPlayer.playerId) {
                    bullet.fire(otherPlayer);
                }
                console.log("발사");
                self.physics.add.overlap(self.ship, bullet, function () {
                    endHit++;
                    self.socket.emit('hitPlayer', self.ship);
                    bullet.destroy();
                });

                self.socket.on('destroyBullet', function (playerInfo) {
                    self.otherPlayers.getChildren().forEach(function (otherPlayer) {
                        if (playerInfo.playerId === otherPlayer.playerId) {
                            console.log("서버에서 받는 부분");
                            bullet.destroy();
                        }
                    });
                });
                // self.physics.add.overlap(otherPlayer, bullet, function () {
                //     // , playerHitCallback(self.ship, bullet)
                //     console.log("오버랩 되는 부분");
                //     this.socket.emit('hitPlayer');
                // }, null, self);

            });
        });

        // let createBlueScore = this.blueScoreText.setText('Blue Team: 0');
        // let createRedScore = this.redScoreText.setText('Red Team: 0');

        this.blueScoreText.setText('Blue Score: 0');
        this.redScoreText.setText('Red Score: 0');
        // createBlueScore.destroy();
        // createRedScore.destroy();


        this.socket.on('scoreUpdate', function (scores) {
            self.blueScoreText.setText('Blue Score: ' + scores.blue);
            self.redScoreText.setText('Red Score: ' + scores.red);
            endScore = scores;
        });

        this.socket.on('bulletUpdate', function (player) {
            // self.bullets.maxSize = player.bullet;

            Object.keys(player).forEach(function (id) {
                if (player[id].playerId === self.socket.id) {
                    // myBullet = player[id].bullet;
                    // myBullet += 5;
                    self.bullets.maxSize = player[id].bullet;
                }
            });
            // self.otherPlayers.getChildren().forEach(function (otherPlayer) {
            //     if (playerId === otherPlayer.playerId) {
            //         otherPlayer.destroy();
            //     }
            // });
        });

        var currentOtherPlayer;
        this.socket.on('currentPlayers', function (players) {
            Object.keys(players).forEach(function (id) {
                if (players[id].playerId === self.socket.id) {
                    addPlayer(self, players[id]);
                    console.log("내가 추가되었다");
                    console.log(players[id].team);
                    self.socket.emit('myTeam', team);
                } else {
                    addOtherPlayers(self, players[id]);
                    //
                    console.log("(currentPlayer)다른플레이어가 추가되었다");
                    // currentOtherPlayer = self.add.text(players[id].x - 50, players[id].y + 20, players[id].playerId, {
                    //     fontSize: '16px',
                    //     fill: '#38ff65'
                    // });
                }

            });
        });

        this.socket.on('newPlayer', function (playerInfo) {
            // currentOtherPlayer.destroy();
            console.log("addOtherPlayers" + playerInfo.team);
            addOtherPlayers(self, playerInfo);
            // playerInfo.playerId = self.add.text(playerInfo.x - 50, playerInfo.y + 20, playerInfo.playerId, {
            //     fontSize: '16px',
            //     fill: '#38ff65'
            // });
            console.log("(newPlayer)다른플레이어가 추가되었다");
            // playerInfo.playerId = self.add.text(playerInfo.playerId.x-50, playerInfo.playerId.y+20, playerInfo.playerId, {fontSize: '16px', fill: '#38ff65'});
            // this.playername = self.add.text(self.ship.x,self.ship.y,self.socket.playerId,{fontSize: '16px', fill: '#38ff65'});
            // this.playername.setText(playerInfo.playerId);
        });

        this.socket.on('disconnect', function (playerId) {
            self.otherPlayers.getChildren().forEach(function (otherPlayer) {
                if (playerId === otherPlayer.playerId) {
                    otherPlayer.destroy();
                    otherPlayer.pID.destroy();
                    // otherPlayer.bullet.destroy();
                    // currentOtherPlayer.destroy();
                }
            });
        });

        this.socket.on('playerMoved', function (playerInfo) {
            self.otherPlayers.getChildren().forEach(function (otherPlayer) {
                if (playerInfo.playerId === otherPlayer.playerId) {
                    otherPlayer.setRotation(playerInfo.rotation);
                    otherPlayer.setPosition(playerInfo.x, playerInfo.y);
                    otherPlayer.pID.x = playerInfo.x - 25;
                    otherPlayer.pID.y = playerInfo.y + 20;


                    // OpID = self.add.text(playerInfo.x-50, playerInfo.y+20, playerInfo.playerId, {fontSize: '16px', fill: '#38ff65'});
                    // playerInfo.playerId.x = playerInfo.x-50;
                    // playerInfo.playerId.y = playerInfo.y+10;

                    // pID = self.add.text(playerInfo.x,playerInfo.y,'ID',{fontSize: '16px', fill: '#38ff65'});
                    // pID.setText(playerInfo.playerId);
                }
            });
        });


        this.socket.on('countThree', function (count) {
            console.log("count: " + count);
            // countThree = self.time.addEvent({delay: 2000, callback: threeEvent, callbackScope: this, repeat: 3});
            // timedEvent = self.time.addEvent({delay: 1500, callback: onEvent, callbackScope: this, repeat: 64});
            if (count === 3) {
                self.countNum3.destroy();
                self.countNum3 = self.add.text(400, 300, '', {fontSize: '80px', fill: '#ff0001'});
                self.countNum3.setText('3').setOrigin(0.5, 0.5);
                console.log(3);
            } else if (count === 2) {
                self.countNum3.destroy();
                self.countNum3 = self.add.text(400, 300, '', {fontSize: '80px', fill: '#0056ff'});
                self.countNum3.setText('2').setOrigin(0.5, 0.5);
                console.log(2);
            } else if (count === 1) {
                self.countNum3.destroy();
                self.countNum3 = self.add.text(400, 300, '', {fontSize: '80px', fill: '#ff8913'});
                self.countNum3.setText('1').setOrigin(0.5, 0.5);
                console.log(1);
            } else if (count === 0) {
                self.countNum3.destroy();
                self.countNum3 = self.add.text(400, 300, '', {fontSize: '80px', fill: '#ffc158'});
                self.countNum3.setText('START').setOrigin(0.5, 0.5);
                console.log('start');
                self.input.keyboard.start();
                countdown = -1;
            } else if (count === -1) {
                self.countNum3.setText('');
            }
        });

        let overCount = 3;
        this.socket.on('gameStart', function (count) {
            // self.countText.setText(timedEvent.repeatCount);
            // self.input.keyboard.start();
            gameCount = count;
            if (count === 0) {
                console.log("TimeOver");
                gameCount = 'TimeOver';
                self.input.keyboard.shutdown();
                self.bulletBox.destroy();
                self.star.destroy();
                self.countNum3 = self.add.text(400, 300, '', {fontSize: '80px', fill: '#ffc158'});
                self.countNum3.setText('TIME OVER').setOrigin(0.5, 0.5);
                const timeout = setInterval(function () {
                    overCount--;
                    if (overCount === 0) {
                        clearInterval(timeout);
                        // self.otherPlayers.destroy();
                        self.ship.destroy();
                        self.blueScoreText.destroy();
                        self.redScoreText.destroy();
                        scooore = 1;
                        self.scene.start('sceneEndGame', {
                            key: 0,
                            playerName: playerName,
                            score: endScore,
                            getStar: endStar,
                            getBulletBox: endBulletBox,
                            getHit: endHit,
                            getTeamShot: teamShot,
                            getEnemyShot: enemyShot,
                            getAllShot: allShot
                        });
                        self.socket.close();
                        // this.countNum3.destroy();
                    }
                }, 1000);
            }
        });

        this.cursors = this.input.keyboard.createCursorKeys();
        this.spacebar = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
        // ...
    },
    update: function () {

        if (countdown === -1) {
            // this.socket.emit('countDown');
            // timedEvent = this.time.addEvent({delay: 1500, callback: onEvent, callbackScope: this, repeat: 60});
            this.countText.setText(gameCount).setOrigin(0.5, 0.5);
            // this.input.keyboard.start();
        }
        // ...
        if (this.ship !== undefined) {
            this.pID.x = this.ship.x - 25;
            this.pID.y = this.ship.y + 20;
            // if (this.physics.add.overlap(this.ship, this.bullets)) {
            //     console.log("내총에 내가 맞나");
            // }
            if (this.cursors.left.isDown) {
                this.ship.setAngularVelocity(-150);
            } else if (this.cursors.right.isDown) {
                this.ship.setAngularVelocity(150);
            } else {
                this.ship.setAngularVelocity(0);
            }

            if (this.cursors.up.isDown) {
                this.physics.velocityFromRotation(this.ship.rotation + 1.5, 70, this.ship.body.acceleration);
            } else {
                this.ship.setAcceleration(0);
            }

            this.physics.world.wrap(this.ship, 5);

            if (Phaser.Input.Keyboard.JustDown(this.spacebar)) {
                if (this.bullets.maxSize !== 0) {
                    var bullet = this.bullets.get().setDisplaySize(20, 10);

                    console.log(this.bullets.maxSize);
                    // self.physics.add.image(starLocation.x, starLocation.y, 'star').setOrigin(0.5, 0.5).setDisplaySize(30, 30);
                    if (bullet) {
                        bullet.fire(this.ship);
                        allShot++;
                        this.bullets.maxSize--;

                        this.physics.add.overlap(this.otherPlayers, bullet, otherplayersHitCallback);

                        this.socket.emit('bulletFire', {
                            x: this.ship.x,
                            y: this.ship.y,
                            rotation: this.ship.rotation,
                            b: this.bullets.maxSize
                        });
                        // this.physics.add.overlap(this.otherPlayers, bullet, function () {
                        //     // bullet.destroy();
                        //     this.socket.emit('hitPlayer');
                        // }, null, this);

                    }
                }
            }

            this.myBulletText.setText('Bullets: ' + this.bullets.maxSize);

            // emit player movement
            var x = this.ship.x;
            var y = this.ship.y;
            var r = this.ship.rotation;
            var b = this.bullets.maxSize;
            // this.playername = this.add.text(x, y, '',{fontSize: '16px', fill: '#38ff65'});
            // this.playername.setText(pID);
            if (this.ship.oldPosition && (x !== this.ship.oldPosition.x || y !== this.ship.oldPosition.y || r !== this.ship.oldPosition.rotation || b !== this.ship.oldPosition.b)) {
                this.socket.emit('playerMovement', {
                    x: this.ship.x,
                    y: this.ship.y,
                    rotation: this.ship.rotation,
                    b: this.bullets.maxSize,
                    pID: pID
                });
            }

            // save old position data
            this.ship.oldPosition = {
                x: this.ship.x,
                y: this.ship.y,
                rotation: this.ship.rotation,
                b: this.bullets.maxSize
            };
        }
        // ...
    }

// function create() {
//
//
//
// }

// function update() {
//     // if (this.physics.add.overlap(this.ship, bullet)) {
//     //     console.log("내총에 내가 맞나");
//     // }
//
//
//     // 충돌 감지 부분
//     // this.physics.add.collider(this.otherPlayers, this.ship);
// }
});

function addPlayer(self, playerInfo) {
    // playerInfo.playerName = playerName;
    if (self.ship !== undefined) {
        console.log("self.ship: ", self.ship);
        self.ship.destroy();
    } else {
        self.ship = self.physics.add.sprite(playerInfo.x, playerInfo.y, 'ship').setOrigin(0.5, 0.5).setDisplaySize(30, 30);
        self.pID = self.add.text(playerInfo.x - 25, playerInfo.y + 20, playerInfo.playerName, {
            fontSize: '12px',
            fill: '#38ff65'
        });
        playerName = playerInfo.playerName;
        console.log(team);
        if (team === 2) {
            playerInfo.team = 'blue';
            self.ship.setTint('0x4286f4');
        } else {
            playerInfo.team = 'red';
            self.ship.setTint('0xff0000');
        }
        // if (playerInfo.team === 'blue') {
        //     self.ship.setTint('0x4286f4');
        // } else {
        //     self.ship.setTint('0xff0000');
        // }
        self.ship.setDrag(100);
        self.ship.setAngularDrag(100);
        self.ship.setMaxVelocity(200);
    }
}

function addOtherPlayers(self, playerInfo) {
    const otherPlayer = self.physics.add.sprite(playerInfo.x, playerInfo.y, 'otherPlayer').setOrigin(0.5, 0.5).setDisplaySize(30, 30);
    otherPlayer.pID = self.add.text(playerInfo.x - 25, playerInfo.y + 20, playerInfo.playerName, {
        fontSize: '12px',
        fill: '#ffffff'
    });

    if (playerInfo.team === 'blue') {
        otherPlayer.team = 'blue';
        otherPlayer.setTint('0x4286f4');
    } else {
        otherPlayer.team = 'red';
        otherPlayer.setTint('0xff0000');
    }
    otherPlayer.playerId = playerInfo.playerId;
    otherPlayer.playerName = playerInfo.playerName;
    // otherPlayer.playerId = self.add.text(playerInfo.x-50, playerInfo.y+20, playerInfo.playerId, {fontSize: '16px', fill: '#38ff65'});
    self.otherPlayers.add(otherPlayer);
}

// 내가 상대를 쐈다
function otherplayersHitCallback(enemyHit, bulletHit) {
    // Reduce health of enemy
    if (bulletHit.active === true && enemyHit.active === true) {
        // enemyHit.health = enemyHit.health - 1;
        // console.log("Enemy hp: ", enemyHit.health);
        //
        // // Kill enemy if health <= 0
        // if (enemyHit.health <= 0) {
        //     enemyHit.setActive(false).setVisible(false);
        //     enemyHit.destroy();
        // }

        enemyHit.destroy();
        let hitTeam;
        console.log("맞은 상대의 팀 색깔: " + bulletHit.team);
        if (bulletHit.team === 'red') { // 맞은 상대가 레드
            hitTeam = 3;
            if (hitTeam === team) { // -------- 총알 팀킬
                teamShot++;
            } else { // ------- 총알 맞춤
                enemyShot++;
            }
        } else if (bulletHit.team === 'blue') { // 맞은 상대가 블루
            hitTeam = 2;
            if (hitTeam === team) { // -------- 총알 팀킬
                teamShot++;
            } else { // ------- 총알 맞춤
                enemyShot++;
            }
        }
        /////////////////////////////////////////////////////// 레드일때는 맞는데 블루기준으로는 틀리다!!!!!!!!!!
        // if (hitTeam === team) { // -------- 총알 팀킬
        //     teamShot++;
        // } else { // ------- 총알 맞춤
        //     enemyShot++;
        // }

        // Destroy bullet
        // enemyHit.setActive(false).setVisible(false);
    }
}

var SceneEndGame = new Phaser.Class({
    Extends: Phaser.Scene,
    initialize:
        function sceneEndGame() {
            Phaser.Scene.call(this, {key: 'sceneEndGame'});
        },
    init: function (data) {
        console.log('init', data);

        this.key = data.key;
        score = data.score;
        getStar = data.getStar;
        getBulletBox = data.getBulletBox;
        getHit = data.getHit;
        getTeamShot = data.getTeamShot;
        getEnemyShot = data.getEnemyShot;
        getAllShot = data.getAllShot;
        console.log('key: ', this.key);
        console.log('R score: ', score.red);
        console.log('B score: ', score.blue);
        console.log('별 획득 횟수: ', getStar);
        console.log('총알 획득 횟수: ', getBulletBox);
        console.log('맞은 횟수: ', getHit);
        console.log('팀을 맞춘 횟수: ', getTeamShot);
        console.log('적을 맞춘 횟수: ', getEnemyShot);
        console.log('발사한 총알 수: ', getAllShot);
    },
    preload: function () {
        // 별 점수
        this.load.image('star', '/public/img/star.png');
        // 총알 상자
        this.load.image('bulletBox', '/public/img/bullet.png');
    },
    create: function () {
        var self = this;
        this.socket = io();
        this.redScore = this.add.text(100, 100, '', {fontSize: '80px', fill: '#ff0001'});
        this.redScore.setText(score.red).setOrigin(0.5, 0.5);

        this.blueScore = this.add.text(250, 100, '', {fontSize: '80px', fill: '#0056ff'});
        this.blueScore.setText(score.blue).setOrigin(0.5, 0.5);

        if (score.red > score.blue) { // 레드 승리
            if (team === 2) { // 나는 블루 팀
                this.blueWin = this.add.text(600, 100, '', {fontSize: '60px', fill: '#0056ff'});
                this.blueWin.setText('BLUE LOSE').setOrigin(0.5, 0.5);
                this.gameResult = '패배';
            } else { // 나는 레드 팀
                this.redWin = this.add.text(600, 100, '', {fontSize: '60px', fill: '#ff0001'});
                this.redWin.setText('RED WIN').setOrigin(0.5, 0.5);
                this.gameResult = '승리';
            }
        } else if (score.blue > score.red) { // 블루 승리
            if (team === 2) { // 나는 블루 팀
                this.blueWin = this.add.text(600, 100, '', {fontSize: '60px', fill: '#0056ff'});
                this.blueWin.setText('BLUE WIN').setOrigin(0.5, 0.5);
                this.gameResult = '승리';
            } else { // 나는 레드 팀
                this.redWin = this.add.text(600, 100, '', {fontSize: '60px', fill: '#ff0001'});
                this.redWin.setText('RED LOSE').setOrigin(0.5, 0.5);
                this.gameResult = '패배';
            }
        } else { // 무승부
            this.teamDraw = this.add.text(600, 100, '', {fontSize: '60px', fill: '#ffffff'});
            this.teamDraw.setText('Draw').setOrigin(0.5, 0.5);
            this.gameResult = '무승부';
        }

        this.tableP = this.add.text(400, 240, '', {fontSize: '20px', fill: '#00ff00'});
        // tableP1 = this.add.text(400, 280, '', {fontSize: '20px', fill: '#ffffff'});
        // tableP2 = this.add.text(400, 320, '', {fontSize: '20px', fill: '#ffffff'});
        // tableP3 = this.add.text(400, 360, '', {fontSize: '20px', fill: '#ffffff'});
        this.table = this.add.text(400, 200, '', {fontSize: '20px', fill: '#ffffff'});
        this.table.setText('ID      Star      Bullet      HitEnemy      HitTeam      Point').setOrigin(0.5, 0.5);

        let tableP1, tableP2, tableP3;
        let num = 1;
        let id, myTeam, star, bullet, allshot, enemyhit, teamhit, point, mypoint;
        // 서버에서 다른 사용자들의 기록을 받아온다
        this.socket.on('playerGameInfo', function (playerGameInfo) {

            id = playerGameInfo.playerName;
            myTeam = playerGameInfo.team;
            star = playerGameInfo.getStar;
            bullet = playerGameInfo.getBulletBox;
            allshot = playerGameInfo.getAllShot;
            enemyhit = playerGameInfo.getEnemyShot;
            teamhit = playerGameInfo.getTeamShot;
            point = star * 10 + bullet * 5 + enemyhit * 10 - teamhit * 10;

            console.log(num);
            console.log(id);
            console.log(star);
            console.log(bullet);
            console.log(enemyhit);
            console.log(teamhit);
            console.log(point);

            if (num === 1) {
                if (myTeam === 2) { // 보낸 플레이어는 블루팀
                    tableP1 = self.add.text(400, 280, '', {fontSize: '20px', fill: '#7983ff'});
                } else { // 보낸 플레이어는 레드팀
                    tableP1 = self.add.text(400, 280, '', {fontSize: '20px', fill: '#ff4a50'});
                }
                // self.table.append('<thead><tr><th>' + id + '</th><th>' + star + '</th><th>' + bullet + '</th><th>' + enemyhit + "/" + allshot + '</th><th>' + teamhit + "/" + allshot + '</th><th>' + point + '</th></tr></thead>').setOrigin(0.5, 0.5);
                tableP1.setText(id + "        " + star + "           " + bullet + "           " + enemyhit + "/" + allshot + "          " + teamhit + "/" + allshot + "         " + point).setOrigin(0.5, 0.5);
            } else if (num === 2) {
                if (myTeam === 2) { // 보낸 플레이어는 블루팀
                    tableP2 = self.add.text(400, 320, '', {fontSize: '20px', fill: '#7983ff'});
                } else { // 보낸 플레이어는 레드팀
                    tableP2 = self.add.text(400, 320, '', {fontSize: '20px', fill: '#ff4a50'});
                }
                tableP2.setText(id + "        " + star + "           " + bullet + "           " + enemyhit + "/" + allshot + "          " + teamhit + "/" + allshot + "         " + point).setOrigin(0.5, 0.5);
            } else if (num === 3) {
                if (myTeam === 2) { // 보낸 플레이어는 블루팀
                    tableP3 = self.add.text(400, 360, '', {fontSize: '20px', fill: '#7983ff'});
                } else { // 보낸 플레이어는 레드팀
                    tableP3 = self.add.text(400, 360, '', {fontSize: '20px', fill: '#ff4a50'});
                }
                tableP3.setText(id + "        " + star + "           " + bullet + "           " + enemyhit + "/" + allshot + "          " + teamhit + "/" + allshot + "         " + point).setOrigin(0.5, 0.5);
                self.socket.close();
            }
            num++;

            // self.otherPlayers.getChildren().forEach(function (otherPlayer) {
            //     if (playerGameInfo.playerId === otherPlayer.playerId) {
            //         otherPlayer.getStar = playerGameInfo.getStar;
            //         otherPlayer.getBulletBox = playerGameInfo.getBulletBox;
            //         otherPlayer.getHit = playerGameInfo.getHit;
            //         otherPlayer.getTeamShot = playerGameInfo.getTeamShot;
            //         otherPlayer.getEnemyShot = playerGameInfo.getEnemyShot;
            //     }
            // });
        });


        mypoint = getStar * 10 + getBulletBox * 5 + getEnemyShot * 10 - getTeamShot * 10;
        // 서버로 내 기록을 보낸다
        this.socket.emit('finishGame', {
            playerName: playerName,
            myTeam: team,
            getStar: getStar,
            getBulletBox: getBulletBox,
            getHit: getHit,
            getTeamShot: getTeamShot,
            getEnemyShot: getEnemyShot,
            getAllShot: getAllShot,
            getPoint: mypoint,
            getGameResult: this.gameResult
        });

        // 기록들을 표시한다
        this.tableP.setText(playerName + "        " + getStar + "           " + getBulletBox + "           " + getEnemyShot + "/" + getAllShot + "          " + getTeamShot + "/" + getAllShot + "         " + mypoint).setOrigin(0.5, 0.5);


        // 확인 버튼
        this.endGame = this.add.text(400, 550, '', {fontSize: '30px', fill: '#ffffff'});
        this.endGame.setText('Enter').setOrigin(0.5, 0.5);


        // 나가기
        // this.endGame = this.add.text(700, 550, '', {fontSize: '30px', fill: '#ffffff'});
        // this.endGame.setText('종료하기').setOrigin(0.5, 0.5);

        // 나가기 클릭 효과
        // this.RedEnterButtonHoverState = function () {
        //     this.endGame.setText('').setOrigin(0.5, 0.5);
        //     this.endGame = this.add.text(700, 550, '', {font: '40px Courier', fill: '#ff4a50'}).setOrigin(0.5, 0.5);
        //     this.endGame.setText('종료하기').setOrigin(0.5, 0.5);
        // };
        // this.RedEnterButtonRestState = function () {
        //     this.endGame.setText('').setOrigin(0.5, 0.5);
        //     this.endGame = this.add.text(700, 550, '', {font: '30px Courier', fill: '#ffffff'}).setOrigin(0.5, 0.5);
        //     this.endGame.setText('종료하기').setOrigin(0.5, 0.5);
        // };
        // this.RedEnterButtonActiveState = function () {
        //     this.endGame.setText('').setOrigin(0.5, 0.5);
        //     this.endGame = this.add.text(700, 550, '', {font: '40px Courier', fill: '#ff0001'}).setOrigin(0.5, 0.5);
        //     this.endGame.setText('종료하기').setOrigin(0.5, 0.5);
        // };

        // this.endGame.setInteractive()
        //     .on('pointerover', () => this.RedEnterButtonHoverState())
        //     .on('pointerout', () => this.RedEnterButtonRestState())
        //     .on('pointerdown', () => this.RedEnterButtonActiveState())
        //     .on('pointerup', () => {
        //         this.RedEnterButtonHoverState();
        //         // vs.setVisible(false);
        //         // start.setVisible(true).setTint('0xff0000');
        //         // this.endGame.setText("");
        //         // this.endGame = this.add.text(700, 550, '종료하기', {font: '80px Courier', fill: '#ff0001'});
        //         // redShip.setVisible(true);
        //         // blueShip.setVisible(false);
        //         // myTeam = 3;
        //     });
        // 확인 클릭 효과
        this.enterButtonHoverState = function () {
            this.endGame.setText('');
            this.endGame = this.add.text(400, 550, '', {font: '40px Courier', fill: '#ffc158'});
            this.endGame.setText('Enter').setOrigin(0.5, 0.5);
        };
        this.enterButtonRestState = function () {
            this.endGame.setText('');
            this.endGame = this.add.text(400, 550, '', {font: '30px Courier', fill: '#ffffff'});
            this.endGame.setText('Enter').setOrigin(0.5, 0.5);
        };
        this.enterButtonActiveState = function () {
            this.endGame.setText('');
            this.endGame = this.add.text(400, 550, '', {font: '40px Courier', fill: '#ff8913'});
            this.endGame.setText('Enter').setOrigin(0.5, 0.5);
        };

        this.endGame.setInteractive()
            .on('pointerover', () => this.enterButtonHoverState())
            .on('pointerout', () => this.enterButtonRestState())
            .on('pointerdown', () => this.enterButtonActiveState())
            .on('pointerup', () => {
                this.enterButtonHoverState();
                // self.socket.close();
                location.reload();
                // this.scene.start('menu');
            });
    }
});

function threeEvent() {
    countdown--;
    console.log(countdown);
}

function onEvent() {
    console.log("게임 포즈 걸기!");
}

// 상대가 나를 쐈다
function playerHitCallback(playerHit, bulletHit) {
    // Reduce health of player
    if (bulletHit.active === true && playerHit.active === true) {
        // playerHit.health = playerHit.health - 1;
        // console.log("Player hp: ", playerHit.health);
        //
        // // Kill hp sprites and kill player if health <= 0
        // if (playerHit.health === 2) {
        //     hp3.destroy();
        // }
        // else if (playerHit.health === 1) {
        //     hp2.destroy();
        // }
        // else if (playerHit.health === 0) {
        //     hp1.destroy();
        //     // Game over state should execute here
        //     playerHit.setActive(false).setVisible(false);
        //     playerHit.destroy();
        // }

        // Destroy bullet
        bulletHit.destroy();

    }
}

var config = {
    type: Phaser.AUTO,
    width: 800,
    height: 600,
    parent: "ppppp",
    physics: {
        default: 'arcade',
        arcade: {
            debug: false,
            gravity: {y: 0}
        }
    },
    scene: [Menu, vsNum, Demo, SceneMainGame, SceneEndGame]
};

var pID;
var game = new Phaser.Game(config);