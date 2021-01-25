<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class Front_Controller extends CI_Controller {
	function __construct() {
	parent::__construct();	  
        
        $this->currency = $this->general->get_single_field('settings','','currency');
        $this->header_logo = $this->general->get_single_field('settings','','settings_logo');
        $this->fav_icon = $this->general->get_single_field('settings','','settings_favicon');
        $this->site_title = $this->general->get_single_field('settings','','settings_site_title');
        $this->phone = $this->general->get_single_field('settings','','settings_phone');
        $this->address = $this->general->get_single_field('settings','','settings_address');
        $this->email_address = $this->general->get_single_field('settings','','settings_email');
        $this->email_from = $this->general->get_single_field('settings','','settings_email_from');
        $this->email_to = $this->general->get_single_field('settings','','settings_email_to');
        $this->copyrights = $this->general->get_single_field('settings','','settings_copyrights');
        $this->settings_logo = $this->general->get_single_field('settings','','settings_logo');
        $this->settings_header_logo = $this->general->get_single_field('settings','','settings_header_logo');
        // $this->footer_text = $this->general->get_single_field('settings','','footer_text');
        // $this->settings_email = $this->general->get_single_field('settings','','settings_email');

        // $this->footer = $this->home_model->footer_top_data();
        $this->form_validation->set_error_delimiters('<span style="color:red">','</span>');
	$this->testicles = $this->db->where(['testimonials_status'=>'enable'])->get('testimonials')->result();
        // $this->social  = $this->db->where(['social_status'=>'enable'])->get('social_media')->result();

        // $data['table'] = 'category';
        // $data['output_type'] = 'result';
        // $this->categories  = $this->general->get($data);
}

}
