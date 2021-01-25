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
            <form role="form" action="<?php echo base_url('admin/attribute/add')?>" method="post" enctype="multipart/form-data">       
              <div class="box-body">

               <div class="form-group">
                  <label>Attribute Name</label>
                  <input type="name" class="form-control" id="attribute_name" name="attribute_name" required>
                  <?php echo form_error('attribute_name'); ?>
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
