<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class Blog_main_model extends CI_Model {

	public function blog_data($id)
	{
		$this->db->select('*')
		->from("blog")
		->where(array('blog_status'=>'enable','blog_id'=>$id));
		return $this->db->get()->row();
	}
}
