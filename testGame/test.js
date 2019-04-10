// var config = {
//     type: Phaser.AUTO,
//     parent: 'phaser-example',
//     width: 800,
//     height: 600,
//     physics: {
//         default: 'arcade',
//         arcade: {
//             debug: false,
//             gravity: {y: 0}
//         }
//     },
//     scene: {
//         preload: preload,
//         create: create,
//         update: update
//     }
// };
//
// var myBullet = 0;
// var game = new Phaser.Game(config);
//
// /////////////////////////////////////////////////////////////// 총알
// var Bullet = new Phaser.Class({
//
//     Extends: Phaser.Physics.Arcade.Image,
//
//     initialize:
//
//         function Bullet(scene) {
//             Phaser.Physics.Arcade.Image.call(this, scene, 0, 0, 'bullet');
//
//             // this.setOrigin(0.5,0.5).setDisplaySize(20,20);
//             this.setBlendMode(1);
//             this.setDepth(1);
//
//             this.speed = 200;
//             this.lifespan = 1500;
//
//             this._temp = new Phaser.Math.Vector2();
//             // this.setSize(10, 10, true);
//         },
//
//     fire: function (ship) {
//         // 총알 시간(생명)
//         this.lifespan = 1500;
//         this.setActive(true);
//         this.setVisible(true);
//         this.setRotation(ship.rotation);
//         this.setAngle(ship.body.rotation+90);
//         this.setPosition(ship.x, ship.y);
//         this.body.reset(ship.x, ship.y);
//
//         var angle = Phaser.Math.DegToRad(ship.body.rotation);
//
//         this.scene.physics.velocityFromRotation(angle-29.8, this.speed, this.body.velocity);
//
//         // 총알 방향축에 대한 (속도)
//         this.body.velocity.x *= 3;
//         this.body.velocity.y *= 3;
//     },
//
//     update: function (time, delta) {
//         this.lifespan -= delta;
//         if (this.lifespan <= 0) {
//             this.setActive(false);
//             this.setVisible(false);
//             this.body.stop();
//         }
//     }
//
// });
//
// function preload() {
//
//     // 내 우주선
//     this.load.image('ship', 'img/spaceship_white.png');
//     // 상대방 우주선
//     this.load.image('otherPlayer', 'img/ufo_white.png');
//     // 별 점수
//     this.load.image('star', 'img/star.png');
//     // 총알 상자
//     this.load.image('bulletBox', 'img/bullet.png');
//     // 일반 총알
//     this.load.image('bullet', 'img/bullet.png');
//
// }
//
// function create() {
//
//     var self = this;
//     this.socket = io();
//     this.bullets = this.physics.add.group({
//         classType: Bullet,
//         maxSize: 0,
//         runChildUpdate: false
//     });
//     this.otherPlayers = this.physics.add.group();
//     this.blueScoreText = this.add.text(16, 16, '', {fontSize: '24px', fill: '#4286f4'});
//     this.redScoreText = this.add.text(584, 16, '', {fontSize: '24px', fill: '#FF0000'});
//     this.myBulletText = this.add.text(16, 52, '', {fontSize: '16px', fill: '#38ff65'});
// // socket.on = 이벤트 리스너, 클라이언트에서 호출하여 서버에서 실행할 수 있음
//     this.socket.on('bulletBoxLocation', function (bulletLocation) {
//         if (self.bulletBox) self.bulletBox.destroy();
//         self.bulletBox = self.physics.add.image(bulletLocation.x, bulletLocation.y, 'bulletBox').setOrigin(0.5, 0.5).setDisplaySize(30, 20);
//         self.physics.add.overlap(self.ship, self.bulletBox, function () {
//             this.socket.emit('bulletBoxCollected');
//         }, null, self);
//     });
//
//     this.socket.on('starLocation', function (starLocation) {
//         if (self.star) self.star.destroy();
//         self.star = self.physics.add.image(starLocation.x, starLocation.y, 'star').setOrigin(0.5, 0.5).setDisplaySize(30, 30);
//         self.physics.add.overlap(self.ship, self.star, function () {
//             this.socket.emit('starCollected');
//         }, null, self);
//     });
//
//     this.socket.on('scoreUpdate', function (scores) {
//         self.blueScoreText.setText('Blue Team: ' + scores.blue);
//         self.redScoreText.setText('Red Team: ' + scores.red);
//     });
//
//     this.socket.on('bulletUpdate', function (player) {
//         Object.keys(player).forEach(function (id) {
//             if (player[id].playerId === self.socket.id) {
//                 // myBullet = player[id].bullet;
//                 // myBullet += 5;
//                 self.bullets.maxSize = player[id].bullet;
//             }
//         });
//     });
//
//     this.socket.on('currentPlayers', function (players) {
//         Object.keys(players).forEach(function (id) {
//             if (players[id].playerId === self.socket.id) {
//                 addPlayer(self, players[id]);
//             } else {
//                 addOtherPlayers(self, players[id]);
//             }
//         });
//     });
//
//     this.socket.on('newPlayer', function (playerInfo) {
//         addOtherPlayers(self, playerInfo);
//     });
//
//     this.socket.on('disconnect', function (playerId) {
//         self.otherPlayers.getChildren().forEach(function (otherPlayer) {
//             if (playerId === otherPlayer.playerId) {
//                 otherPlayer.destroy();
//             }
//         });
//     });
//
//     this.socket.on('playerMoved', function (playerInfo) {
//         self.otherPlayers.getChildren().forEach(function (otherPlayer) {
//             if (playerInfo.playerId === otherPlayer.playerId) {
//                 otherPlayer.setRotation(playerInfo.rotation);
//                 otherPlayer.setPosition(playerInfo.x, playerInfo.y);
//
//             } else {
//                 console.log("이건 언제되는거니");
//
//             }
//         });
//     });
//
//     this.cursors = this.input.keyboard.createCursorKeys();
//     this.spacebar = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
// }
//
// function update() {
//
//     // this.physics.world.collideObjects(this.ship, this.otherPlayers);
//     // this.physics.add.collider(this.ship, this.otherPlayers);
//
//     // Phaser.Actions.Rotate(star, 0.01);
//     // Phaser.Actions.Rotate(bulletBox, 0.01);
//
//     if (this.ship) {
//         if (this.cursors.left.isDown) {
//             this.ship.setAngularVelocity(-150);
//         } else if (this.cursors.right.isDown) {
//             this.ship.setAngularVelocity(150);
//         } else {
//             this.ship.setAngularVelocity(0);
//         }
//
//         if (this.cursors.up.isDown) {
//             this.physics.velocityFromRotation(this.ship.rotation + 1.5, 100, this.ship.body.acceleration);
//         } else {
//             this.ship.setAcceleration(0);
//         }
//
//         this.physics.world.wrap(this.ship, 5);
//
//         var bullet_count;
//         if (Phaser.Input.Keyboard.JustDown(this.spacebar)) {
//             if (this.bullets.maxSize !== 0) {
//                 var bullet = this.bullets.get().setDisplaySize(20,10);
//                 console.log(this.bullets.maxSize);
//                 // self.physics.add.image(starLocation.x, starLocation.y, 'star').setOrigin(0.5, 0.5).setDisplaySize(30, 30);
//                 if (bullet) {
//                     bullet.fire(this.ship);
//                     this.bullets.maxSize--;
//                     bullet_count = this.bullets.maxSize;
//
//                 }
//             }
//         }
//
//         this.myBulletText.setText('Bullets: ' + this.bullets.maxSize);
//
//         // emit player movement
//         var x = this.ship.x;
//         var y = this.ship.y;
//         var r = this.ship.rotation;
//         var b = this.bullets.maxSize;
//         if (this.ship.oldPosition && (x !== this.ship.oldPosition.x || y !== this.ship.oldPosition.y || r !== this.ship.oldPosition.rotation || b !== this.ship.oldPosition.b)) {
//             this.socket.emit('playerMovement', {
//                 x: this.ship.x,
//                 y: this.ship.y,
//                 rotation: this.ship.rotation,
//                 b: this.bullets.maxSize
//             });
//         }
//
//         // save old position data
//         this.ship.oldPosition = {
//             x: this.ship.x,
//             y: this.ship.y,
//             rotation: this.ship.rotation,
//             b: bullet_count
//         };
//     }
// }
//
// function addPlayer(self, playerInfo) {
//     self.ship = self.physics.add.image(playerInfo.x, playerInfo.y, 'ship').setOrigin(0.5, 0.5).setDisplaySize(30, 30);
//     if (playerInfo.team === 'blue') {
//         self.ship.setTint('0x4286f4');
//     } else {
//         self.ship.setTint('0xff0000');
//     }
//     self.ship.setDrag(100);
//     self.ship.setAngularDrag(100);
//     self.ship.setMaxVelocity(200);
// }
//
// function addOtherPlayers(self, playerInfo) {
//     const otherPlayer = self.add.sprite(playerInfo.x, playerInfo.y, 'otherPlayer').setOrigin(0.5, 0.5).setDisplaySize(30, 30);
//     if (playerInfo.team === 'blue') {
//         otherPlayer.setTint('0x4286f4');
//     } else {
//         otherPlayer.setTint('0xff0000');
//     }
//     otherPlayer.playerId = playerInfo.playerId;
//     self.otherPlayers.add(otherPlayer);
// }

