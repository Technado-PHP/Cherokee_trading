<?php defined('BASEPATH') OR exit('No direct script access allowed');

class Shipping_return extends Front_Controller {
	
	public function index()
	{
		$content['main_content'] = 'shipping-returns';
		$this->load->view('front/inc/view',$content);
	}
}