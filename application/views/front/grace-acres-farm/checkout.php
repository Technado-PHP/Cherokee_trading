<head>
  <meta charset="UTF-8">
  <title>Grace Acres Farm</title>
  <link rel="icon" href="./assets/images/favicon.png" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta http-equiv="X-UA-Compatible" content="ie=edge">
  <link rel="stylesheet" href="assets/css/bootstrap.min.css" />
  <link rel="stylesheet" href="assets/css/font-awesome.min.css">
  <link rel="stylesheet" href="assets/css/owl.carousel.min.css">
  <link rel="stylesheet" href="assets/css/checkout.css" />
  <link rel="stylesheet" href="assets/css/style.css" />
  <link rel="stylesheet" href="assets/css/substyle.css" />
  <link rel="stylesheet" href="assets/css/responsive.css" />
  <link rel="stylesheet" href="assets/css/aos.css" />
  <link href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;500;600;700&display=swap" rel="stylesheet">
</head>

<body>

  <section class="checkout-main-sec">
    <div class="checkout-left-wrap">
      <div class="checkout-left-inner-wrap">
        <div class="title">
          <h4>Secret Nature</h4>
        </div>
        <div class="checkout-tabs-wrap">
          <nav>
            <div class="nav" id="nav-tab" role="tablist">
              <a href="order-cart.php" class="ck-tab-link"  aria-selected="true">Cart</a>
              <a class="ck-tab-link active" id="nav-info-tab" data-toggle="tab" href="#nav-info" role="tab"
                aria-controls="nav-info" aria-selected="true">Information</a>

              <a class="ck-tab-link" id="nav-shipping-tab" data-toggle="tab" href="#nav-shipping" role="tab"
                aria-controls="nav-shipping" aria-selected="false">Shipping</a>

              <a class="ck-tab-link" id="nav-payment-tab" data-toggle="tab" href="#nav-payment" role="tab"
                aria-controls="nav-payment" aria-selected="false">Payment</a>

            </div>
          </nav>
          <div class="tab-content checkout-tabs-content" id="nav-tabContent">
            <div class="tab-pane fade show active" id="nav-info" role="tabpanel" aria-labelledby="nav-info-tab">
              <div class="tab-content-inner-wrap">
                <div class="cktab-head">
                  <h3>Contact information</h3>
                  <h4>Already have an account? <a href="#!">Log in</a></h4>
                </div>
                <div class="cktab-body row">
                  <div class="cktab-field-wrap col-sm-12">
                    <label>Email <span>*</span></label>
                    <input type="email" placeholder="Enter Email">
                  </div>
                  <div class="col-sm-12 pb-3 pt-3">
                    <input type="checkbox" id="checkBox">
                    <label for="checkBox">  Keep me up to date on news and exclusive offers</label>
                  </div>
                  <h5 class="col-sm-12">Shipping address</h5>
                  <div class="cktab-field-wrap col-sm-6">
                    <label>First Name <span>*</span></label>
                    <input type="text" placeholder="First Name">
                  </div>
                  <div class="cktab-field-wrap col-sm-6">
                    <label>Last Name <span>*</span></label>
                    <input type="text" placeholder="Last Name">
                  </div>
                  <div class="cktab-field-wrap col-sm-12">
                    <label>Company <span>*</span></label>
                    <input type="text" placeholder="Company">
                  </div>
                  <div class="cktab-field-wrap col-sm-12">
                    <label>Address <span>*</span></label>
                    <input type="text" placeholder="Address">
                  </div>
                  <div class="cktab-field-wrap col-sm-12">
                    <label>Appartment, Suite, etc</label>
                    <input type="text" placeholder="Appartment, Suite, etc">
                  </div>
                  <div class="cktab-field-wrap col-sm-12">
                    <label>City <span>*</span></label>
                    <input type="text" placeholder="City">
                  </div>
                  <div class="cktab-field-wrap col-sm-6">
                    <label>Country <span>*</span></label>
                    <select>
                      <option selected disabled>-- Select Country --</option>
                      <option>USA</option>
                      <option>UK</option>
                    </select>
                  </div>
                  <div class="cktab-field-wrap col-sm-6">
                    <label>Postcode <span>*</span></label>
                    <input type="text" placeholder="Postcode">
                  </div>
                  <div class="cktab-field-wrap col-sm-12">
                    <label>Phone Number <span>*</span></label>
                    <input type="text" placeholder="Phone Number">
                  </div>
                  <div class="col-sm-12 pb-3 pt-3">
                    <input type="checkbox" id="checkBox">
                    <label for="checkBox">Save this information for next time</label>
                  </div>
                  <div class="cktab-btn-wrap col-sm-12">
                    <a href="#!" class="return-cart"><i class="fas fa-angle-left"></i> Return to cart</a>
                    <a href="#!" class="cktab-continue-btn">Continue Shipping</a>
                  </div>
                </div>
              </div>
            </div>
            <div class="tab-pane fade" id="nav-shipping" role="tabpanel" aria-labelledby="nav-shipping-tab">
              <div class="tab-content-inner-wrap">
                <div class="ck-shipping-wrapper">
                  <div class="ck-ship-single">
                    <h6>Contact</h6>
                    <div class="sk-ship-single-inner">
                      <p>someone@email.com</p>
                      <a href="#!">Change</a>
                    </div>
                  </div>
                  <div class="ck-ship-single">
                    <h6>Ship to</h6>
                    <div class="sk-ship-single-inner">
                      <p>Somewhere, second floor, New York, USA</p>
                      <a href="#!">Change</a>
                    </div>
                  </div>
                </div>
                <h5 class="ship-heading">Shipping method</h5>
                <div class="ck-shipping-wrapper">
                  <label class="ck-ship-single">
                    <input type="radio" name="shipping">
                    <div class="sk-ship-single-inner">
                      <span>Free U.S. Standard Shipping</span>
                      <span>Free</span>
                    </div>
                  </label>
                  <label class="ck-ship-single">
                    <input type="radio" name="shipping">
                    <div class="sk-ship-single-inner">
                      <span>EMS Shipping service</span>
                      <span>$5</span>
                    </div>
                  </label>
                </div>
                <div class="cktab-btn-wrap">
                  <a href="#!" class="return-cart"><i class="fas fa-angle-left"></i> Return to Information</a>
                  <a href="#!" class="cktab-continue-btn">Continue to Payment</a>
                </div>
              </div>
            </div>
            <div class="tab-pane fade" id="nav-payment" role="tabpanel" aria-labelledby="nav-payment-tab">
              <div class="tab-content-inner-wrap">
                <div class="ck-shipping-wrapper">
                  <div class="ck-ship-single">
                    <h6>Contact</h6>
                    <div class="sk-ship-single-inner">
                      <p>someone@email.com</p>
                      <a href="#!">Change</a>
                    </div>
                  </div>
                  <div class="ck-ship-single">
                    <h6>Ship to</h6>
                    <div class="sk-ship-single-inner">
                      <p>Somewhere, second floor, New York, USA</p>
                      <a href="#!">Change</a>
                    </div>
                  </div>
                  <div class="ck-ship-single">
                    <h6>Method</h6>
                    <div class="sk-ship-single-inner">
                      <p>Free U.S. Standard Shipping · Free</p>
                    </div>
                  </div>
                </div>
                <h5 class="ship-heading mb-1">Payment method</h5>
                <p class="ship-text mb-3">All transactions are secure and encrypted.</p>

                <div class="accordion shipping-method" id="shippingMethod">
                  <div class="shipping-card">
                    <div class="shipping-card-header">
                      <div class="custom-control custom-radio">
                        <input data-toggle="collapse" data-target="#eximbayCollapse" type="radio" id="eximbay"
                          name="shipping" class="custom-control-input" />
                        <label class="custom-control-label" for="eximbay"><img src="assets/images/payment-2.jpg"
                            alt=""></label>
                      </div>
                    </div>

                    <div id="eximbayCollapse" class="collapse" aria-labelledby="eximbay" data-parent="#shippingMethod">
                      <div class="shipping-card-body">
                        <div class="row">
                          <div class="col-12">
                            <input type="text" placeholder="Card Number">
                          </div>
                          <div class="col-12">
                            <input type="text" placeholder="Name on card">
                          </div>
                          <div class="col-6">
                            <input type="text" placeholder="Expiration date (MM / YY)">
                          </div>
                          <div class="col-6">
                            <input type="text" placeholder="Security Code">
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div class="shipping-card">
                    <div class="shipping-card-header">
                      <div class="custom-control custom-radio">
                        <input data-toggle="collapse" data-target="#paypalCollapse" type="radio" id="paypal"
                          name="shipping" class="custom-control-input" />
                        <label class="custom-control-label" for="paypal"><img src="assets/images/payment-1.jpg" alt=""></label>
                      </div>
                    </div>
                    <div id="paypalCollapse" class="collapse" aria-labelledby="paypal" data-parent="#shippingMethod">
                      <div class="shipping-card-body">
                        <div class="paypal-wrapper">
                          <img src="assets/images/card-placeholder.png" alt="">
                          <p>After clicking “Complete order”, you will be redirected to PayPal to complete your purchase
                            securely.</p>
                        </div>
                      </div>
                    </div>
                  </div>

                </div>

                <div class="cktab-btn-wrap">
                  <a href="#!" class="return-cart"><i class="fas fa-angle-left"></i> Return to Shipping</a>
                  <a href="#!" class="cktab-continue-btn">Complete Order</a>
                </div>

              </div>
            </div>
          </div>
        </div>
      
        <div class="checkout_bottom">
          <button type="button" class="" data-toggle="modal" data-target="#checkoutModal1">Refund policy</button>
          <button type="button" class="" data-toggle="modal" data-target="#checkoutModal2">Shipping policy</button>
          <button type="button" class="" data-toggle="modal" data-target="#checkoutModal3">Privacy policy</button>
          <button type="button" class="" data-toggle="modal" data-target="#checkoutModal4">Terms of services</button>
        </div>
      </div>
    </div>
    <div class="checkout-right-wrap">
      <div class="checkout-right-inner-wrap">
        <div class="checkout-prod-wrap">
          <div class="ckp-single-wrap">
            <div class="ckp-desc-wrap">
              <div class="ckp-desc-img-wrap">
                <img src="assets/images/product-img-1.jpg" alt="" class="img-fluid">
                <span class="ckp-qty">2</span>
              </div>
              <h6 class="ckp-pname">Dough Boy</h6>
            </div>
            <label class="ckp-price">$15.00</label>
          </div>
          <div class="ckp-single-wrap">
            <div class="ckp-desc-wrap">
              <div class="ckp-desc-img-wrap">
                <img src="assets/images/product-img-1.jpg" alt="" class="img-fluid">
                <span class="ckp-qty">1</span>
              </div>
              <h6 class="ckp-pname">Forbidden Fruit 700mg Cartridge Only</h6>
            </div>
            <label class="ckp-price">$40.00</label>
          </div>
        </div>

        <div class="checkout-discount-wrap">
          <input type="text" placeholder="Gift card or discount code">
          <button>Apply</button>
        </div>

        <div class="checkout-total-wrap">
          <div class="ck-subtotal-single">
            <label>Subtotal</label>
            <label><b>$ 200</b></label>
          </div>
          <div class="ck-subtotal-single">
            <label>Shipping</label>
            <label><b>$ 200</b></label>
          </div>
          <div class="ck-total">
            <label>Total</label>
            <p>$ 13,670</p>
          </div>

        </div>

      </div>

    </div>
  </section>
    
    <!-- checkoutModal1 -->
