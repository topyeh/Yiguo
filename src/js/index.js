$(function () {
    $(".btnPrev,.btnNext").hover(function () {
        $(this).fadeTo("show", 0.7);
    }, function () {
        $(this).fadeTo("show", 0.3);
    });

    $(".banner-slider").hover(function () {
        $(this).find(".btnPrev,.btnNext").fadeTo("show", 0.3);
    }, function () {
        $(this).find(".btnPrev,.btnNext").hide();
    })

    $(".b-slider li").addClass("active");

    

})

document.addEventListener('DOMContentLoaded',()=>{
    
    let carousel = document.querySelector('.banner-slider');
    let ul = carousel.children[0];
    
    let len = ul.children.length;

    // 初始化:
    // 计算ul的宽度
    // li的宽度*数量
    ul.style.width = carousel.clientWidth * len + 'px';

    // 默认索引值
    let index = 0;

    // 添加左右按钮
    let btnPrev = document.createElement('span');
    btnPrev.classList.add('btnPrev');
    btnPrev.innerHTML = '&lt;';
    let btnNext = document.createElement('span');
    btnNext.classList.add('btnNext');
    btnNext.innerHTML = '&gt;'
    carousel.appendChild(btnPrev);
    carousel.appendChild(btnNext);

    // 添加页码
    let page = document.createElement('div');
    page.className = 'page';

    var content = '';
    // 往.page中添加页面
    for(let i=0;i<len;i++){
        content += `<span>${i}</span>`
    }
    page.innerHTML = content;
    page.children[index].className = 'active';
    // 把page写入页面
    carousel.appendChild(page);

    //动画效果
    let timer = setInterval(autoPlay,3000);

    // 鼠标移入移出
    carousel.onmouseover = function(){
        clearInterval(timer);
    }

    carousel.onmouseout = function(){
        timer = setInterval(autoPlay,3000);
    }

    // 上一张下一张
    carousel.onclick = e=>{
        if(e.target.className === 'btnPrev'){
            index--;
            show();
        }else if(e.target.className === 'btnNext'){
            index++;
            show();
        }
    }

    function autoPlay(){

        index++;

        show();
    }


    function show(){
        let li= $('.b-slider li').css({display:'none'})
        // 终点判断
        if(index>=len){
            // 无缝滚动关键2:当滚动完成复制图片时,瞬间重回初始状态
            ul.style.left = 0;
            index = 0;
        }else if(index<0){
            index = len;
        }
        li.removeClass('active').eq(index).css({display:'block'})
        setTimeout(()=>{
            li.eq(index).addClass('active')
        },100)  

        // 高亮页码
        for(let i=0;i<len;i++){
            if(i===index){
                page.children[i].className = 'active';
            }else{
                page.children[i].className = '';
            }
        }
        if(index === len){
            page.children[0].className = 'active';
        }

    }
})
