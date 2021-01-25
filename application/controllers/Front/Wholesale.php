<?php defined('BASEPATH') OR exit('No direct script access allowed');

class Wholesale extends Front_Controller {
	
	public function index()
	{
		$content['main_content'] = 'wholesale';
		$this->load->view('front/inc/view',$content);
	}
}