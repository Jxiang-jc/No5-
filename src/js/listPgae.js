;(function(){
    jQuery(function($){
        var _pageNo=1;
        var _qty=36;
        var _type = 'default';
        var _rank = 3;
        var _read = 5;

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
                        return `<li class="data-${item.id}">
                            <a href="#"><img src="${item.imgurl}"></a>
                            <p class="content"><a href="#">${item.name}</a></p>
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
                }
            })
        }

        // 一周销量排行榜
        function weekAjax(){
            $.ajax({
                url:'../api/rankList.php',
                data:{
                    rank:_rank,
                    read:_read
                },
                dataType:'json',
                success:function(rank){
                    console.log(rank);
                
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
                    arr = arr.slice(0,3);
                    ary = ary.slice(0,5);
                    console.log(ary,arr);

                    // 创建ul
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


                    let ul_2 = document.createElement('ul');
                    ul_2.innerHTML = ary.map(item=>{
                        return `<li class="data-${item.id}">
                            <a href="#"><img src="${item.imgurl}"></a>
                            <p class="content"><a href="#">${item.name}</a></p>
                            <div><span class="price">${item.price}</span></div>
                        </li>`
                    }).join('');
                    ul_2.classList.add('ul_2');
                    console.log(ul_2)
                    $('.liuLanBox').append(ul_2);


                    
                }
            })
        }

            $(document).on('click','a',function(){

                if($(this).closest('div').hasClass('z_page')){

                    _pageNo = $(this).text();
                    window.scrollTo(0,0);
                    sendAjax();
                }
            })
        })
})();