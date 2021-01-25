<?php defined('BASEPATH') OR exit('No direct script access allowed');

class Privacy_policy extends Front_Controller {
	
	public function index()
	{
		$content['main_content'] = 'privacy-policy';
		$this->load->view('front/inc/view',$content);
	}
}