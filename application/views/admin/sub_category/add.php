<script type="text/javascript">
  $(document).ready(function(){
    $("form").on("change","#sub_category_name",function() {  
      var str = $(this).val();
      str = str.replace(/[^a-z0-9\s]/gi, '').replace(/[_\s]/g, '-').toLowerCase();
      $('#sub_category_slug').val(str);
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
            <form role="form" action="<?php echo base_url('admin/sub_category/add')?>" method="post" enctype="multipart/form-data">       
              <div class="box-body">

                <div class="form-group">
                  <label>Category</label>
                  <select class="form-control" id="category_id" name="category_id" required>
                    <option selected value="">Please Select</option>
                    <?php if(!empty($records)): foreach($records as $mp):?>
                     <option value="<?php echo $mp->category_id;?>"><?php echo $mp->category_name;?></option>
                   <?php endforeach; endif;?>
                 </select>    
                 <?php echo form_error('category_id'); ?>
               </div> 

               <div class="form-group">
                <label>Sub Category Name</label>
                <input type="name" class="form-control" id="sub_category_name" name="sub_category_name" required>
                <input type="hidden" class="form-control" id="sub_category_slug" name="sub_category_slug" >
                <?php echo form_error('sub_category_name'); ?>
              </div>     

              <div class="form-group">
                <label>Sub Category Image</label>
                <div class="input-group-btn">
                 <div class="image-upload">                      
                  <img style="max-width:80px;" src="<?php echo base_url('assets/admin/img/placeholder.png')?>">
                  <div class="file-btn">
                    <input type="file" id="sub_category_image" name="sub_category_image">
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
