<?php

    include 'connect.php';


    $username = isset($_POST['username2']) ? $_POST['username2'] : null;
    $password = isset($_POST['password2']) ? $_POST['password2'] : null;
    $email = isset($_POST['email']) ? $_POST['email'] : null;

    $conn->set_charset('utf8');
    
    //写入mysql
    $sql = "insert into register(username,password,email) values('$username','$password','$email')";


    $result = $conn->query($sql);

    if($result){
        //插入成功,返回success
        echo "success";
    }else{
        echo "fail";
    }

?>