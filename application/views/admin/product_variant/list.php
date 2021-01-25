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
             <div class="tddts">
                <a href="<?php echo site_url('admin/product_variant/add');?>" class="add-btn">Add New</a>
              </div>    
            </div>  
            <div class="box-body">
              <table id="datatable" class="table table-bordered table-striped">
                <thead>
                <tr>
                  <th>S.No</th>
                  <th>Product</th>
                  <th>Attribute</th>
                  <th>Variant</th>
                  <th>Variant Price</th>
                  <th>Action</th>
                </tr>
                </thead>
                <tbody>            
                <?php $i=1; if(!empty($records)): foreach($records as $record):?>    
                <tr>
                  <td><?php echo $i;?></td>
                  <td><?php echo !empty($record->product_name)?$record->product_name:'';?></td>
                  <td><?php echo !empty($record->attribute_name)?$record->attribute_name:'';?></td>
                  <td><?php echo !empty($record->variant_name)?$record->variant_name:'';?></td>
                  <td><?php echo !empty($record->product_variant_price)?$record->product_variant_price:'';?></td>
                  <td>
                    <a href="<?php echo !empty($record->product_variant_id)?base_url('admin/product_variant/edit/').$record->product_variant_id:'';?>"><span class="edit_icon"><i class="fa fa-pencil" aria-hidden="true"></i></span></a>
                    <?php if($record->product_variant_status == 'enable'): ?>
                    <a href="<?php echo !empty($record->product_variant_id)?base_url('admin/product_variant/delete/').$record->product_variant_id:'';?>"><span class="delete_icon"><i class="fa fa-trash" aria-hidden="true"></i></span></a>
                    <?php else: ?>
                    <a href="<?php echo !empty($record->product_variant_id)?base_url('admin/product_variant/enable/').$record->product_variant_id:'';?>"><span class="view_icon"><i class="fa fa-check" aria-hidden="true"></i></span></a>
                    <?php endif; ?>
                  </td>
                </tr>
                <?php $i++; endforeach;?>  
                <?php else:?>
                <tr>
                  <td>No Record Found</td>
                </tr>
                <?php endif;?>
                </tbody>
              </table>
            </div>
         </div>   
      </div>
    </div>
  </section>

</div>
