<?php
include "db_info.php";

$prevPage = $_SERVER['HTTP_REFERER'];
// 변수에 이전페이지 정보를 저장

$j_id = $_POST["inputNickname"];
$j_pw = $_POST['inputPassword'];
$j_pw2 = $_POST['inputPassword2'];
$j_email = $_POST['inputEmail'];
$j_chkid = $_POST['inputEmail2'];

if (!$j_id || !$j_pw || !$j_pw2 || !$j_email) {
    echo "<script>parent.alert('빈칸없이 작성해 주세요.'); history.back();</script>";
} else if ($j_chkid == 0) {
    echo "<script> history.back();</script>";
} else if ($j_pw != $j_pw2) {
    echo "<script>parent.alert('비밀번호를 정확히 입력해주세요.'); history.back();</script>";
} else if (!strpos($j_email, '.com')) {
    echo "<script>parent.alert('올바른 이메일을 입력해주세요.'); history.back();</script>";
} else {
    echo "<script>parent.alert('회원가입을 축하드립니다.');</script>";
    echo "<meta http-equiv='refresh' content='1; URL=../index.php'>";
    $query = "insert into member(Nickname,Email,Password) values('$j_id','$j_email','$j_pw')";
    $result = mysqli_query($conn, $query);
}

if (!$conn) {
    // die와 mysql_error()메서드 사용,
    // mysql_error() => 최신의 에러내용 출력
    die('MySQL connect ERROR : ' . mysqli_error());
}

if (!$result) {
    //die('MySQL Query ERROR' . mysqli_error($conn));
}


?>
