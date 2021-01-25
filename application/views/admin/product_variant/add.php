<script type="text/javascript">
  $(document).ready(function(){
    $("form").on("change","#attribute_id",function() { 
        $.ajax({
            url: "<?php echo base_url('admin/product_variant/get_variant')?>",
            type: "post",
            data: {id:$(this).val()} ,
            success: function (data){
                $('#variant_id').html(data);
            },
        });        
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
            <form role="form" action="<?php echo base_url('admin/product_variant/add')?>" method="post" enctype="multipart/form-data">       
              <div class="box-body">
                <div class="form-group">
                    <label>Product</label>
                    <select class="form-control" id="product_id" name="product_id">
                      <option selected value="">Please Select</option>
                      <?php if(!empty($products)): foreach($products as $product):?>
                       <option value="<?php echo $product->product_id;?>"><?php echo $product->product_name;?></option>
                     <?php endforeach; endif;?>
                   </select>    
                   <?php echo form_error('product_id'); ?>      
                </div>  
                <div class="form-group">
                    <label>Attribute</label>
                    <select class="form-control" id="attribute_id" name="attribute_id">
                      <option selected value="">Please Select</option>
                      <?php if(!empty($attributes)): foreach($attributes as $attribute):?>
                       <option value="<?php echo $attribute->attribute_id;?>"><?php echo $attribute->attribute_name;?></option>
                     <?php endforeach; endif;?>
                   </select>    
                   <?php echo form_error('attribute_id'); ?>      
                </div>   
                <div class="form-group">
                    <label>Variant</label>
                    <select class="form-control" id="variant_id" name="variant_id">
                      <option selected value="">Please Select</option>                      
                   </select>    
                   <?php echo form_error('variant_id'); ?>      
                </div> 
                <div class="form-group">
                    <label>Product Regular Price</label>
                    <input type="name" class="form-control" id="product_variant_price" name="product_variant_price" required>
                    <?php echo form_error('product_variant_price'); ?>
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
