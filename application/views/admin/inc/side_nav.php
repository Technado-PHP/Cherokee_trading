
</div>
 
<!-- ./wrapper -->

<!-- jQuery UI 1.11.4 -->
<script src="<?php echo base_url();?>assets/admin/bower_components/jquery-ui/jquery-ui.min.js"></script>
<!-- Resolve conflict in jQuery UI tooltip with Bootstrap tooltip -->
<script>
  $.widget.bridge('uibutton', $.ui.button);
</script>
<!-- Bootstrap 3.3.7 -->
<script src="<?php echo base_url();?>assets/admin/bower_components/bootstrap/dist/js/bootstrap.min.js"></script>

<script src="<?php echo base_url();?>assets/admin/bower_components/select2/dist/js/select2.full.min.js"></script>
<script src="<?php echo base_url();?>assets/admin/bower_components/select2/dist/js/select2.full.min.js"></script>
<!-- InputMask -->
<script src="<?php echo base_url();?>assets/admin/plugins/input-mask/jquery.inputmask.js"></script>
<script src="<?php echo base_url();?>assets/admin/plugins/input-mask/jquery.inputmask.date.extensions.js"></script>
<script src="<?php echo base_url();?>assets/admin/plugins/input-mask/jquery.inputmask.extensions.js"></script>
<script src="<?php echo base_url();?>assets/admin/plugins/timepicker/bootstrap-timepicker.min.js"></script>
<script src="<?php echo base_url();?>assets/admin/plugins/iCheck/icheck.min.js"></script>
<!-- bootstrap color picker -->
<script src="<?php echo base_url();?>assets/admin/bower_components/bootstrap-colorpicker/dist/js/bootstrap-colorpicker.min.js"></script>

<!-- Morris.js charts -->
<script src="<?php echo base_url();?>assets/admin/bower_components/raphael/raphael.min.js"></script>
<script src="<?php echo base_url();?>assets/admin/bower_components/morris.js/morris.min.js"></script>
<!-- Sparkline -->
<script src="<?php echo base_url();?>assets/admin/bower_components/jquery-sparkline/dist/jquery.sparkline.min.js"></script>
<!-- jvectormap -->
<script src="<?php echo base_url();?>assets/admin/plugins/jvectormap/jquery-jvectormap-1.2.2.min.js"></script>
<script src="<?php echo base_url();?>assets/admin/plugins/jvectormap/jquery-jvectormap-world-mill-en.js"></script>
<!-- jQuery Knob Chart -->
<script src="<?php echo base_url();?>assets/admin/bower_components/jquery-knob/dist/jquery.knob.min.js"></script>
<!-- daterangepicker -->
<script src="<?php echo base_url();?>assets/admin/bower_components/moment/min/moment.min.js"></script>
<script src="<?php echo base_url();?>assets/admin/bower_components/bootstrap-daterangepicker/daterangepicker.js"></script>
<script src="<?php echo base_url();?>assets/admin/bower_components/chart.js/Chart.js"></script>
<!-- datepicker -->
<script src="<?php echo base_url();?>assets/admin/bower_components/bootstrap-datepicker/dist/js/bootstrap-datepicker.min.js"></script>
<!-- Bootstrap WYSIHTML5 -->
<script src="<?php echo base_url();?>assets/admin/plugins/bootstrap-wysihtml5/bootstrap3-wysihtml5.all.min.js"></script>
<!-- Slimscroll -->
<script src="<?php echo base_url();?>assets/admin/bower_components/jquery-slimscroll/jquery.slimscroll.min.js"></script>
<!-- FastClick -->
<script src="<?php echo base_url();?>assets/admin/bower_components/fastclick/lib/fastclick.js"></script>
<!-- AdminLTE App -->
<script src="<?php echo base_url();?>assets/admin/js/adminlte.min.js"></script>
<!-- AdminLTE dashboard demo (This is only for demo purposes) -->
<script src="<?php echo base_url();?>assets/admin/js/pages/dashboard.js"></script>
<!-- AdminLTE for demo purposes -->
<script src="<?php echo base_url();?>assets/admin/js/demo.js"></script>
<script src="<?php echo base_url();?>assets/admin/bower_components/Flot/jquery.flot.js"></script>
<!-- FLOT RESIZE PLUGIN - allows the chart to redraw when the window is resized -->
<script src="<?php echo base_url();?>assets/admin/bower_components/Flot/jquery.flot.resize.js"></script>
<!-- FLOT PIE PLUGIN - also used to draw donut charts -->
<script src="<?php echo base_url();?>assets/admin/bower_components/Flot/jquery.flot.pie.js"></script>
<!-- FLOT CATEGORIES PLUGIN - Used to draw bar charts -->
<script src="<?php echo base_url();?>assets/admin/bower_components/Flot/jquery.flot.categories.js"></script>
<!-- jQuery Knob -->
<script src="<?php echo base_url();?>assets/admin/bower_components/jquery-knob/js/jquery.knob.js"></script>
<!-- Sparkline -->
<script src="<?php echo base_url();?>assets/admin/bower_components/jquery-sparkline/dist/jquery.sparkline.min.js"></script>
<script src="<?php echo base_url();?>assets/admin/bower_components/datatables.net/js/jquery.dataTables.min.js"></script>
<script src="<?php echo base_url();?>assets/admin/bower_components/datatables.net-bs/js/dataTables.bootstrap.min.js"></script>
<script src="<?php echo base_url();?>assets/admin/plugins/bootstrap-wysihtml5/bootstrap3-wysihtml5.all.min.js"></script>

