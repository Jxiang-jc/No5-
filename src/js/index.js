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
        var val = $input.val();

        //鼠标移动事件
        $input.on('mouseover',function(){

            $input.addClass('inputBgc');
            
            $('#pageHeader_b .container .col-lg-6 .z_delSearch').css('visibility',"visible");
            
        })
        $input.on('click',function(){
             $input.val('');

        })
        $input.on('blur',function(){
            
            console.log(val)
            // $input.val('面膜');
        })

    })

})();