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
                <a href="<?php echo site_url('admin/testimonials/add');?>" class="add-btn">Add New</a>
              </div>    
            </div>  
            <div class="box-body">
              <table id="datatable" class="table table-bordered table-striped">
                <thead>
                <tr>
                  <th style="text-align: center;">S.No</th>
                    <th style="text-align: center;">Testimonial Description</th>
                  <th style="text-align: center;">Testimonial Image</th>
                  <th style="text-align: center;">Action</th>
                </tr>
                </thead>
                <tbody>            
                <?php $i=1; if(!empty($records)): foreach($records as $record):?>    
                <tr style="text-align: center;">
                  <td style="text-align: center;"><?php echo $i;?></td>
                  <td style="text-align: center;"><?php echo !empty($record->message)?$record->message:'';?></td>
                  <td style="text-align: center;"><img style="max-width:20%;" src="<?php echo !empty($record->testimonials_image)?base_url('uploads/testimonials/').$record->testimonials_image:'';?>"></td>
                  <td style="text-align: center;">
                    <a href="<?php echo !empty($record->testimonials_id)?base_url('admin/testimonials/edit/').$record->testimonials_id:'';?>" title="Edit"><span class="edit_icon"><i class="fa fa-pencil" aria-hidden="true"></i></span></a>
                    <a href="<?php echo !empty($record->testimonials_id)?base_url('admin/testimonials/delete/').$record->testimonials_id:'';?>" title="Delete"><span class="delete_icon"><i class="fa fa-trash" aria-hidden="true"></i></span></a>
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
