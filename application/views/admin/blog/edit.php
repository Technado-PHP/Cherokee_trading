<script type="text/javascript">
  $(document).ready(function(){
    $("form").on("change","#heading",function() {  
      var str = $(this).val();
      str = str.replace(/[^a-z0-9\s]/gi, '').replace(/[_\s]/g, '-').toLowerCase();
      $('#slug').val(str);
    });
  });
</script>

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
            <form role="form" action="<?php echo base_url('admin/blog/edit/').$record->blog_id;?>" method="post" enctype="multipart/form-data">       
              <div class="box-body">

                <div class="form-group">
                  <label>Heading</label>
                  <input type="text" class="form-control" rows="3" id="heading" value="<?php echo !empty($record->heading)?$record->heading:''?>" name="heading" required/>
                  <input type="hidden" class="form-control" rows="3" id="slug" value="<?php echo !empty($record->slug)?$record->slug:''?>" name="slug" required/>
                  <?php echo form_error('heading'); ?>
                </div>

                <div class="form-group">
                  <label>Short Descripition</label>
                  <textarea class="editor form-control" rows="3" id="short_desc" name="short_desc"><?php echo !empty($record->short_desc)?$record->short_desc:''?></textarea>
                  <?php echo form_error('short_desc'); ?>
                </div>
                
                <div class="form-group">
                  <label>Short Descripition</label>
                  <textarea class="editor form-control" rows="3" id="long_desc" name="long_desc"><?php echo !empty($record->long_desc)?$record->long_desc:''?></textarea>
                  <?php echo form_error('long_desc'); ?>
                </div>

                <div class="form-group">
                  <label>Blog Image</label>
                  <div class="input-group-btn">
                    <div class="image-upload">                      
                      <img style="max-width:80px;" src="<?php echo !empty($record->blog_image)?base_url('uploads/blog/').$record->blog_image:base_url('assets/img/placeholder.png')?>">
                      <div class="file-btn">
                        <input type="file" id="blog_image" name="blog_image">
                        <input type="text" id="blog_image" name="blog_image" value="<?php echo !empty($record->blog_image)?$record->blog_image:''?>" hidden>
                        <label class="btn btn-info">Upload</label>
                      </div>
                    </div>
                  </div>
                  <?php echo form_error('blog_image'); ?>
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
