<section class="banner_sec">
		<h2>contact us</h2>
</section>
<section class="contact_sec space_60">
	<div class="container">
		<div class="row align-items-center">
			<div class="col-12 col-md-4 col-lg-4">
				<div class="contact_sec_r1">
					<div class="iconbox">
						<i class="fas fa-phone"></i>
					</div>
					<div class="contact_detail">
						<label>CALL US</label>
						<a href="tel:+1234567890" class="d-block">+123-456-7890</a>
					</div>
				</div>
			</div>
			<div class="col-12 col-md-4 col-lg-4">
				<div class="contact_sec_r1">
					<div class="iconbox">
						<i class="fas fa-map-marker-alt"></i>
					</div>
					<div class="contact_detail">
						<label>Address</label>
						<p>Lorem ipsum dolor sit amet, consectetur adipisicing elit</p>
					</div>
				</div>
			</div>
			<div class="col-12 col-md-4 col-lg-4">
				<div class="contact_sec_r1">
					<div class="iconbox">
						<i class="far fa-envelope"></i>
					</div>
					<div class="contact_detail">
						<label>Email</label>
						<a href="mailto:badge@gmail.com" class="d-block">badge@gmail.com</a>
					</div>
				</div>
			</div>
		</div>
		<div class="contact_row2">
			<form id="form_submit">
				<div class="row">
					<div class="col-12 col-md-6 col-lg-6">
						<input type="text" name="name" placeholder="Name" class="custom_field form-control">
	                    <span id="name" class="text-danger error" style="font-weight: bold;"></span>

						<input type="text" name="email" placeholder="Email" class="custom_field form-control">
                        <span id="email" class="text-danger error" style="font-weight: bold;"></span>
					</div>
					<div class="col-12 col-md-6 col-lg-6">
						<textarea name="message" cols="40" rows="4" placeholder="Message" class="form-control"></textarea>
                        <span id="message" class="text-danger error" style="font-weight: bold;"></span>
					</div>
					<div class="contact_btnbox">
						<button type="button" id="submit" class="custom_btn">Submit</button>	
					</div>
					
				</div>
			</form>
		</div>
		
	</div>
</section>
      <script type="text/javascript">

          $(document).ready(function(){
              $('#submit').on('click',function()
              {
                  $('.error').html('');
                  $.ajax({
                      url:'<?php echo base_url('contact_us/form_validate') ?>',
                      method:'post',
                      dataType:'json',
                      data:$('#form_submit').serialize(),
                      success:function(data)
                      {
                          if(data.status == 'success')
                          {
                              setTimeout(function(){window.location='<?php echo base_url('contact-us') ?>';}, 2000);
                              toastr.success('Email Sent');
                          }
                          else
                          {
                              $('#name').html(data.status.name);
                              $('#email').html(data.status.email);
                              $('#message').html(data.status.message);
                              toastr.error('Fill ALL Fields Correctly!');
                          }
                      }
                  });
              });
          });
      </script>