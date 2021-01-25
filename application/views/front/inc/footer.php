<footer>
   <div class="container"  data-aos="fade-up" data-aos-duration="1200" data-aos-delay="100">
   		<section class="testimonial_sec title">
	   		<h3 class="text-center">Testimonials</h3>
	   		<div class="testimonial_wrap">
	   			<div class="testimonial_slider owl-carousel owl-theme">
	   			    <?php foreach($this->testicles as $key => $test): ?>
				    <div class="item slider-item">
				    	<div class="testimonial_slider_content">
				    		<img src="<?= base_url('uploads/testimonials/'.$test->testimonials_image) ?>" class="img-fluid" alt="">
				    		<p>
				    			<!--“Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.”-->
                                <?= $test->message??''; ?>
				    		</p>
				    	</div>
				    </div>
				    <?php endforeach; ?>
				    <!--<div class="item slider-item">-->
				    <!--	<div class="testimonial_slider_content">-->
				    <!--		<img src="</?= base_url('assets/front/') ?>images/testimonial-img.png" class="img-fluid" alt="">-->
				    <!--		<p>-->
				    <!--			“Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.”-->
				    <!--		</p>-->
				    <!--	</div>-->
				    <!--</div>-->
				    <!--<div class="item slider-item">-->
				    <!--	<div class="testimonial_slider_content">-->
				    <!--		<img src="</?= base_url('assets/front/') ?>images/testimonial-img.png" class="img-fluid" alt="">-->
				    <!--		<p>-->
				    <!--			“Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.”-->
				    <!--		</p>-->
				    <!--	</div>-->
				    <!--</div>-->
				    <!--<div class="item slider-item">-->
				    <!--	<div class="testimonial_slider_content">-->
				    <!--		<img src="</?= base_url('assets/front/') ?>images/testimonial-img.png" class="img-fluid" alt="">-->
				    <!--		<p>-->
				    <!--			“Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.”-->
				    <!--		</p>-->
				    <!--	</div>-->
				    <!--</div>-->
				</div>	
	   		</div>
   		</section>

   		<section class="footer_r2 text-center">
   			<a href="<?= base_url() ?>">
   				<img src="<?= base_url('assets/front/') ?>images/footer-logo.png" class="img-fluid" alt="">
   			</a>	
   			<div class="contact_wrap">
				<label>call us on: <a href="tel:123 456 7890">+123 456 7890</a></label>
				<label>Email Us On : <a href="mailto:info@olestbadges.com">info@olestbadges.com</a></label> 
   			</div>
   			<p class="">Get Us On: 1234 Lorem Ipsum Dummy Address USA.</p>
   			<img src="<?= base_url('assets/front/') ?>images/payment-cart-img.png" class="img-fluid" alt="">
   		</section>
  		<div class="footer_bottom">
			<p>Copyright © 2020 Old West Badges. All Rights Reserved.</p>
			<div class="footer_bottom_row">
				<a href="<?= base_url('shipping-returns') ?>">Shipping & Returns</a> / <a href="<?= base_url('privacy-policy') ?>">Privacy Policies</a>
			</div>
		</div>	
   </div>	
</footer>


  <script src="<?= base_url('assets/front/') ?>js/jquery.min.js"></script>
  <script src="<?= base_url('assets/front/') ?>js/bootstrap.min.js"></script>
  <script src="<?= base_url('assets/front/') ?>js/owl.carousel.min.js"></script>
  <script src="<?= base_url('assets/front/') ?>js/aos.js"></script>
  <script src="<?= base_url('assets/front/') ?>js/custom.js"></script>
  <script>
  AOS.init();
</script>
</body>
</html>