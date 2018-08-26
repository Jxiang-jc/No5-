;(function(){
    jQuery(function($){
        $('#pageHeader_t').load('./header_t.html',function(){
            $('#pageHeader_t').dateShow();
        });
        $('#pageHeader_b').load('./header_b.html',function(){
            $('#pageHeader_t').search();
            $('#pageHeader_t').qrcode();

            //等待页面头部加载完成以后再加载放大镜,否则top值会有问题
            $('.goods').lxzoom({width:380,height:380})

            $('.small').on('click','img',function(){
                $('.goods img').attr({
                    'src':this.src,
                    'data-big':this.dataset.big
                });
            })
        });
        $('#pageNav').load('./pageNav.html',function(){

        });
        $('#pageFooter').load('./pageFooter.html')


    });
})();
