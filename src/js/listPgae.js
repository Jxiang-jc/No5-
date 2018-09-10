;(function(){
    jQuery(function($){
        var _pageNo=1;
        var _qty=36;
        var _type = 'default';
        var _rank = 3;
        var _read = 5;

        //页面初始化
        sendAjax();
        weekAjax();


        function sendAjax(){
            $.ajax({
                url:'../api/listPage.php',
                data:{
                    qty:_qty,
                    pageNo:_pageNo,
                    type:_type
                },
                dataType:'json',
                success:function(res){
                    // 先清空之前的内容
                    $('.cplist').html('');
                    $('.page_below').html('');

                    // console.log(res)
                    // 创建ul
                    let ul = document.createElement('ul');
                    ul.innerHTML = res.data.map(item=>{
                        return `<li data-guid="data-${item.id}">
                            <a href="#" class="jump"><img src="${item.imgurl}"></a>
                            <p class="content"><a href="#" class="name">${item.name}</a></p>
                            <div><span class="price">${item.price}</span><span class="zhekou">${item.zhekou}</span></div>
                            <button class="pushCar btn">加入购物车</button><button class="collect btn">收藏</button>

                        </li>`
                    }).join('');
                    $('.cplist').append(ul);

                        //创建分页
                        //计算分页总数
                        var pageLen =  Math.ceil(res.total/res.qty);

                        //创建div,用来装分页
                        var $page = $('<div/>');
                        $page.addClass('z_page');
                        // $page.html('666')
                        // console.log($page);

                        for(var i=0;i<pageLen;i++){
                            var $page_a = $('<a/>');
                            $page_a.html(i+1);
                            //高亮当前页
                            if(i == _pageNo-1){
                                $page_a.addClass('z_active');
                            }
                            $page.append($page_a);
                        }
                        $('.page_below').append($page);
                    //获取a标签-
                    var $links = $('.cplist .jump');
                    // console.log($links);
                    for(let j = 0;j<$links.length;j++){
                        $links.eq(j).on('click',function(){
                            // 通过索引值获取商品信息
                            let goods = res.data[j].id;
                            

                            var params = '';
                            for(var key in goods){
                                params += key + '=' + goods[key] + '&';
                            }
                            // 去除多余的&
                            params = params.slice(0,-1);

                            // 在js中跳到goods.html
                            location.href = 'goods.html?id=' + goods ;
                        })
                    }
                }
            })
        }
            

        //侧边数据生成列表
        function weekAjax(){
            $.ajax({
                url:'../api/rankList.php',
                data:{
                    rank:_rank,
                    read:_read,
                    pageNo:_pageNo
                },
                dataType:'json',
                success:function(rank){
                    // console.log(rank);
                
                    //一周销量排行 
                    var arr = [];
                    // 浏览过的还购买
                    var ary = [];
                    //通过遍历筛选出,哪些放上面,哪些放下面,这样就可以达到只请求一次ajax的目的
                    for(var i = 0;i<rank.data.length;i++){
                        if(rank.data[i].read_buy == 1){
                            ary.push(rank.data[i]);
                        }else{
                            arr.push(rank.data[i]);
                        }
                    }
                    arr = arr.slice(0,_rank);
                    ary = ary.slice(0,_read);
                    // console.log(ary,arr);

                    // 创建ul
                    // 一周销量排行榜
                    let ul_1 = document.createElement('ul');
                    ul_1.innerHTML = arr.map(item=>{
                        return `<li class="data-${item.id}">
                            <a href="#"><img src="${item.imgurl}"></a>
                            <p class="content"><a href="#">${item.name}</a></p>
                            <div><span class="price">${item.price}</span></div>
                        </li>`
                    }).join('');
                    ul_1.classList.add('ul_1');
                    $('.rankList').append(ul_1);


                    //浏览过的还购买
                    let ul_2 = document.createElement('ul');
                    ul_2.innerHTML = ary.map(item=>{
                        return `<li class="data-${item.id}">
                            <a href="#"><img src="${item.imgurl}"></a>
                            <p class="content"><a href="#">${item.name}</a></p>
                            <div><span class="price">${item.price}</span></div>
                        </li>`
                    }).join('');
                    ul_2.classList.add('ul_2');
                    // console.log(ul_2)
                    $('.liuLanBox').append(ul_2);             
                }
            })
        }

/*----------------------------------跳转详情页面--------------------------------*/

        $(document).on('click','a',function(){

            if($(this).closest('div').hasClass('z_page')){

                _pageNo = $(this).text();
                window.scrollTo(0,0);
                sendAjax();
            }
        })

/*--------------------------------添加cookie,写进购物车---------------------------*/


        $(document).on('click','.pushCar',function(e){

            var listPage = Cookie.get('listPage');

            if(listPage === ''){
                listPage = []
            }else{
                listPage = JSON.parse(listPage);//listPage必须为json字符串
            }

            let $currentLi = $(this).parent('li');
            var $guid = $currentLi.attr('data-guid')
            // console.log($currentLi,$guid);

            var currentGoods = listPage.filter(function(g){
                    return  g.guid === $guid
            })
            // console.log(currentGoods)

            if(currentGoods.length>0){
                //存在,数量+1
                currentGoods[0].qty++;
            }else{
                //不存在,添加商品
                var goods = {
                    guid : $guid,
                    imgurl : $currentLi.find('img')[0].src,
                    name : $currentLi.find('.name').text(),
                    price : $currentLi.find('.price').text(),
                    qty:1
                }
                listPage.push(goods);
            }
            Cookie.set('listPage',JSON.stringify(listPage));

        })

        
        
        
    })
})();

//购物车
;(function($){
    $.prototype.shoppingCar = function(){
        //获取购物车元素
        var $shoppingCar = $('.shoppingCar');
        var $car = $('#car');
        var listPage;
        
        $car.html('');
        // render();

        $('.shoppingCar p').on('mouseover',()=>{
            render();
        })
        

        //// 删除单个商品
        // * 找出删除的商品 -> 从数组中移除 -> 重写cookie -> 渲染页面
         $('#car').on('click','.btnDel',function(){
                //获取当前的li
                let $currentLi = $(this).parent('li');

                // 获取当前商品的guid
                var guid = $currentLi.attr('data-guid')

                // 找出数组中对应商品并移除
                for(var i=0;i<listPage.length;i++){
                    if(listPage[i].guid === guid){
                        listPage.splice(i,1);
                        break;
                    }
                }
                // 重写cookie
                Cookie.set('listPage',JSON.stringify(listPage));

                //重新渲染页面
                render();
         })
        

        function render(){

            listPage = Cookie.get('listPage');

            if(listPage === ''){
                console.log(666)
                listPage = []
            }else{
                listPage = JSON.parse(listPage);
            }

            //创建ul
            var $ul = $('<ul class="ulCar"/>');

            //计算总价
            var total = 0;

            $ul.html(
                listPage.map(function(item){
                    return `
                    <li data-guid=${item.guid}>
                        <img src="${item.imgurl}">
                        <p class="carName">${item.name}</p>
                        <p class="carPrice">￥${item.price} X ${item.qty}</p>
                        <p class="btnDel">删除</p>
                    </li>`
                }).join('')
            )
            $car.html('')
            $car.append($ul)
        }

    }
})(jQuery);


 

