// 账号：13345678910  
// 密码：123123

$(function(){

  var logCode = (randomCode())();

  // 获取元素
  let xhr = new XMLHttpRequest();
    
  // 登录点击事件
  $('#btnLog').click(function(){
    var userName = $('#userName').val();
    var pwd = $('#pwd').val();

    if($('#VerifyCode').val().toUpperCase() != logCode){
        alert('验证码错误');
        return false;
    }else{
      // ajax,处理服务器返回数据
      xhr.onreadystatechange = ()=>{
          // console.log(xhr.readyState);
          if(xhr.readyState == 4){
            console.log(xhr.readyState,xhr.responseText)
              if(xhr.responseText == 'success'){
                window.location.href = '../index.html';
              }else{
                alert('账号或密码错误');
              }
          }
      }
      // 利用请求头设置POST提交数据格式
      xhr.open("post","../api/login.php",true);
      xhr.setRequestHeader('content-type','application/x-www-form-urlencoded');
      // 向服务器发送请求
      xhr.send('userName=' + userName + '&password=' + pwd);

    }
  })	
})