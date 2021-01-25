<?php include("inc/header-link.php")?>
<style>
	
	/*Wholesale-Login*/
.wholesale_login_r1 .password-popup-body {
    /* padding: 30px; */
    padding: 0 40px 30px;
}
.wholesale_login_r1 form.password-form {
    width: calc(100% - 0%);
}

.wholesale_login_r1 .pro_list_content {
    margin: 0;
    /* background: #f7f7f7; */
    border-bottom: 1px solid #eee;
}
.wholesale_login_r1 button,.wholesale_signin_wrap button {
    margin: 30px auto 0;
    /*width: calc(100% - 50%);*/
    width: calc(100% - 10%);
    padding: 10px;
    display: block;
    font-size: 18px;
    text-transform: uppercase;
    font-weight: 700;
}
.wholesale_login_sec1 {
    padding: 40px 0;
    width: calc(100% - 40%);
    margin: 0 auto;
}

.wholesale_signin_wrap {
    padding: 0 20px;
}
.wholesale_signin_wrap h3 {
    padding: 0 0 20px 0;
    font-size: 24px;
    font-weight: 700;
}
.wholesale_signin_row label {
    font-size: 15px;
    font-weight: 100;
    padding: 0;
}
.wholesale_signin_row {
    display: flex;
    align-items: baseline;
    justify-content: space-between;
}
/**/
 .password-form input {
     background: none;
     box-shadow: none;
}
 .password-form input:focus, .password-form input:active {
     outline: none;
     box-shadow: none;
     background: none;
}
.password-form input[type="text"], .password-form input[type="email"],.password-form input[type="number"],.password-form input[type="Password"],.password-form select {
    border-width: 0 0 2px 0;
    border-color: #eee;
    width: 100%;
    z-index: 9999;
    padding: 0 0 5px 0;
}
.password-form select {
    background: transparent;
    margin: 0 0 20px 0;
}
 .password-form .form-group label {
    font-size: 14px;
}
 .password-form input[type="submit"]:active {
     color: #fff;
}

.password-form .input-group {
    position: relative;
    margin: 0 0 30px 0;
}
.password-form .input-group label {
    position: absolute;
    top: 6px;
    transition: all 0.15s ease-out 0s;
    font-size: 12px;
    font-weight: 400;
    text-transform: uppercase;
}
 .password-form .input-group input:focus + label, 
 .password-form .input-group input.has-content + label {
     top: -10px;
}
form.password-form {
    width: calc(100% - 50%);
    margin: 0 auto;
    display: block;
}

.password-popup-body {
    padding: 50px 0;
}
.submit_btn_end button {
    text-align: end;
    margin: 0 0 0 auto;
    display: block;
}

.pro_list_btn {
    display: flex;
    justify-content: space-between;
    padding: 20px;
}

.pro_list_top {
    position: relative;
    /* background: #f9f5eb; */
    padding: 15px;
    cursor: pointer;
    /* box-shadow: 0 0 3px -1px; */
}
.wholesale_top_sec {
    margin: 0 auto;
    display: block;
    text-align: center;
    padding: 40px 0;
    border-bottom: 1px solid #962121;
}
.wholesale_top_sec img {
    max-width: 25%;
}
.pro_list_wrap {
    border-bottom: 1px solid #962121;
}
.wholesale_login_r1 {
    border: 1px solid #e1e1e1;
    background: #f5f2e8;
    padding: 0 20px;
}
.pro_list_top i {
    color: var(--redclr);
}
.wholesale_login_sec1 .custom_btn:hover {
    border: 2px solid transparent;
}

.wholesale_login_sec1 .custom_btn {
    border: 2px solid #000;
    color: #333;
}
.wholesale_login_bottom p,.wholesale_login_bottom a {
    font-size: 14px;
}
.wholesale_top_sec p {
    font-size: 14px;
    padding: 30px 0 0 0;
}

