<?php include 'inc/header.php'; ?>
<style>
/*Cart*/
.cart_wrap {
    padding: 70px 0 0;
}
.cart-table .table tbody tr td {
    border-color: #e6dec6;
    text-align: center;
    padding: 10px 20px;
    vertical-align: middle;
    font-weight: 600;
    color: #333333;
    text-align: center;
}
.cart-table td.pro-remove.text-center i {
    color: #333333;
}
.cart-table td a {
    color: #333333;
 }

.quaitity-box .plus-minus {
    position: relative;
    /*padding-left: 100px;*/
}
.quaitity-box .plus-minus span {
    -webkit-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    cursor: pointer;
    color: #ab8d49;
    font-size: 16px;
}

.quaitity-box .plus-minus input {
    border: 0;
    background: #f7f1e2!important;
    font-size: 14px;
    color: #333333;
    border-radius: 8px;
    width: 25px;
    margin: 0 7px;
    text-align: center;
}

.cart-sec {
    padding: 60px 0;
}

.cart-table td img{
    max-width: 60px;
    min-height: 50px;
}
.cal_pro {
    margin: 0 0 0 auto;
    display: block;
    text-align: end;
}
.cart-table {
    margin: 30px 0;
}
.product_new_r {
    padding: 40px 0;
    background: #f9f5eb;
}
.cal_pro h4 {
    font-size: 24px;
    text-transform: uppercase;
}
.cal_pro p {
    font-size: 20px;
    font-weight: 600;
    padding: 0 0 15px 0;
}

.cart-table .table thead th {
    vertical-align: middle;
    border: 1px solid #ffffff;
    /* border-bottom: 1px solid #e6dec6; */
    background: #e6dec6;
   color: #8c0011;
}

/*summary*/
.order-summary-card {
    padding: 0 15px;
    border-radius: 15px;
    background: #e6dec6;
    max-width: 400px;
    box-shadow: 1px 1px 5px 0px rgba(140,0,17,1);
}
.order-summary-card .title {
    text-align: center;
    font-size: 24px;
    color: #a30011;
    font-weight: 600;
    margin: 0;
}
.order-summary-card .summary-group {
    border-bottom: 1px solid #8c0011;
    padding: 15px 0;
}
.order-summary-card .summary-group ul li span {
    font-size: 20px;
}
.order-summary-card .summary-group ul li {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
}
.summary-group a.custom_btn {
    background: #000;
    border-color: #000;
    margin: 20px auto 0;
    text-align: center;
    display: flex;
    align-items: center;
    justify-content: center;
}
.summary-group a.custom_btn:hover {
    background: transparent;
    border-color: transparent;
    color: #333;
}
/*End-summary*/

/*End-Cart*/
</style>
<!-- Banner -->
<section class="banner_sec">
    <h2>Wishlist</h2>
</section>
<!-- End-Banner -->

<!-- Cart -->
<section class="cart_wrap">
  <div class="container">
    <div class="row">
        <div class="col-lg-12 col-md-12 col-12">
            <div class="cart-table">
                <table class="table table-bordered table-responsive">
                    <thead>
                      <tr>
                        <th class="pro-thumbnail text-center">Thumbnail</th>
                        <th class="pro-title text-center">Product</th>
                        <th class="pro-price text-center">Price</th>
                        <th class="pro-quantity text-center">Quantity</th>
                        <th class="pro-total-l text-center">Total</th>
                        <th class="pro-remove text-center">Remove</th>
                      </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td class="pro-thumbnail">
                                <a href="#">
                                    <img class="img-fluid center-block" src="assets/images/product-img1.png" alt="Product">
                                </a>
                            </td>
                            <td class="pro-title"><a href="#">Brothel Token</a></td>
                            <td class="pro-price"><span>$65.00</span></td>
                            <td class="pro-quantity">
                              <div class="quaitity-box">
                                <div class="plus-minus">
                                  <span class="minus">-</span>
                                  <input type="text" class="count" name="qty" value="1" id="quantity-select" disabled="">
                                  <span class="plus">+</span>
                                </div>
                              </div>
                            </td>
                            <td class="pro-total-l"><span>$295.00</span></td>
                            <td class="pro-remove text-center"><a href="#"><i class="fa fa-trash"></i></a>
                            </td>
                        </tr>
                        <tr>
                            <td class="pro-thumbnail">
                                <a href="#">
                                    <img class="img-fluid center-block" src="assets/images/product-img2.png" alt="Product">
                                </a>
                            </td>
                            <td class="pro-title"><a href="#">Brothel Token</a></td>
                            <td class="pro-price"><span>$65.00</span></td>
                            <td class="pro-quantity">
                              <div class="quaitity-box">
                                <div class="plus-minus">
                                  <span class="minus">-</span>
                                  <input type="text" class="count" name="qty" value="1" id="quantity-select" disabled="">
                                  <span class="plus">+</span>
                                </div>
                              </div>
                            </td>
                            <td class="pro-total-l"><span>$295.00</span></td>
                            <td class="pro-remove text-center"><a href="#"><i class="fa fa-trash"></i></a>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>  
        </div>
    </div>
  </div>
</section>

<?php include 'inc/footer.php'; ?>

<script>
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
</script>