$('.reviews-slider').owlCarousel({
  loop: true,
  margin: 20,
  nav: false,
  dots: false,
  autoplay: true,
  autoplayTimeout: 2000,
  responsive: {
    0: {
      items: 1
    },
    600: {
      items: 2
    },
    1000: {
      items: 3
    }
  }
})

$('.best-seller-slider').owlCarousel({
  loop: true,
  margin: 80,
  nav: false,
  dots: false,
  // autoplay: true,
  // autoplayTimeout: 2000,
  responsive: {
    0: {
      items: 1
    },
    600: {
      items: 2
    },
    1000: {
      items: 4
    }
  }
})

// Sub-Script
$('.blog_detail_slider').owlCarousel({
    loop:true,
    margin:40,
    nav:true,
    autoplay:1000,
    dots:false,
    responsive:{
        0:{
            items:1
        },
        600:{
            items:3
        },
        1000:{
            items:2
        }
    }
})
// product thumbnail slider 
$('.product-thumb-slider').owlCarousel({
  loop: true,
  margin: 5,
  nav: false,
  dots: false,
  responsive: {
    0: {
      items: 3
    },
    600: {
      items: 2
    },
    1000: {
      items: 3
    }
  }
}) 
// Images on product page 
function changeImage(imgthumb) {
  var mainImg = document.getElementById("productImage");
  mainImg.src = imgthumb.src;
}
// shop thumbnail slider 
$('.shop-thumb-slider').owlCarousel({
  loop: true,
  margin: 5,
  nav: false,
  dots: false,
  responsive: {
    0: {
      items: 3
    },
    600: {
      items: 2
    },
    1000: {
      items: 1  
    }
  }
}) 
// Images on shop product page 
// function changeImage(imgthumb) {
//   var mainImg = document.getElementById("shopImage");
//   mainImg.src = imgthumb.src;
// }

//PRODUCT QUANTITY SELECT INPUT
$(document).ready(function(){
    $('.count').prop('disabled', true);
    $(document).on('click','.plus',function(){
       $(this).siblings('.count').val(parseInt($(this).siblings('.count').val()) + 1 );
   });
    $(document).on('click','.minus',function(){
      $(this).siblings('.count').val(parseInt($(this).siblings('.count').val()) - 1 );
      if ($(this).siblings('.count').val() == 0) {
        $(this).siblings('.count').val(1);
        }
    });
});

// 
// $(document).ready(function(){
//   $(".share_btn").click(function(){
//     $(".social_wrap").slideToggle();
//   });
// });
  $(document).ready(function(){
   $(".share_btn").click(function(){
        $(".social_wrap").slideToggle();
  });
  });

  // cart right script 
  //$('.is-on').removeClass();
$(document).ready(function () {
  $('.cart-open').on('click', function () {
    $('.cart-right').addClass('cart-show');
    $(".cart-overlay").addClass("is-on");
  });
  $(".cart-overlay").on("click", function () {
    $(this).removeClass("is-on");
    $('.cart-right').removeClass('cart-show')
  });
});



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

// 
$(document).ready(function(){

  $(".owl-carousel-slider").owlCarousel({    
    loop:true,
    items:1,
    margin:0,
    stagePadding: 0,
    autoplay:false  
  });
  
  dotcount = 1;
  
  jQuery('.owl-dot').each(function() {
    jQuery( this ).addClass( 'dotnumber' + dotcount);
    jQuery( this ).attr('data-info', dotcount);
    dotcount=dotcount+1;
  });
  
  slidecount = 1;
  
  jQuery('.owl-item').not('.cloned').each(function() {
    jQuery( this ).addClass( 'slidenumber' + slidecount);
    slidecount=slidecount+1;
  });
  
  jQuery('.owl-dot').each(function() {  
    grab = jQuery(this).data('info');   
    slidegrab = jQuery('.slidenumber'+ grab +' img').attr('src');
    jQuery(this).css("background-image", "url("+slidegrab+")");   
  });
  
  amount = $('.owl-dot').length;
  gotowidth = 100/amount;     
  jQuery('.owl-dot').css("height", gotowidth+"%");

});
// 