// 총알 발사 내화면에서만 가능 9/19 ----- 21:13 총알 절반 시 에러

// var config = {
//     type: Phaser.AUTO,
//     parent: 'phaser-example',
//     width: 800,
//     height: 600,
//     physics: {
//         default: 'arcade',
//         arcade: {
//             debug: false,
//             gravity: {y: 0}
//         }
//     },
//     scene: {
//         preload: preload,
//         create: create,
//         update: update
//     }
// };
//
// var myBullet = 0;
// var game = new Phaser.Game(config);
//
// /////////////////////////////////////////////////////////////// 총알
// var Bullet = new Phaser.Class({
//
//     Extends: Phaser.Physics.Arcade.Image,
//
//     initialize:
//
//         function Bullet(scene) {
//             Phaser.Physics.Arcade.Image.call(this, scene, 0, 0, 'bullet');
//
//             // this.setOrigin(0.5,0.5).setDisplaySize(20,20);
//             this.setBlendMode(1);
//             this.setDepth(1);
//
//             this.speed = 200;
//             this.lifespan = 500;
//
//             this._temp = new Phaser.Math.Vector2();
//             // this.setSize(10, 10, true);
//         },
//
//     fire: function (ship) {
//         // 총알 시간(생명)
//         this.lifespan = 500;
//         this.setActive(true);
//         this.setVisible(true);
//         this.setRotation(ship.rotation);
//         this.setAngle(ship.body.rotation+90);
//         this.setPosition(ship.x, ship.y);
//         this.body.reset(ship.x, ship.y);
//
//         var angle = Phaser.Math.DegToRad(ship.body.rotation);
//
//         this.scene.physics.velocityFromRotation(angle-29.8, this.speed, this.body.velocity);
//
//         // 총알 방향축에 대한 (속도)
//         this.body.velocity.x *= 3;
//         this.body.velocity.y *= 3;
//     },
//
//     update: function (time, delta) {
//         this.lifespan -= delta;
//         if (this.lifespan <= 0) {
//             this.setActive(false);
//             this.setVisible(false);
//             this.body.stop();
//         }
//     }
//
// });
//
// function preload() {
//
//     // 내 우주선
//     this.load.image('ship', 'img/spaceship_white.png');
//     // 상대방 우주선
//     this.load.image('otherPlayer', 'img/ufo_white.png');
//     // 별 점수
//     this.load.image('star', 'img/star.png');
//     // 총알 상자
//     this.load.image('bulletBox', 'img/bullet.png');
//     // 일반 총알
//     this.load.image('bullet', 'img/bullet.png');
//
// }
//
// function create() {
//
//     var self = this;
//     this.socket = io();
//     this.bullets = this.physics.add.group({
//         classType: Bullet,
//         maxSize: 0,
//         runChildUpdate: true
//     });
//     this.otherPlayers = this.physics.add.group();
//     this.blueScoreText = this.add.text(16, 16, '', {fontSize: '24px', fill: '#4286f4'});
//     this.redScoreText = this.add.text(584, 16, '', {fontSize: '24px', fill: '#FF0000'});
//     this.myBulletText = this.add.text(16, 52, '', {fontSize: '16px', fill: '#38ff65'});
// // socket.on = 이벤트 리스너, 클라이언트에서 호출하여 서버에서 실행할 수 있음
//     this.socket.on('bulletBoxLocation', function (bulletLocation) {
//         if (self.bulletBox) self.bulletBox.destroy();
//         self.bulletBox = self.physics.add.image(bulletLocation.x, bulletLocation.y, 'bulletBox').setOrigin(0.5, 0.5).setDisplaySize(30, 20);
//         self.physics.add.overlap(self.ship, self.bulletBox, function () {
//             this.socket.emit('bulletBoxCollected');
//         }, null, self);
//     });
//
//     this.socket.on('starLocation', function (starLocation) {
//         if (self.star) self.star.destroy();
//         self.star = self.physics.add.image(starLocation.x, starLocation.y, 'star').setOrigin(0.5, 0.5).setDisplaySize(30, 30);
//         self.physics.add.overlap(self.ship, self.star, function () {
//             this.socket.emit('starCollected');
//         }, null, self);
//     });
//
//     this.socket.on('scoreUpdate', function (scores) {
//         self.blueScoreText.setText('Blue Team: ' + scores.blue);
//         self.redScoreText.setText('Red Team: ' + scores.red);
//     });
//
//     this.socket.on('bulletUpdate', function (player) {
//         // self.bullets.maxSize = player.bullet;
//
//         Object.keys(player).forEach(function (id) {
//             if (player[id].playerId === self.socket.id) {
//                 // myBullet = player[id].bullet;
//                 // myBullet += 5;
//                 self.bullets.maxSize = player[id].bullet;
//             }
//         });
//
//         // self.otherPlayers.getChildren().forEach(function (otherPlayer) {
//         //     if (playerId === otherPlayer.playerId) {
//         //         otherPlayer.destroy();
//         //     }
//         // });
//     });
//
//     this.socket.on('currentPlayers', function (players) {
//         Object.keys(players).forEach(function (id) {
//             if (players[id].playerId === self.socket.id) {
//                 addPlayer(self, players[id]);
//             } else {
//                 addOtherPlayers(self, players[id]);
//             }
//         });
//     });
//
//     this.socket.on('newPlayer', function (playerInfo) {
//         addOtherPlayers(self, playerInfo);
//     });
//
//     this.socket.on('disconnect', function (playerId) {
//         self.otherPlayers.getChildren().forEach(function (otherPlayer) {
//             if (playerId === otherPlayer.playerId) {
//                 otherPlayer.destroy();
//             }
//         });
//     });
//
//     this.socket.on('playerMoved', function (playerInfo) {
//         self.otherPlayers.getChildren().forEach(function (otherPlayer) {
//             if (playerInfo.playerId === otherPlayer.playerId) {
//                 otherPlayer.setRotation(playerInfo.rotation);
//                 otherPlayer.setPosition(playerInfo.x, playerInfo.y);
//             }
//         });
//     });
//
//     this.socket.on('bulletMoved', function (playerInfo) {
//         self.otherPlayers.getChildren().forEach(function (otherPlayer) {
//             if (playerInfo.playerId === otherPlayer.playerId) {
//                 var bullet = self.bullets.get().setDisplaySize(20,10);
//                 bullet.fire(otherPlayer);
//             }
//         });
//     });
//
//     this.cursors = this.input.keyboard.createCursorKeys();
//     this.spacebar = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
// }
//
// function update() {
//
//     // this.physics.world.collideObjects(this.ship, this.otherPlayers);
//     // this.physics.add.collider(this.ship, this.otherPlayers);
//
//     // Phaser.Actions.Rotate(star, 0.01);
//     // Phaser.Actions.Rotate(bulletBox, 0.01);
//
//     if (this.ship) {
//         if (this.cursors.left.isDown) {
//             this.ship.setAngularVelocity(-150);
//         } else if (this.cursors.right.isDown) {
//             this.ship.setAngularVelocity(150);
//         } else {
//             this.ship.setAngularVelocity(0);
//         }
//
//         if (this.cursors.up.isDown) {
//             this.physics.velocityFromRotation(this.ship.rotation + 1.5, 100, this.ship.body.acceleration);
//         } else {
//             this.ship.setAcceleration(0);
//         }
//
//         this.physics.world.wrap(this.ship, 5);
//
//         if (Phaser.Input.Keyboard.JustDown(this.spacebar)) {
//             if (this.bullets.maxSize !== 0) {
//                 var bullet = this.bullets.get().setDisplaySize(20,10);
//                 console.log(this.bullets.maxSize);
//                 // self.physics.add.image(starLocation.x, starLocation.y, 'star').setOrigin(0.5, 0.5).setDisplaySize(30, 30);
//                 if (bullet) {
//                     bullet.fire(this.ship);
//                     this.bullets.maxSize--;
//
//                     this.socket.emit('bulletFire', {
//                         x: this.ship.x,
//                         y: this.ship.y,
//                         rotation: this.ship.rotation,
//                         b: this.bullets.maxSize
//                     });
//                 }
//             }
//         }
//
//         this.myBulletText.setText('Bullets: ' + this.bullets.maxSize);
//
//         // emit player movement
//         var x = this.ship.x;
//         var y = this.ship.y;
//         var r = this.ship.rotation;
//         var b = this.bullets.maxSize;
//         if (this.ship.oldPosition && (x !== this.ship.oldPosition.x || y !== this.ship.oldPosition.y || r !== this.ship.oldPosition.rotation || b !== this.ship.oldPosition.b)) {
//             this.socket.emit('playerMovement', {
//                 x: this.ship.x,
//                 y: this.ship.y,
//                 rotation: this.ship.rotation,
//                 b: this.bullets.maxSize
//             });
//         }
//
//         // save old position data
//         this.ship.oldPosition = {
//             x: this.ship.x,
//             y: this.ship.y,
//             rotation: this.ship.rotation,
//             b: this.bullets.maxSize
//         };
//     }
// }
//
// function addPlayer(self, playerInfo) {
//     self.ship = self.physics.add.image(playerInfo.x, playerInfo.y, 'ship').setOrigin(0.5, 0.5).setDisplaySize(30, 30);
//     if (playerInfo.team === 'blue') {
//         self.ship.setTint('0x4286f4');
//     } else {
//         self.ship.setTint('0xff0000');
//     }
//     self.ship.setDrag(100);
//     self.ship.setAngularDrag(100);
//     self.ship.setMaxVelocity(200);
// }
//
// function addOtherPlayers(self, playerInfo) {
//     const otherPlayer = self.add.sprite(playerInfo.x, playerInfo.y, 'otherPlayer').setOrigin(0.5, 0.5).setDisplaySize(30, 30);
//     if (playerInfo.team === 'blue') {
//         otherPlayer.setTint('0x4286f4');
//     } else {
//         otherPlayer.setTint('0xff0000');
//     }
//     otherPlayer.playerId = playerInfo.playerId;
//     self.otherPlayers.add(otherPlayer);
// }

