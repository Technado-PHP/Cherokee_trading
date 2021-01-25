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
            <form role="form" action="<?php echo base_url('admin/settings/general');?>" method="post" enctype="multipart/form-data">       
              <div class="box-body">
                <div class="form-group">
                  <label>Site Title</label>
                  <input type="name" class="form-control" id="settings_site_title" name="settings_site_title" value="<?php echo !empty($record->settings_site_title)?$record->settings_site_title:''?>">
                  <?php echo form_error('settings_site_title'); ?>
                </div>
                <div class="form-group">
                  <label>Email address</label>
                  <input type="email" class="form-control" id="settings_email" name="settings_email" value="<?php echo !empty($record->settings_email)?$record->settings_email:''?>">
                  <?php echo form_error('settings_email'); ?>
                </div>
<!--                 <div class="form-group">
                  <label>Email From</label>
                  <input type="email" class="form-control" id="settings_email_from" name="settings_email_from" value="<?php //echo !empty($record->settings_email_from)?$record->settings_email_from:''?>" >
                  <?php //echo form_error('settings_email_from'); ?>
                </div>
                <div class="form-group">
                  <label>Email To</label>
                  <input type="email" class="form-control" id="settings_email_to" name="settings_email_to" value="<?php //echo !empty($record->settings_email_to)?$record->settings_email_to:''?>">
                  <?php //echo form_error('settings_email_to'); ?>
                </div> -->
                <div class="form-group">
                  <label>Phone Number</label>
                  <input type="text" class="form-control"  id="settings_phone" name="settings_phone" value="<?php echo !empty($record->settings_phone)?$record->settings_phone:''?>" >
                  <?php echo form_error('settings_phone'); ?>
                </div>
                <div class="form-group">
                  <label>Copy Rights</label>
                  <input type="text" class="form-control" id="settings_copyrights" name="settings_copyrights" value="<?php echo !empty($record->settings_copyrights)?$record->settings_copyrights:''?>" >
                  <?php echo form_error('settings_copyrights'); ?>
                </div>

                <div class="form-group">
                  <label>Mailing Address</label>
                  <input type="text" class="form-control"  id="settings_mailing_address" name="settings_mailing_address" value="<?php echo !empty($record->settings_mailing_address)?$record->settings_mailing_address:''?>" >
                  <?php echo form_error('settings_mailing_address'); ?>
                </div>
                <div class="form-group">
                  <label>Shipping Address</label>
                  <input type="text" class="form-control"  id="settings_shipping_address" name="settings_shipping_address" value="<?php echo !empty($record->settings_shipping_address)?$record->settings_shipping_address:''?>" >
                  <?php echo form_error('settings_shipping_address'); ?>
                </div>
                <div class="form-group">
                  <label>Address</label>
                  <textarea class="form-control editor" rows="3" id="settings_address" name="settings_address"><?php echo !empty($record->settings_address)?$record->settings_address:''?></textarea>
                  <?php echo form_error('settings_address'); ?>
                </div>
<!--                 <div class="form-group">
                  <label>Footer Text</label>
                  <textarea class="form-control editor" rows="3" id="footer_text" name="footer_text"></?php echo !empty($record->footer_text)?$record->footer_text:''?></textarea>
                  </?php echo form_error('footer_text'); ?>
                </div>
 -->
                <div class="form-group">
                  <label>Fav Icon</label>
                  <div class="input-group-btn">
                    <div class="image-upload">                      
                      <img src="<?php echo !empty($record->settings_favicon)?base_url('uploads/settings/').$record->settings_favicon:base_url('assets/img/placeholder.png')?>">
                      <div class="file-btn">
                        <input type="file" data-width="162" data-height="79" id="settings_favicon" name="settings_favicon">
                        <input type="text" id="settings_favicon" name="settings_favicon" value="<?php echo !empty($record->settings_favicon)?$record->settings_favicon:''?>" hidden>
                        <label class="btn btn-info">Upload</label>
                      </div>
                    </div>
                  </div>
                </div>  

                <div class="form-group">
                  <label>Logo</label>
                  <div class="input-group-btn">
                    <div class="image-upload">                      
                      <img src="<?php echo !empty($record->settings_header_logo)?base_url('uploads/settings/').$record->settings_header_logo:base_url('assets/img/placeholder.png')?>">
                      <div class="file-btn">
                        <input type="file" data-width="406" data-height="116" id="settings_header_logo" name="settings_header_logo">
                        <input type="text" id="settings_header_logo" name="settings_header_logo" value="<?php echo !empty($record->settings_header_logo)?$record->settings_header_logo:''?>" hidden>
                        <label class="btn btn-info">Upload</label>
                      </div>
                    </div>
                  </div>
                   <?php echo form_error('settings_header_logo'); ?>                
                </div> 

                <div class="form-group">
                  <label>Logo</label>
                  <div class="input-group-btn">
                    <div class="image-upload">                      
                      <img src="<?php echo !empty($record->settings_logo)?base_url('uploads/settings/').$record->settings_logo:base_url('assets/img/placeholder.png')?>">
                      <div class="file-btn">
                        <input type="file" data-width="406" data-height="116" id="settings_logo" name="settings_logo">
                        <input type="text" id="settings_logo" name="settings_logo" value="<?php echo !empty($record->settings_logo)?$record->settings_logo:''?>" hidden>
                        <label class="btn btn-info">Upload</label>
                      </div>
                    </div>
                  </div>
                   <?php echo form_error('settings_logo'); ?>                
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
