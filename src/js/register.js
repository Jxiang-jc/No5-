;(function(){
    jQuery(function($){
        //获取所有的input除了btn以外
        var $input = $("input:not(.btn)");
        //获取注册from的input.
        var $zhuCeInput = $(".reg_r :input:not(.btn)");

        // 获取登录form下的.help-block
        var $userSpan1 = $('#username1').siblings('.help-block');
        var $passSpan1 = $('#password1').siblings('.help-block');

        //获取注册form下的 .help-block
        var $userSpan2 = $('#username2').siblings('.help-block');
        var $passSpan2 = $('#password2-1').siblings('.help-block');
        var $emailSpan2 = $('#email').siblings('.help-block');
        var $yzm2Span = $('#yzm2').siblings('.help-block');


         

             //聚焦时背景变蓝
            $input.focus(function(){
                $(this).css('background','#eaf5ff');
                //用户名
                if($(this).hasClass("username2")){
                    $userSpan2.html('3~30位,由汉字、字母、数字、减号、下划线组成！');
                    $userSpan2.css('color','#000')
                }
                //密码
                if($(this).hasClass("password2-1")){
                    $passSpan2.html('6~16位,建议使用字母、数字、特殊符号组合');
                    $passSpan2.css('color','#000')
                }
            })
                 
            //失去焦点时,清空背景颜色.一定要放在下面的函数之前,不然会覆盖
            $input.blur(function(){
                $(this).css('background','#fff');
                if($(this).val() != ''){
                    $(this).siblings('.help-block').html('');
                }
            })

            //用户名失去焦点后ajax请求,单独对 用户名 进行请求
            $("#username2").blur(function(){
                var _username2 = $("#username2").val();
                // console.log(_username2)
                $.ajax({
                    type:'get',
                    url:'../api/check_username.php',
                    data:{username2:_username2},
                    success:function(xhr){
                            // console.log(xhr);
                        if(xhr === 'no'){
                            $userSpan2.html('对不起，用户名已被注册，请您重新输入!');
                            $userSpan2.css('color','#f00');
                            $('.z_right1').css('display','none');
                            return false;
                        }else if(xhr === 'yes' && $("#username2").val() != ""){
                            // $userSpan2.html('');
                            $('.z_right1').css('display','inline-block');
                            $("#username2").css('background','#fff')
                            return false;
                            }
                        }
                    })
            })                

            //注册from失去焦点时触发     
            $zhuCeInput.blur(function(){

                if($(this).val()===""){
                    $(this).css('background','#FFFDDF');
                
                    // 用户名
                    if($(this).hasClass("username2")){
                        $userSpan2.html('用户名的长度应为3～30个字符之间(汉字占两个字符)');
                        $userSpan2.css('color','#f00');
                        $('.z_right1').css('display','none');//箭头消失
                        return false;
                    }
                    //密码
                    if($(this).hasClass("password2-1")){
                        $passSpan2.html('密码的长度应该为6～16个字符之间');
                        $passSpan2.css('color','#f00');
                        return false;
                    }
                    //email
                    if($(this).hasClass("email")){
                        $emailSpan2.html('请您输入邮件地址!')
                        return false;
                    }
                }

            //-------------------以下是正则----------------------
            //获取用户名/密码/email的值
                var _username2 = $("#username2").val();
                var _password2 = $("#password2-1").val();
                var _password3 = $("#password2-2").val();

                    //用户名
                    if(!/^[\w\-\u2E80-\u9FFF]{3,30}$/.test(_username2)){ 
                        $userSpan2.html('用户名的长度应为3～30个字符之间(汉字占两个字符)');
                        $userSpan2.css('color','#f00');
                        $('.z_right1').css('visibility','hidden');//箭头隐藏
                        return false;
                      }else{
                        $('.z_right1').css('visibility','visible');//这里不能用display,因为会覆盖上面的,跟上面有冲突,只会执行上面的ajax,他的层级更高.所以无论对错都会显示 '√'
                    }   

                    //密码
                    if(/^\d+$/.test(_password2)){
                        $passSpan2.html('密码不能纯数字');

                        $('.z_right2').css('display','none');

                        $passSpan2.css('color','#f00');

                        return false;

                      }else if(_password2.length<6){

                        $passSpan2.html('密码的长度应该为6～16个字符之间');

                        $('.z_right2').css('display','none');

                        $passSpan2.css('color','#f00');

                        return false;
                      }
                      //这个正则的意思就是任意的字母或数字或下划线（捕获为组1）0次到多次跟着一个任意的字母或数字或下划线（捕获为组2）紧跟着“\2{3}”是指反向捕获 组2（就是这里的内容要和组2一样的并且出现3次，所以就等于四个重复的）后面跟着一个任意的字母或数字或下划线0次到多次
                      else if(/^(\w)*(\w)\2{3}(\w)*$/g.test(_password2)){
                        $passSpan2.html('密码过于简单，为保证您的帐户安全请重设密码!');

                        $passSpan2.css('color','#f00');

                        $('.z_right2').css('display','none');

                        return false;
                      }else{
                        $('.z_right2').css('display','inline-block');

                    }
                    //确认密码
                    if(_password3 != _password2 && _password3 != ""){
                            $('#password2-2').siblings('.help-block').html('两次密码不一致');

                            $('.z_right3').css('display','none');

                            $('#password2-2').siblings('.help-block').css('color','#f00');

                            return false;

                        }else if(_password3 ===""){
                            $('.z_right3').css('display','none');

                            return false;
                        }else{
                            $('.z_right3').css('display','inline-block');
                          
                        }                            
            })
                    
                //邮箱验证
                $("#email").change(function(){
                    var _email = $("#email").val();

                    if(!/^[a-z0-9][\w\-\.]{2,29}@[a-z0-9\-]{2,67}(\.[a-z\u2E80-\u9FFF]{2,6})+$/.test(_email)){
                        $emailSpan2.html('邮件地址的格式不正确，请您重新输入!');
                        $emailSpan2.css('color','#f00');
                        $('.z_right4').css('display','none');
                        return false;
                      }else{
                        $('.z_right4').css('display','inline-block');
                    }
                })


                

/*------------------------------------------------------------------------------*/

        //获取showCode
        var $showCode1 = $('#showCode1');
        var $showCode2 = $('#showCode2');
                
            //页面初始化
            $showCode1.html(createCode);
            $showCode2.html(createCode);
                
            //点击重新生成验证码
            $showCode1.click(function(){
                $showCode1.html(createCode);
                //随机颜色
                $showCode1[0].style.color = randomColor();

            })
            $showCode2.on('click',function(){
                $showCode2.html(createCode);
                //随机颜色
                $showCode2[0].style.color = randomColor();

            })   
                
                
            //随机验证码
            function createCode(){ 
                var res = '';

                for(var i =0;i<4;i++){
                    //随机数字
                    var num = randomNumber(0,9);
                    res += num;
                }
                return res;
            }


        //点击登录,判断验证码是否正确
        var $btnReg1 = $('.btnReg1');
        var $btnReg2 = $('.btnReg2');
        var $yzm1 = $('#yzm1');
        var $yzm2 = $('#yzm2');

            //登录按钮
            $btnReg1.click(function(){
                //获取输入的值
                var $_yzm1 = $yzm1.val();
                
                if($('#username1').val() === ''){
                    $userSpan1.html('请输入用户名');
                    return false;

                }else if($('#password1').val() === ''){
                     $passSpan1.html('密码不能为空');
                     return false;

                }else if($_yzm1 != $showCode1.html()){
                    $yzm1.siblings('.help-block').html('验证码输入错误!');
                    return false;
                }
            })

            //注册按钮
            $btnReg2.click(function(){
                //获取输入的值
                var $_yzm2 = $yzm2.val();
                // console.log($_yzm2,$showCode2.html(),$yzm2.siblings('.help-block'))
                
                if($('#username2').val() === ''){
                    $userSpan2.html('请输入用户名');
                    return false;

                    }else if($('#password2-1').val() === ''){
                        $passSpan2.html('请输入密码');
                        return false;
                    }else if($_yzm2 != $showCode2.html()){
                        $yzm2Span.html('验证码输入错误!');
                        return false;
                    }else if($("#email").val()=== ""){
                        $emailSpan2.html('请输入邮箱');
                        return false;
                }

                //获取用户名/密码/email的值
                var _username2 = $("#username2").val();
                var _password2 = $("#password2-1").val();
                var _email = $("#email").val();

                $.ajax({
                    type:'post',
                    url:'../api/reg.php',
                    data:{
                        username2:_username2,
                        password2:_password2,
                        email:_email
                    },
                    success:function(xhr){
                       // console.log(xhr);
                       if(xhr == 'success'){
                            alert('恭喜你注册成功');
                            location.href  = '../index.html';
                       }
                    }
                });
            })
    })
})();