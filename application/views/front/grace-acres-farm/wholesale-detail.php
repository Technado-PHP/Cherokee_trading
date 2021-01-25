<?php include 'inc/header.php'; ?>
<!-- End-Header -->

<section class="product_detail_sec2 product-sec-3">
    <div class="container">
        <div class="row">
          <div class="col-12 col-md-4 col-lg-4">
            <div class="product_detail_col1">
               <div class="product-imgs-wrapper">
                <img id="productImage" src="assets/images/product-img-1.jpg" class="img-fluid main_image_product" alt="product-img">
                <div class="product-thumbnails-wrap">
                  <div class="owl-carousel owl-theme product-thumb-slider">
                    <div class="item product-thumb-slider-item">
                      <img src="assets/images/product-img-1.jpg"  alt="thumbnails" class="img-fluid mul-image" onclick="changeImage(this);">
                    </div>
                    <div class="item product-thumb-slider-item">
                      <img src="assets/images/product-img-2.jpg"  alt="thumbnails" class="img-fluid mul-image" onclick="changeImage(this);">
                    </div>
                    <div class="item product-thumb-slider-item">
                      <img src="assets/images/review-img-1.jpg"  alt="thumbnails" class="img-fluid mul-image" onclick="changeImage(this);">
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="col-12 col-md-8 col-lg-8">
             <div class="product_detail_col2">
              <h3>Cherry Cough - Wholesale</h3>
              <h4>$20.00 <span>/Unit</span></h4>
              <p>Retail $40.00/unit</p>
             </div>
             <div class="product_detail_c3">
               <h5>Description</h5>
               <p>If your a fan of cherry soda then you have found its replica in cannabis flower form.  Cherry Cough has one of the most unique and pungent aromas of any strain we have ever seen, it smells like sweet cherry syrup, coca cola, and gas.  It is a very relaxing indica strain that users report glues them to the couch and has them ready for hibernation.</p>
               <ul>
                 <li>Indica - Relaxing</li>
                 <li>21.3% CBD (CBD+CBDA)</li>
                 <li>Top Shelf, Indoor Grown</li>
               </ul>
             </div>
          </div>
        </div>
    </div>
</section>

<section class="product_new_r">
  <div class="container">
    <h4>Pricing</h4>
    <p>Order the minimum quantity per variant to qualify for volume pricing.</p>
      <div class="cart-table">
        <table class="table table-bordered">
          <thead>
            <tr>
              <th class="pro-thumbnail text-center">Thumbnail</th>
              <th class="pro-title text-center">Product</th>
              <th class="pro-price text-center">Price</th>
              <th class="pro-quantity text-center">Quantity</th>
              <th class="pro-total-u text-center">Unit Price</th>
              <th class="pro-total-l text-center">Line Total</th>
              <th class="pro-remove text-center">Remove</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td class="pro-thumbnail"><a href="#"><img class="img-responsive center-block" src="assets/images/review-img-1.jpg" alt="Product"></a></td>
              <td class="pro-title"><a href="#">3.5 Grams (1/8 Ounce)</a></td>
              <td class="pro-price"><span>$295.00</span></td>
              <td class="pro-quantity">
                <div class="quaitity-box">
                    <div class="plus-minus">
                        <span class="minus">-</span>
                        <input type="text" class="count" name="qty" value="1" id="quantity-select" disabled="">
                        <span class="plus">+</span>
                    </div>
                </div></td>
              <td class="pro-total-u"><span>$295.00</span></td>
              <td class="pro-total-l"><span>$295.00</span></td>
              <td class="pro-remove text-center"><a href="#"><i class="fa fa-trash"></i></a></td>
            </tr>
          </tbody>
        </table>
      </div>
      <div class="cal_pro">
        <h4>0 products</h4>
        <p>$0.00</p>
        <a href="wholesale-cart.php" class="shop-now">Add To Order</a>
      </div>
  </div>
</section>



<!-- Footer -->
<?php include 'inc/footer.php'; ?>
