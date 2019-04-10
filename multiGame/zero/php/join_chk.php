<?php
include "db_info.php";

$Email=$_GET['userEmail'];

$query="select count(*) from member where Email='$Email'";
$result=mysqli_query($conn, $query);
$row=mysqli_fetch_array($result);

if (!$conn) {
    // die와 mysql_error()메서드 사용,
    // mysql_error() => 최신의 에러내용 출력
    die('MySQL connect ERROR : ' . mysqli_error());
}

if (!$result) {
    die('MySQL Query ERROR' . mysqli_error($conn));
}

mysqli_close($conn);

?>
<script>
        var row = "<?=$row[0]?>";
        if (row == 1) {
            parent.document.getElementById("inputEmail2").value = "0";
            parent.alert("이미 사용중인 Email 입니다.");
        }
        else {
            parent.document.getElementById("inputEmail2").value = "1";
            parent.alert("사용 가능한 Email 입니다.");
            console.log(<?php echo "$id";?>);
        }

</script>