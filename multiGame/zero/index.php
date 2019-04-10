<?php
session_start();
?>
<!DOCTYPE html>
<script>
    function chid() {

        document.getElementById("inputEmail2").value = 0;
        var email = document.getElementById("inputEmail").value;

        if (email === "") {
            alert("빈칸 안되요!");
        } else {
            ifrm1.location.href = "php/join_chk.php?userEmail=" + email;
        }
    }

</script
<html>
<head>
    <meta charset="utf-8">
    <title>Bootstrap</title>
    <meta name="description"
          content="This is a free Bootstrap landing page theme created for BootstrapZero. Feature video background and one page design."/>
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta name="generator" content="Codeply">
    <link rel="stylesheet" href="css/bootstrap.min.css"/>
    <link rel="stylesheet" href="css/animate.min.css"/>
    <link rel="stylesheet" href="css/ionicons.min.css"/>
    <link rel="stylesheet" href="css/styles.css"/>
</head>
<body>
<nav id="topNav" class="navbar navbar-default navbar-fixed-top">
    <div class="container-fluid">
        <div class="navbar-header">
            <a class="navbar-brand page-scroll" href="#first"><i class="ion-ios-analytics-outline"></i> Space Ship</a>
        </div>
        <div class="navbar-collapse collapse" id="bs-navbar">
            <ul class="nav navbar-nav">
                <li>
                    <a class="page-scroll" href="#first">Intro</a>
                </li>
                <li>
                    <a class="page-scroll" href="#one">게임설명</a>
                </li>
                <li>
                    <a class="page-scroll" href="#two">게임하기</a>
                </li>
                <li>
                    <a class="page-scroll" href="#four">전적확인</a>
                </li>
                <li>
                    <a class="page-scroll" href="#last">랭킹</a>
                </li>
            </ul>

            <?php
            $id = $_SESSION['id'];
            if (isset($_SESSION['id'])) {
                echo '<form action="php/logout.php" method="post">
                        <ul class="nav navbar-nav navbar-right">
                            <li>
                                <a class="page-scroll" data-toggle="modal" title="user">';
                echo $id;
                echo '</a>
                            </li>
                            <li>
                            <a>
                                <button class="btn btn-primary btn-sm" type="submit" name="submit" > 로그아웃</button>
                            </a>
                            </li>
                        </ul>
                    </form>';
            } else {
                echo '<ul class="nav navbar-nav navbar-right">
                <li>
                    <a class="page-scroll" data-toggle="modal" title="로그인" href="#login">로그인</a>
                </li>
                <li>
                    <a class="page-scroll" data-toggle="modal" title="회원가입" href="#signup">회원가입</a>
                </li>
            </ul>';
            }
            ?>
        </div>
    </div>
</nav>
<header id="first">
    <div class="header-content">
        <div class="inner">
            <h1 class="cursive">SpaceShip</h1>
            <h4>A free game page theme with space background</h4>
            <hr>
            <a href="#one" id="toggleVideo" data-toggle="collapse" class="btn btn-primary btn-xl page-scroll">게임설명</a>
            &nbsp;
            <a href="#two" class="btn btn-primary btn-xl page-scroll">게임시작</a>
        </div>
    </div>
