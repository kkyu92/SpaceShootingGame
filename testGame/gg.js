var config = {
    type: Phaser.AUTO,
    parent: 'phaser-example',
    width: 1200,
    height: 700,
    physics: {
        default: "arcade",
        arcade: {
            fps: 60,
            gravity: {y: 0}
        }
    },
    scene: {
        preload: preload,
        create: create,
        update: update
    }
};
// 부품
var parts;
// 총알
var bullets;
var lastFired = 0;
// 우주선
var sprite;
var redEnemy;
// 키보드
var cursors;
// 상태 창
var text;

var game = new Phaser.Game(config);

var Enemy = new Phaser.Class({

    Extends: Phaser.GameObjects.Image,

    initialize:

        function Enemy (scene)
        {
            Phaser.GameObjects.Image.call(this, scene, 0, 0, 'ufo');
            this.follower = { t: 0, vec: new Phaser.Math.Vector2() };
            this.health = 5;
            this.lastFired = 0;

        },
    EnemyMoveToSprite: function (enemy, sprite) {
        enemy.rotation = Phaser.Math.Angle.Between(enemy.x, enemy.y, sprite.x, sprite.y);
        enemy.follow = true;
        this.physics.velocityFromRotation(enemy.rotation, 50, enemy.body.acceleration);

    },
    update: function (time, delta)
    {
// if its time for the next enemy
        if (time > this.nextEnemy)
        {
            var enemy = enemies.get();
            if (enemy)
            {
                enemy.setActive(true);
                enemy.setVisible(true);

                // place the enemy at the start of the path
                enemy.startOnPath();

                this.nextEnemy = time + 2000;
            }
        }
    }

});

