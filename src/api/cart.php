<?php
	include 'connect.php';
    
    $guid = !isset($_POST["guid"]) ? "" : $_POST["guid"];
    
    $status = 0;
    if($guid){
        $del = "select * from cart where guid = $guid";
        
        $delRes = query_oop($del);
        if(count($delRes) > 0){
            $del = "delete from cart where guid = '$guid'";
            $status = excute_oop( $del);
        }
    }
    
    $sql = "select * from cart";
    $result = query_oop($sql);
    $lists = json_encode($result);
    echo "{status: $status, data: $lists}";
?>