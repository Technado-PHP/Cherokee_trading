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
                <?php if(isset($record)): foreach($record as $row):?>

                <tr>
                  <th scope="row">Product Name</th>
                  <td><?php echo get_name_by_id('product',$row->product_id);?></td>
                </tr>

                <tr>
                  <th scope="row">Attribute Name</th>
                  <td><?php echo get_name_by_id('attribute',$row->attribute_id);?></td>
                </tr>

                <tr>
                  <th scope="row">Variant Name</th>
                  <td><?php echo get_name_by_id('variant',$row->variant_id);?></td>
                </tr>

                <tr>
                  <th scope="row">Product Price</th>
                  <td><?php echo $row->product_variant_price;?></td>
                </tr>

                <?php endforeach; endif; ?>

              </tbody>
            </table>
          </div>      
        </div>
      </div>   
    </div>
  </div>
</section>
</div>

