//////////////////////////////////////////////////////////////////////////////  총알
var Bullet = new Phaser.Class({

    Extends: Phaser.Physics.Arcade.Image,

    initialize:

        function Bullet(scene) {
            Phaser.Physics.Arcade.Image.call(this, scene, 0, 0, 'bullet');

            // this.setOrigin(0.5,0.5).setDisplaySize(20,20);
            this.setBlendMode(1);
            this.setDepth(1);

            this.speed = 200;
            this.lifespan = 1500;

            this._temp = new Phaser.Math.Vector2();
            // this.setSize(10, 10, true);
        },

    fire: function (ship) {
        // 총알 시간(생명)
        this.lifespan = 1500;
        this.setActive(true);
        this.setVisible(true);
        // this.setRotation(ship.rotation);
        this.setAngle(ship.body.rotation);
        this.setPosition(ship.x, ship.y);
        this.body.reset(ship.x, ship.y);

        var angle = Phaser.Math.DegToRad(ship.body.rotation);

        this.scene.physics.velocityFromRotation(angle, this.speed, this.body.velocity);

        // 총알 방향축에 대한 (속도)
        this.body.velocity.x *= 3;
        this.body.velocity.y *= 2;
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

// 이미지 설정?
function preload() {
    // 일반 총알
    this.load.image('bullet', 'img/bullet.png');
    // 총알 상자
    this.load.image('bulletBox', 'img/bullet.png');
    // 총알 상자
    this.load.image('healBox', 'img/heal.png');

    // 내 우주선
    this.load.image('ship', 'img/spaceship.png');
    // 상대방 우주선
    this.load.image('ufo', 'img/ufo.png');

    // 배경
    this.load.image('background', 'img/check4.png');
    // 별 배경
    this.load.image('parts', 'img/star.png');

    // 우주선 불꽃
    this.load.atlas('flares', 'assets/particles/flares.png', 'assets/particles/flares.json');

}

// 웹에 띄워준다
function create() {

    enemy = this.physics.add.group({
        classType: Enemy,
        maxSize: 60,
        runChildUpdate: true
    });

// 적 유닛
    for (var i = 0; i < 5; i++) {
        var x = Phaser.Math.Between(0, 300);
        var y = Phaser.Math.Between(0, 300);

        var start_enemy = this.add.image(x, y, 'ufo', Phaser.Math.RND.pick(frames));

        // box.setInteractive();
        start_enemy.setScale(Phaser.Math.FloatBetween(0.15, 0.15));
        start_enemy.setSize(50, 30);
        // enemies.setCollideWorldBounds(true);

        start_enemy.health = 5;
        start_enemy.lastFired = 0;
        enemy.add(start_enemy);

    }
    // enemy = this.physics.add.image(600, 600, 'ufo');
    // enemy.setOrigin(0.5, 0.5).setDisplaySize(50, 50).setCollideWorldBounds(true);
    // enemy.health = 5;
    // enemy.lastFired = 0;
    // 내 총알
    spriteBullets = this.physics.add.group({
        classType: Bullet,
        maxSize: 0,
        runChildUpdate: false
    });
    // 적 총알
    enemyBullets = this.physics.add.group({
        classType: Bullet,
        runChildUpdate: true
    });

    hp1 = this.add.image(-350, -250, 'target').setScrollFactor(0.5, 0.5);
    hp2 = this.add.image(-300, -250, 'target').setScrollFactor(0.5, 0.5);
    hp3 = this.add.image(-250, -250, 'target').setScrollFactor(0.5, 0.5);

    hp1.setOrigin(0.5, 0.5).setDisplaySize(50, 50);
    hp2.setOrigin(0.5, 0.5).setDisplaySize(50, 50);
    hp3.setOrigin(0.5, 0.5).setDisplaySize(50, 50);

    //speed = Phaser.Math.GetSpeed(300, 1);


// 랜덤 총알 상자
    bulletBox = this.physics.add.group();

    for (var i = 0; i < 5; i++) {
        var x = Phaser.Math.Between(0, 300);
        var y = Phaser.Math.Between(0, 300);

        var bullet_box = this.add.image(x, y, 'bulletBox', Phaser.Math.RND.pick(frames));

        // box.setInteractive();
        bullet_box.setScale(Phaser.Math.FloatBetween(0.2, 0.2));
        bullet_box.setSize(50, 30);
        // box.setScrollFactor(box.scaleX);
        // box.setDepth(box.scrollFactorX);
        // box.setAngle(Phaser.Math.Between(0, 0.01));
        // this.input.setDraggable(box);
        bulletBox.add(bullet_box);

    }

    // 랜덤 체력 상자
    healBox = this.physics.add.group();

    for (var i = 0; i < 5; i++) {
        var x = Phaser.Math.Between(0, 300);
        var y = Phaser.Math.Between(0, 300);

        var heal_box = this.add.image(x, y, 'healBox', Phaser.Math.RND.pick(frames));

        // box.setInteractive();
        heal_box.setScale(Phaser.Math.FloatBetween(0.15, 0.15));
        heal_box.setSize(50, 30);
        // box.setScrollFactor(box.scaleX);
        // box.setDepth(box.scrollFactorX);
        // box.setAngle(Phaser.Math.Between(0, 0.01));
        // this.input.setDraggable(box);
        healBox.add(heal_box);
    }
///////////////////////////////////////////////////////////////////////////////////////////  부품 띄우기
    // 테스트중!
    parts = this.add.group();
    //var frames = this.texture.get('parts').getFrameNames();
    for (var i = 0; i < 70; i++) {
        var x = Phaser.Math.Between(0, 1920 * 2);
        var y = Phaser.Math.Between(0, 1080 * 2);

        var image = this.add.image(x, y, 'parts', Phaser.Math.RND.pick(frames));
        image.setInteractive();
        image.setScale(Phaser.Math.FloatBetween(0.05, 0.4));
        image.setScrollFactor(image.scaleX);
        image.setDepth(image.scrollFactorX);
        image.setAngle(Phaser.Math.Between(0, 0.05));
        this.input.setDraggable(image);
        parts.add(image);
    }
//////////////////////////////////////////////////////////////////////////////////////////////  부품에 마우스 올리기, 드레그
    this.input.on('gameobjectover', function (pointer, gameObject) {
        console.log(pointer.camera.name);
        gameObject.setTint('0xff0000');
    });
    this.input.on('gameobjectout', function (pointer, gameObject) {
        gameObject.clearTint();
    });
    this.input.on('dragstart', function (pointer, gameObject) {
        gameObject.setTint(0xff0000);
    });
    this.input.on('drag', function (pointer, gameObject, dragX, dragY) {
        gameObject.x = dragX;
        gameObject.y = dragY;
    });
    this.input.on('dragend', function (pointer, gameObject) {
        gameObject.clearTint();
    });
//////////////////////////////////////////////////////////////////////////////////////////  카메라 설정
    this.cameras.main.setBounds(0, 0, 1920 * 2, 1080 * 2);
    this.physics.world.setBounds(0, 0, 1920 * 2, 1080 * 2);

    //////////////////////////////////////////////////////////////////////////////////////////// 배경설정
    //  Mash 4 images together to create our background
    // this.add.image(0, 0, 'background').setOrigin(0).setDisplaySize(300,300);
    // this.add.image(1920, 0, 'background').setOrigin(0).setFlipX(true);
    // this.add.image(0, 1080, 'background').setOrigin(0).setFlipY(true);
    // this.add.image(1920, 1080, 'background').setOrigin(0).setFlipX(true).setFlipY(true);

    // 내 우주선 설정
    sprite = this.physics.add.image(300, 300, 'ship');
    sprite.setOrigin(0.5, 0.5).setDisplaySize(30, 30);
    sprite.setDamping(true);
    sprite.setDrag(0.99);
    sprite.setMaxVelocity(200);
    sprite.setBounce(0.5);

    sprite.setCollideWorldBounds(true);
    this.cameras.main.startFollow(sprite, true, 0.02, 0.02);
//
    sprite.health = 10;
//

////////////////////////////////////////////////////////////////////////////////////////////  키보드 설정

    cursors = this.input.keyboard.createCursorKeys();
    spacebar = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
    A = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A);
    D = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);
    W = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W);
    S = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S);
    // camera control
    F = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.F);
    R = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.R);

    // 속도 텍스트
    text = this.add.text(10, 10, '', {font: '16px Courier', fill: '#00ff00'}).setScrollFactor(0);
    //키 설정
    var controlConfig = {
        camera: this.cameras.main.setBounds(0, 0, 1920 * 2, 1080 * 2),
        left: cursors.left,
        right: cursors.right,
        up: cursors.up,
        down: cursors.down,
        acceleration: 0.04,
        drag: 0.0005,
        maxSpeed: 0.5
    };

    controls = new Phaser.Cameras.Controls.SmoothedKeyControl(controlConfig);

}

