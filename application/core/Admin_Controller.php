<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class Admin_Controller extends CI_Controller {
	function __construct() {
	parent::__construct();	
	if(!$this->session->userdata('master_admin_id')){		
	$this->uri->segment(2)=='login'||$this->uri->segment(2)=='forgot-password'||$this->uri->segment(2)=='reset-password'?'':redirect('admin/login');
	}
        $this->currency = $this->general->get_single_field('settings','','currency');
        $this->header_logo = $this->general->get_single_field('settings','','settings_logo');
        $this->fav_icon = $this->general->get_single_field('settings','','settings_favicon');
        $this->site_title = $this->general->get_single_field('settings','','settings_site_title');
        $this->phone = $this->general->get_single_field('settings','','settings_phone');
        $this->address = $this->general->get_single_field('settings','','settings_address');
        $this->email_address = $this->general->get_single_field('settings','','settings_email');
        $this->email_from = $this->general->get_single_field('settings','','settings_email_from');
        $this->email_to = $this->general->get_single_field('settings','','settings_email_to');
        $this->settings_email = $this->general->get_single_field('settings','','settings_email');
        $this->form_validation->set_error_delimiters('<span class="help-block">','</span>');

        $this->master_admin_image = $this->general->get_single_field('master_admin','','master_admin_image');
        $this->master_admin_name = $this->general->get_single_field('master_admin','','master_admin_name');

        // $this->db->select('order_id')
        // ->from('order');
        // $this->order = count($this->db->get()->result());

        // $this->db->select('order_id')
        // ->from('order')
        // ->where('order_current_status','Pending');
        // $this->order_pending = count($this->db->get()->result());

        // $this->db->select('order_id')
        // ->from('order')
        // ->where('order_current_status','Confirm');        
        // $this->order_confirm = count($this->db->get()->result());

        // $this->db->select('order_id')
        // ->from('order')
        // ->where('order_current_status','In-process');   
        // $this->order_process = count($this->db->get()->result());

        // $this->db->select('order_id')
        // ->from('order')
        // ->where('order_current_status','Dispatched'); 
        // $this->order_dispatched = count($this->db->get()->result());

        // $this->db->select('order_id')
        // ->from('order')
        // ->where('order_current_status','Delivered'); 
        // $this->order_delivered = count($this->db->get()->result());

        // $this->db->select('order_id')
        // ->from('order')
        // ->where('order_current_status','Cancle'); 
        // $this->order_cancle = count($this->db->get()->result());

        // $this->db->select('order_id')
        // ->from('order')
        // ->where('order_current_status','Closed'); 
        // $this->order_closed = count($this->db->get()->result());
        
        // $this->db->select('order_id')
        // ->from('order')
        // ->where('order_current_status','Return'); 

        // $this->order_return = count($this->db->get()->result());
	} 
}
