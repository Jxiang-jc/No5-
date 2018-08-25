<?php
        include 'connect.php';
    /*
        
            * 根据参数读取内容
                * qty
                * pageNo

        读取文件：
            qty=10
            pageNo      array_slice(idx,len)
            1                      (0,10)
            2                      (10,10)
            3                      (20,10)
            推导公式：idx = (pageNo-1)*qty
     */
    
    // 获取前端传入的参数
    // 页数
    $pageNo = isset($_GET['pageNo'])? $_GET['pageNo'] : null;
    //每一页商品数量
    $qty = isset($_GET['qty'])? $_GET['qty'] : null;
    //数据排序顺序样式(销量,价格,好评度,时间)
    $Datatype = isset($_GET['type']) ? $_GET['type'] : null;
    

    //sql语句,获取数据库中全部数据
    $sql = "select * from goodslist";

    $result = $conn->query($sql);

    //读取所有的数据
    $row = $result->fetch_all(MYSQLI_ASSOC);
    // var_dump($row);

    //避免资源浪费
    $result->close();

    //截取需要的数据
    function array_sort($array,$keys,$type='asc'){
            //$array为要排序的数组,$keys为要用来排序的键名,$type默认为升序排序  
        $keysvalue = $new_array = array();
        foreach ($array as $k=>$v){
            $keysvalue[$k] = $v[$keys];  
        }  
        if($type == 'asc'){  
            asort($keysvalue);
        }else{  
            arsort($keysvalue);  
        }  
        reset($keysvalue);  
        foreach ($keysvalue as $k=>$v){  
            $new_array[$k] = $array[$k];  
        }  
            return $new_array;  
    }
        //如果传过来的是default则不用排序
    if ($Datatype === "default") {
        $res = array(
            'total' => count($row),
            "data" => array_slice($row, ($pageNo-1)*$qty, $qty),
            "pageNo" => $pageNo,
            "qty" => $qty
        );
    
        echo json_encode($res);
    } else {
        //不是default的时候
        $newRow = array_sort($row, $Datatype, 'desc');

        $res = array(
            'total' => count($newRow),
            "data" => array_slice($newRow, ($pageNo-1)*$qty, $qty),
            "pageNo" => $pageNo,
            "qty" => $qty
        );
    
        echo json_encode($res);
    }

?>