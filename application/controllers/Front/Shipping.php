<?php defined('BASEPATH') OR exit('No direct script access allowed');

class Shipping extends Front_Controller {
	
	public function index()
	{
		$content['main_content'] = 'shipping';
		$this->load->view('front/inc/view',$content);
	}
}