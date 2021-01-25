<!-- Login-Wrapper -->

<section class="login-form">
   <div class="container">
      <section id="formHolder">

         <div class="row">

            <!-- Brand Box -->
            <div class="col-sm-6 brand">
               <a href="#" class="logo"><img src="<?= base_url() ?>assets/front/images/logo.png" alt="" class="img-fluid">
                  <!-- BMD <span>.</span> --></a>

               <div class="success-msg">
                  <p>Great! You are one of our members now</p>
                  <a href="#" class="profile">Your Profile</a>
               </div>
            </div>


            <!-- Form Box -->
            <div class="col-sm-6 form">

               <!-- Login Form -->
               <div class="login form-peice">
                  <form class="login-form" action="#" method="post">
                      <h2>Login</h2>
                     <div class="form-group">
                        <label for="loginemail" class="">Email Adderss</label>
                        <input type="email" name="loginemail" id="loginemail" required="">
                     </div>

                     <div class="form-group">
                        <label for="loginPassword">Password</label>
                        <input type="password" name="loginPassword" id="loginPassword" required="">
                         <a class="forgot_btn" data-toggle="modal" data-target="#pswdModal"> Forgot Password ?</a>
                     </div>

                     <div class="CTA">
                        <!-- <input type="submit" value="Login"> -->
                        <button type="submit"> LOGIN</button>
                        <a href="#" class="switch">CREATE ACCOUNT</a>

                     </div>
                  </form>
               </div><!-- End Login Form -->


               <!-- Signup Form -->
               <div class="signup form-peice switched">
                  <form class="signup-form" action="#" method="post">
                    <h2>SignIN</h2>
                     <div class="form-group">
                        <label for="name">Full Name</label>
                        <input type="text" name="username" id="name" class="name">
                        <span class="error"></span>
                     </div>

                     <div class="form-group">
                        <label for="email">Email Adderss</label>
                        <input type="email" name="emailAdress" id="email" class="email">
                        <span class="error"></span>
                     </div>

                     <div class="form-group">
                        <label for="phone">Phone Number - <small>Optional</small></label>
                        <input type="text" name="phone" id="phone">
                     </div>

                     <div class="form-group">
                        <label for="password">Password</label>
                        <input type="password" name="password" id="password" class="pass">
                        <span class="error"></span>
                     </div>

                     <div class="form-group">
                        <label for="passwordCon">Confirm Password</label>
                        <input type="password" name="passwordCon" id="passwordCon" class="passConfirm">
                        <span class="error"></span>
                     </div>

                     <div class="CTA">
                       <!--  <input type="submit" value="CREATE ACCOUNT" id="submit"> -->
                       <button type="submit" id="submit">CREATE ACCOUNT</button>
                        <a href="#" class="switch active">I have an account</a>
                     </div>
                  </form>
               </div><!-- End Signup Form -->
            </div>
         </div>
      </section>
   </div>
</section>
	
<!--End-Login-Wrapper  -->

<script>
// Login
/*global $, document, window, setTimeout, navigator, console, location*/
$(document).ready(function () {

    'use strict';

    var usernameError = true,
        emailError    = true,
        passwordError = true,
        passConfirm   = true;

    // Detect browser for css purpose
    if (navigator.userAgent.toLowerCase().indexOf('firefox') > -1) {
        $('.form form label').addClass('fontSwitch');
    }

    // Label effect
    $('input').focus(function () {

        $(this).siblings('label').addClass('active');
    });

    // Form validation
    $('input').blur(function () {

        // User Name
        if ($(this).hasClass('name')) {
            if ($(this).val().length === 0) {
                $(this).siblings('span.error').text('Please type your full name').fadeIn().parent('.form-group').addClass('hasError');
                usernameError = true;
            } else if ($(this).val().length > 1 && $(this).val().length <= 6) {
                $(this).siblings('span.error').text('Please type at least 6 characters').fadeIn().parent('.form-group').addClass('hasError');
                usernameError = true;
            } else {
                $(this).siblings('.error').text('').fadeOut().parent('.form-group').removeClass('hasError');
                usernameError = false;
            }
        }
        // Email
        if ($(this).hasClass('email')) {
            if ($(this).val().length == '') {
                $(this).siblings('span.error').text('Please type your email address').fadeIn().parent('.form-group').addClass('hasError');
                emailError = true;
            } else {
                $(this).siblings('.error').text('').fadeOut().parent('.form-group').removeClass('hasError');
                emailError = false;
            }
        }

        // PassWord
        if ($(this).hasClass('pass')) {
            if ($(this).val().length < 8) {
                $(this).siblings('span.error').text('Please type at least 8 charcters').fadeIn().parent('.form-group').addClass('hasError');
                passwordError = true;
            } else {
                $(this).siblings('.error').text('').fadeOut().parent('.form-group').removeClass('hasError');
                passwordError = false;
            }
        }

        // PassWord confirmation
        if ($('.pass').val() !== $('.passConfirm').val()) {
            $('.passConfirm').siblings('.error').text('Passwords don\'t match').fadeIn().parent('.form-group').addClass('hasError');
            passConfirm = false;
        } else {
            $('.passConfirm').siblings('.error').text('').fadeOut().parent('.form-group').removeClass('hasError');
            passConfirm = false;
        }

        // label effect
        if ($(this).val().length > 0) {
            $(this).siblings('label').addClass('active');
        } else {
            $(this).siblings('label').removeClass('active');
        }
    });


    // form switch
    $('a.switch').click(function (e) {
        $(this).toggleClass('active');
        e.preventDefault();

        if ($('a.switch').hasClass('active')) {
            $(this).parents('.form-peice').addClass('switched').siblings('.form-peice').removeClass('switched');
        } else {
            $(this).parents('.form-peice').removeClass('switched').siblings('.form-peice').addClass('switched');
        }
    });


    // Form submit
    $('form.signup-form').submit(function (event) {
        event.preventDefault();

        if (usernameError == true || emailError == true || passwordError == true || passConfirm == true) {
            $('.name, .email, .pass, .passConfirm').blur();
        } else {
            $('.signup, .login').addClass('switched');

            setTimeout(function () { $('.signup, .login').hide(); }, 700);
            setTimeout(function () { $('.brand').addClass('active'); }, 300);
            setTimeout(function () { $('.heading').addClass('active'); }, 600);
            setTimeout(function () { $('.success-msg p').addClass('active'); }, 900);
            setTimeout(function () { $('.success-msg a').addClass('active'); }, 1050);
            setTimeout(function () { $('.form').hide(); }, 700);
        }
    });

    // Reload page
    $('a.profile').on('click', function () {
        location.reload(true);
    });


});

// Forget Password

// $(function(){

//   $('.awesome-form .input-group input').focusout(function() {
    
//     var inputContent = $(this).val();

//     if ( inputContent !== '' ) {
//       $(this).addClass('has-content');
//     } else {
//       $(this).removeClass('has-content');
//     }

//   });

// });

</script>