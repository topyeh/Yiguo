require(['config'],function(){
    require(['jquery','http'],function($,http){
        function createCartLsist(data){

            var cartTable = $('.cart-list')[0];
            var total = 0;
            cartTable.innerHTML = '';
            // 生成购物车列表
            cartTable.innerHTML += data.map(function(item){
                
                // 计算总价
                total += item.price * item.pro_num;
                // 返回结构
                return`
                <table class="cart-table">
                    <tbody>
                        <tr>
                            <td class="cart-t-check"><input type="checkbox" checked="checked"></td>
                            <td class="cart-t-img"><a href="javascript:"><img src="../${item.img}" width="80" height="80"></a></td>
                            <td class="cart-t-info"><a href="javascript:">${item.title}</a></td>
                            <td class="cart-t-ub" style="width:75px;"></td>
                            <td class="cart-t-price">￥${item.price}</td>
                                <td class="cart-t-num">
                                    <div class="quantity-form">
                                        <a href="javascript:" class="decrement"></a>
                                            <input  type="text" class="itxt" oldnum="2" value="${item.pro_num}" >
                                        <a href="javascript:" class="increment"></a>
                                    </div>
                                </td>
                            <td class="cart-t-total">￥<span>${item.price * item.pro_num}</span></td>
                            <td class="cart-t-spec">500g/袋</td>
                            <td class="cart-t-opera">
                                <a href="javascript:">移入收藏</a>
                                <br>
                                <a href="javascript:" class="delPro">删除</a>
                            </td>
                        </tr>
                    </tbody>
                </table>`
            }).join('\n');
            
            $('.fs14 span').text(total);    
            if(data.length > 0){
                $('.cart-none').css('display', 'none');
            }else{
                 $('.cart-none').css('display', 'block');
            }
            
            // 删除商品
            var guid;   
            $.map(data,function(item){
                guid = item.guid;
            })
            $('.cart-table').click(function(e){
                var $target = $(e.target);
                if($target.hasClass('delPro')){
                    
                    http.post('../api/cart.php',{
                        guid: guid
                    },function(res){
                        res = eval('('+ res +')');
                        createCartLsist(res.data);
                    })
                }
            })
        }
        http.post('../api/cart.php',{},function(data){
            data = eval('('+ data +')');
            data = data.data;
            createCartLsist(data);
        })
    })
})
