<?php
defined('BASEPATH') OR exit('No Direct Script Allowed');

class Videos_model extends CI_Model
{
	function videos()
	{
		$this->db->select('*')
		->from('videos')
		->where('videos_status','enable');
		return $this->db->get()->result();
	}
}