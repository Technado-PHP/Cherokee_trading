<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class Profile extends Admin_Controller {
	function __construct() {
		parent::__construct();		
	}  

	public function index(){   
    if($_POST){
      $this->form_validation->set_rules('master_admin_name', 'Full Name', 'trim|required|alpha_numeric_spaces|min_length[3]|max_length[25]');
      $this->form_validation->set_rules('master_admin_email', 'Email address', 'trim|required|valid_email');
      $this->form_validation->set_rules('master_admin_phone', 'Phone Number', 'trim|required|exact_length[14]');
      $this->form_validation->set_rules('master_admin_address', 'Address', 'trim|min_length[5]|max_length[300]');
      $this->form_validation->set_rules('new_password', 'New Password', 'trim|min_length[8]|max_length[25]');
      $this->form_validation->set_rules('cnf_password', 'Confirm Password', 'trim|matches[new_password]');
      if (!$this->form_validation->run() == FALSE){
        $content = array(
          'master_admin_name' => $this->input->post('master_admin_name',TRUE),
          'master_admin_email' => $this->input->post('master_admin_email',TRUE),
          'master_admin_phone' => $this->input->post('master_admin_phone',TRUE),
          'master_admin_address' => $this->input->post('master_admin_address',TRUE),
          'master_admin_image' => $this->input->post('master_admin_image',TRUE),
          'master_admin_status' => 'enable',
          'master_admin_updated_by' => '1'
        );  
        if($this->input->post('cnf_password',TRUE)){
           $content['master_admin_password'] = $this->encrypt->encode($this->input->post('cnf_password'));
        }  
        if($_FILES['master_admin_image']['size'] > 0){
          $unlink = $this->db->where(['product_status'=>'enable','product_id'=>$id])->get('product')->row();
          @unlink("./uploads/profile/".$unlink->master_admin_image);
          $image = single_image_upload($_FILES['master_admin_image'],'./uploads/admin');
          if(is_array($image)){            
            $this->session->set_flashdata('error', $image);
          }else{
            $content['master_admin_image'] = $image;
          }
        }  
        $data['where'] = array('master_admin_id' => 1);		
        $data['table'] = 'master_admin';	
        $this->general->update($data,$content);        
        $this->session->set_flashdata('success', 'Updated Successfully.');
        redirect('admin/profile/index');
      }
      else{
        $data['where'] = array('master_admin_id' => 1);		
        $data['table'] = 'master_admin';	
        $data['output_type'] = 'row';	
        $content['title'] = 'Admin Profile';	
        $content['record']  = $this->general->get($data);
        $content['main_content'] = 'profile/edit';			
        $this->load->view('admin/inc/view',$content);   
     }
    }
    else{        
        $data['where'] = array('master_admin_id' => 1);		
        $data['table'] = 'master_admin';	
        $data['output_type'] = 'row';	
        $content['title'] = 'Admin Profile';	
        $content['record']  = $this->general->get($data);
        $content['main_content'] = 'profile/edit';			
        $this->load->view('admin/inc/view',$content);   
    }
  }
	
}
