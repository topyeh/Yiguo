$(function(){
    //我的易果
	$('.myYiguo').hover(function(){
		$(this).addClass('active');
	},function(){
		$(this).removeClass('active');
	});
	
	//手机易果
	$('.mobile').hover(function(){
		$(this).addClass('active');
	},function(){
		$(this).removeClass('active');
	});
	
    //购物车
	$('.shopping-cart').hover(function(){
	    $('.shopping-list').fadeIn("0");
	},function(){
	    $('.shopping-list').delay(1000).fadeOut("1000");
	});
	$('.shopping-list ul li').hover(function(){
		$(this).find('.del').css('visibility','visible');
	},function(){
		$(this).find('.del').css('visibility','hidden');
	});
	
	//商品分类
	$('.catalogs').hover(function(){
		$('.catalogs .catalogs-list').show();
	},function(){
		$('.catalogs .catalogs-list').hide();
	});
	$('.catalogs-list .item').hover(function(){
		$(this).addClass('active');
		$(this).find('.sub-item').show();
	},function(){
		$(this).removeClass('active');
		$(this).find('.sub-item').hide();
	});

	//右侧悬浮导航 && 吸顶效果
	window.onscroll = ()=>{
		// 获取当前滚动过的距离
		let scrollY = window.scrollY;
		// 吸顶
		if(scrollY >= 150){
			$('.header').addClass('header_fixed')
		}else{
			$('.header').removeClass('header_fixed')
		}
		// 右侧悬浮
		if(scrollY >= 533){
			$('.goTop').css('display','block');
		}else{
			$('.goTop').css('display','none');
		}
	}
	$('.goTop').click(function(){
		var timer = setInterval(function(){
			var scrollY = window.scrollY;
			var speed = Math.ceil(scrollY/5);
			scrollBy(0,-speed);
			if(window.scrollY <= 0 || speed < 1){
				clearInterval(timer);
				scrollBy(0, 0);
			}
		},30)
	})

});