// 총알 발사 멀티 가능 9/20 ---------- 15:17  가끔 한번씩 에러 터짐

// var config = {
//     type: Phaser.AUTO,
//     parent: 'phaser-example',
//     width: 800,
//     height: 600,
//     physics: {
//         default: 'arcade',
//         arcade: {
//             debug: false,
//             gravity: {y: 0}
//         }
//     },
//     scene: {
//         preload: preload,
//         create: create,
//         update: update
//     }
// };
//
// var myBullet = 0;
// var game = new Phaser.Game(config);
//
// /////////////////////////////////////////////////////////////// 총알
// var Bullet = new Phaser.Class({
//
//     Extends: Phaser.Physics.Arcade.Image,
//
//     initialize:
//
//         function Bullet(scene) {
//             Phaser.Physics.Arcade.Image.call(this, scene, 0, 0, 'bullet');
//
//             // this.setOrigin(0.5,0.5).setDisplaySize(20,20);
//             this.setBlendMode(1);
//             this.setDepth(1);
//
//             this.speed = 200;
//             this.lifespan = 1000;
//
//             this._temp = new Phaser.Math.Vector2();
//             // this.setSize(10, 10, true);
//         },
//
//     fire: function (ship) {
//         // 총알 시간(생명)
//         this.lifespan = 1000;
//         this.setActive(true);
//         this.setVisible(true);
//         this.setRotation(ship.rotation);
//         this.setAngle(ship.body.rotation + 90);
//         this.setPosition(ship.x, ship.y);
//         this.body.reset(ship.x, ship.y);
//
//         var angle = Phaser.Math.DegToRad(ship.body.rotation);
//
//         this.scene.physics.velocityFromRotation(angle - 29.8, this.speed, this.body.velocity);
//
//         // 총알 방향축에 대한 (속도)
//         this.body.velocity.x *= 4;
//         this.body.velocity.y *= 4;
//     },
//
//     update: function (time, delta) {
//         this.lifespan -= delta;
//         if (this.lifespan <= 0) {
//             this.setActive(false);
//             this.setVisible(false);
//             this.body.stop();
//         }
//     }
//
// });
//
// function preload() {
//
//     // 내 우주선
//     this.load.image('ship', 'img/spaceship_white.png');
//     // 상대방 우주선
//     this.load.image('otherPlayer', 'img/ufo_white.png');
//     // 별 점수
//     this.load.image('star', 'img/star.png');
//     // 총알 상자
//     this.load.image('bulletBox', 'img/bullet.png');
//     // 일반 총알
//     this.load.image('bullet', 'img/bullet.png');
//
// }
//
// function create() {
//
//     var self = this;
//     this.socket = io();
//     this.bullets = this.physics.add.group({
//         classType: Bullet,
//         maxSize: 0,
//         runChildUpdate: true
//     });
//
//     this.otherPlayers = this.physics.add.group();
//     this.blueScoreText = this.add.text(16, 16, '', {fontSize: '24px', fill: '#4286f4'});
//     this.redScoreText = this.add.text(584, 16, '', {fontSize: '24px', fill: '#FF0000'});
//     this.myBulletText = this.add.text(16, 52, '', {fontSize: '16px', fill: '#38ff65'});
// // socket.on = 이벤트 리스너, 클라이언트에서 호출하여 서버에서 실행할 수 있음
//     this.socket.on('bulletBoxLocation', function (bulletLocation) {
//         if (self.bulletBox) self.bulletBox.destroy();
//         self.bulletBox = self.physics.add.image(bulletLocation.x, bulletLocation.y, 'bulletBox').setOrigin(0.5, 0.5).setDisplaySize(30, 20);
//         self.physics.add.overlap(self.ship, self.bulletBox, function () {
//             this.socket.emit('bulletBoxCollected');
//         }, null, self);
//     });
//
//     this.socket.on('starLocation', function (starLocation) {
//         if (self.star) self.star.destroy();
//         self.star = self.physics.add.image(starLocation.x, starLocation.y, 'star').setOrigin(0.5, 0.5).setDisplaySize(30, 30);
//         self.physics.add.overlap(self.ship, self.star, function () {
//             this.socket.emit('starCollected');
//         }, null, self);
//     });
//
//     this.socket.on('bulletMoved', function (playerInfo) {
//         self.otherPlayers.getChildren().forEach(function (otherPlayer) {
//
//             var bullet = self.bullets.get().setActive(true).setVisible(true).setDisplaySize(20, 10);
//             if (playerInfo.playerId === otherPlayer.playerId) {
//                 bullet.fire(otherPlayer);
//             }
//             console.log("발사");
//             self.physics.add.overlap(self.ship, bullet, playerHitCallback);
//
//         });
//     });
//
//     this.socket.on('scoreUpdate', function (scores) {
//         self.blueScoreText.setText('Blue Team: ' + scores.blue);
//         self.redScoreText.setText('Red Team: ' + scores.red);
//     });
//
//     this.socket.on('bulletUpdate', function (player) {
//         // self.bullets.maxSize = player.bullet;
//
//         Object.keys(player).forEach(function (id) {
//             if (player[id].playerId === self.socket.id) {
//                 // myBullet = player[id].bullet;
//                 // myBullet += 5;
//                 self.bullets.maxSize = player[id].bullet;
//             }
//         });
//
//         // self.otherPlayers.getChildren().forEach(function (otherPlayer) {
//         //     if (playerId === otherPlayer.playerId) {
//         //         otherPlayer.destroy();
//         //     }
//         // });
//     });
//
//     this.socket.on('currentPlayers', function (players) {
//         Object.keys(players).forEach(function (id) {
//             if (players[id].playerId === self.socket.id) {
//                 addPlayer(self, players[id]);
//             } else {
//                 addOtherPlayers(self, players[id]);
//             }
//         });
//     });
//
//     this.socket.on('newPlayer', function (playerInfo) {
//         addOtherPlayers(self, playerInfo);
//     });
//
//     this.socket.on('disconnect', function (playerId) {
//         self.otherPlayers.getChildren().forEach(function (otherPlayer) {
//             if (playerId === otherPlayer.playerId) {
//                 otherPlayer.destroy();
//             }
//         });
//     });
//
//     this.socket.on('playerMoved', function (playerInfo) {
//         self.otherPlayers.getChildren().forEach(function (otherPlayer) {
//             if (playerInfo.playerId === otherPlayer.playerId) {
//                 otherPlayer.setRotation(playerInfo.rotation);
//                 otherPlayer.setPosition(playerInfo.x, playerInfo.y);
//             }
//         });
//     });
//
//     this.cursors = this.input.keyboard.createCursorKeys();
//     this.spacebar = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
// }
//
// function update() {
//
//     // this.physics.world.collideObjects(this.ship, this.otherPlayers);
//     // this.physics.add.collider(this.ship, this.otherPlayers);
//
//     // Phaser.Actions.Rotate(star, 0.01);
//     // Phaser.Actions.Rotate(bulletBox, 0.01);
//
//     if (this.ship) {
//         if (this.cursors.left.isDown) {
//             this.ship.setAngularVelocity(-150);
//         } else if (this.cursors.right.isDown) {
//             this.ship.setAngularVelocity(150);
//         } else {
//             this.ship.setAngularVelocity(0);
//         }
//
//         if (this.cursors.up.isDown) {
//             this.physics.velocityFromRotation(this.ship.rotation + 1.5, 70, this.ship.body.acceleration);
//         } else {
//             this.ship.setAcceleration(0);
//         }
//
//         this.physics.world.wrap(this.ship, 5);
//
//         if (Phaser.Input.Keyboard.JustDown(this.spacebar)) {
//             if (this.bullets.maxSize !== 0) {
//                 var bullet = this.bullets.get().setDisplaySize(20, 10);
//                 console.log(this.bullets.maxSize);
//                 // self.physics.add.image(starLocation.x, starLocation.y, 'star').setOrigin(0.5, 0.5).setDisplaySize(30, 30);
//                 if (bullet) {
//                     bullet.fire(this.ship);
//                     this.bullets.maxSize--;
//
//                     this.physics.add.overlap(this.otherPlayers, bullet, otherplayersHitCallback);
//
//                     this.socket.emit('bulletFire', {
//                         x: this.ship.x,
//                         y: this.ship.y,
//                         rotation: this.ship.rotation,
//                         b: this.bullets.maxSize
//                     });
//                     // this.physics.add.overlap(this.otherPlayers, bullet, function () {
//                     //     bullet.destroy();
//                     //     this.socket.emit('hitPlayer');
//                     // }, null, this);
//
//                 }
//             }
//         }
//
//         this.myBulletText.setText('Bullets: ' + this.bullets.maxSize);
//
//         // emit player movement
//         var x = this.ship.x;
//         var y = this.ship.y;
//         var r = this.ship.rotation;
//         var b = this.bullets.maxSize;
//         if (this.ship.oldPosition && (x !== this.ship.oldPosition.x || y !== this.ship.oldPosition.y || r !== this.ship.oldPosition.rotation || b !== this.ship.oldPosition.b)) {
//             this.socket.emit('playerMovement', {
//                 x: this.ship.x,
//                 y: this.ship.y,
//                 rotation: this.ship.rotation,
//                 b: this.bullets.maxSize
//             });
//         }
//
//         // save old position data
//         this.ship.oldPosition = {
//             x: this.ship.x,
//             y: this.ship.y,
//             rotation: this.ship.rotation,
//             b: this.bullets.maxSize
//         };
//     }
//     // 충돌 감지 부분
//     // this.physics.add.collider(this.otherPlayers, this.ship);
// }
//
// function addPlayer(self, playerInfo) {
//     self.ship = self.physics.add.sprite(playerInfo.x, playerInfo.y, 'ship').setOrigin(0.5, 0.5).setDisplaySize(30, 30);
//     if (playerInfo.team === 'blue') {
//         self.ship.setTint('0x4286f4');
//     } else {
//         self.ship.setTint('0xff0000');
//     }
//     self.ship.setDrag(100);
//     self.ship.setAngularDrag(100);
//     self.ship.setMaxVelocity(200);
// }
//
// function addOtherPlayers(self, playerInfo) {
//     const otherPlayer = self.physics.add.sprite(playerInfo.x, playerInfo.y, 'otherPlayer').setOrigin(0.5, 0.5).setDisplaySize(30, 30);
//     if (playerInfo.team === 'blue') {
//         otherPlayer.setTint('0x4286f4');
//     } else {
//         otherPlayer.setTint('0xff0000');
//     }
//     otherPlayer.playerId = playerInfo.playerId;
//     self.otherPlayers.add(otherPlayer);
// }
//
// // 내가 상대를 쐈다
// function otherplayersHitCallback(enemyHit, bulletHit) {
//     // Reduce health of enemy
//     if (bulletHit.active === true && enemyHit.active === true) {
//         // enemyHit.health = enemyHit.health - 1;
//         // console.log("Enemy hp: ", enemyHit.health);
//         //
//         // // Kill enemy if health <= 0
//         // if (enemyHit.health <= 0) {
//         //     enemyHit.setActive(false).setVisible(false);
//         //     enemyHit.destroy();
//         // }
//         enemyHit.destroy();
//         // Destroy bullet
//         // enemyHit.setActive(false).setVisible(false);
//     }
// }
//
// // 상대가 나를 쐈다
// function playerHitCallback(playerHit, bulletHit) {
//     // Reduce health of player
//     if (bulletHit.active === true && playerHit.active === true) {
//         // playerHit.health = playerHit.health - 1;
//         // console.log("Player hp: ", playerHit.health);
//         //
//         // // Kill hp sprites and kill player if health <= 0
//         // if (playerHit.health === 2) {
//         //     hp3.destroy();
//         // }
//         // else if (playerHit.health === 1) {
//         //     hp2.destroy();
//         // }
//         // else if (playerHit.health === 0) {
//         //     hp1.destroy();
//         //     // Game over state should execute here
//         //     playerHit.setActive(false).setVisible(false);
//         //     playerHit.destroy();
//         // }
//
//         // Destroy bullet
//         bulletHit.setActive(false).setVisible(false);
//
//     }
// }

