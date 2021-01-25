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
            <form role="form" action="<?php echo base_url('admin/testimonials/edit/').$record->testimonials_id;?>" method="post" enctype="multipart/form-data">       
              <div class="box-body">
                  <div class="form-group">
                      <label>Description</label>
                      <textarea class="form-control" rows="3" id="message" value="<?php echo !empty($record->message)?$record->message:''?>" name="message" required/>
                      <?php echo form_error('message'); ?><?php echo !empty($record->message)?$record->message:''?></textarea>
                  </div>
                  <div class="form-group">
                    <label>Testimonial Image</label>
                    <div class="input-group-btn">
                      <div class="image-upload">                      
                        <img style="max-width:80px;" src="<?php echo !empty($record->testimonials_image)?base_url('uploads/testimonials/').$record->testimonials_image:base_url('assets/img/placeholder.png')?>">
                        <div class="file-btn">
                          <input type="file" id="testimonials_image" name="testimonials_image">
                          <input type="text" id="testimonials_image" name="testimonials_image" value="<?php echo !empty($record->testimonials_image)?$record->testimonials_image:''?>" hidden>
                        <label class="btn btn-info">Upload</label>
                        </div>
                      </div>
                    </div>
                    <?php echo form_error('testimonials_image'); ?>
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