</header>
<section class="bg-primary" id="one">

    <div class="container">
        <div class="row">
            <div class="col-lg-12 text-center">
                <h2 class="margin-top-0 text-primary">게임설명</h2>
                <hr class="primary">
                <br>
                <br>
                <div class="col-lg-4 col-sm-1" style="position: absolute; left: -100px">
                    <h3>이동키 :</h3>
                    <br>
                    <br>
                    <br>
                    <br>
                    <br>
                    <br>
                    <br>
                    <h3 style="position: absolute; left: 155px;">공격키 : 스페이스바</h3>
                </div>
                <div class="col-lg-1" style="position: absolute; left: 150px">
                    <img src="./assets/3333.png" class="img-responsive" alt="Image 1">
                    <img src="./assets/left_keyboard.png" class="img-responsive" alt="Image 1">
                </div>
                <div class="col-lg-1 col-sm-1" style="position: absolute; left: 220px">
                    <img src="./assets/up_keyboard.png" class="img-responsive" alt="Image 1">
                    <img src="./assets/down_keyboard.png" class="img-responsive" alt="Image 1">
                </div>
                <div class="col-lg-1 col-sm-1" style="position: absolute; left: 290px">
                    <img src="./assets/3333.png" class="img-responsive" alt="Image 1">
                    <img src="./assets/right_keyboard.png" class="img-responsive" alt="Image 1">
                </div>

                <div class="col-lg-7 col-sm-4 text-right" style="position: absolute; right: 10px">
                    <div class="col-lg-1" style="margin-top: 18px; position: absolute; right: 535px">
                        <img src="../public/img/spaceship.png" class="img-responsive" alt="Image 1">
                    </div>
                    <h3>30초 동안 더 높은 점수를 획득한 팀이 승리합니다.</h3>
                    <div class="col-lg-1" style="margin-top: 10px; position: absolute; right: 445px">
                        <img src="../public/img/star.png" class="img-responsive" alt="Image 1">
                    </div>
                    <h3>아이템을 획득한 팀은 10점이 증가합니다.</h3>
                    <div class="col-lg-1" style="margin-top: 10px; position: absolute; right: 410px">
                        <img src="../public/img/bullet.png" class="img-responsive" alt="Image 1">
                    </div>
                    <h3>아이템을 획득한 팀은 5점이 증가하고,</h3>
                    <h3>획득한 플레이어에게 총알 5개를 지급합니다.</h3>
                    <div class="col-lg-1" style="margin-top: 10px; position: absolute; right: 555px">
                        <img src="../public/img/ufo.png" class="img-responsive" alt="Image 1">
                    </div>
                    <h3>총알에 맞을 경우 해당 팀의 점수가 10점 감소합니다.</h3>
                    <div class="col-lg-1" style="margin-top: 10px; position: absolute; right: 595px">
                        <img src="../public/img/vs.png" class="img-responsive" alt="Image 1">
                    </div>
                    <h3>아이템을 획득하고 총알을 피해 높은 점수를 달성하세요!</h3>
                </div>
            </div>
        </div>
    </div>
</section>

<script>
    function sendingDATA(value) {
        var popUrl = "http://192.168.56.102:8082/"; // 노드서버 주소
        var popName = "GAME";
        var popOption = "width=800, height=590, resizable=no, scrollbars=no, status=no;";

        window.open(popUrl, popName, popOption);

        var form = document.createElement("form");      // form 엘리멘트 생성
        form.setAttribute("method", "post");             // method 속성 설정
        form.setAttribute("action", popUrl);       // action 속성 설정
        form.setAttribute("target", popName);       // action 속성 설정
        document.body.appendChild(form);                // 현재 페이지에 form 엘리멘트 추가

        var insert = document.createElement("input");   // input 엘리멘트 생성
        insert.setAttribute("type", "hidden");           // type 속성을 hidden으로 설정
        insert.setAttribute("name", "id");               // name 속성을 'stadium'으로 설정
        insert.setAttribute("value", value);             // value 속성을 삽입
        form.appendChild(insert);                       // form 엘리멘트에 input 엘리멘트 추가

        console.log(value);
        form.submit();

//window.open('http://10.211.55.14:8081?val='+value, popName, popOption);
    }
</script>

