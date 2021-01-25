 <aside class="main-sidebar">
  <section class="sidebar">
    <div class="user-panel">
      <div class="pull-left image">
        <img src="<?php echo !empty($this->master_admin_image)?base_url('uploads/admin/').$this->master_admin_image:base_url('admin/assets/img/placeholder.png');?>" class="img-circle" alt="User Image">
      </div>
      <div class="pull-left info">
        <p><?php echo !empty($this->master_admin_name)?$this->master_admin_name:'Name';?></p>
      </div>
    </div>
    <ul class="sidebar-menu" data-widget="tree">
      <li class="header" style="text-align: center;">MAIN NAVIGATION</li>
      <li>
        <a href="<?php echo base_url('admin');?>">
          <i class="fa fa-dashboard"></i> <span>Dashboard</span>
          <!-- <span class="pull-right-container">
            <i class="fa fa-angle-left pull-right"></i>
          </span> -->
        </a>
      </li>
      <li class="treeview">
        <a href="javascript:;">
          <i class="fa fa-cog"></i>
          <span>Settings</span>
          <span class="pull-right-container">
            <i class="fa fa-angle-left pull-right"></i>
          </span>
        </a>
        <ul class="treeview-menu">
          <li><a href="<?php echo base_url('admin/settings/general');?>"><i class="fa fa-circle-o"></i>General</a></li>
          <li><a href="<?php echo base_url('admin/testimonials');?>"><i class="fa fa-circle-o"></i>Testimonials</a></li>
        </ul>
      </li>
      
<!--       <li class="treeview">
        <a href="javascript:;">
          <i class="fa fa-user"></i>
          <span>Coupon</span>
          <span class="pull-right-container">
            <i class="fa fa-angle-left pull-right"></i>
          </span>
        </a>
        <ul class="treeview-menu">
          <li><a href="<?php// echo base_url('admin/coupon');?>"><i class="fa fa-circle-o"></i>Coupon</a></li>
        </ul>
      </li> -->
<!--       <li class="treeview">
        <a href="javascript:;">
          <i class="fa fa-user"></i>
          <span>Out Of Stock</span>
          <span class="pull-right-container">
            <i class="fa fa-angle-left pull-right"></i>
          </span>
        </a>
        <ul class="treeview-menu">
          <li><a href="<?php //echo base_url('admin/out_stock');?>"><i class="fa fa-circle-o"></i>Out Of Stock</a></li>
        </ul>
      </li> -->
        <li class="treeview">
        <a href="javascript:;">
          <i class="fa fa-sitemap"></i>
          <span>Site Content</span>
          <span class="pull-right-container">
            <i class="fa fa-angle-left pull-right"></i>
          </span>
        </a>
        <ul class="treeview-menu">
          <li><a href="<?php echo base_url('admin/about');?>"><i class="fa fa-circle-o"></i>About Page Content</a></li>
          <li><a href="<?php echo base_url('admin/home_page');?>"><i class="fa fa-circle-o"></i>Home Page Content</a></li>
        </ul>
      </li>
<!--       <li class="treeview">
        <a href="javascript:;">
          <i class="fa fa-user"></i>
          <span>Sales Report</span>
          <span class="pull-right-container">
            <i class="fa fa-angle-left pull-right"></i>
          </span>
        </a>
        <ul class="treeview-menu">
          <li><a href="<?php //echo base_url('admin/report');?>"><i class="fa fa-circle-o"></i>All Reports</a></li>
        </ul>
      </li>   -->    
<!--        <li class="treeview">
        <a href="javascript:;">
          <i class="fa fa-shopping-cart"></i>
          <span>Orders</span>
          <span class="pull-right-container">
            <i class="fa fa-angle-left pull-right"></i>
          </span>
        </a>
        <ul class="treeview-menu">
          <li><a href="</?php //echo base_url('admin/order');?>"><i class="fa fa-circle-o"></i>All Orders <span></?php //echo $this->order;?></span></a></li>
          <li><a href="</?php //echo base_url('admin/order/order_pending');?>"><i class="fa fa-circle-o"></i>Pending Orders <span></?php //echo $this->order_pending;?></span></a></li>
          <li><a href="</?php //echo base_url('admin/order/order_confirm');?>"><i class="fa fa-circle-o"></i>Confirm Orders <span></?php //echo $this->order_confirm;?></span></a></li>
          <li><a href="</?php //echo base_url('admin/order/order_process');?>"><i class="fa fa-circle-o"></i>In-process Orders <span></?php //echo $this->order_process;?></span></a></li>
          <li><a href="</?php //echo base_url('admin/order/order_dispatched');?>"><i class="fa fa-circle-o"></i>Dispatched Orders <span></?php //echo $this->order_dispatched;?></span></a></li>
          <li><a href="</?php //echo base_url('admin/order/order_delivered');?>"><i class="fa fa-circle-o"></i>Delivered Orders <span></?php //echo $this->order_delivered;?></span></a></li>
          <li><a href="</?php //echo base_url('admin/order/order_cancle');?>"><i class="fa fa-circle-o"></i>Cancel Orders <span></?php //echo $this->order_cancle;?></span></a></li>
          <li><a href="</?php //echo base_url('admin/order/order_closed');?>"><i class="fa fa-circle-o"></i>Closed Orders <span></?php //echo $this->order_closed;?></span></a></li>
          <li><a href="</?php //echo base_url('admin/order/order_return');?>"><i class="fa fa-circle-o"></i>Return Orders <span></?php //echo $this->order_return;?></span></a></li>
        </ul>
      </li>  -->     
      <li class="treeview">
        <a href="javascript:;">
          <i class="fa fa-bar-chart"></i>
          <span>Inventory</span>
          <span class="pull-right-container">
            <i class="fa fa-angle-left pull-right"></i>
          </span>
        </a>
        <ul class="treeview-menu">
          <li><a href="<?php echo base_url('admin/category');?>"><i class="fa fa-circle-o"></i>Category</a></li>
          <!--<li><a href="</?php echo base_url('admin/sub_category');?>"><i class="fa fa-circle-o"></i>Sub Category</a></li>-->
           <!--<li><a href="</?php echo base_url('admin/attribute');?>"><i class="fa fa-circle-o"></i>Attribute</a></li>-->
          <!--<li><a href="</?php echo base_url('admin/variant');?>"><i class="fa fa-circle-o"></i>Variant</a></li>-->
          <li><a href="<?php echo base_url('admin/product');?>"><i class="fa fa-circle-o"></i>Product</a></li>
           <!--<li><a href="</?php echo base_url('admin/product_variant');?>"><i class="fa fa-circle-o"></i>Product Variant</a></li> -->
        </ul>
      </li>
    </ul>
  </section>
</aside>
<?php if(isset($output)):?>
  <div class="content-wrapper">    
    <?php echo $output;?>
  </div>
<?php endif;?>