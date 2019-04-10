<?php
session_start();
include "db_info.php";
$logid=$_POST['id'];
$logpw=$_POST['pw'];


$query="select Nickname,Email from member where Nickname='$logid' && Password='$logpw'";

$result=mysqli_query($conn, $query);
$row=mysqli_fetch_array($result);

if(!$row){
    echo "<script>alert('아이디와 비밀번호를 확인해주세요.');history.back();</script>";
}
else{
    $_SESSION['id']=$logid;
    $_SESSION['email']=$row['email'];

    echo "<meta http-equiv='refresh' content='1; URL=../testGame/index.html'>";
}

mysqli_close($conn);
?>