<?php
$id = $_SESSION['id'];
$name = $_SESSION['name'];
if (isset($_SESSION['id'])) { ?>
    <section id="two">
        <div class="container">
            <div class="row">
                <div class="col-lg-12 text-center">
                    <h2 class="margin-top-0 text-primary">게임하기</h2>
                    <hr class="primary">
                </div>
            </div>
        </div>
        <div class="container">
            <div class="row">
                <div class="col-lg-6 col-md-6 text-center">
                    <div class="feature">
                        <i class="icon-lg ion-android-laptop wow fadeIn" data-wow-delay=".3s"></i>
                        <h3>혼자하기</h3>
                        <p class="text-muted">싱글 게임</p>
                        <a href="http://192.168.56.102/GG/index.html" target="ext"
                           class="btn btn-default btn-lg wow flipInX">게임시작</a>
                    </div>
                </div>
                <div class="col-lg-6 col-md-6 text-center">
                    <div class="feature">
                        <i class="icon-lg ion-ios-star-outline wow fadeIn" data-wow-delay=".3s"></i>
                        <h3>함께하기</h3>

                        <!--                    <form action="http://192.168.56.102:8082/" method="post">-->
                        <input type="hidden" id="userID" name="userID" value="<?= $name ?>">
                        <p class="text-muted">팀 게임</p>
                        <button type="submit" class="btn btn-default btn-lg wow flipInX"
                                onclick=sendingDATA("<?= $name ?>")>게임시작
                        </button>

                    </div>
                </div>
            </div>
        </div>

    </section>
    <?php
} else { ?>
    <section id="two">
        <div class="container">
            <div class="row">
                <div class="col-lg-12 text-center">
                    <h2 class="margin-top-0 text-primary">게임하기</h2>
                    <hr class="primary">
                </div>
            </div>
        </div>
        <div class="container">
            <div class="row">
                <div class="col-lg-6 col-md-6 text-center">
                    <div class="feature">
                        <i class="icon-lg ion-android-laptop wow fadeIn" data-wow-delay=".3s"></i>
                        <h3>혼자하기</h3>
                        <p class="text-muted">싱글 게임</p>
                        <a class="btn btn-default btn-lg wow flipInX page-scroll" data-toggle="modal" href="#login">로그인이
                            필요합니다.</a>
                    </div>
                </div>
                <div class="col-lg-6 col-md-6 text-center">
                    <div class="feature">
                        <i class="icon-lg ion-ios-star-outline wow fadeIn" data-wow-delay=".3s"></i>
                        <h3>함께하기</h3>
                        <p class="text-muted">팀 게임</p>
                        <a class="btn btn-default btn-lg wow flipInX page-scroll" data-toggle="modal" href="#login">로그인이
                            필요합니다.</a>
                    </div>
                </div>
            </div>
        </div>
    </section>
    <?php
}
?>

