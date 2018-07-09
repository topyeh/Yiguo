require(['config'], function() {
	require(['jquery', 'http'], function($,http) {
        // console.log(http)
        var _num = 20;
        http.post('../api/products.php',{
            page: 0,
            limit: _num
        },function(data){
            
            data = window.eval('('+ data +')');

            var data_fr = data.data.data1;
            
            goodslist_(data_fr,$('#goodslist')[0]);

            var data_sec = data.data.data2;
            data_sec = data_sec[0]
            for(let key in data_sec){
                var pageNum = data_sec[key];
            }
            var page_num = Math.ceil(pageNum / 30);

            var pag = $('.pag')[0];
            
            var pag_fr = '';
            for(var i = 1; i <= page_num; i++){
                pag_fr += `<a href="javascript:">${i}</a>`;
            }
            pag.innerHTML = pag_fr;
            
            // 默认页码 1 高亮
            if($('a',pag).eq(0).text() == '1'){
                $('a',pag).eq(0).addClass('active');
            }

            pag.onclick = function(e){
                var target = e.target || e.srcElement;
                if(target.tagName === 'A'){
                    
                    var page = (target.innerHTML-1)*_num;
                    
                    http.post('../api/products.php',{
                        page: page,
                        limit: _num
                    },function(data){
                        
                        data = window.eval('('+ data +')');
            
                        var data_fr = data.data.data1;
                        
                        goodslist_(data_fr,$('#goodslist')[0]);
                    })
                }
                // 页码高亮
                $('a',pag).removeClass('active');
                $(target,page).addClass('active');
            }
        })
    })
})
function goodslist_(data,list){
    list.innerHTML = data.map(function(item){
        return `
        <li class="product_item j_pro" guid="${item.id}">
            <div class="pro_img clearfix">
                <a href="goods.html?guid=${item.id}&img=${window.eval('('+ item.img +')')[0]}&title=${item.title}&price=${item.price}">
                    <img src="../${window.eval('('+ item.img +')')[0]}" width="290" height="290" class="j_pro_img">
                </a>
            </div>
            <div class="pro_info clearfix">
                <div class="pro_name">
                    <a href="goods.html?guid=${item.id}&img=${window.eval('('+ item.img +')')[0]}&title=${item.title}&price=${item.price}">${item.title}</a>
                </div>
                <div class="pro_price">
                    <span class="price">
                        <span>￥${item.price*1}</span>
                    </span>
                </div>
                <div class="pro_buy">
                    <span></span>
                    <a class="btn_buy" href="javascript:">加入购物车</a>
                </div>
            </div>
        </li>
        `
    }).join('\n');
}
