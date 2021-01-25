<?php

defined('BASEPATH') OR exit('No Direct Script Allowed');

class Faq_two_model extends CI_Model
{
	function faqs()
	{
		$this->db->select('*')
		->from('faq_two')
		->where('faq_two_status','enable');
		return $this->db->get()->result();
	}
}