<section class="bg-primary container-fluid" id="four">
    <?php
    include "php/db_info.php";
    $query = "SELECT * from playinfo WHERE Idd='$name' order by idx desc LIMIT 5 ";

    $result = mysqli_query($conn, $query);
    //    $row = mysqli_fetch_row($result);
    $count = mysqli_num_rows($result);
    ?>
    <style>
        th {
            padding: 10px;
            font-size: 22px;
        }

        td {
            padding-top: 10px;
            padding-bottom: 10px;
        }
    </style>

    <script>
        var page = 1;

        function moreList(pagee) {
            page++;
            var nowPage = pagee;
            var count = <?=$count?>;
            var name = "<?=$name?>";
            var allPage = Math.ceil(count / 5);
            var limit = (page - 1) * 5;
            var insert = [];
            var a = 0;
            $.ajax({
                url: 'php/page.php',
                type: 'post',
                cache: false,
                dataType: 'json',
                data: {
                    name: name,
                    limit: limit
                },
                success: function (data) {
                    console.log(data);
                    //var getdata = JSON.parse(data);
                    // console.log(getdata);
                    //
                    for (var i = 0; i < data.length; i++) {
                        let DateTime = data[i].DateTime;
                        let TeamColor = data[i].TeamColor;
                        let GameResult = data[i].GameResult;
                        let GetStar = data[i].GetStar;
                        let GetBullet = data[i].GetBullet;
                        let EnemyShot = data[i].EnemyShot;
                        let TeamShot = data[i].TeamShot;
                        let Shooting = data[i].Shooting;
                        let Shooted = data[i].Shooted;
                        let GetPoint = data[i].GetPoint;

                        $('#here').append('<tr>');
                        $('#here').append('<td>' + DateTime + '</td>');

                        if (TeamColor == 2) {
                            $('#here').append('<td style="color: #0056ff">BLUE</td>');
                        } else {
                            $('#here').append('<td style="color: #ff0001">RED</td>');
                        }

                        if (GameResult == "승리") {
                            $('#here').append('<td style="color: #ffc158">승리</td>');
                        } else if (GameResult == "패배") {
                            $('#here').append('<td style="color: #8f8f8f">패배</td>');
                        } else {
                            $('#here').append('<td>무승부</td>');
                        }

                        $('#here').append('<td>' + GetStar + '</td><td>' + GetBullet + '</td><td>' + EnemyShot + '</td><td>' + TeamShot + '</td><td>' + Shooting + '</td><td>' + Shooted + '</td><td>' + GetPoint + '</td></tr>');
                    }
                    console.log(count);
                    console.log(allPage);
                    if (data.length == 0) {
                        alert("더 이상 전적이 없습니다.");
                        $('#morebtn').empty();
                    }
                }
                ,
                error: function (request, status, error) {
                    alert("code:" + request.status + "\n" + "message:" + request.responseText + "\n" + "error:" + error);
                }
            });
        }
    </script>

    <div class="container">
        <div class="row">
            <div class="col-lg-12 text-center media wow fadeInRight">
                <h2 class="margin-top-0 text-primary">나의 최근전적</h2>
                <hr class="primary">
            </div>
        </div>
    </div>
    <div class="container" style="margin-top: 40px;">
        <div class="col-lg-12 text-center media wow fadeInRightBig">
            <table border="1">
                <thead>
                <tr>
                    <th>플레이 시간</th>
                    <th>팀컬러</th>
                    <th>게임결과</th>
                    <th>별 획득</th>
                    <th>총알 획득</th>
                    <th>적 맞춤</th>
                    <th>팀 맞춤</th>
                    <th>쏜 총알</th>
                    <th>내가 맞음</th>
                    <th style='color: #ffc158'>획득 포인트</th>
                </tr>
                </thead>
                <tbody id="here">
                <?php
                date_default_timezone_set('Asia/Seoul');
                // 현재시간
                $now = strtotime("Now");

                while ($row = mysqli_fetch_array($result)) {
                    $gamePlay = strtotime($row['DateTime']);
                    // 시간차이
                    $diff = $now - $gamePlay;
                    $year = floor($diff / 31536000);
                    $days = floor($diff / 86400);
                    $date = ($days - (365 * $year));
                    $time = $diff - ($days * 86400);
                    $hour = floor($time / 3600);
                    $time = $time - ($hour * 3600);
                    $min = floor($time / 60);
                    $sec = $time - ($min * 60);
                    ?>
                    <tr>
                        <td><?php
                            if ($year == 0 && $date == 0 && $hour == 0 && $min == 0) {
                                echo "방금";
                            } else if ($year == 0 && $date == 0 && $hour == 0) {
                                echo $min . "분 전";
                            } else if ($year == 0 && $date == 0) {
                                echo $hour . "시간 " . $min . "분 전";
                            } else if ($year == 0) {
                                echo $date . "일 " . $hour . "시간 전";
                            } else {
                                echo $year . "년 " . $date . "일 전";
                            }
                            ?></td>
                        <?php
                        if ($row['TeamColor'] == 2) {
                            ?>
                            <td style='color: #0056ff'>BLUE</td>
                            <?php
                        } else {
                            ?>
                            <td style='color: #ff0001'>RED</td>
                            <?php
                        }

                        if ($row['GameResult'] == '승리') {
                            ?>
                            <td style='color: #ffc158'>승리</td>
                            <?php
                        } else if ($row['GameResult'] == '패배') {
                            ?>
                            <td style='color: #8f8f8f'>패배</td>
                            <?php
                        } else {
                            ?>
                            <td>무승부</td>
                            <?php
                        }
                        ?>
                        <td><?= $row['GetStar'] ?></td>
                        <td><?= $row['GetBullet'] ?></td>
                        <td><?= $row['EnemyShot'] ?></td>
                        <td><?= $row['TeamShot'] ?></td>
                        <td><?= $row['Shooting'] ?></td>
                        <td><?= $row['Shooted'] ?></td>
                        <td><?= $row['GetPoint'] ?></td>
                    </tr>
                    <?php
                }
                ?>
                </tbody>
            </table>
            <?php
            $id = $_SESSION['id'];
            $name = $_SESSION['name'];
            if (isset($_SESSION['id'])) { ?>
                <div id="btnbtn">
                    <a id="morebtn" href="javascript:moreList(page);" class="btn btn-default btn-lg wow flipInX"
                       style="margin-top: 60px">더보기</a>
                </div>
                <?php
            } else {
                ?>
                <a href="#login" class="btn btn-default btn-lg wow flipInX page-scroll" data-toggle="modal"
                   style="margin-top: 60px">로그인이 필요합니다.</a>
                <?php
            }
            ?>
        </div>
    </div>
