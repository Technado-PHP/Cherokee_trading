<?php include 'inc/header.php'; ?>
<!-- End-Header -->
<style>
.product_detail_sec2 {
    background: #f5f2e8;
    padding: 60px 0;
}
.product_detail_sec2 .custom_btn:hover {
    border: 2px solid transparent;
}

.product_detail_sec2 .custom_btn {
    border: 2px solid #000;
    color: #333;
}
.product_detail_col2 h3 {
    font-size: 40px;
    text-transform: capitalize;
    font-weight: 600;
    font-family: var(--font-S);
}
.product_detail_col2 h4 {
    font-size: 42px;
}
.product_detail_col2 span {
    font-size: 17px;
}
.product_detail_c3 h5 {
    font-size: 26px;
    font-weight: 600;
    line-height: 1.8;
}
.product_detail_c3 p {
    font-size: 14px;
}
.product_detail_c3 ul li {
    list-style-type: disc;
    padding: 0 0 5px 0;
    font-size: 14px;
}
.product_detail_c3 ul {
    padding: 20px;
}
.product-imgs-wrapper {
    margin: 0 auto;
    text-align: center;
}
.main_image_product {
    min-height: 200px;
    max-height: 200px;
}
.product-thumbnails-wrap img {
    min-height: 80px;
    max-height: 80px;
    max-width: 70px;
    margin: 0 auto;
}
.product-thumbnails-wrap .item {
    margin: 50px 0px;
    border: 2px solid #dcdcdc;
}
</style>

<section class="product_detail_sec2">
    <div class="container">
        <div class="row">
          <div class="col-12 col-md-4 col-lg-4">
            <div class="product_detail_col1">
               <div class="product-imgs-wrapper">
                <img id="productImage" src="assets/images/product-img1.png" class="img-fluid main_image_product" alt="product-img">
                <div class="product-thumbnails-wrap">
                  <div class="owl-carousel owl-theme product-thumb-slider">
                    <div class="item product-thumb-slider-item">
                      <img src="assets/images/product-img2.png"  alt="thumbnails" class="img-fluid mul-image" onclick="changeImage(this);">
                    </div>
                    <div class="item product-thumb-slider-item">
                      <img src="assets/images/product-img3.png"  alt="thumbnails" class="img-fluid mul-image" onclick="changeImage(this);">
                    </div>
                    <div class="item product-thumb-slider-item">
                      <img src="assets/images/product-img4.png"  alt="thumbnails" class="img-fluid mul-image" onclick="changeImage(this);">
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="col-12 col-md-8 col-lg-8">
             <div class="product_detail_col2">
              <h3>Brothel Token</h3>
              <h4>$20.00 <span>/Unit</span></h4>
              <p>Retail $40.00/unit</p>
             </div>
             <div class="product_detail_c3">
              <h5>Description</h5>
              <p>
                Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod
               tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam,
               quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo
               consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse
               cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non
               proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
              </p>
               <ul>
                 <li>Indica - Relaxing</li>
                 <li>21.3% CBD (CBD+CBDA)</li>
                 <li>Top Shelf, Indoor Grown</li>
               </ul>
             </div>
             <a href="cart.php" class="custom_btn">add to cart</a>
          </div>
        </div>
    </div>
</section>

<!-- Footer -->
<?php include 'inc/footer.php'; ?>
<script>
  // Images on product page 
function changeImage(imgthumb) {
  var mainImg = document.getElementById("productImage");
  mainImg.src = imgthumb.src;
}
</script>
<script>
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
</script>
