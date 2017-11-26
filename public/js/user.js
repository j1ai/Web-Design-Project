$(function () {

    $('#login-button').click(function(){
      $('.user-button').fadeOut("slow",function(){
        // $('#register-button').fadeOut('slow');
        $("#container-login").fadeIn();
        TweenMax.from("#container-login", .4, { scale: 0, ease:Sine.easeInOut});
        TweenMax.to("#container-login", .4, { scale: 1, ease:Sine.easeInOut});
      });
    });


    $('#register-button').click(function(){
      $('.user-button').fadeOut("slow",function(){
        $("#container-register").fadeIn();
        TweenMax.from("#container-register", .4, { scale: 0, ease:Sine.easeInOut});
        TweenMax.to("#container-register", .4, { scale: 1, ease:Sine.easeInOut});
      });
    });



    $('#login-a').click(function(){
        // console.log($('#login-email').val())
        // console.log($('#login-password').val())
        $.ajax({
            type:'POST',
            url:'/user/login',
            data:{
                username: $('#login-username').val(),
                password: $('#login-password').val()
            },
            dataType:'json',
            success:function (result) {
                alert(result.message);
                // 登录成功
                if(result.code == 4){
                    loginBox.find('input').each(function () {
                        $(this).val('');
                    });
                }
            }
        })
    })


    $('#register-a').click(function(){
        // console.log($('#login-email').val())
        // console.log($('#login-password').val())
        $.ajax({
            type:'POST',
            url:'/user/register',
            data:{
                username: $('#register-username').val(),
                password: $('#register-password').val(),
                repassword: $('#register-repassword').val()
            },
            dataType:'json',
            success:function (result) {
                alert(result.message);
                // 登录成功
                if(result.code == 4){
                    loginBox.find('input').each(function () {
                        $(this).val('');
                    });
                }
            }
        })
    })



    $(".close-btn").click(function(){
      TweenMax.from(".container", .4, { scale: 1, ease:Sine.easeInOut});
      TweenMax.to(".container", .4, { left:"0px", scale: 0, ease:Sine.easeInOut});
      $(".container, #forgotten-container").fadeOut(800, function(){
        $('.user-button').fadeIn(800);
      });
    });

    /* Forgotten Password */
    $('#forgotten').click(function(){
      $("#container").fadeOut(function(){
        $("#forgotten-container").fadeIn();
      });
    });

})
