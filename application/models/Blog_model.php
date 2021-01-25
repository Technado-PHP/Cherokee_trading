<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class Blog_model extends CI_Model {

	public function blog_data()
	{
		$this->db->select('*')
		->from('blog')
		->where('blog_status','enable');
		return $this->db->get()->result();
	}
}
