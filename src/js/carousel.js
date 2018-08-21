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
            console.log(res[i])

        },3500);

        (function(){
            for(let j = 0;j<$lis.length;j++){
                
            }
        })()



        // $lis.each(function(idx,item){
        //     console.log(idx,item)
            
        //     if($lis.index(item) == 0 &&  $lis.eq(idx).hasClass('active')){
        //         $banner.css('background','#F6EDE4');
        //     }if($lis.index(item) == 1 &&  $lis.eq(idx).hasClass('active')){
        //         $banner.css('background','red');

        //     }

            // console.log($lis.index(item))
            // if($lis.index(item) == 0){
            //     $banner.css('background','#F6EDE4');
            // }
            // if($lis.index(item) == 1){
            //     $banner.css('background','red');
            // }
        // })

        // idx.eq(1).closest('.banner').css('background','red');
        // idx.eq(2).closest('.banner').css('background','green');


        // for(let i = 0;i<$lis.length;i++){
        //     if($lis.eq(i).html() == 1 && $lis.eq(i).hasClass('active')){
        //         console.log($lis.eq(1).hasClass('active'))
        //         console.log(i)
        //         $banner.css('background','#F6EDE4');
        //     }
        //     else if($lis.eq(i).html() == 2 && $lis.eq(i).hasClass('active')){
        //         console.log($lis.eq(1).hasClass('active'))
        //         console.log(i)
        //         $banner.css('background','red');
        //     }
        // };

     

        

    })
})();