$(function(){
   
    var regCode = (randomCode())();    
   
    $('#phone_SendCode').click(function(){
        $('#phone_code').val('8314');
    })

	var nameArr = [''];
	// 格式判断
	$('#btnReg').click(function(e){
        e = e || window.event;
        if($('#reg_code').val().toUpperCase() != regCode){
            alert('验证码错误');
            return false;
        }
        if(!/^1[3-9]\d{9}$/.test($('#phone_num').val())){
            alert('手机号码错误!');
            return false;
        }
		if(!/^[\S]{6,20}$/.test($('#phone_pwd').val())){
			alert('密码错误!');
			return false;
		}
		
		if($('#phone_repwd').val() != $('#phone_pwd').val()){
			alert('密码不一致');
            return false;
        }else{
			// 数据库连接判断
			// ajax,处理服务器返回数据
			let xhr = new XMLHttpRequest();
	        xhr.onreadystatechange = ()=>{
	            if(xhr.readyState === 4){
	                if(xhr.responseText == 'success'){
						alert('注册成功!');
						window.location.href='../index.html';
	                }else{
	                	alert('该手机号已注册！'); 
	                }
	            }
	        }
	        // 利用请求头设置POST提交数据格式
	        xhr.open("post","../api/register.php",true);
	        xhr.setRequestHeader('content-type','application/x-www-form-urlencoded');
	        // 向服务器发送请求
	        xhr.send('userName='+ $('#phone_num').val() + '&password=' + $('#phone_pwd').val());
			//push()方法可向数组的末尾添加一个或多个元素
			nameArr.push($('#phone_num').val());
		}
	})
})