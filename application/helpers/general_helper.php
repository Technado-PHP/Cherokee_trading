<?php
defined('BASEPATH') OR exit('No direct script access allowed');

if(!function_exists('single_image_upload')){	
	function single_image_upload($image,$path){         
		$_FILES['image']['name']= $image['name'];
		$_FILES['image']['type']= $image['type']; 
		$_FILES['image']['tmp_name']= $image['tmp_name'];
		$_FILES['image']['error']= $image['error']; 
		$_FILES['image']['size']= $image['size']; 
    if(!file_exists($path)){
      mkdir($path, 0777, true);
    }
    $ci =& get_instance();
    $config['upload_path'] = ''.$path.'';
    $config['allowed_types'] = 'gif|jpg|png|PNG';
    $ci->load->library('upload', $config);
    $ci->upload->initialize($config);
    if(!$ci->upload->do_upload('image')){ 
      return array('error' => $ci->upload->display_errors());
    }else{
      $file_detail = $ci->upload->data();				
			return	$file_detail['file_name'];			
    }
    return FALSE;
	}
}

if(!function_exists('single_video_upload')){	
	function single_video_upload($video,$path){         
		$_FILES['video']['name']= $video['name'];
		$_FILES['video']['type']= $video['type']; 
		$_FILES['video']['tmp_name']= $video['tmp_name'];
		$_FILES['video']['error']= $video['error']; 
		$_FILES['video']['size']= $video['size']; 
    if(!file_exists($path)){
      mkdir($path, 0777, true);
    }
    $ci =& get_instance();
    $config['upload_path'] = ''.$path.'';
    $config['allowed_types'] = 'mp4|avi|wmv';
    $ci->load->library('upload', $config);
    $ci->upload->initialize($config);
    if(!$ci->upload->do_upload('video')){ 
      return array('error' => $ci->upload->display_errors());
    }else{
      $file_detail = $ci->upload->data();				
			return	$file_detail['file_name'];			
    }
    return FALSE;
	}
}

//     if(!function_exists('single_video_upload')){  
//   function single_video_upload($video,$path){         
//     $_FILES['video']['name']= $video['name'];
//     $_FILES['video']['type']= $video['type'];
//     $_FILES['video']['tmp_name']= $video['tmp_name'];
//     $_FILES['video']['error']= $video['error'];
//     $_FILES['video']['size']= $video['size']; 
//     if(!file_exists($path)){
//       mkdir($path, 0777, true);
//     }
//     $ci =& get_instance();
//     $config['upload_path'] = ''.$path.'';
//     $config['allowed_types'] = 'mov|mpeg|mp3|avi|mp4';
//     $ci->load->library('upload', $config);
//     $ci->upload->initialize($config);
//     if(!$ci->upload->do_upload('video')){ 
//       return array('error' => $ci->upload->display_errors());
//     }else{
//       $file_detail = $ci->upload->data();       
//       return  $file_detail['file_name'];      
//     }
//     return FALSE;
//   }
// }


if(!function_exists('multi_image_upload')){	
	function multi_image_upload($image,$index,$path){         
		$_FILES['image']['name']= $image['name'][$index];
		$_FILES['image']['type']= $image['type'][$index];
		$_FILES['image']['tmp_name']= $image['tmp_name'][$index];
		$_FILES['image']['error']= $image['error'][$index];
		$_FILES['image']['size']= $image['size'][$index];
    if(!file_exists($path)){
      mkdir($path, 0777, true);
    }
    $ci =& get_instance();
    $config['upload_path'] = ''.$path.'';
    $config['allowed_types'] = 'gif|jpg|png';
    $ci->load->library('upload', $config);
    $ci->upload->initialize($config);
    if(!$ci->upload->do_upload('image')){ 
      return array('error' => $ci->upload->display_errors());
    }else{
      $file_detail = $ci->upload->data();				
			return	$file_detail['file_name'];			
    }
    return FALSE;
	}
}

if(!function_exists('send_email')){	
	function send_email($send_to,$subject,$body){
    $ci =& get_instance();
    $config['mailtype'] ='html';
		$ci->email->initialize($config);    
  		$ci->email->set_newline("\r\n");
  		
		$ci->email->from($ci->email_from,$ci->site_title);
		$ci->email->to($send_to);		
		$ci->email->subject($subject);
		$ci->email->message($body);
		if($ci->email->send()){
			return TRUE;	
		}else{
			return FALSE;
		}
  }
}

if (!function_exists('limit_text'))
{
 function limit_text($count,$text)
 {
  $result = strlen($text)>$count?substr($text, 0, $count).'...':$text;
    return $result;
 } 
}

if (!function_exists('get_name_by_id'))
{
	function get_name_by_id($table,$id)
	{								
		$ci =& get_instance();
		$temp = $ci->general->get_list($table,$table.'_id='.$id);
		if($temp){			
			$name = $table.'_name';
			foreach($temp as $tp){
				$result = $tp->$name;				
			}
			return $result;
		}else{
			return FALSE;
		} 
	}
}	

if (!function_exists('get_list'))
{
	function get_list($tabel="",$where="",$limit="",$order_col="",$order_by="",$like="")
	{		
		$ci =& get_instance();
		$records = $ci->general->get_list($tabel,$where,$limit,$order_col,$order_by,$like);
		if($records){	
			return $records;
		}else{
			return  FALSE;
		}
			
	}
}

if (!function_exists('get_files_list'))
{
	function get_files_list($directory)
	{
    	if ($handle = opendir($directory)) {
            $result = array();
            while (false !== ($entry = readdir($handle))) {
        
                if ($entry != "." && $entry != "..") {
        
                    array_push($result,$entry);
                }
            }
            
            closedir($handle);
            return $result;
        }
	}	
}

if (!function_exists('get_templates'))
{
	function get_templates()
	{
	    $result = array();
        $list = get_files_list('application/views/front/template'); 
        foreach($list as $val){
            array_push($result,str_replace('.php','',$val));
        }
        
        return $result;
	}	
}



if (!function_exists('get_single_id'))
{
	function get_single_id($category_id)
	{
	    if(strpos($category_id,',') !== false){
           $cat =  explode(",",$category_id);
           $category_id = $cat[0];
        } 
        return $category_id;
	}	
}
if (!function_exists('get_grand_total'))
{
	function get_grand_total()
		{	
		$ci =& get_instance();
		if(isset($_SESSION['coupon_code']))
		{	
			$code = $_SESSION['coupon_code'];
			$result = $ci->home_m->check_coupon($code);
			if($result){
				$coupon_percent = $result->coupon_percent;
			}
			$percent = (float)$coupon_percent;
			$sub_total = $ci->cart->total();
			$x = $percent/100;
			$y = $x*$sub_total;
			$z= $sub_total-$y;
			$total = $z;			
			return $total;
		}else{
			return $ci->cart->total();
		}
	}
}	

if (!function_exists('get_discounted_amount'))
{
	function get_discounted_amount()
	{		
		$ci =& get_instance();
		if(isset($_SESSION['coupon_code']))
		{	
			$code = $_SESSION['coupon_code'];
			$result = $ci->home_m->check_coupon($code);
			if($result){
				$coupon_percent = $result->coupon_percent;
			}
			$percent = (float)$coupon_percent;
			$sub_total = $ci->cart->total();
			$x = $percent/100;
			$y = $sub_total*$x;
			$total = $y;
			return $ci->cart->format_number($total);
		}else{
			return $ci->cart->format_number(0);
		}		
			
	}
	
}