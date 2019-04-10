const mysql = require('mysql');
var express = require('express');
var path = require('path');
var app = express();
const bodyParser = require('body-parser');

const STATICPATH = path.join(__dirname, "/public");

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

var mysqlConnection = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: 'sql',
    database: 'test',
    multipleStatements: true
});

// mysqlConnection.connect((err) => {
//     if (!err) {
//         console.log('DB connection success.');
//     } else {
//         console.log('DB connection failed \n Error : ' + JSON.stringify(err, undefined, 2));
//     }
// });

// setInterval(function () {
//    mysqlConnection.query("SELECT 1");
// }, 5000);
// 데이터 베이스 불러오기
// app.get('/', (req, res)=>{
//     mysqlConnection.query('SELECT * FROM member', (err, rows, fields)=>{
//         if (!err) {
//             // res.send(rows);
//         } else {
//             console.log(err);
//         }
//     });
// });
//

var server = require('http').Server(app);
const io = require('socket.io').listen(server);

var players = {};

var star = {
    x: Math.floor(Math.random() * 700) + 50,
    y: Math.floor(Math.random() * 500) + 50
};
var bulletBox = {
    x: Math.floor(Math.random() * 700) + 50,
    y: Math.floor(Math.random() * 500) + 50
};
var scores = {
    blue: 0,
    red: 0
};

//app.use(express.static(__dirname + '/public/index.html'));
app.use("/public", express.static(STATICPATH));
app.use("/js", express.static(__dirname + '/js'));

app.post('/', function (req, res) {
    // console.log("userID :", req.body.userID);
    console.log("userID :", req.body);
    // console.log("userID :", req.body.name);
    // console.log("userID :", req.body.value);
    console.log("userID :", req.body.id);
    userID = req.body.id;

    res.sendFile(STATICPATH + '/index.html');
});
// app.get('/', function (req, res) {
//     res.sendFile(__dirname + '/index.html');
// });

