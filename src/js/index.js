(function(){
    jQuery(function($){
    //获取span标签
    var $span = $('#pageHeader_t .container .header_l  .date');
        console.log($span)

    //获取当前时间
    var $now = new Date();
    var $hour = $now.getHours();  

    //判断上午或是下午
    let times = $hour>=12 ? '下午好,':'上午好,';

    //写进页面
    $span.html(times);

    })
})();
//头部搜索
(function(){
    jQuery(function($){
        //获取inpu边框
        var $input = $('#searchInput');

        //获取input内容
        var vals = $input.val();

        //删除按钮
        var $z_delSearch = $('#pageHeader_b .container .col-lg-6 .z_delSearch');


        //鼠标移进input,改变背景颜色,以及显示 ×
        $input.on('mouseover',function(){

            $input.addClass('inputBgc');
            
            $z_delSearch.css('visibility',"visible");

            //嵌套事件

            $z_delSearch.on('mousedown',function(){
                //清空内容
                $input.val('');
                
            })
            
        })
        //鼠标移出时,清空上面的效果
        $('.input-group').on('mouseleave',function(){

            $input.removeClass('inputBgc');

            $z_delSearch.css('visibility',"hidden");
        })



        //点击清空input内容
        $input.on('click',function(){
             $input.val('');

        })
        //失去焦点时自动填充内容
        $input.on('blur',function(){
            $input.val(vals);
            
            $z_delSearch.css('visibility',"hidden");

        })

    })

})();