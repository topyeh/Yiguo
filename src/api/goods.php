<?php
	include 'connect.php';
	
	$guid = !isset($_POST["guid"]) ? "" : $_POST["guid"];
    $title = !isset($_POST["title"]) ? "" : $_POST["title"];
    $img = !isset($_POST["img"]) ? "" : $_POST["img"];
    $price = !isset($_POST["price"]) ? "" : $_POST["price"];
    $pro_num = !isset($_POST["pro_num"]) ? "" : $_POST["pro_num"];

    
    // 查询是否已存在商品
    $sql = "select * from cart where guid = '$guid'";
    $result = query_oop($sql);
    
    if(count($result) > 0){
        
        $sql = "update `cart` set pro_num = '$pro_num' where guid = '$guid'";
        $result = excute_oop($sql);
        
        echo "{status:'add one true'}";
        
    }else{
        $sql = "insert into cart(guid,title,img,price,pro_num) values('$guid','$title','$img','$price','$pro_num')";
        $result = excute_oop($sql); 
        if($result){
            echo "{status: true}";
        } else{
            echo "{status: false, message: '添加失败'}";
        }
    }
?>