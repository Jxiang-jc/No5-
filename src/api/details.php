<?php 

    include 'connect.php';

    $idx=isset($_GET['idx']) ? $_GET['idx'] : null;
    
    echo(666666);
    var_dump($idx);

    $sql = "select * from goods where id='$idx'";

    // var_dump($sql);


    $result = $conn->query($sql);

    $row = $result->fetch_all(MYSQLI_ASSOC);

    // var_dump($row);
    
    $result->close();
    


    echo json_encode($row);
 ?>