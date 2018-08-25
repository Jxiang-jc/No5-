 <?php
    //引入connect.php
    
    include 'connect.php';

    // var_dump($conn);

    /* 
        验证用户名是否存在
        所需参数:
            *username2
    */
    $conn->set_charset('utf8');

    // 有则用,无则null
    $username = isset($_GET['username2']) ? $_GET['username2'] : null;

    //查找数据库中是否存在同名用户
    $sql = "select * from register where username= '$username' ";
    // var_dump($sql);

    //执行sql语句
    $result = $conn->query($sql);

    // var_dump($result);

    if($result->num_rows>0){
        echo "no";
    }else{
        echo "yes";
    }

?>