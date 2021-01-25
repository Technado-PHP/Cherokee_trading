<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class Cart_model extends CI_Model {

	// public function product_id()
	// {
	// 	$this->db->select('product_id')
	// 	->from('product')
	// 	->where(array('product_status'=>'enable','product_id'=>$_POST['product_id']));
	// 	return $this->db->get()->row();
	// }
	// public function product_name()
	// {
	// 	$this->db->select('product_name')
	// 	->from('product')
	// 	->where(array('product_status'=>'enable','product_name'=>$_POST['product_name']));
	// 	return $this->db->get()->row();
	// }
	// public function product_image()
	// {
	// 	$this->db->select('product_image')
	// 	->from('product')
	// 	->where(array('product_status'=>'enable','product_image'=>$_POST['product_image']));
	// 	return $this->db->get()->row();
	// }
	// public function product_short_desc()
	// {
	// 	$this->db->select('product_short_desc')
	// 	->from('product')
	// 	->where(array('product_status'=>'enable','product_short_desc'=>$_POST['product_short_desc']));
	// 	return $this->db->get()->row();
	// }
	// public function product_dis_price()
	// {
	// 	$this->db->select('product_dis_price')
	// 	->from('product')
	// 	->where(array('product_status'=>'enable','product_dis_price'=>$_POST['product_dis_price']));
	// 	return $this->db->get()->row();
	// }
	// public function product_reg_price()
	// {
	// 	$this->db->select('product_reg_price')
	// 	->from('product')
	// 	->where(array('product_status'=>'enable','product_reg_price'=>$_POST['product_reg_price']));
	// 	return $this->db->get()->row();
	// }
	public function cart_details($id)
	{
		$this->db->select('product_id, product_name, product_reg_price, product_image');
		$this->db->from('product');
		$this->db->where(array('product_status'=>'enable','product_id'=>$id));
		return $this->db->get()->row();
		// print_r($prod);exit;
	}
	public function cart_data()
	{
		$this->db->select('*');
		$this->db->from('product');
		$this->db->where(array('product_status'=>'enable'));
		return $this->db->get()->result();		
	}
	public function order_details($id)
	{
		// $this->db->select_sum('product_qty');
		$this->db->select('order_item_id, product_qty, product_id,order_total_points');
		$this->db->from('order_item');
		$this->db->where(array('order_item_status'=>'enable','product_id'=>$id));
		$prod = $this->db->get()->result();
		// print_r($prod);exit;
		return $prod;
	}
	public function customer($id)
	{
		$this->db->select('*')
		->from('customer')
		->where('customer_id',$id);
		return $this->db->get()->row();
	}
	public function order_detail()
	{
		$this->db->select('customer_id')
		->from('order')
		->where(array('order_current_status'=>'Delivered'));
		return $this->db->get()->result();
	}
}