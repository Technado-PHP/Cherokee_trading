<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class Category_model extends CI_Model {

	public function categories()
	{
		$this->db->select('*')
		->from('category')
		->where(array('category_status'=>'enable'));
		return $this->db->get()->result();
	}
	// public function category($slug)
	// {
	// 	$this->db->select('*')
	// 	->from('category')
	// 	->where(array('category_status'=>'enable','category_slug'=>$slug));
	// 	return $this->db->get()->row();
	// }
	public function count()
	{
		// return $this->db->query("SELECT COUNT(`p`.`category_id`) AS CATID,`p`.`category_id`,`c`.`category_name`,`c`.`category_slug` FROM `product` p LEFT JOIN category c ON `p`.`category_id` = `c`.`category_id` WHERE `p`.`product_status` = 'enable' GROUP BY `p`.`category_id`")->result();

		$this->db->select('count(p.category_id) c_id , p.category_id , c.category_name, c.category_slug')
		->from('product p')
		->join('category c','c.category_id = p.category_id','left')
		->where(array('p.product_status'=>'enable'))
		->group_by('p.category_id');

		return $this->db->get()->result();

		// print_r($this->db->get()->result());
		// die;

	}
	public function records($slug)
	{
		$this->db->select('*')
		->from('category')
		->where(array('category_status'=>'enable','category_slug'=>$slug));
		$id = $this->db->get()->row();
		$this->db->select('*')
		->from('product')
		->where(array('category_id'=>$id->category_id,'product_status'=>'enable'));
		return $this->db->get()->result();
	}
	public function sub_categories($slug)
	{
		return $this->db->select('*')->from('sub_category')
		->join('category','category.category_id = sub_category.category_id','left')
		->where(['category_slug'=>$slug,'sub_category_status'=>'enable'])->get()->result();
	}
	public function products()
	{
		$this->db->select('*')
		->from("product")
		->where('product_status','enable');
		return $this->db->get()->result();
	}
}	

