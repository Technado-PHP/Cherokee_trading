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
            <h3 class="box-title">Edit Data</h3>
          </div>
          <div class="col-md-6">
            <form role="form" action="<?php echo base_url('admin/blog_content');?>" method="post" enctype="multipart/form-data">
              <div class="box-body">
                <div class="form-group">
                  <label>Page Heading</label>
                  <input type="name" class="form-control" id="page_heading" name="page_heading" value="<?php echo !empty($record->page_heading)?$record->page_heading:''?>" required>
                  <?php echo form_error('page_heading'); ?>
                </div>
                <div class="form-group">
                  <label>Page Heading Two</label>
                  <input type="name" class="form-control" id="section_two_heading" name="section_two_heading" value="<?php echo !empty($record->section_two_heading)?$record->section_two_heading:''?>" required>
                  <?php echo form_error('section_two_heading'); ?>
                </div>
                <div class="form-group">
                  <label>Page Heading Three</label>
                  <input type="name" class="form-control" id="sub_heading" name="sub_heading" value="<?php echo !empty($record->sub_heading)?$record->sub_heading:''?>" required>
                  <?php echo form_error('sub_heading'); ?>
                </div>
                <div class="form-group">
                  <label>Page Text</label>
                  <textarea class="form-control editor" rows="3" id="section_two_text" name="section_two_text"><?php echo !empty($record->section_two_text)?$record->section_two_text:''?></textarea>
                  <?php echo form_error('section_two_text'); ?>
                </div>
                <div class="form-group">
                  <label>Sub Heading</label>
                  <input type="name" class="form-control" id="section_two_sub_heading" name="section_two_sub_heading" value="<?php echo !empty($record->section_two_sub_heading)?$record->section_two_sub_heading:''?>" required>
                  <?php echo form_error('section_two_sub_heading'); ?>
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