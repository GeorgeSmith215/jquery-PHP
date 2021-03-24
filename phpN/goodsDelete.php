<?php
header('Access-Control-Allow-Origin:http://127.0.0.1:5500');
header('content-type:text/plain;charset=utf8');
header('Access-Control-Allow-Methods:POST,GET,PUT,DELETE');
include("mysql.php");
date_default_timezone_set('PRC');

if($_SERVER['REQUEST_METHOD'] === 'DELETE') {
    // 本次使用DELETE方法请求
    // 需要操作的数据都在URL中
    $goodsID = $_SERVER['QUERY_STRING'];

    //设置编码方式（防止乱码）
    mysqli_query($conn , "set names utf8");
    $sql = "SELECT * FROM `goods` WHERE `id`='$goodsID'";
    $res=mysqli_query($conn,$sql);
    $row=mysqli_fetch_array($res);
    $id=$row['id'];
    if($id)
    {
        $sql = "DELETE FROM `goods` WHERE `id`='$goodsID'";
        if ($conn->query($sql) === TRUE) {
            echo 'OK';
            // echo 'Congratulations,Goods DELETE successfully!';
        } else {
        echo "Goods DELETE FAILED,PLEASE contect Ultimate Admin!";
        echo "Error: " . $sql . "<br>" . $conn->error;
        }
    }
    else {
        echo "Goods DELETE FAILED,goods is not exist!";
    }
}

// print_r($uri);
// echo $_SERVER['REQUEST_METHOD'];//DELETE
// echo $_SERVER['QUERY_STRING'];//data Blob size:0  type:""

    $conn->close();
?>