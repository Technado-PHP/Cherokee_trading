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
                <a href="<?php echo site_url('admin/product/add');?>" class="add-btn">Add New</a>
              </div>    
            </div>  
            <div class="box-body">
              <table id="datatable" class="table table-bordered table-striped">
                <thead>
                <tr>
                  <th>S.No</th>
                  <th>Product Name</th>
                  <th>Category Name</th>
                  <th>Product Image</th>
                  <th>Product Price</th>
                  <th>Discount Price</th>
                  <th>Action</th>
                </tr>
                </thead>
                <tbody>            
                <?php $i=1; if(!empty($records)): foreach($records as $record):?>    
                <tr>
                  <td><?php echo $i;?></td>
                  <td><?php echo !empty($record->product_name)?$record->product_name:'';?></td>
                  <td><?php echo !empty($record->category_name)?$record->category_name:'';?></td>
                  <td><img style="max-width:80px;" src="<?php echo !empty($record->product_image)?base_url('uploads/product/').$record->product_image:'';?>"></td>
                  <td>$<?php echo !empty($record->product_reg_price)?$record->product_reg_price:'';?></td>
                  <td>$<?php echo !empty($record->product_dis_price)?$record->product_dis_price:'';?></td>
                  <td>
                    <a href="<?php echo !empty($record->product_id)?base_url('admin/product/edit/').$record->product_id:'';?>"><span class="edit_icon"><i class="fa fa-pencil" aria-hidden="true"></i></span></a>
                    <a href="<?php echo !empty($record->product_id)?base_url('admin/product/delete/').$record->product_id:'';?>"><span class="delete_icon"><i class="fa fa-trash" aria-hidden="true"></i></span></a>
                    <a href="<?php echo !empty($record->product_id)?base_url('admin/product/view/').$record->product_id:'';?>"><span class="view_icon"><i class="fa fa-eye" aria-hidden="true"></i></span></a>
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