</section>

<section id="last" class="bg-dark">
    <?php
    include "php/db_info.php";
    // 게임 포인트
    $query = "SELECT Idd, SUM(GetPoint), AVG(GetPoint) FROM playinfo GROUP BY Idd ORDER BY SUM(GetPoint) DESC LIMIT 3";
    $result = mysqli_query($conn, $query);
    // 아이템 획득
    $query1 = "SELECT Idd, SUM(GetStar), AVG(GetStar), SUM(GetBullet), AVG(GetBullet) FROM playinfo GROUP BY Idd ORDER BY SUM(GetStar)+SUM(GetBullet) DESC LIMIT 3";
    $result1 = mysqli_query($conn, $query1);
    // 적을 맞춘 횟수
    $query2 = "SELECT Idd, SUM(EnemyShot), AVG(EnemyShot), SUM(Shooting), AVG(Shooting) FROM playinfo GROUP BY Idd ORDER BY SUM(EnemyShot) DESC LIMIT 3";
    $result2 = mysqli_query($conn, $query2);
    // 팀을 맞춘 횟수
    $query3 = "SELECT Idd, SUM(TeamShot), AVG(TeamShot), SUM(Shooting), AVG(Shooting) FROM playinfo GROUP BY Idd ORDER BY SUM(TeamShot) DESC LIMIT 3";
    $result3 = mysqli_query($conn, $query3);
    // 게임 횟수


    //    $row = mysqli_fetch_row($result);
    $count = mysqli_num_rows($result);
    ?>
    <div class="container text-center">
        <div class="call-to-action">
            <h2 class="text-primary">랭킹</h2>
            <hr class="primary">
            <hr class="primary">

            <div class="media-left wow fadeInRight">
                <i class="icon-lg ion-ios-game-controller-b media-body media-left text-left">게임포인트</i>
                <div class="media-body media-right">
                    <table border="5">
                        <thead>
                        <tr>
                            <th>순위</th>
                            <th>아이디</th>
                            <th style='color: #ffc158'>획득 포인트</th>
                            <th>평균 획득 포인트</th>
                        </tr>
                        </thead>
                        <tbody>
                        <?php
                        $rank = 1;
                        while ($row = mysqli_fetch_array($result)) {
                            ?>
                            <tr>
                                <td style="font-size: 20px"><?= $rank ?></td>
                                <td style="font-size: 20px"><?= $row['Idd'] ?></td>
                                <td style="font-size: 20px"><?= $row['SUM(GetPoint)'] ?> 점</td>
                                <td style="font-size: 20px"><?= round($row['AVG(GetPoint)'], 2) ?> 점</td>
                            </tr>
                            <?php
                            $rank++;
                        }
                        ?>
                        </tbody>
                    </table>
                </div>
            </div>

            <hr>
            <hr>

            <div class="media-right wow fadeIn">
                <div class="media-body media-right">
                    <table border="5">
                        <thead>
                        <tr>
                            <th>순위</th>
                            <th>아이디</th>
                            <th style='color: #ffc158'>총 획득 아이템 수</th>
                            <th>평균 획득 아이템 수</th>
                        </tr>
                        </thead>
                        <tbody>
                        <?php
                        $rank = 1;
                        while ($row1 = mysqli_fetch_array($result1)) {
                            ?>
                            <tr>
                                <td style="font-size: 20px"><?= $rank ?></td>
                                <td style="font-size: 20px"><?= $row1['Idd'] ?></td>
                                <td style="font-size: 20px"><?= $row1['SUM(GetStar)'] + $row1['SUM(GetBullet)'] ?>개
                                </td>
                                <td style="font-size: 20px"><?= round($row1['AVG(GetStar)'] + $row1['AVG(GetBullet)'], 2) ?>
                                    개
                                </td>
                            </tr>
                            <?php
                            $rank++;
                        }
                        ?>
                        </tbody>
                    </table>
                </div>
                <i class="icon-lg ion-ios-flask-outline media-body media-left text-left">아이템 획득</i>
            </div>

            <hr>
            <hr>

            <div class="media-left wow fadeInRight">
                <i class="icon-lg ion-ios-shuffle media-body media-left text-left">명사수</i>
                <div class="media-body media-right">
                    <table border="5">
                        <thead>
                        <tr>
                            <th>순위</th>
                            <th>아이디</th>
                            <th style='color: #ffc158'>맞춘 횟수</th>
                            <th>정확도 (맞춘 횟수 / 총 발사 횟수)</th>
                        </tr>
                        </thead>
                        <tbody>
                        <?php
                        $rank = 1;
                        while ($row2 = mysqli_fetch_array($result2)) {
                            ?>
                            <tr>
                                <td style="font-size: 20px"><?= $rank ?></td>
                                <td style="font-size: 20px"><?= $row2['Idd'] ?></td>
                                <td style="font-size: 20px"><?= $row2['SUM(EnemyShot)'] ?> 회</td>
                                <td style="font-size: 20px"><?= round($row2['SUM(EnemyShot)'] / $row2['SUM(Shooting)'] * 100, 2) ?>
                                    %
                                </td>
                            </tr>
                            <?php
                            $rank++;
                        }
                        ?>
                        </tbody>
                    </table>
                </div>
            </div>

            <hr>
            <hr>

            <div class="media-right wow fadeIn">
                <div class="media-right media-body">
                    <table border="5">
                        <thead>
                        <tr>
                            <th>순위</th>
                            <th>아이디</th>
                            <th style='color: #ffc158'>팀 맞춘 횟수</th>
                        </tr>
                        </thead>
                        <tbody>
                        <?php
                        $rank = 1;
                        while ($row3 = mysqli_fetch_array($result3)) {
                            ?>
                            <tr>
                                <td style="font-size: 20px"><?= $rank ?></td>
                                <td style="font-size: 20px"><?= $row3['Idd'] ?></td>
                                <td style="font-size: 20px"><?= $row3['SUM(TeamShot)'] ?></td>
                            </tr>
                            <?php
                            $rank++;
                        }
                        ?>
                        </tbody>
                    </table>
                </div>
                <!--        ion-ios-rainy-outline        ion-ios-shuffle-strong  ion-ios-eye   ion-ios-ionic-outline   ion-ios-pulse-->
                <i class="icon-lg ion-ios-rainy-outline media-body media-left text-left">팀킬</i>
            </div>
            <hr>
            <hr>
        </div>
    </div>
