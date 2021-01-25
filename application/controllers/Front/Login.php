<?php defined('BASEPATH') OR exit('No direct script access allowed');

class Login extends Front_Controller {
	
	public function index()
	{
		$content['main_content'] = 'login';
		$this->load->view('front/inc/view',$content);
	}
}