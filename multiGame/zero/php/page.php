<?php
include "db_info.php";

$limit = $_POST['limit'];
$name = $_POST['name'];

$query = "SELECT * from playinfo WHERE Idd='$name' order by idx desc LIMIT $limit, 5";

$result = mysqli_query($conn, $query);

$count = mysqli_num_rows($result);

$info = array();
if(!$result){
    die('쿼리죽음'. mysqli_error($conn));
}
while ($row = mysqli_fetch_object($result)) {
    $object = new stdClass();
    
    $object->DateTime = $row->DateTime;
    $object->TeamColor = $row->TeamColor;
    $object->GameResult = $row->GameResult;
    $object->GetStar = $row->GetStar;
    $object->GetBullet = $row->GetBullet;
    $object->EnemyShot = $row->EnemyShot;
    $object->TeamShot = $row->TeamShot;
    $object->Shooting = $row->Shooting;
    $object->Shooted = $row->Shooted;
    $object->GetPoint = $row->GetPoint;

    $info[] = $object;
    unset($object);
}

echo json_encode($info);

?>