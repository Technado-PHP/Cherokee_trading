<?php defined('BASEPATH') OR exit('No direct script access allowed');

class About extends Front_Controller {
	
	public function index()
	{
        $content['record'] = $this->db->where(['about_id'=>1])->get('about')->row();
		$content['main_content'] = 'aboutus';
		$this->load->view('front/inc/view',$content);
	}
}