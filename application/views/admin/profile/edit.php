<div class="content-wrapper">
  <section class="content-header">
    <h1>
        <?php echo !empty($title)?$title:'Title';?>
    </h1>
  </section>
  <section class="content">
    <div class="row">
      <div class="col-md-12">
        <div class="box box-primary">
          <div class="box-header with-border">
            <h3 class="box-title">Edit Data</h3>
          </div>     
          <div class="col-md-6">
            <form role="form" action="<?php echo base_url('admin/profile/');?>" method="post" enctype="multipart/form-data">       
              <div class="box-body">
                <div class="form-group">
                  <label>Full Name</label>
                  <input type="text" class="form-control" id="master_admin_name" name="master_admin_name" value="<?php echo !empty($record->master_admin_name)?$record->master_admin_name:''?>" required>
                  <?php echo form_error('master_admin_name'); ?>
                </div>  
                <div class="form-group">
                  <label>New Password</label>
                  <input type="password" class="form-control" id="new_password" name="new_password">
                  <?php echo form_error('new_password'); ?>
                </div>
                <div class="form-group">
                  <label>Confirm Password</label>
                  <input type="password" class="form-control" id="cnf_password" name="cnf_password">
                  <?php echo form_error('cnf_password'); ?>
                </div>
                <div class="form-group">
                  <label>Email address</label>
                  <input type="email" class="form-control" id="master_admin_email" name="master_admin_email" value="<?php echo !empty($record->master_admin_email)?$record->master_admin_email:''?>" required>
                  <?php echo form_error('master_admin_email'); ?>
                 </div>
                <div class="form-group">
                  <label>Phone Number</label>
                  <input type="text" class="form-control"  id="master_admin_phone" name="master_admin_phone" value="<?php echo !empty($record->master_admin_phone)?$record->master_admin_phone:''?>"  data-inputmask="'mask': '(999) 999-9999'">
                  <?php echo form_error('master_admin_phone'); ?>
                </div>
                <div class="form-group">
                  <label>Address</label>
                  <textarea class="form-control editor" rows="3" id="master_admin_address" name="master_admin_address"><?php echo !empty($record->master_admin_address)?$record->master_admin_address:''?></textarea>
                  <?php echo form_error('master_admin_address'); ?>
                </div>
                <div class="form-group">
                  <label>Profile Picture</label>
                  <div class="input-group-btn">
                    <div class="image-upload">                      
                      <img src="<?php echo !empty($record->master_admin_image)?base_url('uploads/admin/').$record->master_admin_image:base_url('assets/img/placeholder.png')?>">
                      <div class="file-btn">
                        <input type="file" data-width="300" data-height="262" id="master_admin_image" name="master_admin_image">
                        <input type="text" id="master_admin_image" name="master_admin_image" value="<?php echo !empty($record->master_admin_image)?$record->master_admin_image:''?>" hidden>
                        <label class="btn btn-info">Upload</label>
                      </div>
                    </div>
                  </div>
                   <?php echo form_error('master_admin_image'); ?>                
                </div>              
              </div>
              <div class="box-footer">
                <button type="submit" class="btn btn-primary">Submit</button>
              </div>    
            </form>        
          </div>
        </div>   
      </div>
    </div>
  </section>
</div>
