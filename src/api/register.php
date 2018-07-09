<?php
	include 'connect.php';
	
	$userName = !isset($_POST["userName"]) ? "" : $_POST["userName"];
	$password = !isset($_POST["password"]) ? "" : $_POST["password"];
	
	// 密码md5加密
	$password = md5($password);
	
	$sql = "select * from userinfo where userName = '$userName' ";
	$result = $conn->query($sql);
	// var_dump($result->num_rows);
	if($result->num_rows > 0){
		echo '该手机号已注册';
	}else{
		// 查询数据库
		$sql = "select id from userinfo ORDER BY 'id' ";
		$result = $conn->query($sql);
		$id = $result->fetch_all(MYSQLI_ASSOC);
		$id = end($id)['id'] + 1;
		// 添加进数据库
		$sql = "INSERT INTO userinfo(id, userName, userPwd) VALUES ('$id','$userName','$password')";
		$result = $conn->query($sql);
		echo 'success';
	}
	//关闭连接
	$conn->close();
?>