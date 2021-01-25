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
            <h3 class="box-title"> </h3>
          </div>     
          <div class="col-md-12">
            <div class="box-body">
             <table class="table">
              <thead class="thead-dark">
                <tr>
                  <th scope="col">Attributes</th>
                  <th scope="col">Values</th>
                </tr>
              </thead>
              <tbody>

                <tr>
                  <th scope="row">Product Name</th>
                  <td><?php echo $record->product_name??'';?></td>
                </tr>

                <tr>
                  <th scope="row">Category Name</th>
                  <td><?php echo $record->category_name??'';?></td>
                </tr>
                <tr>
                  <th scope="row">Product Slug</th>
                  <td><?php echo $record->product_slug??'';?></td>
                </tr>

                <tr>
                <th scope="row">Short Description</th>
                <td><?php echo $record->product_short_desc??'';?></td>
                </tr>

                <tr>
                  <th scope="row">Long Descripition</th>
                  <td><?php echo $record->product_long_desc??'';?></td>
                </tr>
                <tr>
                  <th scope="row">FAQ Descripition</th>
                  <td><?php echo $record->product_faq??'';?></td>
                </tr>

                <tr>
                  <th scope="row">Product Price</th>
                  <td>$<?php echo $record->product_reg_price??'';?></td>
                </tr>
                <tr>
                  <th scope="row">Discount Price</th>
                  <td>$<?php echo $record->product_dis_price??'';?></td>
                </tr>
                <tr>
                  <th scope="row">Product Image</th>
                  <td><img style="max-width:150px;" src="<?php echo base_url('uploads/product/').$record->product_image;?>"></td>
                </tr>
                <tr>
                  <th scope="row">Product Images</th>
                  <td>
                      <?php if(isset($image)): foreach($image as $row): ?>
                        <img style="max-width:150px;padding:5px;" src="<?php echo base_url('uploads/product_img/').$row->product_img_image;?>" />
                      <?php endforeach; endif; ?>
                    </td>
                </tr>
                
              </tbody>
            </table>
          </div>      
        </div>
      </div>   
    </div>
  </div>
</section>
</div>