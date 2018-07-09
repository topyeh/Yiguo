<?php
	include 'connect.php';
	
	$userName = !isset($_POST["userName"]) ? "" : $_POST["userName"];
	$password = !isset($_POST["password"]) ? "" : $_POST["password"];
	
	// 密码md5加密
	$password = md5($password);

	$sql = "select * from userinfo where userName = '$userName' and userPwd = '$password'";
	
	// 获取查询结果
	$result = $conn->query($sql)->fetch_all(MYSQLI_ASSOC);
	// var_dump($result);
	if(count($result) > 0){
		echo 'success';
	}else{
		echo 'fail';
	}

	//关闭连接
	$conn->close();
?>