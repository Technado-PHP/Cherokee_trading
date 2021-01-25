<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class Settings extends Admin_Controller {
	function __construct() {
		parent::__construct();		
	}  

	public function general(){   
        if($_POST){
          $this->form_validation->set_rules('settings_site_title', 'Site Title', 'trim');
          $this->form_validation->set_rules('settings_email', 'Email address', 'trim|valid_email');
          // $this->form_validation->set_rules('settings_email_from', 'Email Address From', 'trim|valid_email');
          // $this->form_validation->set_rules('settings_email_to', 'Email address To', 'trim|valid_email');
          $this->form_validation->set_rules('settings_phone', 'Phone Number', 'trim');
          // $this->form_validation->set_rules('settings_header_logo', 'Phone Number', 'trim');
          $this->form_validation->set_rules('settings_copyrights', 'Fax Number', 'trim|required');
          $this->form_validation->set_rules('settings_mailing_address', 'Mailing Address', 'trim|min_length[5]|max_length[300]required');
          $this->form_validation->set_rules('settings_shipping_address', 'Shipping Address', 'trim|min_length[5]|max_length[300]required');
          $this->form_validation->set_rules('settings_address', 'Office Address', 'trim|min_length[5]|max_length[300]|required');

          if (!$this->form_validation->run() == FALSE){
            $content = array(
              'settings_site_title' => $this->input->post('settings_site_title',TRUE),
              'settings_email' => $this->input->post('settings_email',TRUE),
              // 'settings_email_from' => $this->input->post('settings_email_from',TRUE),
              // 'settings_email_to' => $this->input->post('settings_email_to',TRUE),
              'settings_phone' => $this->input->post('settings_phone',TRUE),
              // 'settings_header_logo' => $this->input->post('settings_header_logo',TRUE),
              'settings_copyrights' => $this->input->post('settings_copyrights',TRUE),
              'settings_address' => $this->input->post('settings_address',TRUE),
              'settings_mailing_address' => $this->input->post('settings_mailing_address',TRUE),
              'settings_shipping_address' => $this->input->post('settings_shipping_address',TRUE),
              'settings_favicon' => $this->input->post('settings_favicon',TRUE),
              'settings_logo' => $this->input->post('settings_logo',TRUE),
              // 'footer_text' => $this->input->post('footer_text',TRUE),

              // 'settings_status' => 'enable',
              // 'settings_updated_by' => '1'
            );    
            $unlink = $this->db->where(['settings_id'=>1])->get('settings')->row();

            if($_FILES['settings_logo']['size'] > 0)
            {
              @unlink("./uploads/settings/".$unlink->settings_logo);
              $settings_logo = single_image_upload($_FILES['settings_logo'],'./uploads/settings');
              if(is_array($settings_logo)){            
                $this->session->set_flashdata('error', $settings_logo);
              }else{
                $content['settings_logo'] = $settings_logo;
              }
            }  

            if($_FILES['settings_header_logo']['size'] > 0)
            {
              @unlink("./uploads/settings/".$unlink->settings_header_logo);
              $settings_header_logo = single_image_upload($_FILES['settings_header_logo'],'./uploads/settings');
              if(is_array($settings_header_logo)){            
                $this->session->set_flashdata('error', $settings_header_logo);
              }else{
                $content['settings_header_logo'] = $settings_header_logo;
              }
            }  

            if($_FILES['settings_favicon']['size'] > 0)
            {
              @unlink("./uploads/settings/".$unlink->settings_favicon);
              $settings_favicon = single_image_upload($_FILES['settings_favicon'],'./uploads/settings');
              if(is_array($settings_favicon)){            
                $this->session->set_flashdata('error', $settings_favicon);
              }else{
                $content['settings_favicon'] = $settings_favicon;
              }
            }  
            $data['where'] = array('settings_id' => 1);		
            $data['table'] = 'settings';	
            $this->general->update($data,$content);        
            $this->session->set_flashdata('success', 'Updated Successfully.');
            redirect('admin/settings/general');
          }
          else{
            $data['where'] = array('settings_id' => 1);		
            $data['table'] = 'settings';	
            $data['output_type'] = 'row';	
            $content['title'] = 'General Settings';		
            $content['record']  = $this->general->get($data);
            $content['main_content'] = 'settings/general';			
            $this->load->view('admin/inc/view',$content);   
         }
        }
        else{        
            $data['where'] = array('settings_id' => 1);		
            $data['table'] = 'settings';	
            $data['output_type'] = 'row';	
            $content['title'] = 'General Settings';		
            $content['record']  = $this->general->get($data);
            $content['main_content'] = 'settings/general';			
            $this->load->view('admin/inc/view',$content);   
        }
    }
	
}
