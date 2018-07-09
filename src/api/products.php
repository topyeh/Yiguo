<?php
    header('Access-Control-Allow-Origin:*');
    header('Access-Control-Allow-Methods:POST,GET,OPTIONS'); 
    header('Access-Control-Request-Headers:accept, content-type');

    include "connect.php";

    $page = !isset($_POST["page"]) ? "0" : $_POST["page"];
    $limit = !isset($_POST["limit"]) ? "25" : $_POST["limit"];

    $sql = "select * from product limit $page, $limit; select count(*) from product;";
    // var_dump($sql);
    // $result = $conn->query($sql);
    // var_dump($result);

    // $lists = $result;
    
    // $data=['status'=> true, 'data'=> $lists];
    // echo json_encode($data);

    $result = multi_query_oop($sql);
    
    $lists = json_encode($result);

   

    echo "{status: true, data:$lists}";

?>