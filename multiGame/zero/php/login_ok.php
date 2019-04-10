<?php
session_start();
include "db_info.php";
$logid=$_POST['loginEmail'];
$logpw=$_POST['loginPassword'];

$query="select Email,Password,Nickname from member where Email='$logid' && Password='$logpw'";
//$name = "select Nickname from member where Email='$logid' && Password='$logpw'";

$result=mysqli_query($conn, $query);
$row=mysqli_fetch_array($result);

if(!$row){
    echo "<script>alert('Email과 비밀번호를 확인해주세요.');history.back();</script>";
}
else{
    $_SESSION['id']=$logid;
    $_SESSION['name']=$row['Nickname'];
    $_SESSION['email']=$row['email'];
//    echo "<meta http-equiv='refresh' content='1; URL=../index.php'>";
    header("location: ../index.php?login=success");
    exit();
}

mysqli_close($conn);
?>