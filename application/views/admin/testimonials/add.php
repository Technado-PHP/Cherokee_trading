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
            <h3 class="box-title">Add Data</h3>
          </div>     
          <div class="col-md-6">
            <form role="form" action="<?php echo base_url('admin/testimonials/add')?>" method="post" enctype="multipart/form-data">       
              <div class="box-body">
                  <div class="form-group">
                      <label>Description</label>
                      <textarea class="form-control" rows="3" id="message" name="message"></textarea>
                      <?php echo form_error('message'); ?>
                  </div>
                  <div class="form-group">
                    <label>Testimonial Image</label>
                    <div class="input-group-btn">
                       <div class="image-upload">                      
                        <img style="max-width:80px;" src="<?php echo base_url('assets/admin/img/placeholder.png')?>">
                      <div class="file-btn">
                          <input type="file" id="testimonials_image" name="testimonials_image">
                         <label class="btn btn-info">Upload</label>
                        </div>
                       </div>
                    </div>
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
