<script type="text/javascript">
  $(document).ready(function(){
    $("form").on("change","#category_name",function() {  
      var str = $(this).val();
      str = str.replace(/[^a-z0-9\s]/gi, '').replace(/[_\s]/g, '-').toLowerCase();
      $('#category_slug').val(str);
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
            <h3 class="box-title">Add Data</h3>
          </div>     
          <div class="col-md-6">
            <form role="form" action="<?php echo base_url('admin/category/add')?>" method="post" enctype="multipart/form-data">       
              <div class="box-body">

               <div class="form-group">
                <label>Category Name</label>
                <input type="name" class="form-control" id="category_name" name="category_name" required>
                <input type="hidden" class="form-control" id="category_slug" name="category_slug" >
                <?php echo form_error('category_name'); ?>
              </div>   
              
<!--                 <div class="form-group">
                  <label>Category Sort Id</label>
                  <input type="number" class="form-control" id="category_sort" value="<?php //echo !empty($record->category_sort)?$record->category_sort:''?>" name="category_sort" />
                  <?php //echo form_error('category_sort'); ?>
                </div>
                
              <div class="form-group">
                <label>Category Feature Status</label>
                
               <select name="category_feature">
                  <option value="yes">Yes</option>
                  <option value="no">No</option>
                </select>
                <?php //echo form_error('category_name'); ?>
              </div> 
              
              

              <div class="form-group">
                <label>Category Image</label>
                <div class="input-group-btn">
                 <div class="image-upload">                      
                  <img style="max-width:80px;" src="<?php //echo base_url('assets/admin/img/placeholder.png')?>">
                  <div class="file-btn">
                    <input type="file" data-width="430" data-height="500" id="category_image" name="category_image">
                    <label class="btn btn-info">Upload</label>
                  </div>
                </div>
              </div>
            </div>   -->

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
