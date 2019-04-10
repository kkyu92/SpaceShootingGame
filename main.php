<!doctype html>
<html>
<head></head>
<body>
<?php
if(isset($_POST[age])&& isset($_POST[name])){
    ?>
    <p> name: <?php echo $_POST[name]?> </p>
    <p> age: <?php echo $_POST[age] ?></p>
    <?php

}else{
    ?>
    <p>input name and age</p>
    <?php
}
?>
</body>
</html>