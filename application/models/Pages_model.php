<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class Pages_model extends CI_Model {

	public function data()
	{
		// print_r($slug);exit;
		$this->db->select('*')
		->from('pages')
		->limit(9)
		->where(array('pages_status'=>'enable'));
		return $this->db->get()->result();
	}

	public function pages_data($slug='')
	{
		// print_r($slug);exit;
		$this->db->select('*')
		->from('pages')
		->where(array('pages_status'=>'enable','pages_slug'=>$slug));
		return $this->db->get()->row();
	}
}