let choiceTeam = 0;
let resultTeam;
let count = 3;
let gameCount = 30;
let teamCountRed = 0;
let teamCountBlue = 0;
let resetScore = 0;
// let countThree;
// 클라이언트 초기 연결
io.on('connection', function (socket) {
    console.log('a user connected');
    // 새 플레이어를 만들고 추가하십시오.
    players[socket.id] = {
        rotation: 0,
        x: Math.floor(Math.random() * 700) + 50,
        y: Math.floor(Math.random() * 500) + 50,
        playerName: userID,
        playerId: socket.id,
        bullet: 10,
        team: ''
        // team: (Math.floor(Math.random() * 2) == 0) ? 'red' : 'blue'
    };
    console.log("플레이어 길이: " + choiceTeam);

    socket.emit('myName', userID);

    socket.on('countTeam', function () {
        socket.emit('whatTeam', {
            teamCountRed: teamCountRed,
            teamCountBlue: teamCountBlue
        });
    });

    // socket.on('pickTeam', function (team) {
    //     console.log("다른 플레이들에게 보냄(팀선택): "+team);
    //     socket.broadcast.emit('whatTeam', team);
    // });

    socket.on('myTeam', function (team) {
        console.log("2이면 BLUE / 3이면 RED --> " + team);
        if (team === 3) {
            players[socket.id].team = 'red';
            socket.broadcast.emit('newPlayer', players[socket.id]);
            choiceTeam += team;
            console.log("접속한 플레이어의 수 ( 10이면 OK ) --> " + choiceTeam);
            resultTeam = choiceTeam;
            teamCountRed++;
        } else {
            players[socket.id].team = 'blue';
            socket.broadcast.emit('newPlayer', players[socket.id]);
            choiceTeam += team;
            console.log("접속한 플레이어의 수 ( 10이면 OK ) --> " + choiceTeam);
            resultTeam = choiceTeam;
            teamCountBlue++;
        }
        console.log("이게 10, 20 되어야 게임이 시작해: ", choiceTeam);

        if (choiceTeam === 10 || choiceTeam === 20) {
            console.log("10,20 조건문 들어왔다");
            let countThree = setInterval(function () {
                io.emit('countThree', count);
                count--;
                console.log("setInterval 무슨 문제?: ", count);
                if (count === -2) {
                    clearInterval(countThree);
                    count = 3;
                    console.log('카운트' + count);
                    let gameStart = setInterval(function () {
                        io.emit('gameStart', gameCount);
                        gameCount--;
                        console.log('게임 카운트' + gameCount);
                        if (gameCount === -1) {
                            clearInterval(gameStart);
                            gameCount = 30;
                        }
                    }, 1000);
                }
            }, 1500);
        }
        console.log("teamCountred = " + teamCountRed);
        console.log("teamCountBLUE = " + teamCountBlue);
        if (teamCountRed === 2 && teamCountBlue === 2) {
            console.log("원하는 조건문 안으로 들어옴 스코어 초기화: ", scores.red, scores.blue);
            scores.blue = 0;
            scores.red = 0;
            teamCountBlue = 0;
            teamCountRed = 0;
            resetScore = 1;
        }
    });

    socket.on('countDown', function () {
        socket.emit('gameStart');
    });

    socket.on('resetTeamCount', function () {
        teamCountBlue = 0;
        teamCountRed = 0;
    });

    ////////////////////   socket.emit = 연결된 모든 플레이어에게 보낸다   ///////////////////////////

    if (resetScore === 1) {
        scores.blue = 0;
        scores.red = 0;
        socket.emit('scoreUpdate', scores);
    }

    // 새로운 플레이어에게 플레이어 객체 보내기
    socket.emit('currentPlayers', players);
    // 플레이어에게 별 아이템 개체를 보내기
    socket.emit('starLocation', star);
    // 플레이어에게 총알 아이템 개체를 보내기
    socket.emit('bulletBoxLocation', bulletBox);
    // 현재 점수를 보내기
    socket.emit('scoreUpdate', scores);

    // 총알
    socket.emit('bulletUpdate', players);

//////    socket.broadcast.emit =  메시지를 보낸 사람을 제외한 모든 연결된 클라이언트에게 보냄
// 새로운 플레이어를 모든 플레이어들에게 업데이트 (보낸 사람 제외)
//     socket.broadcast.emit('newPlayer', players[socket.id]);

//////    socket.on = 이벤트 리스너, 클라이언트에서 호출하여 서버에서 실행할 수 있음
// 플레이어 쪽에서 emit 출발 --> 플레이어가 연결을 끊으면 플레이어를 제거
    socket.on('disconnect', function () {
        console.log('user disconnected');
        // 플레이어 개체에서 이 플레이어를 제거
        delete players[socket.id];
        // 모든 플레이어에게이 이 플레이어를 제거하라는 메시지를 보냄
        io.emit('disconnect', socket.id);
    });

    // 플레이어가 움직일 때, 플레이어 움직임을 갱신
    socket.on('playerMovement', function (movementData) {
        players[socket.id].x = movementData.x;
        players[socket.id].y = movementData.y;
        players[socket.id].rotation = movementData.rotation;
        players[socket.id].bullet = movementData.b;
        // 이동 한 플레이어의 움직임을 모든 플레이어에게 보냄 (보낸 사람 제외)
        socket.broadcast.emit('playerMoved', players[socket.id]);
    });

    // 플레이어가 총을 쏠 때, 총알의 움직임을 갱신
    socket.on('bulletFire', function (movementData) {
        players[socket.id].x = movementData.x;
        players[socket.id].y = movementData.y;
        players[socket.id].rotation = movementData.rotation;
        players[socket.id].bullet = movementData.b;
        // 총을 쏜 플레이어의 움직임을 모든 플레이어에게 보냄 (보낸 사람 제외)
        socket.broadcast.emit('bulletMoved', players[socket.id]);
    });

    // HIT 맞았다
    socket.on('hitPlayer', function () {
        console.log("내가 맞았다 팀 색깔: ", players[socket.id].team);
        if (players[socket.id].team === 'red') {
            if (scores.red - 10 < 0) {
                scores.red = 0;
            } else {
                scores.red -= 10;
            }
        } else {
            if (scores.blue - 10 < 0) {
                scores.blue = 0;
            } else {
                scores.blue -= 10;
            }
        }
        io.emit('destroyBullet', players[socket.id]);
        io.emit('scoreUpdate', scores);
    });

    // 별 획득 점수 표시
    socket.on('starCollected', function () {
        if (players[socket.id].team === 'red') {
            scores.red += 10;
        } else {
            scores.blue += 10;
        }

        star.x = Math.floor(Math.random() * 700) + 50;
        star.y = Math.floor(Math.random() * 500) + 50;

        // if (-50 <= players[socket.id].x - star.x <= 50 && -50 <= players[socket.id].y - star.y <= 50) {
        //     star.x = Math.floor(Math.random() * 700) + 50;
        //     star.y = Math.floor(Math.random() * 500) + 50;
        // }

        io.emit('starLocation', star);
        io.emit('scoreUpdate', scores);
    });

    // 총알 상자 획득 총알 표시
    socket.on('bulletBoxCollected', function () {
        players[socket.id].bullet += 5;
        if (players[socket.id].team === 'red') {
            scores.red += 5;
        } else {
            scores.blue += 5;
        }

        bulletBox.x = Math.floor(Math.random() * 700) + 50;
        bulletBox.y = Math.floor(Math.random() * 500) + 50;

        // if (-50 <= players[socket.id].x - bulletBox.x <= 50 && -50 <= players[socket.id].y - bulletBox.y <= 50) {
        //     bulletBox.x = Math.floor(Math.random() * 700) + 50;
        //     bulletBox.y = Math.floor(Math.random() * 500) + 50;
        // }

        io.emit('bulletBoxLocation', bulletBox);
        io.emit('scoreUpdate', scores);
        socket.emit('bulletUpdate', players);
    });

    // 게임 종료 후 기록 받기 + 나를 제외한 플레이어들에게 보내기
    socket.on('finishGame', function (data) {
        console.log("게임 종료 후 기록 받기");
        players[socket.id].playerName = data.playerName;
        players[socket.id].team = data.myTeam;
        players[socket.id].getStar = data.getStar;
        players[socket.id].getBulletBox = data.getBulletBox;
        players[socket.id].getHit = data.getHit;
        players[socket.id].getTeamShot = data.getTeamShot;
        players[socket.id].getEnemyShot = data.getEnemyShot;
        players[socket.id].getAllShot = data.getAllShot;
        // gameResult = data.getGameResult;
        // gamePoint = data.getPoint;

        const sql = "INSERT INTO playinfo(Idd, TeamColor, GameResult, GetStar, GetBullet, EnemyShot, TeamShot, Shooting, Shooted, GetPoint) VALUES ?";
        const values = [
            [data.playerName, data.myTeam, data.getGameResult, data.getStar, data.getBulletBox, data.getEnemyShot, data.getTeamShot, data.getAllShot, data.getHit, data.getPoint]
        ];
        mysqlConnection.query(sql, [values], function (err, result) {
            if (err) {
                console.log(err);
            } else {
                console.log(result);
            }
        });

        socket.broadcast.emit('playerGameInfo', players[socket.id]);
    });
});

server.listen(8082, function () {
    console.log(`Listening on ${server.address().port}`);
});