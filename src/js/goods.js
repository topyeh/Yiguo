require(['config'],function(){
    require(['jquery','http','magnifying','fly'],function($,http,magnifying,fly){
        var param = decodeURI(location.search);
        param = param.slice(1).split('&');
        
        var obj = {};
        param.forEach(function(item){
            var arr = item.split('=');
            obj[arr[0]] = arr[1];
        })
        
        if(obj.guid){
            $('.pic_big').html('<img id="fly" class="j_product_img" width="500" height="500" src="../'+obj.img+'" style="display: block;"/>');
            $('.sum_name h1').html(obj.title);
            $('.pro_price div span strong').html(obj.price);
            $('.selected a span:eq(0)').text('￥' + obj.price);
            $('.guid').text(obj.guid);
        }

        // 加减按钮
        $('.spinner').click(function(e){

            var $target = $(e.target);
       
            if($target.hasClass("decrease")){
                var pro_num = $('#pro_num').val() - 1;
                $('#pro_num').val(pro_num);
                if( $('#pro_num').val() <= 0){
                    $('#pro_num').val(1);
                }
           }
           if($target.hasClass("increase")){
                var pro_num = $('#pro_num').val()*1 + 1;
                $('#pro_num').val(pro_num);
            
             }
        })

        // 加入购物车 && 飞入效果
        var offset = $(".shopping-btn").offset();
        
        $('.addCart').click(function(e){
            http.post('../api/goods.php',{
                guid: obj.guid,
                img: obj.img,
                title: obj.title,
                price: obj.price,
                pro_num: $('#pro_num').val()
            },function(res){
                res = window.eval('('+ res +')');
            
                if(res.status){
                    $('.totleNum b').eq(0).text($('#pro_num').val());
                    $('.totlePrice').text('￥' + obj.price * $('#pro_num').val());
                    
                    $('.goods').html($(`
                    <li class="added">
                        <div class="l">
                            <a href="javascript:">
                                <img src="../${obj.img}" width="42" height="42">
                            </a>
                        </div>
                        <div class="c">
                            <a href="javascript:">${obj.title}</a>
                        </div>
                        <div class="r">
                            <b>¥${obj.price}</b> * ${$('#pro_num').val()}<a href="javascript:">删除</a>
                        </div>
                    </li>
                    <div class="price-total">
                        <div>
                            <span class="totleNum">共<b>${$('#pro_num').val()}</b>件商品</span><span>共计<b class="totlePrice">¥${obj.price * $('#pro_num').val()}</b></span>
                        </div>
                        <div><a href="./car.html" class="settleup">去购物车</a></div>
                    </div>`));
                   if($('.goods').has('.added')){
                        $('.nogoods').css("display","none");
                   }else{
                        $('.nogoods').css("display","block");
                   }
                    
                }

            })     
            // 飞入效果
            var flyer = $('<img id="fly" class="j_product_img" width="300" height="300" src="../'+obj.img+'" style="display: block;"/>');
            flyer.fly({
                start: {
                    left: e.pageX - 400, //开始位置（必填）#fly元素会被设置成position: fixed
                    top:  e.pageY - 400//开始位置（必填）
                },
                end: {
                    left: offset.left, //结束位置（必填）
                    top: offset.top, //结束位置（必填）
                    width: 0, //结束时宽度
                    height: 0 //结束时高度
                }
                
            });         
        })

        // 放大镜
        setTimeout(()=>{magnifying.initialize($('.pic_big'))},200)
        
        // 鼠标进入
        $('.pic_big').mouseenter(function(e) {
            e=e.target
            if(!e.src){
                // 鼠标在父对象边框进入的情况
                // src将获取不到
                e=$('img',e)[0] 
            }
                magnifying.into(e.src)
        });
        // 鼠标离开
        $('.pic_big').mouseleave(function(e) {
            magnifying.leave()
        });
        // 鼠标移动
        $('.pic_big').mousemove(function(e) {
            magnifying.mover(e)
        });
    })
})