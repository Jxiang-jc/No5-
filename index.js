//引入模块化文件
require(['config'],function(){

    require(['jquery'],function($){

            // jQuery($=>{
                for(let $i=1; $i<11;$i++){
                    $(".List").append(`<div class='fl swiper-slide'>
                        <img src='../img/g${$i}.jpg'/>
                        <p>
                        <span>Pony 幻彩粉嫩腮红经典色</span>
                        <span><i>￥</i>88</span>
                        <span><i>￥</i>159</span>
                        </p>
                        </div>
                    `)
                    
                };

                //请求数据生成页面内容
                $.ajax({
                    type:'get',
                    url:'../api/index.php',
                    success:function(data){
                        let res = JSON.parse(data);
                        let $ul = $("<ul\>");
                        $(res).map(function(idx,item){
                            // 获取价格计算优惠差价
                            let y = item.yPrice;
                            let n = item.Price;
                            let youhui = (y-n).toFixed(2);
                            //首页产品结构生成
                            return $ul.append(`
                                <li class='fl' data-spid=${item.SPID}>
                                    <div class="index-List">
                                    <img src='../${item.imgurl}'/>
                                    <h3>${item.title2}</h3>
                                    <div class="Price clearfix">
                                    <span class='nowPrice'>￥<i>${item.Price}</i></span>
                                    <p class='saleLow'>
                                    <span class='yPrice'>￥<i>${item.yPrice}</i></span><br/>
                                    <span>立省￥<i>${youhui}</i></span>
                                    </p>
                                    <button class="addBtn">加入购物车</button>
                                    </div>
                                    </div>
                                </li>
                            `)
                        });
                        $ul.appendTo($('#main #container'));
                        $("#main ul").addClass("clearfix goodsList");

                        //点击添加商品到购物车   
                        let qty=0;

                        $("#main .goodsList").on('click','button',function(){

                            let List = localStorage.getItem('List');
                 
                            if(List===null){
                                
                                List=[];

                            }else{

                                List = JSON.parse(List);
                               
                            }
                            //找到当前li 并获取自定义属性值以及对应的索引值
                            let currentLi = $(this).closest('li');
                            let spId = currentLi.attr('data-spid');
                            let idx = currentLi.index();

                            //grep过滤出localStorage已经存在的商品
                            var currentGoods = $.grep(List,function(item,idx){

                                return item.SPID==spId;
                            })

                            if(currentGoods.length>0){

                                currentGoods[0].qty++;
                            }else{

                                //将数据写入localStorage
                                var dataList = {
                                    imgurl:res[idx].imgurl,
                                    title:res[idx].title2,
                                    Price:res[idx].Price,
                                    repertory:res[idx].repertory,
                                    SPID:res[idx].SPID,
                                    total:0,
                                    qty:1,
                                };
                                //将数据插入到数组中
                                List.push(dataList);

                            }
                            //JSON数组转成JSON字符串
                            List = JSON.stringify(List);

                            localStorage.setItem('List',List);//将数据储存到localStorage

                            window.location.reload(); //刷新页面
                            // $('.cart-content-index').load("http://localhost:1889/ .cart-content-list");

                        });        
                            //获取localStorage里面的商品信息
                            var goods = JSON.parse(localStorage.getItem('List')); 
                            //声明变量用于存放总价
                            let $totalPrice = 0;
                            //遍历JSON字符串的信息
                            //把结构写到购物车
                            $(goods).map(function(idx,item){       
                                
                                $('.cart-content-index').append(`       
                                    
                                    <ul class='cart-content-list clearfix'>
                                    <h4>跨境商品</h4>
                                    <li class='fl cart-img'>
                                        <img src="../${item.imgurl}" />
                                    </li>
                                    <li class='fr clear-cart'>
                                        <span>${item.title}</span>
                                        <span class='subtract'></span>
                                        <i class='cart-count'>${item.qty}</i>
                                        <span class='add'></span>
                                        <span class='shopping-price'>￥<i class='nowPrice'>${item.Price}</i><i class='cart-garbage'></i></span>   
                                    </li>
                                    </ul>
                                `)

                                //计算购物车商品的数量
                                 $('.cart-index .count').text(idx+1);
                                // 计算总价
                                $totalPrice += (item.Price*item.qty)*1;
                            });
                                //将总价写入页面
                                $('.cart-index .totalSum').text($totalPrice.toFixed(2))

                                //删除对应商品
                                let $currentParent = $('.cart-content-index');
                               
                                $currentParent.on('click','.cart-garbage',function(){

                                    let $currentUl = $(this).parents('.cart-content-list');

                                    let $currentIdx = $currentUl.index();
                                    //循环找出localStorage里面对应的索引值
                                    $(goods).map(function(idx,item){

                                            if($currentIdx==idx){

                                                goods.splice(idx,1);

                                                localStorage.setItem('List',JSON.stringify(goods))

                                                window.location.reload();
                                                // $('.cart-content-index').load("http://localhost:1889/ .cart-content-list");
                                            }
                                    });

                                });

                                //添加商品数量
                                $currentParent.on('click','.add',function(){
                                    //获取当前商品的当前数量并且加1
                                    // let $addCount = $(this).prev().text()*1 + 1;
                                    let $addCount = $(this).prev().text();
                                        $addCount++;

                                     $(this).prev().text($addCount);

                                     //获取当前商品的价格
                                    let $currentPrice = $(this).next().children().eq(0).text();

                                    //在当前总价的基础上加上增加一件商品的价格
                                    $totalPrice += $currentPrice*1;

                                    //更新页面的总价
                                    $('.totalSum').text($totalPrice.toFixed(2));

                                    //更新localStorage里面的件数
                                    let $currentUl = $(this).parents('.cart-content-list');

                                    let $currentIdx = $currentUl.index();

                                    $(goods).map(function(idx,item){

                                        if($currentIdx==idx){

                                            goods[idx].qty=$addCount;

                                            localStorage.setItem('List',JSON.stringify(goods))

                                            // window.location.reload();
                                        }
                                    });

                                });
                            
                                
                                $currentParent.on('click','.subtract',function(){

                                    //获取当前商品的数量
                                    let $subtract= $(this).next().text();

                                    //判断当数量大于1时，减号按钮可用，并可以减少数量
                                    if($subtract>1){
                                            //设置按钮是否可用
                                            $(this).prop('disabled','');
                                            $subtract--;
                                
                                            $(this).next().text($subtract);

                                            //更新总价
                                            //获取当前商品的价格
                                            let $currentPrice = $(this).nextAll().eq(2).children().eq(0).text();
                                            
                                            //在当前总价的基础上加上减去一件商品的价格
                                            $totalPrice -= $currentPrice*1;

                                            //更新页面的总价
                                            $('.totalSum').text($totalPrice.toFixed(2));

                                            //更新localStorage里面的件数
                                            let $currentUl = $(this).parents('.cart-content-list');

                                            let $currentIdx = $currentUl.index();
                           
                                            $(goods).map(function(idx,item){

                                                if($currentIdx==idx){

                                                    goods[idx].qty=$subtract;

                                                    localStorage.setItem('List',JSON.stringify(goods))

                                                    // window.location.reload();
                                                }
                                            });


                                    }else{

                                        $(this).prop('disabled','disabled');

                                    }
                                }); 

                                //1、侧边栏实时显示当前购物车商品数量
                                //2、购物车为空时不显示结算按钮以及总价计算
                                if(goods.length>0){

                                    $('.sp-count').show();

                                    $('.sp-count').text(goods.length);

                                    $('.total-count-price').show();
                                    $('.btn-toltal-index').show();

                                }else{

                                    $('.sp-count').hide();
                                    $('.cart-content-index').text('购物车很空哦...')

                                    //购物车为空时不显示底下部分
                                    $('.total-count-price').hide();
                                    $('.btn-toltal-index').hide();

                                } 
                                if(goods.length>=3){

                                    $('.cart-content-index').css({
                                        height:'500px',
                                        overflow:'auto',
                                    })
                                };  

                            //首页点击商品跳转详情页
                            $('#main .goodsList').on('click','img',function(){

                                //找到当前li 
                                //并获取自定义属性值以及对应的索引值
                                let currentLi = $(this).closest('li');
                                let spId = currentLi.attr('data-spid');
                                //页面的index是从0开始，数据中是从1开始，所以加1
                                let $idx = currentLi.index()+1;

                   
                                 //遍历数组得到相同ID的那条信息
                                $(res).map(function(idx,item){

                                    if(item.SPID === spId ){

                                //声明变量接收当前点击的那个商品的信息
                                        let $Code=[];
                                        $Code.push(item);
                                
                                
                                //将数据储存到localStorage中
                                
                                    $Code = JSON.stringify($Code);

                                    window.localStorage.setItem('$Code',$Code);

                                    }
                                });

                                // 点击图片跳转
                                window.location.reload();
                                $(location).attr('href','./html/goods.html');

                            });
                                    
                                
                    },     
                });


                //logo点击刷新页面
                $('.index-logo').on('click',function(){

                    window.location.reload();

                });
                
                //跳转登入页面
                $('.index-btnDr').on('click',function(){

                    window.location.reload();
                    $(location).attr('href','html/login.html');

                });
                //跳转注册页面
                $('.index-btnZc').on('click',function(){

                    window.location.reload();
                    $(location).attr('href','html/create.html');

                });

                //返回顶部
                let $target =0;
                $(window).on('scroll',function(){

                    if(window.scrollY>=500){
                        $('.toTop i').css('display','block');
                    }else{
                        $('.toTop i').css('display','none');
                    }
                });

               
                $('.toTop').on('click',()=>{
                    let $timer = setInterval(()=>{

                        let $speed = Math.floor($target-window.scrollY)/20;

                        scrollBy(0,$speed);

                        if(window.scrollY<=0){

                            clearInterval($timer);
                            scrollTo(0,0);
                        }
                    },30);
                });
                //鼠标进入时触发
                $('.userSet').on('mouseenter','li',function(){

                    $(this).find('span').css('display','block').animate({right:'40px'},'slow');
                });
                //鼠标离开时触发
                $('.userSet').on('mouseleave','li',function(){

                    $(this).find('span').css('display','none').animate({right:'80px'},30);
                });

                //轮播图
                let $targetLen = $('.pageList .List div').outerWidth();
                let $len = $('.pageList .List div').length;
                let $List_len = $targetLen*$len;
                // console.log($len)
                $('.List').width(`${$List_len}px`);
                var $timer;
                let $idx;
                let $left;
                autoPlay();
                function autoPlay(){
                    $left=0;
                    $idx =0;
                    $timer = setInterval(function(){
                        
                        $left+=$targetLen;
                        $('.List').animate({
                            left:-$left + 'px',

                        },500)

                        if($idx==$len/2){

                            clearInterval($timer);

                            $('.List').animate({

                                left:0+ 'px',

                            },1500);

                            $idx =0;
                            autoPlay();
                        }
                        $idx++;
                    },2000)
                };
              
                //鼠标移入停止动画
                $('.pageList .List div').on('mouseenter',()=>{

                    clearInterval($timer);
              
                });
                //鼠标移出执行动画
                $('.pageList .List div').on('mouseleave',()=>{
                    autoPlay();

                });

                //pre点击事件
                $('.pre').on('click',()=>{

                    $('.List').animate({
                            left:(-($idx+1)*$targetLen) + 'px',

                        },500)
                });

                //next点击事件
                $('.next').on('click',()=>{

                    $('.List').animate({

                            left:(-($idx-1)*$targetLen) + 'px',
             
                        },500);

                    if($left===0){

                    $('.next').prop('disabled','disabled');

                    }
                });

                //首页二级菜单跳转列表页
                $('.erj_menue li').on('click',()=>{console.log(888)

                    window.location.reload();
                    $(location).attr('href','html/lieb.html');

                });
                //首页侧边栏购物车点击弹出购物车
                $('.goodList').on('click',function(){

                    $('.cart-index').css('display','block')
                });

                //btn按钮关闭购物车
                $('.cart-close').on('click',function(){

                    $('.cart-index').css('display','none')
                });

            // });

    })
}); 