// 멀티 총알 맞는 부분 9/21 ------------- 15:52  Callback 부분을 function 으로 바꿔보자

// var config = {
//     type: Phaser.AUTO,
//     parent: 'phaser-example',
//     width: 800,
//     height: 600,
//     physics: {
//         default: 'arcade',
//         arcade: {
//             debug: false,
//             gravity: {y: 0}
//         }
//     },
//     scene: {
//         preload: preload,
//         create: create,
//         update: update
//     }
// };
//
// var myBullet = 0;
// var game = new Phaser.Game(config);
//
// /////////////////////////////////////////////////////////////// 총알
// var Bullet = new Phaser.Class({
//
//     Extends: Phaser.Physics.Arcade.Image,
//
//     initialize:
//
//         function Bullet(scene) {
//             Phaser.Physics.Arcade.Image.call(this, scene, 0, 0, 'bullet');
//
//             // this.setOrigin(0.5,0.5).setDisplaySize(20,20);
//             this.setBlendMode(1);
//             this.setDepth(1);
//
//             this.speed = 200;
//             this.lifespan = 1000;
//
//             this._temp = new Phaser.Math.Vector2();
//             // this.setSize(10, 10, true);
//         },
//
//     fire: function (ship) {
//         // 총알 시간(생명)
//         this.lifespan = 1000;
//         this.setActive(true);
//         this.setVisible(true);
//         this.setRotation(ship.rotation);
//         this.setAngle(ship.body.rotation + 90);
//         this.setPosition(ship.x, ship.y);
//         this.body.reset(ship.x, ship.y);
//
//         var angle = Phaser.Math.DegToRad(ship.body.rotation);
//
//         this.scene.physics.velocityFromRotation(angle - 29.8, this.speed, this.body.velocity);
//
//         // 총알 방향축에 대한 (속도)
//         this.body.velocity.x *= 4;
//         this.body.velocity.y *= 4;
//     },
//
//     update: function (time, delta) {
//         this.lifespan -= delta;
//         if (this.lifespan <= 0) {
//             this.setActive(false);
//             this.setVisible(false);
//             this.body.stop();
//         }
//     }
//
// });
//
// function preload() {
//
//     // 내 우주선
//     this.load.image('ship', 'img/spaceship_white.png');
//     // 상대방 우주선
//     this.load.image('otherPlayer', 'img/ufo_white.png');
//     // 별 점수
//     this.load.image('star', 'img/star.png');
//     // 총알 상자
//     this.load.image('bulletBox', 'img/bullet.png');
//     // 일반 총알
//     this.load.image('bullet', 'img/bullet.png');
//
// }
//
// function create() {
//
//     var self = this;
//     this.socket = io();
//     this.bullets = this.physics.add.group({
//         classType: Bullet,
//         maxSize: 0,
//         runChildUpdate: true
//     });
//
//     this.otherPlayers = this.physics.add.group();
//     this.blueScoreText = this.add.text(16, 16, '', {fontSize: '24px', fill: '#4286f4'});
//     this.redScoreText = this.add.text(584, 16, '', {fontSize: '24px', fill: '#FF0000'});
//     this.myBulletText = this.add.text(16, 52, '', {fontSize: '16px', fill: '#38ff65'});
// // socket.on = 이벤트 리스너, 클라이언트에서 호출하여 서버에서 실행할 수 있음
//     this.socket.on('bulletBoxLocation', function (bulletLocation) {
//         if (self.bulletBox) self.bulletBox.destroy();
//         self.bulletBox = self.physics.add.image(bulletLocation.x, bulletLocation.y, 'bulletBox').setOrigin(0.5, 0.5).setDisplaySize(30, 20);
//         self.physics.add.overlap(self.ship, self.bulletBox, function () {
//             this.socket.emit('bulletBoxCollected');
//         }, null, self);
//     });
//
//     this.socket.on('starLocation', function (starLocation) {
//         if (self.star) self.star.destroy();
//         self.star = self.physics.add.image(starLocation.x, starLocation.y, 'star').setOrigin(0.5, 0.5).setDisplaySize(30, 30);
//         self.physics.add.overlap(self.ship, self.star, function () {
//             this.socket.emit('starCollected');
//         }, null, self);
//     });
//
//     this.socket.on('bulletMoved', function (playerInfo) {
//         self.otherPlayers.getChildren().forEach(function (otherPlayer) {
//
//             var bullet = self.bullets.get().setActive(true).setVisible(true).setDisplaySize(20, 10);
//             if (playerInfo.playerId === otherPlayer.playerId) {
//                 bullet.fire(otherPlayer);
//             }
//             console.log("발사");
//             self.physics.add.overlap(self.ship, bullet, playerHitCallback);
//             // self.physics.add.overlap(self.ship, bullet, function () {
//             //     // , playerHitCallback(self.ship, bullet)
//             //     this.socket.emit('bulletToMe');
//             // }, null, self);
//
//         });
//     });
//
//     this.socket.on('scoreUpdate', function (scores) {
//         self.blueScoreText.setText('Blue Team: ' + scores.blue);
//         self.redScoreText.setText('Red Team: ' + scores.red);
//     });
//
//     this.socket.on('bulletUpdate', function (player) {
//         // self.bullets.maxSize = player.bullet;
//
//         Object.keys(player).forEach(function (id) {
//             if (player[id].playerId === self.socket.id) {
//                 // myBullet = player[id].bullet;
//                 // myBullet += 5;
//                 self.bullets.maxSize = player[id].bullet;
//             }
//         });
//
//         // self.otherPlayers.getChildren().forEach(function (otherPlayer) {
//         //     if (playerId === otherPlayer.playerId) {
//         //         otherPlayer.destroy();
//         //     }
//         // });
//     });
//
//     this.socket.on('currentPlayers', function (players) {
//         Object.keys(players).forEach(function (id) {
//             if (players[id].playerId === self.socket.id) {
//                 addPlayer(self, players[id]);
//             } else {
//                 addOtherPlayers(self, players[id]);
//             }
//         });
//     });
//
//     this.socket.on('newPlayer', function (playerInfo) {
//         addOtherPlayers(self, playerInfo);
//     });
//
//     this.socket.on('disconnect', function (playerId) {
//         self.otherPlayers.getChildren().forEach(function (otherPlayer) {
//             if (playerId === otherPlayer.playerId) {
//                 otherPlayer.destroy();
//             }
//         });
//     });
//
//     this.socket.on('playerMoved', function (playerInfo) {
//         self.otherPlayers.getChildren().forEach(function (otherPlayer) {
//             if (playerInfo.playerId === otherPlayer.playerId) {
//                 otherPlayer.setRotation(playerInfo.rotation);
//                 otherPlayer.setPosition(playerInfo.x, playerInfo.y);
//             }
//         });
//     });
//
//     this.cursors = this.input.keyboard.createCursorKeys();
//     this.spacebar = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
// }
//
// function update() {
//
//     // this.physics.world.collideObjects(this.ship, this.otherPlayers);
//     // this.physics.add.collider(this.ship, this.otherPlayers);
//
//     // Phaser.Actions.Rotate(star, 0.01);
//     // Phaser.Actions.Rotate(bulletBox, 0.01);
//
//     if (this.ship) {
//         if (this.cursors.left.isDown) {
//             this.ship.setAngularVelocity(-150);
//         } else if (this.cursors.right.isDown) {
//             this.ship.setAngularVelocity(150);
//         } else {
//             this.ship.setAngularVelocity(0);
//         }
//
//         if (this.cursors.up.isDown) {
//             this.physics.velocityFromRotation(this.ship.rotation + 1.5, 70, this.ship.body.acceleration);
//         } else {
//             this.ship.setAcceleration(0);
//         }
//
//         this.physics.world.wrap(this.ship, 5);
//
//         if (Phaser.Input.Keyboard.JustDown(this.spacebar)) {
//             if (this.bullets.maxSize !== 0) {
//                 var bullet = this.bullets.get().setDisplaySize(20, 10);
//                 console.log(this.bullets.maxSize);
//                 // self.physics.add.image(starLocation.x, starLocation.y, 'star').setOrigin(0.5, 0.5).setDisplaySize(30, 30);
//                 if (bullet) {
//                     bullet.fire(this.ship);
//                     this.bullets.maxSize--;
//
//                     this.physics.add.overlap(this.otherPlayers, bullet, otherplayersHitCallback);
//
//                     this.socket.emit('bulletFire', {
//                         x: this.ship.x,
//                         y: this.ship.y,
//                         rotation: this.ship.rotation,
//                         b: this.bullets.maxSize
//                     });
//                     // this.physics.add.overlap(this.otherPlayers, bullet, function () {
//                     //     bullet.destroy();
//                     //     this.socket.emit('hitPlayer');
//                     // }, null, this);
//
//                 }
//             }
//         }
//
//         this.myBulletText.setText('Bullets: ' + this.bullets.maxSize);
//
//         // emit player movement
//         var x = this.ship.x;
//         var y = this.ship.y;
//         var r = this.ship.rotation;
//         var b = this.bullets.maxSize;
//         if (this.ship.oldPosition && (x !== this.ship.oldPosition.x || y !== this.ship.oldPosition.y || r !== this.ship.oldPosition.rotation || b !== this.ship.oldPosition.b)) {
//             this.socket.emit('playerMovement', {
//                 x: this.ship.x,
//                 y: this.ship.y,
//                 rotation: this.ship.rotation,
//                 b: this.bullets.maxSize
//             });
//         }
//
//         // save old position data
//         this.ship.oldPosition = {
//             x: this.ship.x,
//             y: this.ship.y,
//             rotation: this.ship.rotation,
//             b: this.bullets.maxSize
//         };
//     }
//     // 충돌 감지 부분
//     // this.physics.add.collider(this.otherPlayers, this.ship);
// }
//
// function addPlayer(self, playerInfo) {
//     self.ship = self.physics.add.sprite(playerInfo.x, playerInfo.y, 'ship').setOrigin(0.5, 0.5).setDisplaySize(30, 30);
//     if (playerInfo.team === 'blue') {
//         self.ship.setTint('0x4286f4');
//     } else {
//         self.ship.setTint('0xff0000');
//     }
//     self.ship.setDrag(100);
//     self.ship.setAngularDrag(100);
//     self.ship.setMaxVelocity(200);
// }
//
// function addOtherPlayers(self, playerInfo) {
//     const otherPlayer = self.physics.add.sprite(playerInfo.x, playerInfo.y, 'otherPlayer').setOrigin(0.5, 0.5).setDisplaySize(30, 30);
//     if (playerInfo.team === 'blue') {
//         otherPlayer.setTint('0x4286f4');
//     } else {
//         otherPlayer.setTint('0xff0000');
//     }
//     otherPlayer.playerId = playerInfo.playerId;
//     self.otherPlayers.add(otherPlayer);
// }
//
// // 내가 상대를 쐈다
// function otherplayersHitCallback(enemyHit, bulletHit) {
//     // Reduce health of enemy
//     if (bulletHit.active === true && enemyHit.active === true) {
//         // enemyHit.health = enemyHit.health - 1;
//         // console.log("Enemy hp: ", enemyHit.health);
//         //
//         // // Kill enemy if health <= 0
//         // if (enemyHit.health <= 0) {
//         //     enemyHit.setActive(false).setVisible(false);
//         //     enemyHit.destroy();
//         // }
//         enemyHit.destroy();
//         // Destroy bullet
//         // enemyHit.setActive(false).setVisible(false);
//     }
// }
//
// // 상대가 나를 쐈다
// function playerHitCallback(playerHit, bulletHit) {
//     // Reduce health of player
//     if (bulletHit.active === true && playerHit.active === true) {
//         // playerHit.health = playerHit.health - 1;
//         // console.log("Player hp: ", playerHit.health);
//         //
//         // // Kill hp sprites and kill player if health <= 0
//         // if (playerHit.health === 2) {
//         //     hp3.destroy();
//         // }
//         // else if (playerHit.health === 1) {
//         //     hp2.destroy();
//         // }
//         // else if (playerHit.health === 0) {
//         //     hp1.destroy();
//         //     // Game over state should execute here
//         //     playerHit.setActive(false).setVisible(false);
//         //     playerHit.destroy();
//         // }
//
//         // Destroy bullet
//         bulletHit.destroy();
//
//     }
// }

