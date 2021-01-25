<div class="content">
  <div class="container-fluid">
    <div>
      <h1 style="display:inline-block;">
        <?php echo !empty($title)?$title:'Title';?>
      </h1>
      <h3 class="box-title" style="display:inline-block;">List</h3>
    </div>
    <hr style="border-top: 1px solid #504444;">
    <div class="col-md-12">  
      <div class="box-body"> 
       <table id="table_id" class="table table-bordered table-striped">
        <thead>
          <tr>
            <th>S.No</th>
            <th>Social Name</th>
            <th>Social Link</th>
            <th>Social Icon</th>
            <th>Social Image</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>            
         <?php $i=1; if(!empty($records)): foreach($records as $record):?>    
         <tr>
          <td><?php echo $i;?></td>
          <td><?php echo !empty($record->social_media_name)?$record->social_media_name:'';?></td>
          <td><?php echo !empty($record->social_media_link)?$record->social_media_link:'';?></td>
          <td><?php echo !empty($record->social_media_icon)?$record->social_media_icon:'';?></td>
          <td><img style="max-width: 200px;" src="<?php echo !empty($record->social_media_images)?base_url('uploads/social/').$record->social_media_images:base_url('assets/img/user.png')?>"></td>
          <td>
            <a href="<?php echo !empty($record->social_media_id)?base_url('admin/social_media/edit/').$record->social_media_id:'';?>"><span class="edit_icon"><i class="fas fa-pencil-alt"></i></span></a>
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
  <div class="box-footer">
    <a href="<?php echo base_url('admin')?>" class="btn btn-danger">Dashboard</a>
  </div>    
</div>
</div>
</div>