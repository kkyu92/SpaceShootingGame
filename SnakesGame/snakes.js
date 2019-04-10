// 뱀뱀

//Game Loop - Init, Draw, Update

function init() {
    //console.log("Init");
    canvas = document.getElementById('mycanvas');
    minimap = document.getElementById('minicanvas');

    pen = canvas.getContext('2d');
    mini = minimap.getContext('2d');
    W = canvas.width;
    H = canvas.height;

    minimap.width = canvas.width / 5;
    minimap.height = canvas.height / 3;

    w = minimap.width;
    h = minimap.height;

    game_over = false;

    food = getRandomFood();

    score = 5;

    snake = {
        init_length: 5,
        color: "#ffc158",
        cells: [],
        direction: "right",

        createSnake: function () {
            for (var i = this.init_length - 1; i >= 0; i--) {
                this.cells.push({x: i, y: 0});
            }
        },
        drawSnake: function () {
            for (var i = 0; i < this.cells.length; i++) {
                pen.fillStyle = this.color;
                pen.strokeStyle = "black";
                pen.lineWidth = 2;

                pen.strokeRect(this.cells[i].x * 10, this.cells[i].y * 10, 10, 10);
                pen.fillRect(this.cells[i].x * 10, this.cells[i].y * 10, 10, 10);

                // if (this.cells[0].x === this.cells[i].x) {
                //     game_over = true;
                // }
                mini.fillStyle = this.color;
                mini.fillRect(this.cells[i].x, this.cells[i].y, 1, 1);
            }
        },
        updateSnake: function () {
            var headX = this.cells[0].x;
            var headY = this.cells[0].y;

            // 오른쪽으로 가기 ----->
            // 꼬리 삭제 + 머리 추가
            // nextHeadX = headX+1;
            // this.cells.pop();
            // this.cells.unshift({x:nextHeadX, y:headY});

            // 박스 충돌판정
            if (headX === food.x && headY === food.y) {
                // 색 입히기 (변경)
                snake.color = food.color;
                // 상자 추가
                food = getRandomFood();
                // 점수 추가
                score++;
            } else {
                this.cells.pop();
            }

            // 자기몸에 충돌판정
            for (var i = 1; i<this.cells.length; i++) {
                if (headX === this.cells[i].x && headY === this.cells[i].y) {
                    game_over = true;
                    alert("GameOver");
                }
            }

            // 방향 적용 (이동)!
            if (this.direction === "right") {
                nextX = headX + 1;
                nextY = headY;
            } else if (this.direction === "left") {
                nextX = headX - 1;
                nextY = headY;
            } else if (this.direction === "down") {
                nextX = headX;
                nextY = headY + 1;
            } else {
                nextX = headX;
                nextY = headY - 1;
            }
            // 머리에 추가
            this.cells.unshift({x: nextX, y: nextY});

            // 프레임 설정해 주기
            last_x = Math.round(W / 10);
            last_y = Math.round(H / 10);

            if (this.cells[0].y < 0 || this.cells[0].x < 0 /*|| this.cells[0].x > last_x || this.cells[0].y > last_y*/) {
                game_over = true;
                alert("GameOver");
            }
        }
    };
    snake.createSnake();

    // 키보드 입력
    function KeyPressed(e) {
        console.log("You pressed a key");
        console.log(e);

        // 방향키 설정
        if (e.key === "ArrowRight") {
            snake.direction = "right";
            monitor = "right";
        } else if (e.key === "ArrowLeft") {
            snake.direction = "left";
            monitor = "left";
        } else if (e.key === "ArrowDown") {
            snake.direction = "down";
            monitor = "down";
        } else if (e.key === "ArrowUp") {
            snake.direction = "up";
            monitor = "up";
        }
    }

    document.addEventListener('keydown', KeyPressed);
}

function draw() {
    // var i = 1;
    // if (monitor = "right") {
    //     pen.translate(10 * (i++), 0);
    // } else if (monitor = "left") {
    //     pen.translate(-10 * (i--), 0);
    // } else if (monitor = "up") {
    //     pen.translate(0, -10 * (i--));
    // } else if (monitor = "down") {
    //     pen.translate(0, 10 * (i++));
    // }

    pen.clearRect(0, 0, W, H);
    mini.clearRect(0, 0, w, h);
    snake.drawSnake();

    // 박스 생성
    pen.fillStyle = food.color;
    pen.fillRect(food.x * 10, food.y * 10, 10, 10);

    // 점수판
    pen.fillStyle = "white";
    pen.font = "10px";
    pen.fillText("Score : " + score, 10, 13);

    // 미니맵
    //mini.fillText("Mini Map");
    mini.fillStyle = food.color;
    mini.fillRect(food.x, food.y, 1, 1);
}

// 뱀 업데이트
function update() {
    snake.updateSnake();
}

// 변화를 주어야되는 곳
function gameLoop() {
    draw();
    update();

    // 게임오버
    if (game_over === true) {
        clearInterval(start);
    }
}

// 랜덤 박스 생성
function getRandomFood() {
    var foodX = Math.round(Math.random() * (W - 10) / 10);
    var foodY = Math.round(Math.random() * (H - 10) / 10);

    foodColors = ["red", "orange", "yellow", "coral", "orchid", "cornflowerblue", "green", "violet", "purple", "gray", "white", "aqua", "cadetblue", "crimson", "burlywood", "peru"];

    var i = Math.round(Math.random() * foodColors.length);

    var food = {
        x: foodX,
        y: foodY,
        color: foodColors[i]
    };
    return food;
}

init();

// 게임시작 초당 반복
var start = setInterval(gameLoop, 100);