// 멀티 총알 맞는 부분 9/21 ------------- 19:30  3자에게 총알 적용 안됨 안보인다

// var config = {
//     type: Phaser.AUTO,
//     parent: 'phaser-example',
//     width: 800,
//     height: 600,
//     physics: {
//         default: 'arcade',
//         arcade: {
//             debug: false,
//             gravity: {y: 0}
//         }
//     },
//     scene: {
//         preload: preload,
//         create: create,
//         update: update
//     }
// };
//
// var myBullet = 0;
// var game = new Phaser.Game(config);
//
// /////////////////////////////////////////////////////////////// 총알
// var Bullet = new Phaser.Class({
//
//     Extends: Phaser.Physics.Arcade.Image,
//
//     initialize:
//
//         function Bullet(scene) {
//             Phaser.Physics.Arcade.Image.call(this, scene, 0, 0, 'bullet');
//
//             // this.setOrigin(0.5,0.5).setDisplaySize(20,20);
//             this.setBlendMode(1);
//             this.setDepth(1);
//
//             this.speed = 200;
//             this.lifespan = 1000;
//
//             this._temp = new Phaser.Math.Vector2();
//             // this.setSize(10, 10, true);
//         },
//
//     fire: function (ship) {
//         // 총알 시간(생명)
//         this.lifespan = 1000;
//         this.setActive(true);
//         this.setVisible(true);
//         this.setRotation(ship.rotation);
//         this.setAngle(ship.body.rotation + 90);
//         this.setPosition(ship.x, ship.y);
//         this.body.reset(ship.x, ship.y);
//
//         var angle = Phaser.Math.DegToRad(ship.body.rotation);
//
//         this.scene.physics.velocityFromRotation(angle - 29.8, this.speed, this.body.velocity);
//
//         // 총알 방향축에 대한 (속도)
//         this.body.velocity.x *= 4;
//         this.body.velocity.y *= 4;
//     },
//
//     update: function (time, delta) {
//         this.lifespan -= delta;
//         if (this.lifespan <= 0) {
//             this.setActive(false);
//             this.setVisible(false);
//             this.body.stop();
//         }
//     }
//
// });
//
// function preload() {
//
//     // 내 우주선
//     this.load.image('ship', 'img/spaceship_white.png');
//     // 상대방 우주선
//     this.load.image('otherPlayer', 'img/ufo_white.png');
//     // 별 점수
//     this.load.image('star', 'img/star.png');
//     // 총알 상자
//     this.load.image('bulletBox', 'img/bullet.png');
//     // 일반 총알
//     this.load.image('bullet', 'img/bullet.png');
//
// }
//
// function create() {
//
//     var self = this;
//     this.socket = io();
//     this.bullets = this.physics.add.group({
//         classType: Bullet,
//         maxSize: 0,
//         runChildUpdate: true
//     });
//
//     this.otherPlayers = this.physics.add.group();
//     this.blueScoreText = this.add.text(16, 16, '', {fontSize: '24px', fill: '#4286f4'});
//     this.redScoreText = this.add.text(584, 16, '', {fontSize: '24px', fill: '#FF0000'});
//     this.myBulletText = this.add.text(16, 52, '', {fontSize: '16px', fill: '#38ff65'});
// // socket.on = 이벤트 리스너, 클라이언트에서 호출하여 서버에서 실행할 수 있음
//     this.socket.on('bulletBoxLocation', function (bulletLocation) {
//         if (self.bulletBox) self.bulletBox.destroy();
//         self.bulletBox = self.physics.add.image(bulletLocation.x, bulletLocation.y, 'bulletBox').setOrigin(0.5, 0.5).setDisplaySize(30, 20);
//         self.physics.add.overlap(self.ship, self.bulletBox, function () {
//             this.socket.emit('bulletBoxCollected');
//         }, null, self);
//     });
//
//     this.socket.on('starLocation', function (starLocation) {
//         if (self.star) self.star.destroy();
//         self.star = self.physics.add.image(starLocation.x, starLocation.y, 'star').setOrigin(0.5, 0.5).setDisplaySize(30, 30);
//         self.physics.add.overlap(self.ship, self.star, function () {
//             this.socket.emit('starCollected');
//         }, null, self);
//     });
//
//     this.socket.on('bulletMoved', function (playerInfo) {
//         self.otherPlayers.getChildren().forEach(function (otherPlayer) {
//
//             var bullet = self.bullets.get().setActive(true).setVisible(true).setDisplaySize(20, 10);
//             if (playerInfo.playerId === otherPlayer.playerId) {
//                 bullet.fire(otherPlayer);
//             }
//             console.log("발사");
//             self.physics.add.overlap(self.ship, bullet, function () {
//                 self.socket.emit('hitPlayer', self.ship);
//                 bullet.destroy();
//             });
//
//             self.socket.on('destroyBullet', function (playerInfo) {
//                 self.otherPlayers.getChildren().forEach(function (otherPlayer) {
//                     if (playerInfo.playerId === otherPlayer.playerId) {
//                         console.log("서버에서 받는 부분");
//                         bullet.destroy();
//                     }
//                 });
//             });
//             // self.physics.add.overlap(otherPlayer, bullet, function () {
//             //     // , playerHitCallback(self.ship, bullet)
//             //     console.log("오버랩 되는 부분");
//             //     this.socket.emit('hitPlayer');
//             // }, null, self);
//
//         });
//     });
//
//
//     this.socket.on('scoreUpdate', function (scores) {
//         self.blueScoreText.setText('Blue Team: ' + scores.blue);
//         self.redScoreText.setText('Red Team: ' + scores.red);
//     });
//
//     this.socket.on('bulletUpdate', function (player) {
//         // self.bullets.maxSize = player.bullet;
//
//         Object.keys(player).forEach(function (id) {
//             if (player[id].playerId === self.socket.id) {
//                 // myBullet = player[id].bullet;
//                 // myBullet += 5;
//                 self.bullets.maxSize = player[id].bullet;
//             }
//         });
//         // self.otherPlayers.getChildren().forEach(function (otherPlayer) {
//         //     if (playerId === otherPlayer.playerId) {
//         //         otherPlayer.destroy();
//         //     }
//         // });
//     });
//
//
//     this.socket.on('currentPlayers', function (players) {
//         Object.keys(players).forEach(function (id) {
//             if (players[id].playerId === self.socket.id) {
//                 addPlayer(self, players[id]);
//             } else {
//                 addOtherPlayers(self, players[id]);
//             }
//         });
//     });
//
//     this.socket.on('newPlayer', function (playerInfo) {
//         addOtherPlayers(self, playerInfo);
//     });
//
//     this.socket.on('disconnect', function (playerId) {
//         self.otherPlayers.getChildren().forEach(function (otherPlayer) {
//             if (playerId === otherPlayer.playerId) {
//                 otherPlayer.destroy();
//             }
//         });
//     });
//
//     this.socket.on('playerMoved', function (playerInfo) {
//         self.otherPlayers.getChildren().forEach(function (otherPlayer) {
//             if (playerInfo.playerId === otherPlayer.playerId) {
//                 otherPlayer.setRotation(playerInfo.rotation);
//                 otherPlayer.setPosition(playerInfo.x, playerInfo.y);
//             }
//         });
//     });
//
//     this.cursors = this.input.keyboard.createCursorKeys();
//     this.spacebar = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
// }
//
// function update() {
//
//     // if (this.physics.add.overlap(this.ship, bullet)) {
//     //     console.log("내총에 내가 맞나");
//     // }
//
//     if (this.ship) {
//         // if (this.physics.add.overlap(this.ship, this.bullets)) {
//         //     console.log("내총에 내가 맞나");
//         // }
//         if (this.cursors.left.isDown) {
//             this.ship.setAngularVelocity(-150);
//         } else if (this.cursors.right.isDown) {
//             this.ship.setAngularVelocity(150);
//         } else {
//             this.ship.setAngularVelocity(0);
//         }
//
//         if (this.cursors.up.isDown) {
//             this.physics.velocityFromRotation(this.ship.rotation + 1.5, 70, this.ship.body.acceleration);
//         } else {
//             this.ship.setAcceleration(0);
//         }
//
//         this.physics.world.wrap(this.ship, 5);
//
//         if (Phaser.Input.Keyboard.JustDown(this.spacebar)) {
//             if (this.bullets.maxSize !== 0) {
//                 var bullet = this.bullets.get().setDisplaySize(20, 10);
//                 console.log(this.bullets.maxSize);
//                 // self.physics.add.image(starLocation.x, starLocation.y, 'star').setOrigin(0.5, 0.5).setDisplaySize(30, 30);
//                 if (bullet) {
//                     bullet.fire(this.ship);
//                     this.bullets.maxSize--;
//
//                     this.physics.add.overlap(this.otherPlayers, bullet, otherplayersHitCallback);
//
//
//                     this.socket.emit('bulletFire', {
//                         x: this.ship.x,
//                         y: this.ship.y,
//                         rotation: this.ship.rotation,
//                         b: this.bullets.maxSize
//                     });
//                     // this.physics.add.overlap(this.otherPlayers, bullet, function () {
//                     //     // bullet.destroy();
//                     //     this.socket.emit('hitPlayer');
//                     // }, null, this);
//
//                 }
//             }
//         }
//
//         this.myBulletText.setText('Bullets: ' + this.bullets.maxSize);
//
//         // emit player movement
//         var x = this.ship.x;
//         var y = this.ship.y;
//         var r = this.ship.rotation;
//         var b = this.bullets.maxSize;
//         if (this.ship.oldPosition && (x !== this.ship.oldPosition.x || y !== this.ship.oldPosition.y || r !== this.ship.oldPosition.rotation || b !== this.ship.oldPosition.b)) {
//             this.socket.emit('playerMovement', {
//                 x: this.ship.x,
//                 y: this.ship.y,
//                 rotation: this.ship.rotation,
//                 b: this.bullets.maxSize
//             });
//         }
//
//         // save old position data
//         this.ship.oldPosition = {
//             x: this.ship.x,
//             y: this.ship.y,
//             rotation: this.ship.rotation,
//             b: this.bullets.maxSize
//         };
//     }
//     // 충돌 감지 부분
//     // this.physics.add.collider(this.otherPlayers, this.ship);
// }
//
// function addPlayer(self, playerInfo) {
//     self.ship = self.physics.add.sprite(playerInfo.x, playerInfo.y, 'ship').setOrigin(0.5, 0.5).setDisplaySize(30, 30);
//     if (playerInfo.team === 'blue') {
//         self.ship.setTint('0x4286f4');
//     } else {
//         self.ship.setTint('0xff0000');
//     }
//     self.ship.setDrag(100);
//     self.ship.setAngularDrag(100);
//     self.ship.setMaxVelocity(200);
// }
//
// function addOtherPlayers(self, playerInfo) {
//     const otherPlayer = self.physics.add.sprite(playerInfo.x, playerInfo.y, 'otherPlayer').setOrigin(0.5, 0.5).setDisplaySize(30, 30);
//     if (playerInfo.team === 'blue') {
//         otherPlayer.setTint('0x4286f4');
//     } else {
//         otherPlayer.setTint('0xff0000');
//     }
//     otherPlayer.playerId = playerInfo.playerId;
//     self.otherPlayers.add(otherPlayer);
// }
//
// // 내가 상대를 쐈다
// function otherplayersHitCallback(enemyHit, bulletHit) {
//     // Reduce health of enemy
//     if (bulletHit.active === true && enemyHit.active === true) {
//         // enemyHit.health = enemyHit.health - 1;
//         // console.log("Enemy hp: ", enemyHit.health);
//         //
//         // // Kill enemy if health <= 0
//         // if (enemyHit.health <= 0) {
//         //     enemyHit.setActive(false).setVisible(false);
//         //     enemyHit.destroy();
//         // }
//
//         enemyHit.destroy();
//
//         // Destroy bullet
//         // enemyHit.setActive(false).setVisible(false);
//     }
// }
//
// // 상대가 나를 쐈다
// function playerHitCallback(playerHit, bulletHit) {
//     // Reduce health of player
//     if (bulletHit.active === true && playerHit.active === true) {
//         // playerHit.health = playerHit.health - 1;
//         // console.log("Player hp: ", playerHit.health);
//         //
//         // // Kill hp sprites and kill player if health <= 0
//         // if (playerHit.health === 2) {
//         //     hp3.destroy();
//         // }
//         // else if (playerHit.health === 1) {
//         //     hp2.destroy();
//         // }
//         // else if (playerHit.health === 0) {
//         //     hp1.destroy();
//         //     // Game over state should execute here
//         //     playerHit.setActive(false).setVisible(false);
//         //     playerHit.destroy();
//         // }
//
//         // Destroy bullet
//         bulletHit.destroy();
//
//     }
// }

