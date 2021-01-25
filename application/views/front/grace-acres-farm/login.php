<?php include 'inc/header.php'; ?>
 <section class="login-form">
   <div class="container">
      <section id="formHolder">

         <div class="row">

            <!-- Brand Box -->
            <div class="col-sm-6 brand">
               <a href="#" class="logo"><img src="assets/images/logo.png" alt="" class="img-fluid">
                  <!-- BMD <span>.</span> --></a>

               <div class="heading">
                  <h2>grace-acres-farm
                     <br>
                     acres
                  </h2>
                  <p>farm</p>
               </div>

               <div class="success-msg">
                  <p>Great! You are one of our members now</p>
                  <a href="#" class="profile">Your Profile</a>
               </div>
            </div>


            <!-- Form Box -->
            <div class="col-sm-6 form">

               <!-- Login Form -->
               <div class="login form-peice">
                  <form class="login-form" action="#" method="post">
                     <div class="form-group">
                        <label for="loginemail" class="">Email Adderss</label>
                        <input type="email" name="loginemail" id="loginemail" required="">
                     </div>

                     <div class="form-group">
                        <label for="loginPassword">Password</label>
                        <input type="password" name="loginPassword" id="loginPassword" required="">
                         <a class="forgot_btn" data-toggle="modal" data-target="#pswdModal"> Forgot Password ?</a>
                     </div>

                     <div class="CTA">
                        <!-- <input type="submit" value="Login"> -->
                        <button type="submit"> LOGIN</button>
                        <a href="#" class="switch">CREATE ACCOUNT</a>

                     </div>
                  </form>
               </div><!-- End Login Form -->


               <!-- Signup Form -->
               <div class="signup form-peice switched">
                  <form class="signup-form" action="#" method="post">

                     <div class="form-group">
                        <label for="name">Full Name</label>
                        <input type="text" name="username" id="name" class="name">
                        <span class="error"></span>
                     </div>

                     <div class="form-group">
                        <label for="email">Email Adderss</label>
                        <input type="email" name="emailAdress" id="email" class="email">
                        <span class="error"></span>
                     </div>

                     <div class="form-group">
                        <label for="phone">Phone Number - <small>Optional</small></label>
                        <input type="text" name="phone" id="phone">
                     </div>

                     <div class="form-group">
                        <label for="password">Password</label>
                        <input type="password" name="password" id="password" class="pass">
                        <span class="error"></span>
                     </div>

                     <div class="form-group">
                        <label for="passwordCon">Confirm Password</label>
                        <input type="password" name="passwordCon" id="passwordCon" class="passConfirm">
                        <span class="error"></span>
                     </div>

                     <div class="CTA">
                       <!--  <input type="submit" value="CREATE ACCOUNT" id="submit"> -->
                       <button type="submit" id="submit">CREATE ACCOUNT</button>
                        <a href="#" class="switch active">I have an account</a>
                     </div>
                  </form>
               </div><!-- End Signup Form -->
            </div>
         </div>
      </section>
   </div>
</section>
<?php include 'inc/footer.php'; ?>