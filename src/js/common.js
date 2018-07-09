var randomCode = function(){
	
	$('#changeCode').click(function(){
		drawPic();
	})
	
	/**生成一个随机数**/
	function randomNum(min, max) {
			return Math.floor(Math.random() * (max - min) + min);
	}
	/**生成一个随机色**/
	function randomColor(min, max) {
			var r = randomNum(min, max);
			var g = randomNum(min, max);
			var b = randomNum(min, max);
			return "rgb(" + r + "," + g + "," + b + ")";
	}
	var code = drawPic();
	document.getElementById("changeImg").onclick = function(e) {
			e.preventDefault();
			code = drawPic();
	}
	/**绘制验证码图片**/
	function drawPic() {
		
			var canvas = document.getElementById("canvas");
			var width = canvas.width;
			var height = canvas.height;
			//获取该canvas的2D绘图环境 
			var ctx = canvas.getContext('2d'); 
			ctx.textBaseline ='bottom';
			/**绘制背景色**/
			ctx.fillStyle = randomColor(255,255);
			//颜色若太深可能导致看不清
			ctx.fillRect(0,0,width,height);
			/**绘制文字**/
			var str = 'ABCEFGHJKLMNPQRSTWXY123456789';

　　　 var code= "";
　　　 //生成四个验证码
			for(var i = 1; i <= 4; i++) {
					var txt = str[randomNum(0,str.length)];
					code = code + txt;
					ctx.fillStyle = randomColor(50,160);
					//随机生成字体颜色
					ctx.font = randomNum(30,38) +'px SimHei';
					//随机生成字体大小
					var x = 10 +i *25;
					var y = randomNum(25,35);
					var deg = randomNum(-45,45);
					//修改坐标原点和旋转角度
					ctx.translate(x, y); 
					ctx.rotate(deg * Math.PI /180); 
					ctx.fillText(txt,0,0);
					//恢复坐标原点和旋转角度
					ctx.rotate(-deg * Math.PI /180);
					ctx.translate(-x, -y);
			}
			
			/**绘制干扰线**/
			for(var i = 0; i < 3; i++) {
					ctx.strokeStyle = randomColor(0, 0);
					ctx.beginPath();
					ctx.moveTo(randomNum(0,width/2), randomNum(0,height/2));
					ctx.lineTo(randomNum(0,width/2), randomNum(0,height));
					ctx.stroke();
			}
			/**绘制干扰点**/
			for(var i = 0; i < 50; i++) {
					ctx.fillStyle = randomColor(0);
					ctx.beginPath();
					ctx.arc(randomNum(0, width), randomNum(0, height),1,0,2* Math.PI);
					ctx.fill();
			}
			return code;
	}
	return drawPic;
}




/**
 * [获取css样式，兼容IE8-]
 * @param  {Element} ele [获取样式的元素]
 * @param  {String} key [css属性]
 * @return {String}     [返回key对应的css属性值]
 */
function getCss(ele,key){
	// 判断是否支持getComputedStyle
	if(window.getComputedStyle){
		// 标准浏览器
		return getComputedStyle(ele)[key]
	}else if(ele.currentStyle){
		// IE8-
		return ele.currentStyle[key]
	}else{
		// 返回内联样式
		return ele.style[key]
	}
}

/**
 * [动画函数增强版]
 * @param  {Element}   ele      [动画元素]
 * @param  {Object}   opt      [动画属性与目标值]
 * @param  {[Function]} callback [回掉函数]
 */
function animate(ele,opt,callback){
	// 使用属性timerLen记录定时器数量
	ele.timerLen = 0;

	for(var attr in opt){
		ele.timerLen++;

		(function(attr){
			var timerName = attr + 'Timer';//leftTimer,fontSizeTimer
			var target = opt[attr];
			// 添加前先清除之前的同名定时器
			clearInterval(ele[timerName]);


			ele[timerName] = setInterval(function(){
				// 获取当前值
				var current = getCss(ele,attr);

				// 提取单位
				var unit = current.match(/[a-z]*$/)[0];

				// 提取当前值(number)
				current = parseFloat(current);

				// 计算缓冲速度
				var speed = (target-current)/10;


				// 针对opacity属性操作
				if(attr === 'opacity'){
					speed = speed>0 ? 0.05 : -0.05;
				}else{
					// 避免speed过小或为0
					speed = speed>0 ? Math.ceil(speed) : Math.floor(speed);
				}

				current = current + speed;

				// 目标值判断
				if(current === target){
					clearInterval(ele[timerName]);

					// 重置当前值
					current = target;

					ele.timerLen--;

					// 动画完成后执行回调函数
					if(typeof callback === 'function' && ele.timerLen === 0){
						callback();
					}
				}


				// 设置样式
				ele.style[attr] = current + unit;
			},30)

		})(attr);
	}
}