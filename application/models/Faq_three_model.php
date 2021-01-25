<?php

defined('BASEPATH') OR exit('No Direct Script Allowed');

class Faq_three_model extends CI_Model
{
	function faqs()
	{
		$this->db->select('*')
		->from('faq_three')
		->where('faq_three_status','enable');
		return $this->db->get()->result();
	}
}