<?php defined('BASEPATH') OR exit('No direct script access allowed');

class Home extends Front_Controller {
	
	public function index()
	{
	   // print_r($this->session->userdata('wholesale_login_id'));exit;
        $content['featured_products'] = $this->db->where(['featured_product'=>1])->get('product')->result();
        $content['special_product'] = $this->db->where(['special_product'=>1])->get('product')->result();
        $content['record'] = $this->db->where(['home_page_id'=>1])->get('home_page')->row();
		$content['main_content'] = 'index';
		$this->load->view('front/inc/view',$content);
	}
}