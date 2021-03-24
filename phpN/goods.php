<?php
// header('content-type:application/json;charset=utf8');
// header('Content-type:text/json');
header('Access-Control-Allow-Origin:http://127.0.0.1:5500');
header("Access-Control-Allow-Methods:GET,POST");
include("./mysql.php");
date_default_timezone_set('PRC');
mysqli_query($conn , "set names utf8");

$json = '';
$data = array();
class goods {
    public $id;
    public $name;
    public $price;
    public $stock;
    public $sold;
}

$sql = "SELECT id,name,price,stock,sold FROM `goods` ORDER BY `id`";
//按ID排序并查询商品

$result = $conn->query($sql);

if($result) {
    //echo "查询成功";
    while ($row = mysqli_fetch_array($result,MYSQLI_ASSOC)) {
        $goods = new goods();
        $goods->id = $row["id"];
        $goods->name = $row["name"];
        $goods->price = $row["price"];
        $goods->stock = $row["stock"];
        $goods->sold = $row["sold"];
        $data[]=$goods;
    }
    //把数据转换为JSON数据.
    $json = json_encode($data,true);
    // echo "{".'"goods"'.":".$json."}";
	echo $json;
} else {
    echo "查询失败";
}

$conn->close();
?>