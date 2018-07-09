define(['jquery'],function($){
    
    var gaine, box, frame, origin_div;
    return {
        // 初始化放大镜
        initialize:function(div){
            // div.css('position', 'relative')
            var coordinate = div.offset();
                origin_div = div;
                // console.log(div.offset())
                frame = div;
                box = $('<div>');
            var twice = 2;
                wicket = 200;
                box.css({
                    'width':wicket * twice + 'px',
                    'height':wicket * twice + 'px',
                    'position': 'absolute',
                    'border': 'solid 1px #dfdfdf',
                    'z-index': '999',
                    'overflow': 'hidden',
                    'top':coordinate.top,
                    'left':coordinate.left + div.width() + 10,
                    'display':'none'
                })
            var img = $('<img>');
                img.css({
                    'width':div.width() * twice,
                    'height':div.height() * twice,
                    'position': 'absolute'
                })
                box.append(img);
                // 过滤 mask
            var mask = $('<div>');
                mask.css({
                    'width':div.width() / twice + 'px',
                    'height':div.height() / twice + 'px',
                    'background': 'rgba(14, 134, 241, 0.5)',
                    'position': 'absolute',
                    'top':'0',
                    'left':'0',
                    'display':'none'
                })
                gaine = mask;
            // 必须添加到内部才不会触发离开div事件
            // 用计时器防止被其他操作清理掉
            setTimeout(()=>{div.append(mask)},500)
            $('body').append(box);
        },
        // 鼠标移动时的触发方法
        mover:function(e){
            var origin_xy = origin_div.offset();
           
            var x = e.pageX - gaine.width() / 2;
            var y = e.pageY - gaine.height() / 2;
            if(x - origin_xy.left < 0){
                x = origin_xy.left;
            }
            if(x + gaine.width() > origin_xy.left + frame.width()){
                x = origin_xy.left + frame.width() - gaine.width();
            }
            if(y - origin_xy.top < 0){
                y = origin_xy.top;
            }
            if(y + gaine.height() > origin_xy.top + frame.height()){
                y = origin_xy.top + frame.height() - gaine.width();
            }
                gaine.css({
                    'left':x + 'px',
                    'top':y + 'px'
                })
                origin_xy;
                $('img',box).css({
                    'left':(origin_xy.left - x) * 2 + 'px',
                    'top':(origin_xy.top - y) * 2 + 'px'   
                })

            
        },
        // 鼠标移入事件.自动获取内部的img
        into:function(url){
            // console.log($('img',box))
            box.css('display','block');
            gaine.css('display','block');

            $('img',box).attr('src',url);
            
            if(!$('img',box).attr('src')){
                console.log('空',url);
                     
            }
        },
        // 鼠标移出事件
        leave:function(){
            box.css('display','none');
            gaine.css('display','none');
        }
    }
})