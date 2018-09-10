

// 手风琴
; (function () {
    jQuery(function ($) {
        //获取当前span
        var $span = $('.toplist');
        var $z_hf = $('.z_hf');


        $span.on('mouseover', function () {

            var $res = $(this).next('.z_hf').css('display', 'block');

            $res.closest('.hover').siblings('.hover').find('.z_hf').css('display', 'none')

            $(this).css('display', 'none').closest('.hover').siblings('.hover').find('.toplist').css('display', 'block');


        });



    })
})();
//谨防诈骗
; (function () {
    jQuery(function ($) {
        var $wenzi = $('.wenzi');

        class Notice {
            //构造函数
            constructor(wenzi) {
                this.wenzi = wenzi;
                this.idx = 1
            }
            //方法
            init() {
                //进入页面自动播放
                this.timer = setInterval(this.autoPlay.bind(this), 450);
            }
            //向上移动
            autoPlay() {
                this.play();
                this.idx++
            }
            play() {
                this.wenzi.show();
                if (this.wenzi.position().top < -5) {
                    this.idx = -1;
                    this.wenzi.hide();
                }
                this.wenzi.animate({ top: -10 * this.idx })
            }
        }
        //实例
        var n1 = new Notice($wenzi);
        //初始化
        n1.init();



    })
})();

// //限时抢购
; (function () {
    jQuery($ => {

        //页面初始化
        sendAjax();

        function sendAjax() {
            let jqGetAjaxPromise = new Promise(function (resolve, reject) {
                // // 用于保存所有商品
                var goodslist = Cookie.get('goodslist');//[{},{}], 

                if (goodslist === '') {
                    goodslist = [];
                    $.ajax({
                        url: './api/limitBuy.php',
                        data: {},
                        success: function (res) {
                            res = JSON.parse(res)
                            // console.log(res)
                            //先清空之前的内容
                            $('.z_limit').html('');

                            //创建div
                            let $container = $('<div class="container"/>');

                            $container.append(`<p><span>限时抢购</span><span>LIMIT BUY</span></p>`);

                            $container.append(
                                res.map(function (item, idx) {
                                    return `
                                        <div class="fl">
                                            <a href="#" class="goodsBox ">
                                                <div class="times">剩余00小时00分00秒</div>
                                                <img src="${item.imgurl}" height="260" width="260" class="imgLimit"/>
                                                <p class="goodsContent">${item.content}</p>
                                                <div class="price">￥<span>${item.price}</span></div>
                                                <p class="purchased"><strong>${item.bought}</strong>人已购买</p>
                                            </a>
                                        </div>
                                      `
                                }).join('')
                            )
                            $('.z_limit').append($container);

                            //获取img,一定要等img出来以后才能获取它的src
                            let $img = $('.imgLimit');                                 

                            //原生js的方法
                            if ($img.length===4) {
                                console.log(555)
                                showImg();
                            } else {
                                $img.load(function(){
                                    console.log(666)
                                    showImg();
                                })
                            }
                        

                            function showImg() {
                                for (var i = 0; i < $('.goodsBox').length; i++) {
                                    //获取商品信息，并写入对象
                                    var goods = {
                                        imgurl: $('.imgLimit').eq(i)[0].src,
                                        name: $('.goodsContent').eq(i).text(),
                                        price: $('.price').eq(i).text(),
                                        purchase: $('.purchased').eq(i).text()
                                    }
                                    goodslist.push(goods);

                                    Cookie.set('goodslist', JSON.stringify(goodslist));
                                }
                            }

                            resolve();
                        }
                    })
                } else {
                    goodslist = JSON.parse(goodslist);
                    console.log(goodslist)

                    //先清空之前的内容
                    $('.z_limit').html('');

                    //创建div
                    let $container = $('<div class="container"/>');

                    $container.append(`<p><span>限时抢购</span><span>LIMIT BUY</span></p>`);

                    $container.append(
                        goodslist.map(function (item) {
                            return ` 
                            <div class="fl">
                                <a href="#" class="goodsBox ">
                                    <div class="times">剩余00小时00分00秒</div>
                                    <img src="${item.imgurl}" height="260" width="260" class="imgLimit"/>
                                    <p class="goodsContent">${item.name}</p>
                                    <div class="price"><span>${item.price}</span></div>
                                    <p class="purchased"><strong>${item.purchase}</strong></p>
                                </a>
                            </div>`
                        }).join('')
                    )
                    $('.z_limit').append($container);



                    resolve();

                }

            })
            jqGetAjaxPromise.then(function () {
                let limitTime = new Promise(function (resolve, reject) {



                    //1.指定结束时间
                    var endTime = new Date('2018/9/1,23:00:00');
                    // console.log(endTime);//Sat Sep 01 2018 00:00:00 GMT+0800 (中国标准时间)

                    function showTime() {

                        var curTime = new Date();//当前时间一定要在这里获取

                        //如果当前时间大于目标时间，则加上一天；直到目标时间大于当前时间
                        if (endTime.getTime() <= curTime.getTime()) {

                            //entTime得到的是上面一串东西,要加一天的话,用通过以下的方法
                            endTime = endTime.getTime() + 24 * 60 * 60 * 1000;

                            //把endTime得到的一串数字转换成new Date格式
                            endTime = new Date(endTime);

                            // console.log(666)
                        }

                        // console.log(curTime.getMinutes(), curTime.getSeconds())

                        //每过24小时,清除一次cookie信息.
                        if (curTime.getHours() === 23 && curTime.getMinutes() == 0 && curTime.getSeconds() == 0) {
                            //清除cookie,重新更新页面
                            Cookie.remove('goodslist');
                            console.log(curTime.getMinutes(), curTime.getSeconds())

                        }


                        //2.不断拿当前时间跟结束时间对比，计算差值（单位：s）
                        var offset = parseInt((endTime.getTime() - curTime.getTime()) / 1000);

                        //3.把差值转换成《剩余时间》
                        var ms = parseInt(((endTime.getTime() - curTime.getTime()) / 100) % 10);//毫秒
                        var sec = parseInt(offset % 60);//秒
                        var min = parseInt(offset / 60 % 60);//分
                        var hour = parseInt(offset / (60 * 60) % 24);//小时

                        // // 补0操作
                        sec = sec < 10 ? '0' + sec : sec;
                        min = min < 10 ? '0' + min : min;
                        hour = hour < 10 ? '0' + hour : hour;

                        // 4.拼接时间格式，写入页面
                        $('.times').html(`剩余<span>${hour}</span>小时<span>${min}</span>分钟<span>${sec}.${ms}</span>秒`);
                    }
                    showTime();
                    var timer = setInterval(showTime, 100);

                    console.log($('.goodsContent'))



                    resolve();
                })
            })



        }
    })
})();