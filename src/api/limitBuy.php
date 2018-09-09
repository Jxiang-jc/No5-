<?php
        include 'connect.php';

    
    // 获取前端传入的参数
    // 页数
    $pageNo = isset($_GET['pageNo'])? $_GET['pageNo'] : null;
    //每一页商品数量
    $qty = isset($_GET['qty'])? $_GET['qty'] : null;
    //数据排序顺序样式(销量,价格,好评度,时间)
    $Datatype = isset($_GET['type']) ? $_GET['type'] : null;
    

    //sql语句,获取数据库中全部数据
    $sql = "select * from limitBuy order by rand() limit 4";
    

    $result = $conn->query($sql);

    //读取所有的数据
    $row = $result->fetch_all(MYSQLI_ASSOC);
    // var_dump($row);

    //避免资源浪费
    $result->close();
    // 关闭数据库，避免资源浪费
    $conn->close();

    echo json_encode($row,JSON_UNESCAPED_UNICODE);



?>