// 총알상자 겟 !!
function HitBulletBox(sprite, bulletBox) {
    if (sprite.active === true && bulletBox.active === true) {
        spriteBullets.maxSize += 10;
        console.log("myBullet: ", spriteBullets.maxSize);

        bulletBox.setActive(false).setVisible(false);
        bulletBox.destroy();

    }
}

// 체력상자 겟 !!
function HitHealBox(sprite, healBox) {
    if (sprite.active === true && healBox.active === true) {
        sprite.health += 3;
        console.log("my health: ", sprite.health);

        healBox.setActive(false).setVisible(false);
        healBox.destroy();

    }
}

// 상대가 때린다 나를
function enemyHitCallback(enemyHit, bulletHit) {
    // Reduce health of enemy
    if (bulletHit.active === true && enemyHit.active === true) {
        enemyHit.health = enemyHit.health - 1;
        console.log("Enemy hp: ", enemyHit.health);

        // Kill enemy if health <= 0
        if (enemyHit.health <= 0) {
            enemyHit.setActive(false).setVisible(false);
            enemyHit.destroy();
        }

        // Destroy bullet
        bulletHit.setActive(false).setVisible(false);
    }
}

// 내가 떄린다
function playerHitCallback(playerHit, bulletHit) {
    // Reduce health of player
    if (bulletHit.active === true && playerHit.active === true) {
        playerHit.health = playerHit.health - 1;
        console.log("Player hp: ", playerHit.health);

        // Kill hp sprites and kill player if health <= 0
        if (playerHit.health === 2) {
            hp3.destroy();
        }
        else if (playerHit.health === 1) {
            hp2.destroy();
        }
        else {
            hp1.destroy();
            // Game over state should execute here
        }

        // Destroy bullet
        bulletHit.setActive(false).setVisible(false);
    }
}

function enemyFire(enemy, sprite, time, gameObject) {
    if (enemy.active === false) {
        return;
    }

    if ((time - enemy.lastFired) > 1000) {
        enemy.lastFired = time;

        // Get bullet from bullets group
        var bullet = enemyBullets.get().setActive(true).setVisible(true).setDisplaySize(20, 10);
        if (bullet) {
            bullet.fire(enemy, sprite);
            // Add collider between bullet and player
            gameObject.physics.add.collider(sprite, bullet, playerHitCallback);
        }
    }
}

// Ensures sprite speed doesnt exceed maxVelocity while update is called
function constrainVelocity(sprite, maxVelocity) {
    if (!sprite || !sprite.body)
        return;

    var angle, currVelocitySqr, vx, vy;
    vx = sprite.body.velocity.x;
    vy = sprite.body.velocity.y;
    currVelocitySqr = vx * vx + vy * vy;

    if (currVelocitySqr > maxVelocity * maxVelocity) {
        angle = Math.atan2(vy, vx);
        vx = Math.cos(angle) * maxVelocity;
        vy = Math.sin(angle) * maxVelocity;
        sprite.body.velocity.x = vx;
        sprite.body.velocity.y = vy;
    }
}