<div id="checkoutModal1" class="modal fade checkout_modals" role="dialog">
  <div class="modal-dialog">

    <!-- Modal content-->
    <div class="modal-content">
      <div class="modal-header">
        <h4 class="modal-title">Refund policy</h4>
        <button type="button" class="close" data-dismiss="modal">&times;</button>
        
      </div>
      <div class="modal-body check_bottom_modal">
        <p>Returns</p>
        <p>Our policy lasts 30 days. If 30 days have gone by since your purchase, unfortunately we can’t offer you a refund or exchange.</p>
        <p>To be eligible for a return, your item must be unused and in the same condition that you received it. It must also be in the original packaging.</p>
        <p>Several types of goods are exempt from being returned. Perishable goods such as food, flowers, newspapers or magazines cannot be returned. We also do not accept products that are intimate or sanitary goods, hazardous materials, or flammable liquids or gases.</p>
        <p>Additional non-returnable items:</p>
        Gift cards
       <p> Downloadable software products</p>
       <p> Some health and personal care items</p>

       <p> To complete your return, we require a receipt or proof of purchase.</p>

       <p> Please do not send your purchase back to the manufacturer.</p>

       <p> There are certain situations where only partial refunds are granted (if applicable)</p>
       <p> Book with obvious signs of use</p>
       <p> CD, DVD, VHS tape, software, video game, cassette tape, or vinyl record that has been opened</p>
       <p> Any item not in its original condition, is damaged or missing parts for reasons not due to our error</p>
       <p> Any item that is returned more than 30 days after delivery</p>

       <p> Refunds (if applicable)</p>
       <p> Once your return is received and inspected, we will send you an email to notify you that we have received your returned item. We will also notify you of the approval or rejection of your refund.</p>
       <p> If you are approved, then your refund will be processed, and a credit will automatically be applied to your credit card or original method of payment, within a certain amount of days.</p>

        <p> Late or missing refunds (if applicable)</p>
        <p> If you haven’t received a refund yet, first check your bank account again.</p>
        <p> Then contact your credit card company, it may take some time before your refund is officially posted.</p>
        <p> Next contact your bank. There is often some processing time before a refund is posted.</p>
        <p> If you’ve done all of this and you still have not received your refund yet, please contact us at info@secretnaturecbd.com.</p>

        <p> Sale items (if applicable)</p>
        <p>Only regular priced items may be refunded, unfortunately sale items cannot be refunded.</p>

        <p> Exchanges (if applicable)</p>
        <p> We only replace items if they are defective or damaged. If you need to exchange it for the same item, send us an email at info@secretnaturecbd.com and send your item to: SECRET NATURE , 5933 NE Win Sivers Drive, #205, Portland OR 97220, United States.</p>

        <p> Gifts</p>
        <p> If the item was marked as a gift when purchased and shipped directly to you, you’ll receive a gift credit for the value of your return. Once the returned item is received, a gift certificate will be mailed to you.</p>

        <p>If the item wasn’t marked as a gift when purchased, or the gift giver had the order shipped to themselves to give to you later, we will send a refund to the gift giver and he will find out about your return.</p>

       <p> Shipping</p>
        <p>To return your product, you should mail your product to: SECRET NATURE , 5933 NE Win Sivers Drive, #205, Portland OR 97220, United States</p>

       <p> You will be responsible for paying for your own shipping costs for returning your item. Shipping costs are non-refundable. If you receive a refund, the cost of return shipping will be deducted from your refund.</p>

       <p> Depending on where you live, the time it may take for your exchanged product to reach you, may vary.</p>

       <p> If you are shipping an item over $75, you should consider using a trackable shipping service or purchasing shipping insurance. We don’t guarantee that we will receive your returned item.</p>
      </div>
    </div>

  </div>
