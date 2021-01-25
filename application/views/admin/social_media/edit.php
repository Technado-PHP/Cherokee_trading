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
            <form role="form" action="<?php echo base_url('admin/social_media/edit/').$record->social_media_id;?>" method="post" enctype="multipart/form-data">       
              <div class="box-body">
                <div class="form-group">
                  <label>Link</label>
                  <input type="url" class="form-control" rows="3" id="social_link" value="<?php echo !empty($record->social_link)?$record->social_link:''?>" name="social_link" />
                  <?php echo form_error('social_link'); ?>
                </div>
              </div>
<!--               <div class="box-body">
                <div class="form-group">
                  <label>Icon</label>
                  <input type="text" class="form-control" rows="3" id="social_icon" value="</?php echo !empty($record->social_icon)?$record->social_icon:''?>" name="social_icon" />
                  </?php echo form_error('social_icon'); ?>
                </div>
              </div> -->
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
