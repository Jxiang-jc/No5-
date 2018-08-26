

//头部搜索
;(function($){
    $.prototype.search = function(){
        //获取inpu边框
        var $input = $('#searchInput');

        //获取input内容
        var vals = $input.val();

        //删除按钮
        var $z_delSearch = $('#pageHeader_b .container .col-lg-6 .z_delSearch');


        //鼠标移进input,改变背景颜色,以及显示 ×
        $input.on('mouseover',function(){

            $input.addClass('inputBgc');
            
            $z_delSearch.css('visibility',"visible");

            //嵌套事件
            $z_delSearch.on('click',function(){
                //清空内容
                $input.val('');
            })
        })

        //鼠标移出时,清空上面的效果
        //不论鼠标指针离开被选元素还是任何子元素，都会触发 mouseout 事件。
        //只有在鼠标指针离开被选元素时，才会触发 mouseleave 事件。
        $('.input-group').on('mouseleave',function(){

            $input.removeClass('inputBgc');

            $z_delSearch.css('visibility',"hidden");


        })


        //点击清空input内容
        $input.on('click',function(){
             $input.val('');

        })


        var newVal;

        //动态获取input的值//借鉴baidu.search在php章节
        $input.on('input',function(){
            newVal = $input.val();
        })

        //失去焦点时自动填充内容
        $input.on('blur',function(){
            //如果内容为空,则用一开始的val,如果不为空,则动态获取输入框的val
            $input.val()!=''?  $input.val(newVal) : $input.val(vals)

            $z_delSearch.css('visibility',"hidden");

        })

    }
})(jQuery);

//头部二维码
;(function($){
    $.prototype.qrcode = function(){
        var $box = $('.qrcode_box');
        var $ul = $('#mobile-ewm');
        // console.log($ul)

        $box.on('mouseover',function(){
            $ul.css('visibility','visible');
            // console.log(666)
        })
        
        $box.on('mouseout',function(){
            // console.log(777)
            $ul.css('visibility','hidden');
        })
    }
})(jQuery);
// 判断时间
;(function($){
     $.prototype.dateShow = function(){
        //获取span标签
        var $span = $('#pageHeader_t .container .header_l  .date');
            // console.log($span)

        //获取当前时间
        var $now = new Date();
        var $hour = $now.getHours();  

        //判断上午或是下午
        let times = $hour>=12 ? '下午好,':'上午好,';

        //写进页面
        $span.html(times);
    }
})(jQuery);