function update(time, delta) {
    controls.update(delta);
    // enemy.EnemyMoveToSprite(enemy.getChildren(), sprite);
    Phaser.Actions.Rotate(parts.getChildren(), 0.01);
    Phaser.Actions.Rotate(bulletBox.getChildren(), 0.01);
    Phaser.Actions.Rotate(healBox.getChildren(), 0.01);

//////////////////////////////////////////////////////////////////////////////////////////////  우주선 조종키
    if (W.isDown) {
        this.physics.velocityFromRotation(sprite.rotation, 400, sprite.body.acceleration);
    }
    else {
        sprite.setAcceleration(0);
    }

    if (A.isDown) {
        sprite.setAngularVelocity(-200);
    }
    else if (D.isDown) {
        sprite.setAngularVelocity(200);
    }
    else {
        sprite.setAngularVelocity(0);
    }

    if (Phaser.Input.Keyboard.JustDown(spacebar) && time > lastFired) {
        // 나의 보유 총알
        var bullet_count = spriteBullets.getTotalFree();
        // 총알이 0 이면 발사 ㄴㄴ
        if (bullet_count != 0) {
            var bullet = spriteBullets.get().setDisplaySize(20, 10);
            if (bullet) {
                bullet.fire(sprite);
                this.physics.add.collider(enemy, bullet, enemyHitCallback);
                lastFired = time + 50;
            }
        }
    }
    // 총알 얻는다!
    this.physics.add.collider(sprite, bulletBox, HitBulletBox);
    // 체력 얻는다!
    this.physics.add.collider(sprite,healBox,HitHealBox);
    // Rotates enemy to face towards player
    enemy.rotation = Phaser.Math.Angle.Between(enemy.x, enemy.y, sprite.x, sprite.y);
    enemy.follow = true;
    console.log(enemy);
    // Constrain velocity of player
    constrainVelocity(sprite, 500);

    // Make enemy fire
    enemyFire(enemy, sprite, time, this);
    // 적 움직임 (내 쪽으로)
    if (enemy.health !== 0) {
        // this.physics.moveToObject(enemy, sprite, 50);
        this.physics.velocityFromRotation(enemy.rotation, 50);
    }
    // 충돌 판정 (몸체)
    this.physics.add.collider(enemy, sprite);
    //enemy.accelerateTo(Phaser.GameObjects.GameObject, sprite.x, sprite.y, 100, 100);

    // 남은 총알상자 카운트
    boxB = bulletBox.getTotalUsed();
    // 총알상자=0 젠
    if (boxB === 0) {
        for (var i = 0; i < 5; i++) {
            var x = Phaser.Math.Between(0, 300);
            var y = Phaser.Math.Between(0, 300);

            var box = this.add.image(x, y, 'bulletBox', Phaser.Math.RND.pick(frames));
            // box.setInteractive();
            box.setScale(Phaser.Math.FloatBetween(0.2, 0.2));
            box.setSize(50, 30);
            // box.setScrollFactor(box.scaleX);
            // box.setDepth(box.scrollFactorX);
            // box.setAngle(Phaser.Math.Between(0, 0.01));
            // this.input.setDraggable(box);
            bulletBox.add(box);
        }
    }

    // 남은 체력상자 카운트
    healB = healBox.getTotalUsed();
    // 총알상자=0 젠
    if (healB === 0) {
        for (var i = 0; i < 5; i++) {
            var x = Phaser.Math.Between(0, 300);
            var y = Phaser.Math.Between(0, 300);

            var heal_B = this.add.image(x, y, 'healBox', Phaser.Math.RND.pick(frames));
            // box.setInteractive();
            heal_B.setScale(Phaser.Math.FloatBetween(0.15, 0.15));
            heal_B.setSize(50, 30);
            // box.setScrollFactor(box.scaleX);
            // box.setDepth(box.scrollFactorX);
            // box.setAngle(Phaser.Math.Between(0, 0.01));
            // this.input.setDraggable(box);
            healBox.add(heal_B);
        }
    }
//////////////////////////////////////////////////////////////////////////////////////////////  속도, 좌표 텍스트 출력
    text.setText([
        'Speed: ' + sprite.body.speed,
        'world x: ' + sprite.body.x,
        'world y: ' + sprite.body.y,
        '',
        'player hp : ' + sprite.health,
        'Bullet: ' + spriteBullets.getTotalFree(),
        '',
        'enemy hp : ' + enemy.getChildren(0).health,

        // 'Used: ' + spriteBullets.getTotalUsed(),

    ]);

    // if (game.input.keyboard.isDown(Phaser.Keyboard.SPACEBAR))
    // {
    //     fireBullet();
    // }

    // 안보이는 맵 범위 (sprite, 숫자) - 클수록 넓다
    // this.physics.world.wrap(sprite, 60);


    // bullets.forEachExists(screenWrap, this);
}

function render() {
    bullets.debug();
}