// 멀티 총알 맞는 부분 9/22 ------------- 14:30  ????

// var express = require('express');
// var app = express();
// var server = require('http').Server(app);
// var io = require('socket.io').listen(server);
//
// var players = {};
//
// var star = {
//     x: Math.floor(Math.random() * 700) + 50,
//     y: Math.floor(Math.random() * 500) + 50
// };
// var bulletBox = {
//     x: Math.floor(Math.random() * 700) + 50,
//     y: Math.floor(Math.random() * 500) + 50
// };
// var scores = {
//     blue: 0,
//     red: 0
// };
//
// app.use(express.static(__dirname + '/public'));
//
// app.get('/', function (req, res) {
//     res.sendFile(__dirname + '/index.html');
// });
// let choiceTeam = 0;
// let resultTeam;
// let count = 3;
// let gameCount = 60;
// // 클라이언트 초기 연결
// io.on('connection', function (socket) {
//     console.log('a user connected');
//     // 새 플레이어를 만들고 추가하십시오.
//     players[socket.id] = {
//         rotation: 0,
//         x: Math.floor(Math.random() * 700) + 50,
//         y: Math.floor(Math.random() * 500) + 50,
//         playerId: socket.id,
//         bullet: 10,
//         team: ''
//         // team: (Math.floor(Math.random() * 2) == 0) ? 'red' : 'blue'
//     };
//     console.log("플레이어 길이: " + choiceTeam);
//
//
//     socket.on('myTeam', function (team) {
//         console.log("2이면 BLUE / 3이면 RED --> " + team);
//         if (team === 3) {
//             players[socket.id].team = 'red';
//             socket.broadcast.emit('newPlayer', players[socket.id]);
//             choiceTeam += team;
//             console.log("접속한 플레이어의 수 ( 10이면 OK ) --> " + choiceTeam);
//             resultTeam = choiceTeam;
//         } else {
//             players[socket.id].team = 'blue';
//             socket.broadcast.emit('newPlayer', players[socket.id]);
//             choiceTeam += team;
//             console.log("접속한 플레이어의 수 ( 10이면 OK ) --> " + choiceTeam);
//             resultTeam = choiceTeam;
//         }
//     });
//
//     if (choiceTeam === 7 || choiceTeam === 8) {
//         const countThree = setInterval(function () {
//             io.emit('countThree', count);
//             count--;
//             if (count === -2) {
//                 clearInterval(countThree);
//                 console.log('카운트' + count);
//                 const gameStart = setInterval(function () {
//                     io.emit('gameStart', gameCount);
//                     gameCount--;
//                     console.log('게임 카운트' + gameCount);
//                     if (gameCount === 50) {
//                         clearInterval(gameStart);
//                     }
//                 }, 1000);
//             }
//         }, 1500);
//         // socket.emit('countThree', choiceTeam);
//         // socket.broadcast.emit('countThree', choiceTeam);
//     }
//     // console.log('카운트'+count);
//     // if (count === -1) {
//     //     const gameStart = setInterval(function () {
//     //         io.emit('gameStart', gameCount);
//     //         gameCount--;
//     //         if (gameCount === -1) {
//     //             clearInterval(gameStart);
//     //         }
//     //     }, 1500);
//     // }
//
//
//     socket.on('countDown', function () {
//         socket.emit('gameStart');
//     });
//     ////////////////////   socket.emit = 연결된 모든 플레이어에게 보낸다   ///////////////////////////
//
//     // 새로운 플레이어에게 플레이어 객체 보내기
//     socket.emit('currentPlayers', players);
//     // 플레이어에게 별 아이템 개체를 보내기
//     socket.emit('starLocation', star);
//     // 플레이어에게 총알 아이템 개체를 보내기
//     socket.emit('bulletBoxLocation', bulletBox);
//     // 현재 점수를 보내기
//     socket.emit('scoreUpdate', scores);
//
//     // 총알
//     socket.emit('bulletUpdate', players);
//
// //////    socket.broadcast.emit =  메시지를 보낸 사람을 제외한 모든 연결된 클라이언트에게 보냄
// // 새로운 플레이어를 모든 플레이어들에게 업데이트 (보낸 사람 제외)
// //     socket.broadcast.emit('newPlayer', players[socket.id]);
//
// //////    socket.on = 이벤트 리스너, 클라이언트에서 호출하여 서버에서 실행할 수 있음
// // 플레이어 쪽에서 emit 출발 --> 플레이어가 연결을 끊으면 플레이어를 제거
//     socket.on('disconnect', function () {
//         console.log('user disconnected');
//         // 플레이어 개체에서 이 플레이어를 제거
//         delete players[socket.id];
//         // 모든 플레이어에게이 이 플레이어를 제거하라는 메시지를 보냄
//         io.emit('disconnect', socket.id);
//     });
//
//     // 플레이어가 움직일 때, 플레이어 움직임을 갱신
//     socket.on('playerMovement', function (movementData) {
//         players[socket.id].x = movementData.x;
//         players[socket.id].y = movementData.y;
//         players[socket.id].rotation = movementData.rotation;
//         players[socket.id].bullet = movementData.b;
//         // 이동 한 플레이어의 움직임을 모든 플레이어에게 보냄 (보낸 사람 제외)
//         socket.broadcast.emit('playerMoved', players[socket.id]);
//     });
//
//     // 플레이어가 총을 쏠 때, 총알의 움직임을 갱신
//     socket.on('bulletFire', function (movementData) {
//         players[socket.id].x = movementData.x;
//         players[socket.id].y = movementData.y;
//         players[socket.id].rotation = movementData.rotation;
//         players[socket.id].bullet = movementData.b;
//         // 총을 쏜 플레이어의 움직임을 모든 플레이어에게 보냄 (보낸 사람 제외)
//         socket.broadcast.emit('bulletMoved', players[socket.id]);
//     });
//
//     // HIT 맞았다
//     socket.on('hitPlayer', function () {
//         console.log("내가 맞았다");
//         if (players[socket.id].team === 'red') {
//             scores.red -= 10;
//         } else {
//             scores.blue -= 10;
//         }
//         io.emit('destroyBullet', players[socket.id]);
//         io.emit('scoreUpdate', scores);
//     });
//
//     // 별 획득 점수 표시
//     socket.on('starCollected', function () {
//         if (players[socket.id].team === 'red') {
//             scores.red += 10;
//         } else {
//             scores.blue += 10;
//         }
//         star.x = Math.floor(Math.random() * 700) + 50;
//         star.y = Math.floor(Math.random() * 500) + 50;
//         io.emit('starLocation', star);
//         io.emit('scoreUpdate', scores);
//     });
//
//     // 총알 상자 획득 총알 표시
//     socket.on('bulletBoxCollected', function () {
//         players[socket.id].bullet += 5;
//         if (players[socket.id].team === 'red') {
//             scores.red += 5;
//         } else {
//             scores.blue += 5;
//         }
//         bulletBox.x = Math.floor(Math.random() * 700) + 50;
//         bulletBox.y = Math.floor(Math.random() * 500) + 50;
//         io.emit('bulletBoxLocation', bulletBox);
//         io.emit('scoreUpdate', scores);
//         socket.emit('bulletUpdate', players);
//     });
// });
//
// server.listen(8082, function () {
//     console.log(`Listening on ${server.address().port}`);
// });

// server.js ----- sql연결 전