;(function(){
    jQuery(function($){

        var $banner = $('.banner');
        var $lis = $('.z_ol li');



        var res = ['#80D3E1','#B5E2FF','#FEEAF3','#F6EDE4'];
        var aa = res[2];
        
        var i = 0;
        var timer = setInterval(function(){


            $banner.css('background',res[i]);

            i++;
            if(i>=4){
                
                i=0
            }
            // console.log(res[i])

        },3500);

    })
})();

// 手风琴
;(function(){
    jQuery(function($){
        //获取当前span
        var $span = $('.toplist');
        var $z_hf = $('.z_hf');


        $span.on('mouseover',function(){

            var $res = $(this).next('.z_hf').css('display','block');

            $res.closest('.hover').siblings('.hover').find('.z_hf').css('display','none')

            $(this).css('display','none').closest('.hover').siblings('.hover').find('.toplist').css('display','block');;

        
        });
            


    })
})();