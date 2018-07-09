define(['jquery'], function($) {
   return{
    // baseUrl: 'http://localhost:85/src/api/',
    // filterUrl: function(_url){
    //     if(_url.startsWith('http')){
    //         return _url;
    //     }
    //     return this.baseUrl + _url;
    // },
    get: function(_url, _params, _callback){
        // _url = this.filterUrl(_url);
        $.ajax({
            url: _url,
            data: _params || {},
            headers: {
                Authorization: window.localStorage.getItem('access_token')
            },
            success: function(res){
                _callback(res);
            },
            complete: function(){
                $('.mask').hide();//隐藏
                $('.mask').remove();//删除元素
            }
        })
    },
    post: function(_url, _params, _callback){
        // _url = this.filterUrl(_url);
        $.ajax({
            url: _url,
            data: _params || {},
            type: 'post',
            headers: {
                Authorization: "Bearer " + window.localStorage.getItem('access_token')
            },
            success: function(res){
                _callback(res);
            },
            error: function(error){
                console.log(error);
                if(error.responseJSON.code == 40001){
                    //登录超
                    window.location.href = 'login.html';
                }
            },
            complete: function(){
                $('.mask').hide();//隐藏
                $('.mask').remove();//删除元素
            }
        })
    }
   }
});
