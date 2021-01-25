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
            <form role="form" action="<?php echo base_url('admin/our_story');?>" method="post" enctype="multipart/form-data">
              <div class="box-body">
                <div class="form-group">
                  <label>Banner Heading</label>
                  <input type="name" class="form-control" id="banner_heading" name="banner_heading" value="<?php echo !empty($record->banner_heading)?$record->banner_heading:''?>" required>
                  <?php echo form_error('banner_heading'); ?>
                </div>
                <div class="form-group">
                  <label>Banner Image</label>
                  <div class="input-group-btn">
                    <div class="image-upload">
                      <img src="<?php echo !empty($record->banner_image)?base_url('uploads/our_story/').$record->banner_image:base_url('assets/img/placeholder.png')?>">
                      <div class="file-btn">
                        <input type="file" id="banner_image" name="banner_image">
                        <label class="btn btn-info">Upload</label>
                        <input type="text" id="banner_image" name="banner_image" value="<?php echo !empty($record->banner_image)?$record->banner_image:''?>" hidden>
                      </div>
                    </div>
                  </div>
                  <?php echo form_error('banner_image'); ?>                
                </div>
                <div class="form-group">
                  <label>Section One Heading</label>
                  <input type="name" class="form-control" id="section_one_heading" name="section_one_heading" value="<?php echo !empty($record->section_one_heading)?$record->section_one_heading:''?>" required>
                  <?php echo form_error('section_one_heading'); ?>
                </div>
                <div class="form-group">
                  <label>Section One Sub Heading</label>
                  <input type="name" class="form-control" id="section_one_text" name="section_one_text" value="<?php echo !empty($record->section_one_text)?$record->section_one_text:''?>" required>
                  <?php echo form_error('section_one_text'); ?>
                </div>
                <div class="form-group">
                  <label>Page Image One</label>
                  <div class="input-group-btn">
                    <div class="image-upload">
                      <img src="<?php echo !empty($record->image_one)?base_url('uploads/our_story/').$record->image_one:base_url('assets/img/placeholder.png')?>">
                      <div class="file-btn">
                        <input type="file" id="image_one" name="image_one">
                        <input type="text" id="image_one" name="image_one" value="<?php echo !empty($record->image_one)?$record->image_one:''?>" hidden>
                        <label class="btn btn-info">Upload</label>
                      </div>
                    </div>
                  </div>
                  <?php echo form_error('image_one'); ?>                
                </div>
                <div class="form-group">
                  <label>Image One Heading</label>
                  <input type="name" class="form-control" id="image_one_heading" name="image_one_heading" value="<?php echo !empty($record->image_one_heading)?$record->image_one_heading:''?>" required>
                  <?php echo form_error('image_one_heading'); ?>
                </div>
                <div class="form-group">
                  <label>Image One Text</label>
                  <textarea class="form-control" rows="3" id="image_one_text" name="image_one_text"><?php echo !empty($record->image_one_text)?$record->image_one_text:''?></textarea>
                  <?php echo form_error('image_one_text'); ?>
                </div>
                <div class="form-group">
                  <label>Page Image Two</label>
                  <div class="input-group-btn">
                    <div class="image-upload">
                      <img src="<?php echo !empty($record->image_two)?base_url('uploads/our_story/').$record->image_two:base_url('assets/img/placeholder.png')?>">
                      <div class="file-btn">
                        <input type="file" id="image_two" name="image_two">
                        <input type="text" id="image_two" name="image_two" value="<?php echo !empty($record->image_two)?$record->image_two:''?>" hidden>
                        <label class="btn btn-info">Upload</label>
                      </div>
                    </div>
                  </div>
                  <?php echo form_error('image_two'); ?>
                </div>
                <div class="form-group">
                  <label>Image Two Heading</label>
                  <input type="name" class="form-control" id="image_two_heading" name="image_two_heading" value="<?php echo !empty($record->image_two_heading)?$record->image_two_heading:''?>" required>
                  <?php echo form_error('image_two_heading'); ?>
                </div>
                <div class="form-group">
                  <label>Image Two Text</label>
                  <textarea class="form-control" rows="3" id="image_two_text" name="image_two_text"><?php echo !empty($record->image_two_text)?$record->image_two_text:''?></textarea>
                  <?php echo form_error('image_two_text'); ?>
                </div>
                <div class="form-group">
                  <label>Page Image Three</label>
                  <div class="input-group-btn">
                    <div class="image-upload">
                      <img src="<?php echo !empty($record->image_three)?base_url('uploads/our_story/').$record->image_three:base_url('assets/img/placeholder.png')?>">
                      <div class="file-btn">
                        <input type="file" id="image_three" name="image_three">
                        <input type="text" id="image_three" name="image_three" value="<?php echo !empty($record->image_three)?$record->image_three:''?>" hidden>
                        <label class="btn btn-info">Upload</label>
                      </div>
                    </div>
                  </div>
                  <?php //echo form_error('right_logo_image'); ?>
                </div>
                <div class="form-group">
                  <label>Image Three Heading</label>
                  <input type="name" class="form-control" id="image_three_heading" name="image_three_heading" value="<?php echo !empty($record->image_three_heading)?$record->image_three_heading:''?>" required>
                  <?php echo form_error('image_three_heading'); ?>
                </div>
                <div class="form-group">
                  <label>Image Three Text</label>
                  <textarea class="form-control" rows="3" id="image_three_text" name="image_three_text"><?php echo !empty($record->image_three_text)?$record->image_three_text:''?></textarea>
                  <?php echo form_error('image_three_text'); ?>
                </div>
                <div class="form-group">
                  <label>Page Image Four</label>
                  <div class="input-group-btn">
                    <div class="image-upload">
                      <img src="<?php echo !empty($record->image_four)?base_url('uploads/our_story/').$record->image_four:base_url('assets/img/placeholder.png')?>">
                      <div class="file-btn">
                        <input type="file" id="image_four" name="image_four">
                        <input type="text" id="image_four" name="image_four" value="<?php echo !empty($record->image_four)?$record->image_four:''?>" hidden>
                        <label class="btn btn-info">Upload</label>
                      </div>
                    </div>
                  </div>
                  <?php echo form_error('image_four'); ?>
                </div>

                <div class="form-group">
                  <label>Section Two Heading</label>
                  <textarea class="form-control" rows="3" id="section_two_heading" name="section_two_heading"><?php echo !empty($record->section_two_heading)?$record->section_two_heading:''?></textarea>
                  <?php echo form_error('section_two_heading'); ?>
                </div>

                <div class="form-group">
                  <label>Icon Image One</label>
                  <div class="input-group-btn">
                    <div class="image-upload">
                      <img src="<?php echo !empty($record->icon_one_image)?base_url('uploads/our_story/').$record->icon_one_image:base_url('assets/img/placeholder.png')?>">
                      <div class="file-btn">
                        <input type="file" id="icon_one_image" name="icon_one_image">
                        <input type="text" id="icon_one_image" name="icon_one_image" value="<?php echo !empty($record->icon_one_image)?$record->icon_one_image:''?>" hidden>
                        <label class="btn btn-info">Upload</label>
                      </div>
                    </div>
                  </div>
                  <?php echo form_error('icon_one_image'); ?>
                </div>

                <div class="form-group">
                  <label>Icon One Heading</label>
                  <textarea class="form-control editor" rows="3" id="icon_one_heading" name="icon_one_heading"><?php echo !empty($record->icon_one_heading)?$record->icon_one_heading:''?></textarea>
                  <?php echo form_error('icon_one_heading'); ?>
                </div>

                <div class="form-group">
                  <label>Icon Image Two</label>
                  <div class="input-group-btn">
                    <div class="image-upload">
                      <img src="<?php echo !empty($record->icon_two_image)?base_url('uploads/our_story/').$record->icon_two_image:base_url('assets/img/placeholder.png')?>">
                      <div class="file-btn">
                        <input type="file" id="icon_two_image" name="icon_two_image">
                        <input type="text" id="icon_two_image" name="icon_two_image" value="<?php echo !empty($record->icon_two_image)?$record->icon_two_image:''?>" hidden>
                        <label class="btn btn-info">Upload</label>
                      </div>
                    </div>
                  </div>
                  <?php echo form_error('icon_two_image'); ?>
                </div>

                <div class="form-group">
                  <label>Icon Two Heading</label>
                  <textarea class="form-control editor" rows="3" id="icon_two_heading" name="icon_two_heading"><?php echo !empty($record->icon_two_heading)?$record->icon_two_heading:''?></textarea>
                  <?php echo form_error('icon_two_heading'); ?>
                </div>

                <div class="form-group">
                  <label>Icon Image Three</label>
                  <div class="input-group-btn">
                    <div class="image-upload">
                      <img src="<?php echo !empty($record->icon_three_image)?base_url('uploads/our_story/').$record->icon_three_image:base_url('assets/img/placeholder.png')?>">
                      <div class="file-btn">
                        <input type="file" id="icon_three_image" name="icon_three_image">
                        <input type="text" id="icon_three_image" name="icon_three_image" value="<?php echo !empty($record->icon_three_image)?$record->icon_three_image:''?>" hidden>
                        <label class="btn btn-info">Upload</label>
                      </div>
                    </div>
                  </div>
                  <?php echo form_error('icon_three_image'); ?>
                </div>

                <div class="form-group">
                  <label>Icon Three Heading</label>
                  <textarea class="form-control editor" rows="3" id="icon_three_heading" name="icon_three_heading"><?php echo !empty($record->icon_three_heading)?$record->icon_three_heading:''?></textarea>
                  <?php echo form_error('icon_three_heading'); ?>
                </div>

                <div class="form-group">
                  <label>Icon Image Four</label>
                  <div class="input-group-btn">
                    <div class="image-upload">
                      <img src="<?php echo !empty($record->icon_four_image)?base_url('uploads/our_story/').$record->icon_four_image:base_url('assets/img/placeholder.png')?>">
                      <div class="file-btn">
                        <input type="file" id="icon_four_image" name="icon_four_image">
                        <input type="text" id="icon_four_image" name="icon_four_image" value="<?php echo !empty($record->icon_four_image)?$record->icon_four_image:''?>" hidden>
                        <label class="btn btn-info">Upload</label>
                      </div>
                    </div>
                  </div>
                  <?php echo form_error('icon_four_image'); ?>
                </div>

                <div class="form-group">
                  <label>Icon Four Heading</label>
                  <textarea class="form-control editor" rows="3" id="icon_four_heading" name="icon_four_heading"><?php echo !empty($record->icon_four_heading)?$record->icon_four_heading:''?></textarea>
                  <?php echo form_error('icon_four_heading'); ?>
                </div>

                <div class="form-group">
                  <label>Section Two Sub Heading</label>
                  <input type="name" class="form-control" id="section_two_text" name="section_two_text" value="<?php echo !empty($record->section_two_text)?$record->section_two_text:''?>" required>
                  <?php echo form_error('section_two_text'); ?>
                </div>
                <div class="form-group">
                  <label>Page Image Five</label>
                  <div class="input-group-btn">
                    <div class="image-upload">
                      <img src="<?php echo !empty($record->image_five)?base_url('uploads/our_story/').$record->image_five:base_url('assets/img/placeholder.png')?>">
                      <div class="file-btn">
                        <input type="file" id="image_five" name="image_five">
                        <input type="text" id="image_five" name="image_five" value="<?php echo !empty($record->image_five)?$record->image_five:''?>" hidden>
                        <label class="btn btn-info">Upload</label>
                      </div>
                    </div>
                  </div>
                  <?php echo form_error('image_five'); ?>
                </div>
                <div class="form-group">
                  <label>Image Five Heading</label>
                  <input type="name" class="form-control" id="image_five_heading" name="image_five_heading" value="<?php echo !empty($record->image_five_heading)?$record->image_five_heading:''?>" required>
                  <?php echo form_error('image_five_heading'); ?>
                </div>
                <div class="form-group">
                  <label>Image Five Text</label>
                  <textarea class="form-control" rows="3" id="image_five_text" name="image_five_text"><?php echo !empty($record->image_five_text)?$record->image_five_text:''?></textarea>
                  <?php echo form_error('image_five_text'); ?>
                </div>
                <div class="form-group">
                  <label>Page Image Six</label>
                  <div class="input-group-btn">
                    <div class="image-upload">
                      <img src="<?php echo !empty($record->image_six)?base_url('uploads/our_story/').$record->image_six:base_url('assets/img/placeholder.png')?>">
                      <div class="file-btn">
                        <input type="file" id="image_six" name="image_six">
                        <input type="text" id="image_six" name="image_six" value="<?php echo !empty($record->image_six)?$record->image_six:''?>" hidden>
                        <label class="btn btn-info">Upload</label>
                      </div>
                    </div>
                  </div>
                  <?php echo form_error('image_six'); ?>
                </div>
                <div class="form-group">
                  <label>Image Six Heading</label>
                  <input type="name" class="form-control" id="image_six_heading" name="image_six_heading" value="<?php echo !empty($record->image_six_heading)?$record->image_six_heading:''?>" required>
                  <?php echo form_error('image_six_heading'); ?>
                </div>
                <div class="form-group">
                  <label>Image Six Text</label>
                  <textarea class="form-control" rows="3" id="image_six_text" name="image_six_text"><?php echo !empty($record->image_six_text)?$record->image_six_text:''?></textarea>
                  <?php echo form_error('image_six_text'); ?>
                </div>
                <div class="form-group">
                  <label>Section Three Heading</label>
                  <input type="name" class="form-control" id="section_three_heading" name="section_three_heading" value="<?php echo !empty($record->section_three_heading)?$record->section_three_heading:''?>" required>
                  <?php echo form_error('section_three_heading'); ?>
                </div>
                <div class="form-group">
                  <label>Section Three Sub Heading</label>
                  <input type="name" class="form-control" id="section_three_sub_heading" name="section_three_sub_heading" value="<?php echo !empty($record->section_three_sub_heading)?$record->section_three_sub_heading:''?>" required>
                  <?php echo form_error('section_three_sub_heading'); ?>
                </div>
                <div class="form-group">
                  <label>Section Three Text</label>
                  <textarea class="form-control" rows="3" id="section_three_text" name="section_three_text"><?php echo !empty($record->section_three_text)?$record->section_three_text:''?></textarea>
                  <?php echo form_error('section_three_text'); ?>
                </div>
                <div class="form-group">
                  <label>Section Four Heading</label>
                  <input type="name" class="form-control" id="section_four_heading" name="section_four_heading" value="<?php echo !empty($record->section_four_heading)?$record->section_four_heading:''?>" required>
                  <?php echo form_error('section_four_heading'); ?>
                </div>
                <div class="form-group">
                  <label>Image Seven</label>
                  <div class="input-group-btn">
                    <div class="image-upload">
                      <img src="<?php echo !empty($record->image_seven)?base_url('uploads/our_story/').$record->image_seven:base_url('assets/img/placeholder.png')?>">
                      <div class="file-btn">
                        <input type="file" id="image_seven" name="image_seven">
                        <input type="text" id="image_seven" name="image_seven" value="<?php echo !empty($record->image_seven)?$record->image_seven:''?>" hidden>
                        <label class="btn btn-info">Upload</label>
                      </div>
                    </div>
                  </div>
                  <?php echo form_error('image_seven'); ?>
                </div>
                <div class="form-group">
                  <label>Image Eight</label>
                  <div class="input-group-btn">
                    <div class="image-upload">
                      <img src="<?php echo !empty($record->image_eight)?base_url('uploads/our_story/').$record->image_eight:base_url('assets/img/placeholder.png')?>">
                      <div class="file-btn">
                        <input type="file" id="image_eight" name="image_eight">
                        <input type="text" id="image_eight" name="image_eight" value="<?php echo !empty($record->image_eight)?$record->image_eight:''?>" hidden>
                        <label class="btn btn-info">Upload</label>
                      </div>
                    </div>
                  </div>
                  <?php echo form_error('section_five_bg'); ?>
                </div>
                <div class="form-group">
                  <label>Image Nine</label>
                  <div class="input-group-btn">
                    <div class="image-upload">
                      <img src="<?php echo !empty($record->image_nine)?base_url('uploads/our_story/').$record->image_nine:base_url('assets/img/placeholder.png')?>">
                      <div class="file-btn">
                        <input type="file" id="image_nine" name="image_nine">
                        <input type="text" id="image_nine" name="image_nine" value="<?php echo !empty($record->image_nine)?$record->image_nine:''?>" hidden>
                        <label class="btn btn-info">Upload</label>
                      </div>
                    </div>
                  </div>
                  <?php echo form_error('section_six_bg'); ?>
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