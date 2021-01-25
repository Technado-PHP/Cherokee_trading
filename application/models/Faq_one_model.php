<?php

defined('BASEPATH') OR exit('No Direct Script Allowed');

class Faq_one_model extends CI_Model
{
	function faqs()
	{
		$this->db->select('*')
		->from('faq_one')
		->where('faq_one_status','enable');
		return $this->db->get()->result();
	}
}