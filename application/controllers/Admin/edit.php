<div class="content">
  <div class="container-fluid">
    <div>
      <h1 style="display:inline-block;">
        <?php echo !empty($title)?$title:'Title';?>
      </h1>
      <h3 class="box-title" style="display:inline-block;">Edit</h3>
    </div>     
    <div class="col-md-6">
      <form role="form" action="<?php echo base_url('admin/social_media/edit/'.$record->social_media_id)?>" method="post" enctype="multipart/form-data">       
        <div class="form-group">
          <label>Social Name</label>
          <input type="name" class="form-control" id="social_media_name" name="social_media_name" value="<?php echo !empty($record->social_media_name)?$record->social_media_name:''?>" required>
          <?php echo form_error('social_media_name'); ?>
        </div>

        <div class="box-body">           
          <div class="form-group">
            <label>Social Link</label>
            <input type="text" name="social_media_link" class="form-control" 
            value="<?php echo !empty($record->social_media_link)?$record->social_media_link:'';?>" >
            <?php echo form_error('social_media_link');?>
          </div>
        </div>
        <div class="form-group">
          <label>Social Image</label>
          <div class="input-group-btn">
            <div class="image-upload">
              <img src="<?php echo !empty($record->social_media_images) ? base_url('uploads/social/') . $record->social_media_images : base_url('assets/img/placeholder.png') ?>">
              <div class="file-btn">
                <input type="file" id="social_media_images" name="social_media_images">
                <input type="text" id="social_media_images" name="social_media_images"
                  value="<?php echo !empty($record->social_media_images) ? $record->social_media_images : '' ?>"
                  hidden>
                <label class="btn btn-info">Upload</label>
              </div>
            </div>
          </div>
          <?php echo form_error('social_media_images'); ?>
        </div>

        <div class="box-body">           
          <div class="form-group">
            <label>Social Icon</label>
            <input type="text" name="social_media_icon" class="form-control" 
            value="<?php echo !empty($record->social_media_icon)?$record->social_media_icon:'';?>" >
            <?php echo form_error('social_media_icon');?>
          </div>
        </div>

        <div class="box-footer">
          <button type="submit" class="btn btn-primary">Submit</button>
          <a href="<?php echo base_url('admin')?>" class="btn btn-danger">Dashboard</a>
        </div>    
      </form>  
    </div>
  </div>
</div> 