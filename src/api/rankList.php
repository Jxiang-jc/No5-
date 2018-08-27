<?php
        include 'connect.php';
    
    // 获取前端传入的参数
    // 数量
    $rank = isset($_GET['rank'])? $_GET['rank'] : null;
    $read = isset($_GET['read'])? $_GET['read'] : null;
 

    

    //sql语句,获取数据库中全部数据
    
    $sql = "select * from rankList";
        
    

    $result = $conn->query($sql);
    
    


    //读取所有的数据
    $row = $result->fetch_all(MYSQLI_ASSOC);
    
    // var_dump($row);

    //避免资源浪费
    $result->close();

    //截取需要的数据

        $res = array(
            'total' => count($row),
            "data" => array_slice($row,0)
            );

        echo json_encode($res);


?>