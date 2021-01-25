<!DOCTYPE html>
<html lang="en">

<head>
  <meta charset="UTF-8">
  <title>Cherokee-Roys-Trading-Post</title>
  <link rel="icon" href="<?= base_url('assets/front/') ?>images/favicon.png" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta http-equiv="X-UA-Compatible" content="ie=edge">
  <link rel="stylesheet" href="<?= base_url('assets/front/') ?>css/bootstrap.min.css" />
  <link rel="stylesheet" href="<?= base_url('assets/front/') ?>css/font-awesome.min.css">
  <link rel="stylesheet" href="<?= base_url('assets/front/') ?>css/owl.carousel.min.css">
  <link rel="stylesheet" href="<?= base_url('assets/front/') ?>css/style.css" />
  <link rel="stylesheet" href="<?= base_url('assets/front/') ?>css/responsive.css" />
  <link rel="stylesheet" href="<?= base_url('assets/front/') ?>css/aos.css"/>
  <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.3.1/jquery.min.js"></script>
  <script src="//cdnjs.cloudflare.com/ajax/libs/toastr.js/latest/toastr.min.js"></script>
  <link href="//cdnjs.cloudflare.com/ajax/libs/toastr.js/latest/toastr.min.css" rel="stylesheet">
</head>


<style>
/*Mobile-Navbar*/

/* Main menu positionning */
.main-nav {
    position: absolute;
    top: 0;
    right: 0;
    left: 0;
    bottom: 0;
    text-align: center;
    background: #FFF;
    opacity: 0;
    z-index: -1;
    visibility: hidden;
    transition: all .375s;
}

.main-nav.is-open {
    opacity: 1;
    z-index: 100;
    visibility: visible;
}

/* Yellow band effect */
.main-nav::before {
   content: '';
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: -15px;
    background: #FEDC2A;
    transform-origin: 0 0;
    transform: skew(-14deg) translateX(-120%);
    transition: all .275s .1s;
}

.main-nav.is-open::before {
    transform: skew(-14deg) translateX(0);
}

/* Skewing effect on menu links */
.main-nav ul {
    display: inline-flex;
    flex-direction: column;
    height: 93%; /* Should be 100%, but we have a notice message :D */
    align-items: flex-end;
    justify-content: center;
    transform: translateX(-18%) skew(-16deg);
}

.main-nav li {
    display: block;
    margin: .5rem 0;
    text-align: right;
    transform: skew(16deg);
}

/* Apparition effect on links */
.main-nav a {
    opacity: 0;
    transform: translateY(-10px);
}

.main-nav.is-open a {
    opacity: 1;
    transform: translateY(0);
}
.main-nav li:nth-child(1) a {
  transition: all 275ms 175ms
}
.main-nav li:nth-child(2) a {
  transition: all 275ms 225ms
}
.main-nav li:nth-child(3) a {
  transition: all 275ms 275ms
}
.main-nav li:nth-child(4) a {
  transition: all 275ms 325ms
}
.main-nav li:nth-child(5) a {
  transition: all 275ms 375ms
}


/* Decoration */
.main-nav ul,
.main-nav li {
  list-style: none;
  padding: 0;
}
.main-nav a {
  display: block;
  padding: 12px 0;
  color: #5A3B5D;
  font-size: 1.4em;
  text-decoration: none;
  font-weight: bold;
}

/* Burger Style: @see: https://codepen.io/CreativeJuiz/full/oMZNXy */
.open-main-nav {
  position: absolute;
  top: 15px;
  padding-top: 20px;
  right: 15px;
  z-index: 1000;
  background: none;
  border: 0;
  cursor: pointer;
}
.open-main-nav:focus {
  outline: none;
}
.burger {
  position: relative;
  display: block;
  width: 28px;
  height: 4px;
  margin: 0 auto;
  background: #5A3B5D;
  transform: skew(5deg);
  transition: all .275s;
}

.burger:after,
.burger:before {
  content: '';
  display: block;
  height: 100%;
  background: #5A3B5D;
  transition: all .275s;
}

.burger:after {
  transform: translateY(-12px) translateX(-2px) skew(-20deg);
}

.burger:before {
  transform: translateY(-16px) skew(-10deg);
}

/* Toggle State part */
.is-open .burger {
  transform: skew(5deg) translateY(-8px) rotate(-45deg);
}

.is-open .burger:before {
  transform: translateY(0px) skew(-10deg) rotate(75deg);
}

.is-open .burger:after {
  transform: translateY(-12px) translateX(10px) skew(-20deg);
    opacity: 0;
}

/* MENU Text part */

.burger-text {
  display: block;
  font-size: .675rem;
  letter-spacing: .05em;
  margin-top: .5em;
  text-transform: uppercase;
  font-weight: 500;
  text-align: center;
  color: #5A3B5D;
}

.device {
  position: relative;
  width: 345px;
  height: 600px;
  background: #FFF;
  border: 1px solid #EEE;
  border-radius: 3px;
  box-shadow: 0 0 0 10px rgba(0,0,0,.1);
}



/* Slow motion button */
[id="slowmo"] {
  position: absolute;
  top: 20px;
  right: 20px;
  padding: 10px;
  border: 0;
  font-size: 1rem;
  background: #FEDC2A;
  color: #5A3B5D;
  font-weight: bold;
  cursor: pointer;
  transition: all .275s;
}

[id="slowmo"] span {
  display: block;
  font-weight: normal;
}

[id="slowmo"]:hover,
[id="slowmo"]:focus {
  background: #5A3B5D;
  color: #FEDC2A;
}

