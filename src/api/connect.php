<?php

    //响应头
    header('Content-Type:text/html;charset=utf-8'); 

    /*连接数据库*/

    $servername = "localhost";
    $username = "root";
    $password = "";
    $dbname = "h5_1804";

    //创建连接
    $conn = new mysqli($servername,$username,$password,$dbname);

    //解决中文乱码
    mysqli_query($conn,"set names utf8");

    // var_dump($conn);

    //检测连接
    if($conn->connect_error){
        //输出信息并结束连接
        die("连接失败:" . $conn->connect_error);
    }

    // $conn->query() 用于执行sql语句
    // $sql = "select username,age from students order by age desc";//order by age根据年龄排序的意思


    //执行sql语句,返回查询结果集
    //num_rows:保存查询到的记录数量
    // $result = $conn->query($sql);

    //使用查询结果值
    //得到数组
    // $row = $result->fetch_all(MYSQLI_ASSOC);//得到所有数据
    // $row = $result->fetch_assoc();//得到第一条数据
    // $row = $result->fetch_row();//得到第一条数据的值
    

    // echo json_encode($row);

    // var_dump($row);

?>