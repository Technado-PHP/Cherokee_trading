<?php include 'inc/header.php'; ?>

<!-- Banner -->
<section class="banner_sec">
  <h2>Check out</h2>
</section>
<!-- End-Banner -->

<!-- Checkout -->
<section class="checkout">
    <div class="container">
        <div class="row justify-content-center">
            <div class="col-12 col-md-12 col-lg-12 text-center p-0 mt-3 mb-2">
                <div class="card payment_wrap">
                    <form id="msform">
                        <!-- progressbar -->
                        <ul id="progressbar">
                            <li class="active" id="account">
                                <span class="round-tab">
                                    1
                                </span></li>
                            <li id="personal">
                                <span class="round-tab">
                                    2       
                                </span></li>
                            <li id="payment">
                                <span class="round-tab">
                                    3        
                                </span></li>
                            <li id="confirm">
                                <span class="round-tab">
                                    4            
                                </span></li>
                        </ul>
                        <div class="progress">
                            <div class="progress-bar progress-bar-striped progress-bar-animated" role="progressbar" aria-valuemin="0" aria-valuemax="100" style="width: 25%;"></div>
                        </div> <br> <!-- fieldsets -->
                        <fieldset>
                            <div class="form-card">
                                <div class="row">
                                    <div class="col-md-6" style="border-right: 2px dashed var(--redclr);">
                                        <h4>Account Information:</h4>
                                        <div class="form-group">
                                                <input type="email" name="email" class="form-control checkout-form-1" placeholder="Enter email">
                                                            </div>
                                            <div class="form-group">
                                                <input type="password" name="password" class="form-control checkout-form-1" placeholder="Enter password" id="pwd">
                                            </div>
                                            <div class="cart_btnbox">
                                                <a href="login.php" class="checkout-btn custom_btn mr-2">login</a>
                                                <a href="login.php" class="checkout-btn custom_btn">Signup</a>
                                            </div>
                                            

                                    </div>
                                     <div class="col-md-6">
                                        <h4>Checkout As A Guest User :</h4>
                                        <div>
                                        <a href="#" class="checkout-btn custom_btn">guest user</a>
                                        </div>
                                    </div>
                                </div> 
                            </div> 
                            <input type="button" name="next" class="next action-button submit_btn first_nxt" value="NEXT">
                        </fieldset>
                        <fieldset>
                            <div class="form-card">
                                <div class="row">
                                  <div class="row">
                            <div class="col-md-12">
                               <h4>Billing Information</h4>
                            </div>
                            <div class="col-md-6">
                               <div class="row">
                                  <div class="col-md-6">
                                      <div class="form-group">
                                        <input type="text" class="form-control checkout-form-1" placeholder="First Name" name="customer_fname" data-validation="required name" required="">
                                     </div>
                                  </div>
                                  <div class="col-md-6">
                                     <div class="form-group">
                                        <input type="text" class="form-control checkout-form-1" placeholder="Last Name" name="customer_lname" data-validation="required name" required="">
                                     </div>
                                  </div>
                               </div>
                            </div>
                            <div class="col-md-6">
                               <div class="form-group">
                                  <input type="text" name="billing_street" class="form-control checkout-form-1" placeholder="Street Address" data-validation="required" required="">
                               </div>
                            </div>
                            <div class="col-md-6">
                               <div class="form-group">
                                  <input type="email" class="form-control checkout-form-1" placeholder="Email" name="customer_email" data-validation="required email" required="">
                               </div>
                            </div>
                            <div class="col-md-6">
                               <div class="row">
                                  <div class="col-md-6">
                                     <div class="form-group">
                                        <input type="text" name="billing_city" class="form-control checkout-form-1" placeholder="Town / City" data-validation="required" required="">
                                     </div>
                                  </div>
                                  <div class="col-md-6">
                                     <div class="form-group">
                                        <input type="text" class="form-control checkout-form-1" placeholder="ZIP Code" name="orders_zip" data-validation="required number" required="">
                                     </div>
                                  </div>
                               </div>
                            </div>
                            <div class="col-md-6">
                               <div class="form-group">
                                  <input type="number" class="form-control checkout-form-1" placeholder="Phone" name="customer_phone" data-validation="required number" required="">
                               </div>
                            </div>
                            <div class="col-md-6">
                               <div class="form-group">
                                  <select id="billing_state" name="billing_state" class="form-control checkout-form-1" placeholder="State" data-validation="required" required="">
                                     <option value="">Select States</option>
                                     <option value="AL">Alabama</option>
                                     <option value="AK">Alaska</option>
                                     <option value="AS">American Samoa</option>
                                     <option value="AZ">Arizona</option>
                                     <option value="AR">Arkansas</option>
                                     <option value="CA">California</option>
                                     <option value="CO">Colorado</option>
                                     <option value="CT">Connecticut</option>
                                     <option value="DE">Delaware</option>
                                     <option value="DC">District Of</option>
                                     <option value="FM">Federated States</option>
                                     <option value="FL">Florida</option>
                                     <option value="GA">Georgia</option>
                                     <option value="GU">Guam</option>
                                     <option value="HI">Hawaii</option>
                                     <option value="ID">Idaho</option>
                                     <option value="IL">Illinois</option>
                                     <option value="IN">Indiana</option>
                                     <option value="IA">Iowa</option>
                                     <option value="KS">Kansas</option>
                                     <option value="KY">Kentucky</option>
                                     <option value="LA">Louisiana</option>
                                     <option value="ME">Maine</option>
                                     <option value="MH">Marshall Islands</option>
                                     <option value="MD">Maryland</option>
                                     <option value="MA">Massachusetts</option>
                                     <option value="MI">Michigan</option>
                                     <option value="MN">Minnesota</option>
                                     <option value="MS">Mississippi</option>
                                     <option value="MO">Missouri</option>
                                     <option value="MT">Montana</option>
                                     <option value="NE">Nebraska</option>
                                     <option value="NV">Nevada</option>
                                     <option value="NH">New Hampshire</option>
                                     <option value="NJ">New Jersey</option>
                                     <option value="NM">New Mexico</option>
                                     <option value="NY">New York</option>
                                     <option value="NC">North Carolina</option>
                                     <option value="ND">North Dakota</option>
                                     <option value="MP">Northern Mariana</option>
                                     <option value="OH">Ohio</option>
                                     <option value="OK">Oklahoma</option>
                                     <option value="OR">Oregon</option>
                                     <option value="PW">Palau</option>
                                     <option value="PA">Pennsylvania</option>
                                     <option value="PR">Puerto Rico</option>
                                     <option value="RI">Rhode Island</option>
                                     <option value="SC">South Carolina</option>
                                     <option value="SD">South Dakota</option>
                                     <option value="TN">Tennessee</option>
                                     <option value="TX">Texas</option>
                                     <option value="UT">Utah</option>
                                     <option value="VT">Vermont</option>
                                     <option value="VI">Virgin Islands</option>
                                     <option value="VA">Virginia</option>
                                     <option value="WA">Washington</option>
                                     <option value="WV">West Virginia</option>
                                     <option value="WI">Wisconsin</option>
                                     <option value="WY">Wyoming</option>
                                  </select>
                               </div>
                            </div>
                            <div class="col-md-6">
                               <div class="form-group">
                                  <input type="text" class="form-control checkout-form-1" name="additional_notes" placeholder="Additional Brief" data-validation="required" required="">
                               </div>
                            </div>
                            <div class="col-md-6">
                               <div class="form-group">
                                  <select id="billing_country" name="billing_country" class="form-control checkout-form-1" placeholder="Country" data-validation="required">
                                     <option value="USA">United States</option>
                                  </select>
                               </div>
                            </div>
                         </div>
                                </div>
                            </div>
                                <input type="button" name="previous" class="previous action-button-previous custom_btn" value="Previous">
                                <input type="button" name="next" class="next action-button submit_btn" value="Next"> 
                             
                        </fieldset>
                        <fieldset>
                            <div class="form-card">
                              <div class="row">
                                  <div class="col-md-6">
                                     <div class="billing-address">
                                        <h4>Billing Address</h4>
                                        <hr>
                                        <p id="name">Rakesh Vaidya</p>
                                        <p id="address">54 W 47th ST</p>
                                        <p id="city">STE 5FW</p>
                                        <p id="state">NEW YORK NY 10036-8714</p>
                                        <p id="Country">USA</p>
                                     </div>
                                  </div>
                                  <div class="col-md-6">
                                     <div class="billing-address">
                                        <h4>Shipping Address</h4>
                                        <hr>
                                        <p id="shippingName">Rakesh Vaidya</p>
                                        <p id="shippingAddress">54 W 47th ST</p>
                                        <p id="shippingCity">STE 5FW</p>
                                        <p id="shippingState">NEW YORK NY 10036-8714</p>
                                        <p id="shippingCountry">USA</p>
                                     </div>
                                  </div>
                                  <div class="col-md-6">
                                     <div class="order-information">
                                        <h4>Order Information</h4>
                                        <hr>
                                        <div class="order-box">
                                           <p>Number Of Items</p>
                                           <span>1</span>
                                        </div>
                                        <div class="order-box">
                                           <p>Item Total</p>
                                           <span>$ 11,980.00</span>
                                        </div>
                                        <div class="order-box">
                                           <p>Shipping</p>
                                           <span>Free Shipping</span>
                                        </div>
                                        <div class="total-box">
                                           <h6>Total</h6>
                                           <span>$ 11,980.00</span>
                                        </div>
                                     </div>
                                  </div>
                              </div>
                            </div>
                             <input type="button" name="previous" class="previous action-button-previous submit_btn" value="Previous">
                             <input type="button" name="next" class="next action-button submit_btn" value="Next">
                        </fieldset>
                        <fieldset>
                            <div class="form-card">
                             <div class="row">
                            <div class="col-md-6 offset-md-3">
                               <div class="credit-card-box">
                                  <div class="col-md-12">
                                     <h4 class="cl-white">Payment Information</h4>
                                  </div>
                                  <div class="row">
                                     <div class="col-md-12">
                                        <div class="form-group">
                                           <label>Card Number:</label>
                                           <input type="text" class="form-control checkout-form-1" minlength="16" maxlength="16" placeholder="Card Number" name="orders_card_num" data-validation="required number" data-validation-length="min16" required="">
                                        </div>
                                     </div>
                                     <div class="col-md-6">
                                        <label>Card Expiration Date:</label>
                                        <div class="row">
                                           <div class="col-md-6">
                                              <div class="form-group">
                                                 <select class="form-control checkout-form-1" id="sel1" name="orders_exp_date">
                                                    <option value="" selected="" disabled="">Month</option>
                                                    <option value="01">01</option>
                                                    <option value="01">02</option>
                                                    <option value="01">03</option>
                                                    <option value="01">04</option>
                                                    <option value="01">05</option>
                                                    <option value="01">06</option>
                                                    <option value="01">07</option>
                                                    <option value="01">08</option>
                                                    <option value="01">09</option>
                                                    <option value="01">10</option>
                                                    <option value="01">11</option>
                                                    <option>12</option>
                                                 </select>
                                              </div>
                                           </div>
                                           <div class="col-md-6">
                                              <div class="form-group">
                                                 <select class="form-control checkout-form-1" id="selectYear" name="orders_exp_date">
                                                    <option value="" selected="" disabled="">Year</option>
                                                 <option value="2020">2020</option><option value="2021">2021</option><option value="2022">2022</option><option value="2023">2023</option><option value="2024">2024</option><option value="2025">2025</option><option value="2026">2026</option><option value="2027">2027</option><option value="2028">2028</option><option value="2029">2029</option><option value="2030">2030</option><option value="2031">2031</option><option value="2032">2032</option><option value="2033">2033</option><option value="2034">2034</option><option value="2035">2035</option><option value="2036">2036</option><option value="2037">2037</option><option value="2038">2038</option><option value="2039">2039</option><option value="2040">2040</option><option value="2041">2041</option><option value="2042">2042</option><option value="2043">2043</option><option value="2044">2044</option><option value="2045">2045</option><option value="2046">2046</option><option value="2047">2047</option><option value="2048">2048</option><option value="2049">2049</option><option value="2050">2050</option><option value="2051">2051</option></select>
                                              </div>
                                           </div>
                                        </div>
                                     </div>
                                     <div class="col-md-6">
                                        <div class="form-group">
                                           <label>CVV:</label>
                                           <input type="number" class="form-control checkout-form-1" placeholder="Card Code" name="orders_card_code" data-validation="required number" required="">
                                        </div>
                                     </div>
                                     <div class="col-md-12">
                                        <p>Your payment is securly processed</p>
                                     </div>
                                  </div>
                               </div>
                            </div>
                         </div>
                            </div>
                            <div class="row">
                            <div class="col-md-12 text-right">

                               <button type="submit" class="action-button submit_btn">Submit</button>
                            </div>
                         </div>
                        </fieldset>
                    </form>
                </div>
            </div>
        </div>
    </div>
</section>
<!-- End-Checkout -->

<?php include 'inc/footer.php'; ?>
