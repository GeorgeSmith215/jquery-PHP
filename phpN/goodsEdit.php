<?php
header('Access-Control-Allow-Origin:http://127.0.0.1:5500');
// header('content-type:application/json;charset=utf8');
header('Access-Control-Allow-Methods:POST,GET,PUT,DELETE');
date_default_timezone_set('PRC');

$_PUT = array(); 
if ('PUT' === $_SERVER['REQUEST_METHOD']) {
    parse_str(file_get_contents('php://input'), $_PUT);
    $goodsID = $_SERVER['QUERY_STRING'];
    $nameEdit = $_PUT['name'];
    $priceEdit = $_PUT['price'];
    $stockEdit = $_PUT['stock'];
    
    include("mysql.php");
    mysqli_query($conn , "set names utf8");
    //设置编码方式（防止乱码）
    $sql = "SELECT * FROM `goods` WHERE `id`='$goodsID'";
    $res=mysqli_query($conn,$sql);
    $row=mysqli_fetch_array($res);
    $sql = "UPDATE `goods` SET `name` = '$nameEdit',`price` = $priceEdit,`stock` = $stockEdit WHERE `goods`.`id` = $goodsID";
    if ($conn->query($sql) === TRUE) {
        echo "$nameEdit";
    } else {
        echo "Goods ADD FAILED,PLEASE contect Ultimate Admin!";
        echo "Error: " . $sql . "<br>" . $conn->error;
    }
    $conn->close();
}

?>