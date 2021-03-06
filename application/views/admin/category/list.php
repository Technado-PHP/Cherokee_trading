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
                <a href="<?php echo site_url('admin/category/add');?>" class="add-btn">Add New</a>
              </div>    
            </div>  
            <div class="box-body">
              <table id="datatable" class="table table-bordered table-striped">
                <thead>
                <tr>
                  <th>S.No</th>
                  <!-- <th>Category Image</th> -->
                  <th>Category Name</th>
                  <!-- <th>Category Feature Status</th> -->
                  <th>Action</th>
                </tr>
                </thead>
                <tbody>            
                <?php $i=1; if(!empty($records)): foreach($records as $record):?>    
                <tr>
                  <td><?php echo $i;?></td>
                  <td><?php echo !empty($record->category_name)?$record->category_name:'';?></td>
                  <td>
                    <a href="<?php echo !empty($record->category_id)?base_url('admin/category/edit/').$record->category_id:'';?>"><span class="edit_icon"><i class="fa fa-pencil" aria-hidden="true"></i></span></a>
                    <a href="<?php echo !empty($record->category_id)?base_url('admin/category/delete/').$record->category_id:'';?>"><span class="delete_icon"><i class="fa fa-trash" aria-hidden="true"></i></span></a>
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