</style>
<section class="wholesale_login_sec1">
	<div class="container">
		<div class="row">
			<div class="col-12 col-md-12 col-lg-6 offset-lg-3">
				<div class="wholesale_login_r1">
					<div class="wholesale_top_sec">
						<img src="assets/images/logo.png" alt="" class="img-fluid">
						<p>Apply for an account to start buying wholesale.</p>
					</div>	
					<div id="accordion">
						<form action="">
							<div class="pro_list_wrap">
								<div class="pro_list_top">	
									<div class="pro_list_btn" data-toggle="collapse" data-target="#wholesaleLogin1" aria-expanded="true">
										<p>Contact details</p>
										<div>	
											<i class="fas fa-arrow-down"></i>
										</div>
									</div>	
								</div>
								<div id="wholesaleLogin1" class="collapse show" data-parent="#accordion">
									<div class="pro_list_content">
										<div class="password-popup-body">
											<div class="password-input-wrap">
												<div class="password-form" action="#">
													<div class="input-group">
														<input type="text" required="required">
														<label class="">First Name</label>
													</div>
													<div class="input-group">
														<input type="text" required="required">
														<label class="">Last Name</label>
													</div>
													<div class="input-group">
														<input type="text" required="required">
														<label class="">Email</label>
													</div>
												</div>
											</div>
										</div>
									</div>
								</div>
							</div>
							<div class="pro_list_wrap">
								<div class="pro_list_top">	
									<div class="pro_list_btn" data-toggle="collapse" data-target="#wholesaleLogin2" aria-expanded="true">
										<p>Business address</p>
										<div>	
											<i class="fas fa-arrow-down"></i>
										</div>
									</div>	
								</div>
								<div id="wholesaleLogin2" class="collapse" data-parent="#accordion">
									<div class="pro_list_content">
										<div class="password-popup-body">
											<div class="password-input-wrap">
												<div class="password-form">
													<div class="input-group">
														<input type="text">
														<label class="">Company (optional)</label>
													</div>
													<div class="input-group">
														<input type="text" required="required">
														<label class="">Address line 1 </label>
													</div>
													<div class="input-group">
														<input type="text">
														<label class="">Address line 2 (optional)</label>
													</div>
													<div class="input-group">
														<input type="text" required="required">
														<label class="">City  </label>
													</div>
													<div class="form-group">
														<label for="">Country</label>
														<select class="" id="" required="required">
															<option value="">Select...</option><option value="Canada">Canada</option><option value="United States">United States</option><option value="United Kingdom">United Kingdom</option><option value="Afghanistan">Afghanistan</option><option value="Aland Islands">Aland Islands</option><option value="Albania">Albania</option><option value="Algeria">Algeria</option><option value="Andorra">Andorra</option><option value="Angola">Angola</option><option value="Anguilla">Anguilla</option><option value="Antigua And Barbuda">Antigua And Barbuda</option><option value="Argentina">Argentina</option><option value="Armenia">Armenia</option><option value="Aruba">Aruba</option><option value="Australia">Australia</option><option value="Austria">Austria</option><option value="Azerbaijan">Azerbaijan</option><option value="Bahamas">Bahamas</option><option value="Bahrain">Bahrain</option><option value="Bangladesh">Bangladesh</option><option value="Barbados">Barbados</option><option value="Belarus">Belarus</option><option value="Belgium">Belgium</option><option value="Belize">Belize</option><option value="Benin">Benin</option><option value="Bermuda">Bermuda</option><option value="Bhutan">Bhutan</option><option value="Bolivia">Bolivia</option><option value="Bosnia And Herzegovina">Bosnia And Herzegovina</option><option value="Botswana">Botswana</option><option value="Bouvet Island">Bouvet Island</option><option value="Brazil">Brazil</option><option value="British Indian Ocean Territory">British Indian Ocean Territory</option><option value="Brunei">Brunei</option><option value="Bulgaria">Bulgaria</option><option value="Burkina Faso">Burkina Faso</option><option value="Burundi">Burundi</option><option value="Cambodia">Cambodia</option><option value="Cape Verde">Cape Verde</option><option value="Cayman Islands">Cayman Islands</option><option value="Central African Republic">Central African Republic</option><option value="Chad">Chad</option><option value="Chile">Chile</option><option value="China">China</option><option value="Christmas Island">Christmas Island</option><option value="Cocos (Keeling) Islands">Cocos (Keeling) Islands</option><option value="Colombia">Colombia</option><option value="Comoros">Comoros</option><option value="Congo">Congo</option><option value="Congo, The Democratic Republic Of The">Congo, The Democratic Republic Of The</option><option value="Cook Islands">Cook Islands</option><option value="Costa Rica">Costa Rica</option><option value="Croatia">Croatia</option><option value="Cuba">Cuba</option><option value="Curaçao">Curaçao</option>
														</select>
													</div>
													<div class="row">
														<div class="col-12 col-md-6 col-lg-6">
															<div class="input-group">
																<input type="text" required="required">
																<label class="">State / Province  </label>
															</div>
														</div>
														<div class="col-12 col-md-6 col-lg-6">
															<div class="input-group">
																<input type="text" required="required">
																<label class="">ZIP / Postal code   </label>
															</div>
														</div>
													</div>
													<div class="input-group">
														<input type="number" required="required">
														<label class="">Number  </label>
													</div>
												</div>
											</div>
										</div>
									</div>
								</div>
							</div>
							<button class="custom_btn">Apply for whole sale</button>
						</form>
						<div class="wholesale_login_bottom d-flex flex-wrap p-3">
							<p>Already have an account?</p> <a href="wholesale-signin.php"> &nbsp; Log in</a>
						</div>
					</div>	
				</div>
			</div>
		</div>
		
	</div>	
</section>

<?php include("inc/footer-links.php")?>