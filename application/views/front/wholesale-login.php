<?php include("inc/header-link.php")?>
<style type="text/css">
	
/*Wholesale-Signin*/
.wholwsale_signin_sec {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 100vh;
}

.wholwsale_signin_wrap {
    width: calc(100% - 70%);
    border: 1px solid #e1e1e1;
    background: #f5f2e8;
    padding: 0 20px;
}
.wholwsale_signin_wrap .wholesale_top_sec {
    border: none;
    padding: 30px 0 0;
}
.wholwsale_signin_wrap .password-popup-body {
    padding: 20px 0;
}
.password-popup-body label {
    font-size: 32px;
    padding: 0 0 30px 0;
    font-weight: 600;
}

.wholesale_email_wrap h3 {
    padding: 20px 0 0 0;
}
.caption {
    font-size: 17px;
    padding: 20px 0;
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
 .password-form .input-group input:focus + label, .password-form .input-group input.has-content + label {
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
/*Wholesale-Login*/
.wholwsale_login_r1 .password-popup-body {
    /* padding: 30px; */
    padding: 0 40px 30px;
}
.wholwsale_login_r1 form.password-form {
    width: calc(100% - 0%);
}

.wholwsale_login_r1 .pro_list_content {
    margin: 0;
    /* background: #f7f7f7; */
    border-bottom: 1px solid #eee;
}
.wholwsale_login_r1 button,.wholwsale_signin_wrap button {
    margin: 30px auto 0;
    /*width: calc(100% - 50%);*/
    width: calc(100% - 10%);
    padding: 10px;
    display: block;
    font-size: 18px;
    text-transform: uppercase;
    font-weight: 700;
}
.wholwsale_login_sec1 {
    padding: 40px 0;
    width: calc(100% - 40%);
    margin: 0 auto;
}

.wholwsale_signin_wrap h3 {
    padding: 0 0 20px 0;
    font-size: 24px;
    font-weight: 700;
}
.wholwsale_signin_row label {
    font-size: 15px;
    font-weight: 100;
    padding: 0;
}
.wholwsale_signin_row {
    display: flex;
    align-items: baseline;
    justify-content: space-between;
}
.wholwsale_signin_wrap .wholesale_top_sec {
    border: none;
    padding: 30px 0 0;
}
.wholesale_top_sec {
    margin: 0 auto;
    display: block;
    text-align: center;
    padding: 40px 0;
    /* border-top: 2px solid #ab8d49; */
    border-bottom: 1px solid #eee;
}
.wholwsale_signin_wrap h3 {
    padding: 0 0 20px 0;
    font-size: 24px;
    font-weight: 700;
}
.wholesale_top_sec img {
    max-width: 25%;
}
.wholwsale_signin_wrap .custom_btn {
    border: 2px solid #000;
    color: #333;
}
.wholwsale_signin_wrap .custom_btn:hover {
    border: 2px solid transparent;
}

.password-popup-body p {
    font-size: 14px;
    padding: 0 0 15px 0;
}
.password-popup-body a {
    font-size: 14px;
}

/**/
</style>
<section class="wholwsale_signin_sec">
    <div class="wholwsale_signin_wrap">
        <div class="container">
		<div class="row">
			<div class="col-12 col-md-12 col-lg-12 ">
				    <div class="wholesale_top_sec">
						<img src="assets/images/logo.png" alt="" class="img-fluid">
					</div>
					<form>
        				<div class="password-popup-body">
        				    <h3>Log in</h3>
        				    <p>Enter your email for instructions to access your wholesale account.</p>
        					<div class="password-input-wrap">
        						<div class="password-form" action="#">
        							<div class="input-group">
        								<input type="text" required="required">
        								<label class="">Email</label>
        							</div>
        							<div class="input-group">
        								<input type="password" required="required">
        								<label class="">Password</label>
        							</div>
        						</div>
        						<div class="wholwsale_signin_row">
        						    <div>
        						        <input type="checkbox" name="login">
                                        <label for="login" style="font-size: 13px;"> Keep me logged in</label>
        						    </div>
        						    <a href="">Need help logging in?</a>
        						</div>
                        	</div>
        					<button class="custom_btn">Submit</button>
        					<div class="wholwsale_login_bottom d-flex flex-wrap p-3">
    						 <a href="wholesale-login.php"> Back to Login</a>
    						</div>
        				</div>
    				</form>
			</div>
		</div>
	</div>
    </div> 
</section>

<?php include("inc/footer-links.php")?>