<script src="https://cdn.datatables.net/responsive/2.2.3/js/dataTables.responsive.min.js"></script>
<script>
$(function () {
 var table = $('#datatable').DataTable({
    'order'      : [ 0, "desc" ],
    'paging'      : true,
    'lengthChange': true,
    'searching'  : true,
    'ordering'  : true,
    'info'       : true,
    'autoWidth'   : true, 
    'responsive'  : true
  }) 
})
$(document).ready(function(){
  $(":input").inputmask();
})
$(document).ready(function(){
  $(".image-upload :file").on('change',function(){
    // var width = $(this).data('width');
    // var height = $(this).data('height');
    var file = this.files[0];
    var temp = $(this);
    var fileType = file["type"];
    var ValidImageTypes = ["image/gif", "image/jpeg","image/jpg", "image/png","image/PNG", "video/mp4" ,"video/avi" ,"video/wmv"];
    if ($.inArray(fileType, ValidImageTypes) < 0) {
        alert_danger("Invalid File Format");
    }else{ 
        $(this).parents('.image-upload').prepend('<i class="fa fa-times" aria-hidden="true"></i>');
        $(this).parents('.file-btn').siblings('img').attr('src',URL.createObjectURL(this.files[0]));         
        var  img = $(this).parents('.file-btn').siblings('img');
        // $(img).on('load', function() {
        //     var w = $(this).get(0).naturalWidth;
        //     var h = $(this).get(0).naturalHeight;
        //     if(width == w && height == h){   
        //         return true;
        //     }else{                             
        //         temp.val('');                          
        //         $(this).parents('.image-upload').children(':file').val('');
        //         $(this).parents('.image-upload').children('img').attr('src','<?php //echo base_url('assets/admin/img/placeholder.png')?>');
        //         $(this).parents('.image-upload').children('.fa-times').remove();
        //         alert_danger("Image Size Should Be Width = " + width + " And Height = " + height + "");     
        //     }
        // });
    }
  })
  $(".image-upload").on('click','i',function(){    
    $(this).parents('.image-upload').children(':file').val('');
    $(this).parents('.image-upload').children('img').attr('src','<?php echo base_url('assets/admin/img/placeholder.png')?>');
    $(this).remove();
  })
})
$(document).ready(function(){
  $("body").on('change','.multi-image-upload :file',function(){    
    // var width = $(this).data('width');
    // var height = $(this).data('height');
    var file = this.files[0];
    var temp = $(this);
    var fileType = file["type"];
    var ValidImageTypes = ["image/gif", "image/jpeg", "image/png", "video/mp4" ,"video/avi" ,"video/wmv"];
    if ($.inArray(fileType, ValidImageTypes) < 0) {
      alert_danger("Invalid File Format");
    }else{
      var temp = $(this).parents('.multi-image-upload:last').clone();  
      $(this).parents('.input-group-btn').append(temp).find('input:last').val('');
      $(this).parents('.multi-image-upload').prepend('<i class="fa fa-times" aria-hidden="true"></i>');
      $(this).parents('.file-btn').siblings('img').attr('src',URL.createObjectURL(this.files[0]));    
      var  img = $(this).parents('.file-btn').siblings('img'); 
    //   $(img).on('load', function() {
    //     var w = $(this).get(0).naturalWidth;
    //     var h = $(this).get(0).naturalHeight;
    //     if(width == w && height == h){   
    //         return true;
    //     }else{                       
    //         temp.val('');   
    //         $(this).parents('.multi-image-upload').remove();
    //         alert_danger("Image Size Should Be Width = " + width + " And Height = " + height + "");
    //     }
    //   });     
      $(this).siblings('label').remove();
    }
  })
  $("body").on('click','.multi-image-upload > i',function(){
    $(this).parents('.multi-image-upload').remove();
  })
})
$(document).ready(function(){
  $('.form-group').each(function(i, obj) {
     if($(this).children('span').hasClass('help-block')){
       $(this).addClass('has-error');
     }
  });
})
$(document).ready(function(){
  $('.editor').each(function(e) {
    CKEDITOR.replace( this.id,{
      allowedContent : true,
    toolbar: 'Full',
    enterMode : CKEDITOR.ENTER_BR,
    shiftEnterMode: CKEDITOR.ENTER_P,
  });
  });
})
</script>
<script>
    $('input[type=datepicker]').datepicker({
      autoclose: true })  
    $('input[type=daterangepicker]').daterangepicker({ timePicker: true, timePickerIncrement: 30, format: 'MM/DD/YYYY h:mm A' })
</script>

</body>
</html>