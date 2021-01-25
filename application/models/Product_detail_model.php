<?php 

class Product_detail_model extends CI_Model{

	public function products_details($slug)
	{
		$this->db->select('*'); 
	  	$this->db->from('product');
	  	$this->db->where(array('product_slug'=>$slug,'product_status'=>'enable'));
	  	$query = $this->db->get();
	  	$res= $query->row();
	  	return $res;
	}
	public function product_multi_img($pId)
	{
		$this->db->select('*'); 
	  	$this->db->from('product_img');
	  	$this->db->where(array('product_id'=>$pId,'product_img_status'=>'enable'));
	  	$query = $this->db->get();
	  	return $query->result();
	}
	public function blogs()
	{
		$this->db->select('*')
		->from('blog')
		->where('blog_status','enable')
		->order_by('blog_id','ASC')
		->limit(3);	
		return $this->db->get()->result();
	}
	public function related()
	{
		$this->db->select('*')
		->from('product')
		->where('product_status','enable')
		// ->order_by('product_id','RANDOM')
		->limit(10);
		return $this->db->get()->result();
	}
	// public function product_variant($slug)
	// {
	// 	$this->db->select('product_id');
	// 	$this->db->from('product');
	//   	$this->db->where(array('product_slug'=>$slug,'product_status'=>'enable'));
	//   	$query = $this->db->get();
	//   	$res= $query->row();

	//   	$this->db->select('*');
	//   	$this->db->from('product_to_variant');
	//   	$this->db->where(array('product_id'=>$res->product_id,'product_to_variant_status'=>'enable'));
	//   	$attr = $this->db->get();
	//   	$result = $attr->result();
	//   	// echo "<pre>";
	//   	// print_r($result); exit;
	//   	foreach ($result as $key => $value) {
	//   			$id[]=$value->attribute_id;
	//   			$product_id =$value->product_id;
	//   			$variant_ids[]=$value->variant_id;
	  			
	//   	}
	//   		if(!empty($id)){
	//   		$x = array_unique($id);
	//   		$variant_ids=array_unique($variant_ids);
	//   		$prod_id=$product_id;

	//   		$this->db->select('attribute_name,attribute_id');
	//   		$this->db->from('attribute')->where('attribute_status','enable');
	//   		$this->db->where_in('attribute_id',$x);
	//   		$name = $this->db->get();

	//   		$record= $this->prod_var($prod_id);
	  		
	//   		return array(
	// 		    'attribute'=>$name->result(),
	// 		    'var'=>$record
	// 		);
	//   		}
	// }
	// public function prod_var($prod_id)
	// {
	// 	// $query=$this->db->query('SELECT  v.variant_id ,v.product_price,vv.variant_name,v.attribute_id
	// 	// 				from product_to_variant as v join variant as vv on v.variant_id=vv.variant_id
	// 	// 				where v.product_id='.$prod_id.'');
	// 	$this->db->select('v.variant_id,v.product_price,vv.variant_name,v.attribute_id');
	// 	$this->db->from('product_to_variant as v');
	// 	$this->db->join('variant as vv','on v.variant_id=vv.variant_id');
	// 	$this->db->where('v.product_id='.$prod_id.'');
	// 	$query=$this->db->get();
	// 	return $query->result();
	
	// }		
}