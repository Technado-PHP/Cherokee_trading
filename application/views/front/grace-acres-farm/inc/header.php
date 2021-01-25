<!DOCTYPE html>
<html lang="en">

<head>
  <meta charset="UTF-8">
  <title>Grace Acres Farm</title>
  <link rel="icon" href="./assets/images/favicon.png" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta http-equiv="X-UA-Compatible" content="ie=edge">
  <link rel="stylesheet" href="assets/css/bootstrap.min.css" />
  <link rel="stylesheet" href="assets/css/font-awesome.min.css">
  <link rel="stylesheet" href="assets/css/owl.carousel.min.css">
  <link rel="stylesheet" href="assets/css/style.css" />
  <link rel="stylesheet" href="assets/css/substyle.css" />
  <link rel="stylesheet" href="assets/css/responsive.css" />
  <link rel="stylesheet" href="assets/css/aos.css" />
  <link href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;500;600;700&display=swap" rel="stylesheet">
</head>

<body>

  <header>
    <div class="header-top">
      <marquee>FREE SHIPPING ON ALL ORDERS Over $100</marquee>
    </div>
    <div class="header-bottom">
      <div class="container-fluid">
        <div class="header-bottom-inner">
          <ul class="menu-wrap">
            <li class="menu-item"><a class="menu-link" href="shop.php">shop</a></li>
            <li class="menu-item"><a class="menu-link" href="our-story.php">Our Story</a></li>
            <li class="menu-item"><a class="menu-link" href="blog.php">Blog</a></li>
            <li class="menu-item"><a class="menu-link" href="wholesale.php">Wholesale </a></li>
          </ul>
          <a href="index.php" class="logo-wrap">
            <img src="assets/images/logo.png" alt="">
          </a>
          <ul class="menu-wrap">
            <li class="menu-item"><a class="menu-link" href="review.php">Reviews</a></li>
            <li class="menu-item"><a class="menu-link" href="login.php">Account</a></li>
            <li class="menu-item"><a class="menu-link" href="#!" class="search-wrap" data-toggle="modal" data-target="#searchpopup">Search</a></li>
            <li class="menu-item"><a class="menu-link cart-open" href="#!" >Cart (0)</a></li>
          </ul>
        </div>
      </div>
    </div>
  </header>

    <!-- cart from side  -->
    <div class="cart-right">
      <div class="cart-head-wrap">
        <h4>Shopping Cart</h4>
      </div>
      <div class="cart-right-body">
        <div class="single-cart-item">
          <div class="sc-img-wrap">
            <img src="assets/images/blog-img-1.jpg" alt="">
          </div>
          <div class="sc-text-wrap">
            <div class="sc-text-head">
              <a href="#!" class="p-name">Lorem ipsum</a>
              <a href="#!" class="cs-del-item"><i class="fas fa-trash-alt"></i></a>
            </div>
            <div class="sc-text-bottom">
              <div class="sc-qty-wrap">
                <span class="minus">-</span>
                <input class="count" value="1" disabled>
                <span class="plus">+</span>
              </div>
              <label class="sc-price">$3000</label>
            </div>
          </div>
        </div>

        <div class="single-cart-item">
          <div class="sc-img-wrap">
            <img src="assets/images/blog-img-2.jpg" alt="">
          </div>
          <div class="sc-text-wrap">
            <div class="sc-text-head">
              <a href="#!" class="p-name">Dollar Sit</a>
              <a href="#!" class="cs-del-item"><i class="fas fa-trash-alt"></i></a>
            </div>
            <div class="sc-text-bottom">
              <div class="sc-qty-wrap">
                <span class="minus">-</span>
                <input class="count" value="1" disabled>
                <span class="plus">+</span>
              </div>
              <label class="sc-price">$600</label>
            </div>
          </div>
        </div>
      </div>
      <div class="cart-right-foot">
        <a href="checkout.php" class="shop-now">Checkout</a>
        <a href="order-cart.php" class="shop-now">Go to Cart</a>
      </div>
    </div>
    <div class="cart-overlay"></div>
    <!-- cart from side  -->  