</div>
<!-- checkoutModal2 -->
<div id="checkoutModal2" class="modal fade checkout_modals" role="dialog">
  <div class="modal-dialog">

    <!-- Modal content-->
    <div class="modal-content">
      <div class="modal-header">
        <h4 class="modal-title">Shipping policy</h4>
        <button type="button" class="close" data-dismiss="modal">&times;</button>
      </div>
      <div class="modal-body check_bottom_modal">
        <p>Please allow 1-2 business days for your order to be processed.</p>
      </div>
    </div>

  </div>
</div>
<!-- checkoutModal3 -->
<div id="checkoutModal3" class="modal fade checkout_modals" role="dialog">
  <div class="modal-dialog">

    <!-- Modal content-->
    <div class="modal-content">
      <div class="modal-header">
        <h4 class="modal-title">Privacy policy</h4>
        <button type="button" class="close" data-dismiss="modal">&times;</button>
      </div>
      <div class="modal-body check_bottom_modal">
        <p>This Privacy Policy describes how your personal information is collected, used, and shared when you visit or make a purchase from secretnaturecbd.com (the “Site”).</p>
        <p>PERSONAL INFORMATION WE COLLECT</p>
        <p>When you visit the Site, we automatically collect certain information about your device, including information about your web browser, IP address, time zone, and some of the cookies that are installed on your device. Additionally, as you browse the Site, we collect information about the individual web pages or products that you view, what websites or search terms referred you to the Site, and information about how you interact with the Site. We refer to this automatically-collected information as “Device Information”.</p>
        <p>We collect Device Information using the following technologies:
        - “Cookies” are data files that are placed on your device or computer and often include an anonymous unique identifier. For more information about cookies, and how to disable cookies, visit http://www.allaboutcookies.org.</p>
        <p>- “Log files” track actions occurring on the Site, and collect data including your IP address, browser type, Internet service provider, referring/exit pages, and date/time stamps.
        - “Web beacons”, “tags”, and “pixels” are electronic files used to record information about how you browse the Site.</p>
        <p>- [[INSERT DESCRIPTIONS OF OTHER TYPES OF TRACKING TECHNOLOGIES USED]]</p>
        <p>Additionally when you make a purchase or attempt to make a purchase through the Site, we collect certain information from you, including your name, billing address, shipping address, payment information (including credit card numbers [[INSERT ANY OTHER PAYMENT TYPES ACCEPTED]]), email address, and phone number. We refer to this information as “Order Information”.</p>
        <p>[[INSERT ANY OTHER INFORMATION YOU COLLECT: OFFLINE DATA, PURCHASED MARKETING DATA/LISTS]]</p>
        <p>When we talk about “Personal Information” in this Privacy Policy, we are talking both about Device Information and Order Information.</p>
        <p>When we talk about “Personal Information” in this Privacy Policy, we are talking both about Device Information and Order Information.</p>
        <p>HOW DO WE USE YOUR PERSONAL INFORMATION?</p>
        <p>We use the Order Information that we collect generally to fulfill any orders placed through the Site (including processing your payment information, arranging for shipping, and providing you with invoices and/or order confirmations). Additionally, we use this Order Information to:</p>
        <p>- Communicate with you;</p>
        <p>- Screen our orders for potential risk or fraud; and</p>
        <p>- When in line with the preferences you have shared with us, provide you with information or advertising relating to our products or services.</p>
        <p>- [[INSERT OTHER USES OF ORDER INFORMATION]]</p>
        <p>We use the Device Information that we collect to help us screen for potential risk and fraud (in particular, your IP address), and more generally to improve and optimize our Site (for example, by generating analytics about how our customers browse and interact with the Site, and to assess the success of our marketing and advertising campaigns).</p>
        <p>[[INSERT OTHER USES OF DEVICE INFORMATION, INCLUDING: ADVERTISING/RETARGETING]]</p>
        <p>SHARING YOUR PERSONAL INFORMATION</p>
        <p>We share your Personal Information with third parties to help us use your Personal Information, as described above. For example, we use Shopify to power our online store--you can read more about how Shopify uses your Personal Information here: https://www.shopify.com/legal/privacy. We also use Google Analytics to help us understand how our customers use the Site -- you can read more about how Google uses your Personal Information here: https://www.google.com/intl/en/policies/privacy/. You can also opt-out of Google Analytics here: https://tools.google.com/dlpage/gaoptout.</p>
        <p>Finally, we may also share your Personal Information to comply with applicable laws and regulations, to respond to a subpoena, search warrant or other lawful request for information we receive, or to otherwise protect our rights.</p>
        <p>BEHAVIOURAL ADVERTISING</p>
        <p>As described above, we use your Personal Information to provide you with targeted advertisements or marketing communications we believe may be of interest to you. For more information about how targeted advertising works, you can visit the Network Advertising Initiative’s (“NAI”) educational page at http://www.networkadvertising.org/understanding-online-advertising/how-does-it-work.</p>
        <p>You can opt out of targeted advertising by using the links below:</p>
        <p>- Facebook: https://www.facebook.com/settings/?tab=ads</p>
        <p>- Google: https://www.google.com/settings/ads/anonymous</p>
        <p>- Bing: https://advertise.bingads.microsoft.com/en-us/resources/policies/personalized-ads</p>
        <p>- [[INCLUDE OPT-OUT LINKS FROM WHICHEVER SERVICES BEING USED]]</p>
        <p>Additionally, you can opt out of some of these services by visiting the Digital Advertising Alliance’s opt-out portal at: http://optout.aboutads.info/.</p>
        <p>DO NOT TRACK</p>
        <p>Please note that we do not alter our Site’s data collection and use practices when we see a Do Not Track signal from your browser.</p>
        <p>YOUR RIGHTS</p>
        <p>If you are a European resident, you have the right to access personal information we hold about you and to ask that your personal information be corrected, updated, or deleted. If you would like to exercise this right, please contact us through the contact information below.</p>
      </div>
    </div>

  </div>
