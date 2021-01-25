<?php defined('BASEPATH') OR exit('No direct script access allowed');

class Cart extends Front_Controller {
	
	public function index()
	{
		$content['main_content'] = 'cart';
		$this->load->view('front/inc/view',$content);
	}
}