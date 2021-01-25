<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class Product_model extends CI_Model {

	public function all_products()
	{
		$this->db->select('*')
		->from("product")
		->where('product_status','enable');
		return $this->db->get()->result();
	}
	public function categories()
	{
		// return $this->db->query("SELECT COUNT(`p`.`category_id`) AS CATID,`p`.`category_id`,`c`.`category_name`,`c`.`category_slug` FROM `product` p LEFT JOIN category c ON `p`.`category_id` = `c`.`category_id` WHERE `p`.`product_status` = 'enable' GROUP BY `p`.`category_id`")->result();

		$this->db->select('count(p.category_id) c_id , p.category_id , c.category_name, c.category_slug')
		->from('product p')
		->join('category c','c.category_id = p.category_id','left')
		->where(array('p.product_status'=>'enable'))
		->group_by('p.category_id');

		return $this->db->get()->result();
	}
	function sub_category($slug)
	{
		return $this->db->select('*')->from('product')
		->join('category','category.category_id = product.category_id','left')
		->join('sub_category','sub_category.sub_category_id = product.sub_category_id','left')
		->where(array('product.product_status'=>'enable','sub_category.sub_category_slug'=>$slug))
		->get()->result();
	}
}