</div>
<!-- checkoutModal3 -->
<div id="checkoutModal4" class="modal fade checkout_modals" role="dialog">
  <div class="modal-dialog">

    <!-- Modal content-->
    <div class="modal-content">
      <div class="modal-header">
        <h4 class="modal-title">Terms Of Service</h4>
        <button type="button" class="close" data-dismiss="modal">&times;</button>
      </div>
      <div class="modal-body check_bottom_modal">
        <p>This Privacy Policy describes how your personal information is collected, used, and shared when you visit or make a purchase from secretnaturecbd.com (the “Site”).</p>
        <p>PERSONAL INFORMATION WE COLLECT</p>
        <p>When you visit the Site, we automatically collect certain information about your device, including information about your web browser, IP address, time zone, and some of the cookies that are installed on your device. Additionally, as you browse the Site, we collect information about the individual web pages or products that you view, what websites or search terms referred you to the Site, and information about how you interact with the Site. We refer to this automatically-collected information as “Device Information”.</p>
        <p>We collect Device Information using the following technologies:
        - “Cookies” are data files that are placed on your device or computer and often include an anonymous unique identifier. For more information about cookies, and how to disable cookies, visit http://www.allaboutcookies.org.</p>
        <p>- “Log files” track actions occurring on the Site, and collect data including your IP address, browser type, Internet service provider, referring/exit pages, and date/time stamps.
        - “Web beacons”, “tags”, and “pixels” are electronic files used to record information about how you browse the Site.</p>
        <p>- [[INSERT DESCRIPTIONS OF OTHER TYPES OF TRACKING TECHNOLOGIES USED]]</p>
        <p>Additionally when you make a purchase or attempt to make a purchase through the Site, we collect certain information from you, including your name, billing address, shipping address, payment information (including credit card numbers [[INSERT ANY OTHER PAYMENT TYPES ACCEPTED]]), email address, and phone number. We refer to this information as “Order Information”.</p>
        <p>[[INSERT ANY OTHER INFORMATION YOU COLLECT: OFFLINE DATA, PURCHASED MARKETING DATA/LISTS]]</p>
        <p>When we talk about “Personal Information” in this Privacy Policy, we are talking both about Device Information and Order Information.</p>
        <p>When we talk about “Personal Information” in this Privacy Policy, we are talking both about Device Information and Order Information.</p>
        <p>HOW DO WE USE YOUR PERSONAL INFORMATION?</p>
        <p>We use the Order Information that we collect generally to fulfill any orders placed through the Site (including processing your payment information, arranging for shipping, and providing you with invoices and/or order confirmations). Additionally, we use this Order Information to:</p>
        <p>- Communicate with you;</p>
        <p>- Screen our orders for potential risk or fraud; and</p>
        <p>- When in line with the preferences you have shared with us, provide you with information or advertising relating to our products or services.</p>
        <p>- [[INSERT OTHER USES OF ORDER INFORMATION]]</p>
        <p>We use the Device Information that we collect to help us screen for potential risk and fraud (in particular, your IP address), and more generally to improve and optimize our Site (for example, by generating analytics about how our customers browse and interact with the Site, and to assess the success of our marketing and advertising campaigns).</p>
        <p>[[INSERT OTHER USES OF DEVICE INFORMATION, INCLUDING: ADVERTISING/RETARGETING]]</p>
        <p>SHARING YOUR PERSONAL INFORMATION</p>
        <p>We share your Personal Information with third parties to help us use your Personal Information, as described above. For example, we use Shopify to power our online store--you can read more about how Shopify uses your Personal Information here: https://www.shopify.com/legal/privacy. We also use Google Analytics to help us understand how our customers use the Site -- you can read more about how Google uses your Personal Information here: https://www.google.com/intl/en/policies/privacy/. You can also opt-out of Google Analytics here: https://tools.google.com/dlpage/gaoptout.</p>
        <p>Finally, we may also share your Personal Information to comply with applicable laws and regulations, to respond to a subpoena, search warrant or other lawful request for information we receive, or to otherwise protect our rights.</p>
        <p>BEHAVIOURAL ADVERTISING</p>
        <p>As described above, we use your Personal Information to provide you with targeted advertisements or marketing communications we believe may be of interest to you. For more information about how targeted advertising works, you can visit the Network Advertising Initiative’s (“NAI”) educational page at http://www.networkadvertising.org/understanding-online-advertising/how-does-it-work.</p>
        <p>You can opt out of targeted advertising by using the links below:</p>
        <p>- Facebook: https://www.facebook.com/settings/?tab=ads</p>
        <p>- Google: https://www.google.com/settings/ads/anonymous</p>
        <p>- Bing: https://advertise.bingads.microsoft.com/en-us/resources/policies/personalized-ads</p>
        <p>- [[INCLUDE OPT-OUT LINKS FROM WHICHEVER SERVICES BEING USED]]</p>
        <p>Additionally, you can opt out of some of these services by visiting the Digital Advertising Alliance’s opt-out portal at: http://optout.aboutads.info/.</p>
        <p>DO NOT TRACK</p>
        <p>Please note that we do not alter our Site’s data collection and use practices when we see a Do Not Track signal from your browser.</p>
        <p>YOUR RIGHTS</p>
        <p>If you are a European resident, you have the right to access personal information we hold about you and to ask that your personal information be corrected, updated, or deleted. If you would like to exercise this right, please contact us through the contact information below.</p>
      </div>
    </div>

  </div>
</div>

  <script src="assets/js/jquery.min.js"></script>
  <script src="assets/js/bootstrap.min.js"></script>
  <script src="assets/js/owl.carousel.min.js"></script>
  <script src="assets/js/custom.js"></script>
</body>

</html>