</section>


<!--<!--겔러리 이미지 확대 상세보기-->
<div id="galleryModal" class="modal fade" tabindex="-1" role="dialog" aria-hidden="true">
    <div class="modal-dialog modal-lg">
        <div class="modal-content">
            <div class="modal-body">
                <img src="" id="galleryImage" class="img-responsive"/>
                <p>
                    <br/>
                    <button class="btn btn-primary btn-lg center-block" data-dismiss="modal" aria-hidden="true">Close <i
                                class="ion-android-close"></i></button>
                </p>
            </div>
        </div>
    </div>
</div>


<!--로그인 회원가입 로그아웃-->
<div id="login" class="modal fade" tabindex="-1" role="dialog" aria-hidden="true">
    <div class="modal-dialog" style="width: 400px">
        <div class="modal-content">
            <div class="modal-body">
                <h2 class="text-center" style="margin-bottom: 20px">로그인</h2>
                <h5 class="text-center">

                </h5>
                <form name=frm1 action="php/login_ok.php" method=post>
                    <p class="text-primary">
                        이메일
                        <label for="loginEmail" class="sr-only">이메일</label>
                        <input type="text" id="loginEmail" name="loginEmail" class="form-control"
                               placeholder="Email" required
                               autofocus>
                    </p>

                    <p class="text-primary">
                        비밀번호
                        <label for="inputPassword" class="sr-only">비밀번호</label>
                        <input type="password" id="loginPassword" name="loginPassword" class="form-control"
                               placeholder="Password" required>
                    </p>

                    <button class="btn btn-lg btn-primary btn-block" type="submit" value="submit">
                        Log in
                    </button>
                </form>

            </div>
        </div>
    </div>