[id="slowmo"].is-slowmo span:after {
  content: 'Activated';
  display: block;
  font-weight: bold;
}

/* When slowmotion is activated */

.is-slowmo + .device .open-main-nav .burger,
.is-slowmo + .device .open-main-nav .burger:before,
.is-slowmo + .device .open-main-nav .burger:after,
.is-slowmo + .device .main-nav,
.is-slowmo + .device .main-nav::before,
.is-slowmo + .device .main-nav a {
  transition-duration: 3s;
}
.is-slowmo + .device .main-nav li:nth-child(1) a {
  transition-delay: 1750ms
}
.is-slowmo + .device .main-nav li:nth-child(2) a {
  transition-delay: 2250ms
}
.is-slowmo + .device .main-nav li:nth-child(3) a {
  transition-delay: 2750ms
}
.is-slowmo + .device .main-nav li:nth-child(4) a {
  transition-delay: 3250ms
}
.is-slowmo + .device .main-nav li:nth-child(5) a {
  transition-delay: 3750ms
}

/* Notice */
.notice {
  position: absolute;
  bottom: -15px;
  left: 0; right: 0;
  padding: 20px;
  background: #F2F2F2;
  color: #5A3B5D;
  font-size: 14px;
  font-weight: 400;
  line-height: 1.5;
  z-index: 100;
  text-align: center;
}
.notice strong {
  font-weight: 700;
}
.notice a {
  padding: 2px 3px;
  background: #FEDC2A;
  text-decoration: none;
}

/*End-Mobile-Navbar*/

</style>


<body>
<?php if($this->session->flashdata('msg') == 1):?>
    <script>toastr.success('<?php echo $this->session->flashdata('alert_data')?>');</script>
<?php elseif($this->session->flashdata('msg') == 2):?>
    <script>toastr.error('<?php echo $this->session->flashdata('alert_data')?>');</script>
<?php endif;?>

  <header>
    <div class="header_topbar">
      <div class="container">
          <div class="header_topbar_wrap">       
            <a href="tel:#!">Call Us +123 456 7890</a>
            <div class="topbar_right_sec"> 
              <div class="bag">
                <a href="#!" class="shop_clr">
                  <i class="fas fa-shopping-bag"></i> Cart 
                  <span class="badge_icon">(0)</span>
                </a>
                <div class="cartbox">
                  <div class="cart-box active">
                      <div class="item justify-content-center">
                        <p class="heading">Your Cart</p>
                      </div>
                      <div class="item">
                         <div class="img">
                              <img src="<?= base_url('assets/front/') ?>images/product-img1.png" alt="product" class="img-fluid">
                         </div>
                         <div class="name">
                             <p>Brothel Token</p>
                         </div>
                         <div class="price">
                             <p>$49.00</p>
                         </div>
                         <div class="btns">
                             <a href="#!"><i class="fas fa-times"></i></a>
                         </div>
                      </div>
                      <div class="item">
                         <div class="img">
                              <img src="<?= base_url('assets/front/') ?>images/product-img2.png" alt="product" class="img-fluid">
                         </div>
                         <div class="name">
                             <p>Brothel Token</p>
                         </div>
                         <div class="price">
                             <p>$49.00</p>
                         </div>
                         <div class="btns">
                             <a href="#!"><i class="fas fa-times"></i></a>
                         </div>
                      </div>
                      <div class="item s-total">
                          <p><strong>SUBTOTAL</strong></p>
                          <p>$98.00</p>
                      </div>
                      <div class="item">
                          <a href="<?= base_url('cart') ?>" class="custom_btn mx-auto mt-2 mb-2">Go to cart <i class="fas fa-chevron-right"></i></a>
                      </div>
                  </div>
                </div>
              </div>
              
              <a href="<?= base_url('customer-login') ?>">
                Login
              </a>
            </div>
          </div>
      </div>
    </div>
    <div class="container" data-aos="flip-left" data-aos-duration="1200" data-aos-delay="100">
      <div class="header_midbar">
          <a href="<?= base_url() ?>">
          		<img src="<?= base_url('assets/front/') ?>images/logo.png" class="img-fluid" alt="">
      	  </a>
      </div>
      <div class="navbar_sec">
        <a href="<?= base_url() ?>">home</a>
        <a href="<?= base_url('about') ?>">About</a>
        <a href="western-badges.php">Western Badges</a>
        <a href="western-items.php">Western Items</a>
        <!-- <a href="javascript:avoid">Native American Themes</a> -->
        <a href="<?= base_url('wholesale') ?>">Whole sale</a>
        <a href="commemorative-medals.php">Commemorative Medals</a>
        <a href="<?= base_url('shipping') ?>">Shipping Info </a>
        <a href="<?= base_url('contact-us') ?>">Contact</a>
      </div>
    </div>
    <!-- Mobile-Navbar -->
<!--     <div class="device">
      <div class="container">
        <button id="burger" class="open-main-nav">
          <span class="burger"></span>
          <span class="burger-text">Menu</span>
        </button>
        <nav class="main-nav" id="main-nav">
          <ul>
            <li>
              <a href="#">About me</a>
            </li>
            <li>
              <a href="#">Speaker &amp; Writer</a>
            </li>
            <li>
              <a href="#">Work</a>
            </li>
            <li>
              <a href="#">Contact</a>
            </li>
            <li>
              <a href="#">Blog</a>
            </li>
          </ul>
        </nav>
      </div>
    </div> -->
    <!-- End-Mobile-Navbar -->
  </header>
