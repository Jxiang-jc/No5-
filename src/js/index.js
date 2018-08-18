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
    $span.html(times)
    })
})();