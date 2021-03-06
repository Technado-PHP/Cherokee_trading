<script>
  $(document).ready(function(){  
    $("form").on("change","#product_name",function() {  
      var str = $(this).val();
      str = str.replace(/[^a-z0-9\s]/gi, '').replace(/[_\s]/g, '-').toLowerCase();
      $('#product_slug').val(str);
    });
    
  });
</script>
// <script>
//   $(document).ready(function () {
//     $("#category_id").on("change", function () {
//       $.ajax({
//         type: "POST",
//         url: "</?php echo base_url('admin/product/get_sub_cat');?>",
//         data: {
//           get_from: "sub_category",
//           get_where: "category",
//           id: $(this).val(),
//         },
//         dataType: "html",
//         success: function (data) {
//           $("#sub_category_id").html(data);
//         },
//         error: function (data) {
//           console.log(data);
//         },
//       });
//     });
//   });
// </script>
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
            <form role="form" action="<?php echo base_url('admin/product/edit/').$record->product_id;?>" method="post" enctype="multipart/form-data">       
              <div class="box-body"> 

                <div class="form-group">
                  <label>Category</label>
                  <select class="form-control" id="category_id" name="category_id" required>
                    <?php if(!empty($category)): foreach($category as $cat):?>
                      <option value="<?php echo $cat->category_id;?>" <?php echo ($record->category_id == $cat->category_id)?'selected':'' ?>><?php echo $cat->category_name;?></option>
                    <?php endforeach; endif;?>
                  </select>
                </div>
                <?php echo form_error("category_name"); ?>
<!--                 <div class="form-group">
                  <label>Sub category</label>
                  <select class="form-control" id="sub_category_id" required name="sub_category_id">
                    <option value="<//?php echo $record->sub_category_id;?>"><//?php echo get_name_by_id('sub_category',$record->sub_category_id);?></option>
                  </select>
                </div>s -->

                <div class="form-group">
                  <label>Featured Product</label><br>
                  <input type="radio"  name="featured_product" value="1" <?= $record->featured_product == 1 ? 'checked':''; ?>><label>Yes</label>
                  <input type="radio"  name="featured_product" value="0" <?= $record->featured_product == 0 ? 'checked':''; ?>><label>No</label>
                  <?php echo form_error('featured_product'); ?>
                </div>

                <div class="form-group">
                  <label>Special Product</label><br>
                  <input type="radio" name="special_product" value="1" <?= $record->special_product == 1 ? 'checked':''; ?>><label>Yes</label>
                  <input type="radio" name="special_product" value="0" <?= $record->special_product == 0 ? 'checked':''; ?>><label>No</label>
                  <?php echo form_error('special_product'); ?>
                </div>
                
                <div class="form-group">
                  <label>Product Name</label>
                  <input type="text" class="form-control" rows="3" id="product_name" value="<?php echo !empty($record->product_name)?$record->product_name:''?>" name="product_name"/>
                  <?php echo form_error('product_name'); ?>
                </div>

                <div class="form-group">
                  <label>Product Slug</label>
                  <input type="text" class="form-control" rows="3" id="product_slug" value="<?php echo !empty($record->product_slug)?$record->product_slug:''?>" name="product_slug" readonly/>
                  <?php echo form_error('product_slug'); ?>
                </div>

                <div class="form-group">
                  <label>Product Price</label>
                  <input type="number" step="any" class="form-control"  rows="3" id="product_reg_price" value="<?php echo !empty($record->product_reg_price)?$record->product_reg_price:''?>" name="product_reg_price"/>
                  <?php echo form_error('product_reg_price'); ?>
                </div>
                <div class="form-group">
                  <label>Discount Price</label>
                  <input type="number" step="any" class="form-control"  rows="3" id="product_dis_price" value="<?php echo !empty($record->product_dis_price)?$record->product_dis_price:''?>" name="product_dis_price"/>
                  <?php echo form_error('product_dis_price'); ?>
                </div>
                
                <div class="form-group">
                  <label>Wholesale Price</label>
                  <input type="number" class="form-control" step="any" rows="3" id="product_wholesale_price" value="<?php echo !empty($record->product_wholesale_price)?$record->product_wholesale_price:''?>" name="product_wholesale_price"/>
                  <?php echo form_error('product_wholesale_price'); ?>
                </div>

                <div class="form-group">
                  <label>Product Short Descripition</label>
                  <textarea class="editor form-control" rows="3" id="product_short_desc" name="product_short_desc"><?php echo !empty($record->product_short_desc)?$record->product_short_desc:''?></textarea>
                  <?php echo form_error('product_short_desc'); ?>
                </div>

                <div class="form-group">
                  <label>Product Long Descripition</label>
                  <textarea class="editor form-control" rows="3" id="product_long_desc" name="product_long_desc"><?php echo !empty($record->product_long_desc)?$record->product_long_desc:''?></textarea>
                  <?php echo form_error('product_long_desc'); ?>
                </div>
                
                <div class="form-group">
                  <label>Product Image</label>
                  <div class="input-group-btn">
                    <div class="image-upload">                      
                      <img style="max-width:80px;" src="<?php echo !empty($record->product_image)?base_url('uploads/product/').$record->product_image:base_url('assets/img/placeholder.png')?>">
                      <div class="file-btn">
                        <input type="file" id="product_image" name="product_image">
                        <input type="text" id="product_image" name="product_image" value="<?php echo !empty($record->product_image)?$record->product_image:''?>" hidden>
                        <label class="btn btn-info">Upload</label>
                      </div>
                    </div>
                  </div>
                  <?php echo form_error('product_image'); ?>
                </div>  
                
                <div class="form-group">
                  <label>Product Images</label>
                  <div class="input-group-btn">
                    <?php if(!empty($images)): foreach($images as $img):?>
                      <div class="multi-image-upload">   
                        <i class="fa fa-times" aria-hidden="true"></i>                        
                        <img style="max-width:80px;" src="<?php echo !empty($img->product_img_image)?base_url('uploads/product_img/').$img->product_img_image:base_url('assets/admin/img/placeholder.png')?>">
                        <div class="file-btn">
                          <input type="text" id="product_img_image" name="product_img_image[]" value="<?php echo !empty($img->product_img_image)?$img->product_img_image:''?>" hidden>
                        </div>
                      </div>
                    <?php endforeach; endif;?>
                    <div class="multi-image-upload">                      
                      <img src="<?php echo base_url('assets/admin/img/placeholder.png')?>">
                      <div class="file-btn">
                        <input type="file" id="product_img_image" name="product_img_image[]">
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

<script>
  $(document).ready(function(){  
    $("#product_reg_price").keyup(function() { 
      if(+$(this).val() <= +$('#product_dis_price').val()){
        $(this).val(0);
        $(this).parent('.form-group').addClass('has-error');
        $(this).parent('.form-group').not(":has(span)").append('<span class="help-block">Regular Price can not be less than Discounted Price</span>');

      }
    });
    
    $("#product_dis_price").keyup(function() { 
      if(+$(this).val() >= +$('#product_reg_price').val()){
        $(this).val(0);
        $(this).parent('.form-group').addClass('has-error');
        $(this).parent('.form-group').not(":has(span)").append('<span class="help-block">Regular Price can not be less than Discounted Price</span>');

      }
    });
  });
</script>