</div>

<iframe src="" id="ifrm1" scrolling="no" frameborder="no" width="0" name="ifrm1"></iframe>
<div id="signup" class="modal fade" tabindex="-1" role="dialog" aria-hidden="true">
    <div class="modal-dialog" style="width: 400px">
        <div class="modal-content">
            <div class="modal-body">
                <h2 class="text-center" style="margin-bottom: 20px">회원가입</h2>
                <h5 class="text-center">
                    정보를 입력해 주세요.
                </h5>

                <form action="php/join_ok.php" method="post">

                    <p class="text-primary">
                        이메일
                        <label for="inputEmail" class="sr-only">아이디</label>
                        <input type="email" id="inputEmail" name="inputEmail" class="form-control"
                               placeholder="Email" style="width: 300px" required
                               autofocus>
                        <button class="btn btn-primary btn-sm" onclick="chid()"
                                style="position: absolute; right: 10px; top: 145px"
                                type="button"> 중복검사
                        </button>
                        <input type=hidden id="inputEmail2" name=inputEmail2 value="0">
                        <!--                        <input class="btn btn-primary btn-lg" style="position: absolute" type="submit" value="submit"> OK</input>-->
                    </p>

                    <p class="text-primary">
                        닉네임
                        <label for="inputNickname" class="sr-only">ID</label>
                        <input type="text" id="inputNickname" name="inputNickname" class="form-control"
                               placeholder="Nickname" required
                               autofocus>
                    </p>

                    <p class="text-primary">
                        비밀번호
                        <label for="inputPassword" class="sr-only">비밀번호</label>
                        <input type="password" id="inputPassword" name="inputPassword" class="form-control"
                               placeholder="Password" required>
                    </p>

                    <p>
                        <label for="inputPassword2" class="sr-only">비밀번호 확인</label>
                        <input type="password" id="inputPassword2" name="inputPassword2" class="form-control"
                               placeholder="Password 확인" required>
                    </p>

                    <p class="text-primary">
                        이용약관
                        <textarea readonly="true" cols="44" rows="5" name="intro" class="form-control" placeholder="1. Collected Personal Information
Users who have not subscribed to NAVER can still enjoy the same level of services provided to NAVER subscribers, such as searching for information or viewing the news. However, if the user subscribes to NAVER to use personalized or subscription-based services, including email, calendar, café or blog services, a minimum amount of personal information, which is necessary for service use, will be collected by NAVER.

The following personal information is collected when users subscribe to NAVER.
- Users’ ‘ID, password, name, date of birth, gender, mobile phone number used to verify subscription’ is mandatory information that is collected when the user subscribes to NAVER. If the date of birth provided by the user shows that the user is a minor under the age of 14, information on the user’s legal representative(name, date of birth, gender, duplication information and phone number) is also collected. The user can decide whether to allow NAVER to collect their email address.
- If subscription is made with an organization's ID, organization ID, password, organization's official name, email address, mobile phone number used for subscription verification are mandatory information collected. Name of the representative, member name(s) to issue password(s) and email address(es) can be collected additionally based on user(s)'s choice.
The following personal information is collected while users use the service.
Additional personal information may be collected from users of specific NAVER services while the user uses the service, participates in an event or applies for a prize. If additional personal information is collected, the user is provided with guidelines on the ‘collected personal information, the purpose of collecting and using personal information, and the personal information storage period’ and is asked whether the user agrees to the collection and use of the information.

The IP address, cookies, service usage records, device information, and location information can be generated and collected during service use.
In other words, 1) the information communications service provider may automatically generate information about the user while the user uses the service and save (collect) the information,
or 2) the information is collected after information that is unique to the user’s device is safely converted so that the original value is unidentifiable.
Details on the collection and storing of location information when using NAVER’s location-based services are regulated on “NAVER Location Information User Agreement”.

