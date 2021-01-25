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
                  <th scope="col">Field</th>
                  <th scope="col">Value</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <th scope="row">Heading</th>
                  <td><?php echo $record->heading;?></td>
                </tr>
                <tr>
                  <th scope="row">Slug</th>
                  <td><?php echo $record->slug;?></td>
                </tr>
                <tr>
                  <th scope="row">Short Description</th>
                  <td><?php echo $record->short_desc;?></td>
                </tr>
                <tr>
                  <th scope="row">Long Description</th>
                  <td><?php echo $record->long_desc;?></td>
                </tr>
                <tr>
                  <th scope="row">Blog Image</th>
                  <td><img style="max-width:150px;" src="<?php echo base_url('uploads/blog/').$record->blog_image;?>"></td>
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