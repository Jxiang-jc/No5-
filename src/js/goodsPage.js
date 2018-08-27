;(function(){
    jQuery(function($){
        // $('#pageHeader_t').load('./header_t.html',function(){
        //     $('#pageHeader_t').dateShow();
        // });
        // $('#pageHeader_b').load('./header_b.html',function(){
        //     $('#pageHeader_t').search();
        //     $('#pageHeader_t').qrcode();


        // });
        // $('#pageNav').load('./pageNav.html');
        // $('#pageFooter').load('./pageFooter.html')

        // //放大镜
        // //等待页面头部加载完成以后再加载放大镜,否则top值会有问题
        // $('.goods').lxzoom({width:380,height:380})

        // $('.small').on('click','img',function(){
        //     $('.goods img').attr({
        //         'src':this.src,
        //         'data-big':this.dataset.big
        //     });
        // })




        // let goods = {
        //     Img:'.zoomFirst',
        //     title:'h2',
        //     price:'.no5Price',
        //     market:'.marketPrice',
        //     discount:'.discountPrice',
        //     brand:'.goodsBrand',
        //     sort:'.sort',
        //     grade:'.goodsRank',

        //     init(){

        //         // this.getData()
        //     },



        // }

        // goods.init();

        //     //查找商品数据
            var num = 2;

            $.ajax({
                type:'get',
                url:'../api/details.php',
                data:{idx:1},
                dataType:'json',
                success:function(rank){
                    console.log(rank);
  
                }
            })







    });
})();
