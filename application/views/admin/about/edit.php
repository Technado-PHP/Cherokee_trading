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
            <form role="form" action="<?php echo base_url('admin/about');?>" method="post" enctype="multipart/form-data">
                <div class="box-body">
                    <div class="form-group">
                      <label>Banner Heading</label>
                      <input type="name" class="form-control" id="banner_heading" name="banner_heading" value="<?php echo !empty($record->banner_heading)?$record->banner_heading:''?>" required>
                      <?php echo form_error('banner_heading'); ?>
                    </div>
                    <div class="form-group">
                      <label>Banner Image</label>
                      <div class="input-group-btn">
                        <div class="image-upload">
                          <img src="<?php echo !empty($record->banner_image)?base_url('uploads/about/').$record->banner_image:base_url('assets/img/placeholder.png')?>">
                          <div class="file-btn">
                            <input type="file" id="banner_image" name="banner_image">
                            <label class="btn btn-info">Upload</label>
                            <input type="text" id="banner_image" name="banner_image" value="<?php echo !empty($record->banner_image)?$record->banner_image:''?>" hidden>
                          </div>
                        </div>
                      </div>
                      <?php echo form_error('banner_image'); ?>                
                    </div>
                    <div class="form-group">
                      <label>Page Text</label>
                      <textarea class="form-control editor" rows="3" id="page_text" name="page_text"><?php echo !empty($record->page_text)?$record->page_text:''?></textarea>
                      <?php echo form_error('page_text'); ?>
                    </div>
                    <div class="form-group">
                      <label>Page Image</label>
                      <div class="input-group-btn">
                        <div class="image-upload">
                          <img src="<?php echo !empty($record->page_image)?base_url('uploads/about/').$record->page_image:base_url('assets/img/placeholder.png')?>">
                          <div class="file-btn">
                            <input type="file" id="page_image" name="page_image">
                            <input type="text" id="page_image" name="page_image" value="<?php echo !empty($record->page_image)?$record->page_image:''?>" hidden>
                            <label class="btn btn-info">Upload</label>
                          </div>
                        </div>
                      </div>
                      <?php echo form_error('page_image'); ?>                
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