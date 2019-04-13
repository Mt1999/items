<?php
	header('Access-Control-Allow-Origin:*');

	include("db.php");
	$nickname = $_POST["nickname"];
	$password = $_POST["password"];
//	$mobile = $_POST["mobile"];
//	$jscode = $_POST["jscode"];
//	$sms_code = $_POST["sms_code"];
//	$repassword = $_POST["repassword"];

	// 不允许重复注册
	$selSql = "select * from users where nickname = '$nickname'";

	$selRes = mysql_query($selSql);

	if(mysql_num_rows($selRes) >= 1){
		// 已经有此用户名了
		echo json_encode(array('res_code' => 0, 'res_message' => "用户名已存在"));
	}else{
		// 存此用户信息
		$insSql = "insert into users (nickname,password) values ('$nickname','$password')";
		$insRes = mysql_query($insSql);

		if($insRes) {
			echo json_encode(array('res_code' => 1, 'res_message' => "注册成功"));
		}else{
			echo json_encode(array('res_code' => 0, 'res_message' => "网络错误"));
		}
	}

?>