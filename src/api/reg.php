<?php

    include 'connect.php';


    $username = isset($_POST['username']) ? $_POST['username'] : null;
    $password = isset($_POST['password']) ? $_POST['password'] : null;

    $conn->set_charset('utf8');
    
    //写入mysql
    $sql = "insert into username(name,password) values('$username','$password')";


    $result = $conn->query($sql);

    if($result){
        echo "success";
    }else{
        echo "fail";
    }

?>