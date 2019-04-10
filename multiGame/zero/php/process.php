<?php
    $email = $_POST['inputEmail'];
    $username = $_POST['inputNickname'];
    $password = $_POST['inputPassword'];
    $password2 = $_POST['inputPassword2'];
    $submit = $_POST['submit'];

    if ($password != $password2) {


        echo "<script> alert(\"gggg\")</script>";
//        echo "비밀번호가 동일하지 않습니다.";
        echo "<a href=index.html>back page</a>";
        exit();
    } else {

    }


    echo $email;
    echo "<br />";
    echo $username;
    echo "<br />";
    echo $password;
    echo "<br />";
    echo $submit;

?>
<script>
    alert("gggg");
</script>
/**
 * Created by PhpStorm.
 * User: kks
 * Date: 2018-09-11
 * Time: 오전 11:36
 */