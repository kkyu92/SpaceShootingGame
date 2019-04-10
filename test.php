<!DOCTYPE html>
<head>
  <meta http-equiv="content-type" content="text/html; charset=utf-8"/>
  <title>MySQL-PHP Connect Test</title>
</head>

<body>

<?php
echo "MySQL Connect Test<br>";

$db = mysqli_connect("localhost", "root", "sql", "test");

if ($db) {
  echo "connect : 성공!!<br>";
}
else {
  echo "disconnect : 실패!!<br>";
}

$result = mysqli_query($db, 'SELECT VERSION() as VERSION');
$data = mysqli_fetch_assoc($result);
echo $data['VERSION'];

?>

</body>
</html>
