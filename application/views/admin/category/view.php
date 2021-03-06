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
                  <th scope="row">Category Name</th>
                  <td><?php echo $record->category_name;?></td>
                </tr>
                <tr>
                  <th scope="row">Category Slug</th>
                  <td><?php echo $record->category_slug;?></td>
                </tr>
                <tr>
                  <th scope="row">Category Image</th>
                  <td><img style="max-width:80px;" src="<?php echo base_url('uploads/category/').$record->category_image;?>"></td>
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

























