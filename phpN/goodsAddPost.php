<?php
header('Access-Control-Allow-Origin:http://127.0.0.1:5500');
header('content-type:application/json;charset=utf8');
header('Access-Control-Allow-Methods:POST,GET');

$addName = $_POST['name'];
$addAmount = $_POST['stock'];
$addPrice = $_POST['price'];


if($addName !=""){
    include("mysql.php");
    date_default_timezone_set('PRC');
    //设置编码方式（防止乱码）
    $conn->query("set names utf8");

    $sql = "SELECT * FROM `goods` WHERE `name`='$addName'";
    $res=mysqli_query($conn,$sql);
    $row=mysqli_fetch_array($res);
    $id=$row['id'];
    $stock=$row['stock'];
    $name=$row['name'];
    $price=$row['price'];
    if($name==$addName && $price==$addPrice)
    {
        echo "Goods existed!";
    }
    elseif ($addName) {
        $sql = "INSERT INTO `goods` (`id`, `name`, `price`, `stock`) VALUES (NULL, '$addName', '$addPrice', '$addAmount')";
        if ($conn->query($sql) === TRUE) {
            echo $addName;
        } else {
        echo "Goods ADD FAILED,PLEASE contect Ultimate Admin!";
        echo "Error: " . $sql . "<br>" . $conn->error;
        }
    }
    
    else {
        echo "Goods ADD FAILED,PLEASE contect Ultimate Admin!";
    }
    $conn->close();
}else echo "Goods' name can not be empty!";


?>