2. Use of the Collected Personal Information
NAVER uses personal information only for purposes described below, which includes managing subscribers, developing, providing and improving services of NAVER and NAVER- related services (including mobile web/app), and creating a safe internet user environment.
- Personal information is used to confirm user’s intent to subscribe to NAVER, verify the user’s age and consent from the user’s legal representative verify the identity of the user and legal representative, identify the user, confirm the user’s intent to unsubscribe from NAVER, and for other subscriber management purposes.
- Personal information is used to provide existing services, including contents and advertisement, and also used to analyze demographic data, service visitations and use records, create relationships between users based on users’ personal information and areas of interest, provide customized services based on information on friends and areas of interest, and discover other elements that can be used to develop new services and/or improve existing services.
- Personal information is used to restrict users who have violated laws, regulations and NAVER’s User Agreement from using the service, prevent and restrict actions that interfere with seamless service operation, including any delinquent actions, prevent account fraud and illegal transactions, deliver notices on agreement updates, store records on dispute mediation, handle civil petitions and for other user protection and service operation purposes.
- Personal information is used to verify the user’s identity when providing premium services, make purchases and payments and to deliver product and services.
- Personal information is used to provide information on events and provide opportunities to participate, to provide advertisement and for other marketing and promotion purposes.
- Personal information is used to analyze service use records and access frequencies, calculate statistics on service use, analyze services and provide customized services based on statistics, and place advertisements.
- Personal information is used to relieve users in circumstances that involve security, privacy and safety and to build a usable service environment.
3. Destruction of Personal Information
As a rule, the Company destroys personal information immediately after the user unsubscribes from the service.
However, personal information can be stored safely for a designated amount of time, even after the user unsubscribes, if NAVER has obtained separate consent from the user to store the personal information for a certain amount of time, or if the Company is obligated by law to store the information for a specific time period.

NAVER will obtain separate consent from the user to store their personal information for a specific time period in the following situations.
To prevent fraudulent subscriptions and misuse, records of misuse, including records on fraudulent subscriptions and disciplinary actions, are collected, stored, and destroyed after six (6) months. Mobile phone numbers that are used to verify subscriptions (the legal representative’s DI if the subscriber is under the age of 14) is included as personal information in the records of misuse.

To prevent illegal transactions, protect law-abiding users and guarantee an environment that ensures safe transactions, records of fraudulent transactions with NAVER Pay, which includes payment thefts, illegal money accommodation through credit cards and other actions that violate related laws, regulations or the User Agreement, will be collected, stored, and destroyed after three (3) years.
To prevent cases of service misuse under the repeated registration and cancellation of membership, users who have canceled their membership will have their mobile phone number stored for six (6) months after having encoded it, using cryptographic hash function, to make it impossible to decode.

Statutes, including the Act on the Consumer Protection in Electronic Commerce, Electronic Financial Transactions Act, and the Protection of Communications Secrets Act, require NAVER to store the information for a period of time, as described below. NAVER will store the personal information for the period prescribed by law and will never use the information for other purposes.
- Act on the Consumer Protection in Electronic Commerce
Records on subscription or withdrawal of subscription: Store for five (5) years
Records on payment settlements and supply of goods: Store for five (5) years
Records on customer complaints or dispute settlements: Store for three (3) years
- Electronic Financial Transactions Act
Records on electronic finance: Store for five (5) years
- Protection of Communications Secrets Act
Records on sign-in: Store for three (3) months"></textarea>
                    </p>

                    <p class="checkbox"><a>
                            <label>
                                <input type="checkbox" value="sign-up"> 이용약관에 동의합니다.
                            </label>
                        </a></p>

                    <button class="btn btn-lg btn-primary btn-block" name="sign_btn" id="sign_btn" type="submit"
                            value="submit">
                        Sign in
                    </button>

                </form>

            </div>
        </div>
    </div>
</div>

<!--scripts loaded here -->
<script type="text/javascript" src="https://code.jquery.com/jquery-1.12.4.min.js"></script>
<!--<script src="js/jquery.min.js"></script>-->
<script src="js/bootstrap.min.js"></script>
<script src="js/jquery.easing.min.js"></script>
<script src="js/wow.js"></script>
<script src="js/scripts.js"></script>
</body>
</html>