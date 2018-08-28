;(function(){
    jQuery(function($){
        $('#pageHeader_t').load('./header_t.html',function(){
            $('#pageHeader_t').dateShow();
        });
        $('#pageHeader_b').load('./header_b.html',function(){
            $('#pageHeader_t').search();
            $('#pageHeader_t').qrcode();


        });
        $('#pageNav').load('./pageNav.html');
        $('#pageFooter').load('./pageFooter.html')

        //放大镜
        //等待页面头部加载完成以后再加载放大镜,否则top值会有问题
        $('.goods').lxzoom({width:380,height:380})

        $('.small').on('click','img',function(){
            $('.goods img').attr({
                'src':this.src,
                'data-big':this.dataset.big
            });
        })




        let goods = {
            Img:'.zoomFirst',
            title:'h2',
            price:'.priceVal',
            market:'.marketPrice',
            discount:'.discountPrice',
            brand:'.goodsBrand',
            sort:'.sort',
            grade:'.goodsRank',
            num:'.num',
            name:'.engNameVal',

            //初始化
            init(){

                this.getData()
            },
            //查找商品数据
            getData(){
                // var num = location.search.slice(1);
                // num = num.split('=');
                // var _idx = num[1];
                // console.log(_idx);

                // $.ajax({
                //     url:'../api/details.php',
                //     data:{idx:_idx},
                //     // dataType:'json',
                //     success:function(rank){
                //        this.datas = JSON.parse(rank);
                //        this.render(this.datas);
                //     }
                // }) 
                                    
                
                $.post('../api/details.php',`${location.search.slice(1)}`, (data)=>{
                    this.res = JSON.parse(data)[0];
                    console.log(this.res)
                    this.render(this.res);

                });

            },
            render(res){

                // console.log(res.brand)
                $(this.title).html(`${res.name}`);
                $(this.price).html(`<span>￥</span>${res.price}`);
                $(this.market).html(`${res.maket_p}`);
                $(this.discount).html(`${res.discount}`);
                $(this.brand).html(`<a href="#" >${res.brand}</a>`);
                $(this.sort).html(`${res.sort}`);
                $(this.num).html(`${res.num}`);
                $(this.name).html(`${res.eng_name}`);
            }
        }

        goods.init();









    });
})();
