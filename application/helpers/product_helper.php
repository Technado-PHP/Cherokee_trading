<?php
defined('BASEPATH') OR exit('No direct script access allowed');

if(!function_exists('check_inventory')){	
	function check_inventory($product_id){  
        $ci =& get_instance();  
        $data['table'] = "inventory";
        $data['select_sum'] = "inventory_qty";
        $data['where'] = array('product_id' => $product_id);
		$data['output_type'] = 'row';
		$total_qty = $ci->general->get($data);
		
        $data['table'] = "order";
        $data['join_table'] = "order_item";
        $data['join'] = "order_item.order_id = order.order_id";
        $data['join_type'] = 'left';
        $data['select_sum'] = "product_qty";
        $data['where'] = array('product_id' => $product_id, 'order_current_status !=' => 'Cancle');
		$data['output_type'] = 'row';
		$used_qty = $ci->general->get($data);
		
		$data['table'] = "order";
        $data['join_table'] = "order_deal";
        $data['join'] = "order_deal.order_id = order.order_id";
        $data['join_type'] = 'left';
        $data['select_sum'] = "product_qty";
        $data['where'] = array('product_id' => $product_id, 'order_current_status !=' => 'Cancle');
		$data['output_type'] = 'row';
		$used_qty1 = $ci->general->get($data);
		$used_total = $used_qty->product_qty + $used_qty1->product_qty;
		if(!empty($total_qty)){
		    $available_qty = $total_qty->inventory_qty;
		    	if(!empty($used_qty)){
    		    $available_qty = $total_qty->inventory_qty - $used_total;
    		    return $available_qty;
    		}
		    return $available_qty;
		}
        return FALSE;
    }
}

if(!function_exists('get_rating')){	
	function get_rating($product_id){  
        $ci =& get_instance();
        $data['table'] = "product_rating";
        $data['select_avg'] = "product_rating_stars";
        $data['where'] = array('product_rating_aproved' => 'Yes');
        $data['where'] = array('product_id' => $product_id);
		$data['output_type'] = 'row';
		$rating = $ci->general->get($data);	
        return $rating->product_rating_stars;
    }
}


if(!function_exists('cart_dis')){	
	function cart_dis(){  
        $ci =& get_instance();
        $dis_amount = 0;
        $coupon_code = $ci->session->userdata('coupon_code');
        $coupon_value = $ci->session->userdata('coupon_value');
		$coupon_type = $ci->session->userdata('coupon_type');
		$coupon_product = $ci->session->userdata('coupon_product');
		if($coupon_product){
		    $products = explode(',',$coupon_product);
		    foreach($ci->cart->contents() as $items){
		        if(in_array($items['id'],$products)){
		            if($coupon_type == 'Amount'){
		                $dis_amount += $items['qty']*$coupon_value;
		            }
		            if($coupon_type == 'Percentage'){
		                $amount = $items['price']*$coupon_value/100;
		                $dis_amount += $items['qty']*$amount;
		            }
		        }
		    }
		}else{
		    if($coupon_type == 'Amount'){
                $dis_amount += $ci->cart->total()-$coupon_value;
            }
            if($coupon_type == 'Percentage'){
                $dis_amount = $ci->cart->total()*$coupon_value/100;
            }
		    
		}
		
		return $dis_amount;
    }
}


if (!function_exists('get_category'))
{
	function get_category()
	{		
		$ci =& get_instance();
		$data['table'] = 'category';
		$data['output_type'] = 'result';
		$data['order_by'] = 'category_sort ASC';
		$records = $ci->general->get($data);
		if($records){	
			return $records;
		}else{
			return  FALSE;
		}
			
	}
}