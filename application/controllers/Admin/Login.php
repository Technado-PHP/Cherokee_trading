<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class Login extends Admin_Controller {
	function __construct() {
		parent::__construct();		
	}  

	public function index()
	{ 	
    if(!$this->session->userdata('master_admin_id')){				
      if (!empty($_POST))
      {		
        $email = $this->input->post('email',TRUE);
        $password = $this->input->post('password',TRUE);
        $remember = $this->input->post('remember',TRUE);
        $users['where'] = array('master_admin_email' => $email);		
        $users['table'] = 'master_admin';	
        $result = $this->general->get($users);
        if($result){
          foreach($result as $row){
            $pass = $row['master_admin_password'];
            $email = $row['master_admin_email'];
            $image = $row['master_admin_image'];
            $name =	$row['master_admin_name'];
            $id =	$row['master_admin_id'];
          }
          if($this->encryption->decrypt($pass) == $password){
            $session_data = array(				
              'master_admin_email' => $email,
              'master_admin_name' => $name,
              'master_admin_image' => $image,							
              'master_admin_id' => $id,									
            );	 
            $this->session->set_userdata($session_data);  
            if($remember=='yes'){
              $cookie_email =array(
                'name'   => 'master_admin_email',
                'value'  => $email,
                'expire' => '1209600'
              );
              $this->input->set_cookie($cookie_email);
              $cookie_pass =array(
                'name'   => 'master_admin_password',
                'value'  => $password,
                'expire' => '1209600'
              );
              $this->input->set_cookie($cookie_pass);
            }  
            $this->session->set_flashdata('success', 'Login Successfull.');
            redirect('admin/dashboard');
          }else{
            $this->session->set_flashdata('error', 'Invalid Email Or Password.');
            redirect('admin/login');
          }							
        }else{				
          $this->session->set_flashdata('error', 'Invalid Email Or Password.');
          redirect('admin/login');
        }			
      }else{
          $this->load->view('admin/login/login');
      }	
    }else{      
      redirect('admin');
    }	
	}
  
	public function forgot_password()
	{ 	
    if (!empty($_POST)){		
      $email = $this->input->post('email',TRUE);
      $users['where'] = array('master_admin_email' => $email);		
      $users['table'] = 'master_admin';	
      $result = $this->general->get($users);
      if($result){   
        $today = date("Ymd");
        $rand = strtoupper(substr(uniqid(sha1(time())),0,120));
        $master_admin_rest_token = $today . $rand;  
        $content['master_admin_rest_token'] = $master_admin_rest_token;
        $data['where'] = array('master_admin_id' => 1);		
        $data['table'] = 'master_admin';	
        $this->general->update($data,$content);        
        $section['subject'] = 'Password Reset Link';
        $section['body'] = '<strong>Reset Link :</strong> <a href="'.base_url('admin/reset-password/').$master_admin_rest_token.'">Click Here And You Will Be Redirected To The Website.</a>';
        $body = $this->load->view('admin/email/template',$section, TRUE);
        send_email($email,$this->site_title.'Password Reset Link',$body);
        $this->session->set_flashdata('success','Email Has Been Send With A Rest Link.');
        redirect('admin/forgot-password');       					
      }else{				
        $this->session->set_flashdata('error', 'Invalid Email.');
        redirect('admin/forgot-password');
      }			
    }else{
        $this->load->view('admin/login/forgot_password');
    }	    
	}
	
	public function reset_password()
	{ 	
        if (!empty($_POST)){		
            $this->form_validation->set_rules('new_password', 'New Password', 'trim|required|min_length[8]|max_length[25]');
            $this->form_validation->set_rules('cnf_password', 'Confirm Password', 'trim|required|matches[new_password]');
            if (!$this->form_validation->run() == FALSE){
                $content['master_admin_password'] = $this->encryption->encrypt($this->input->post('cnf_password'));
                $data['where'] = array('master_admin_id' => 1);		
                $data['table'] = 'master_admin';	
                $this->general->update($data,$content);
                $this->session->set_flashdata('success', 'Password Rest Successfull.');
                redirect('admin/login'); 
            }else{ 
                $this->load->view('admin/login/reset_password');
            }
        }else{
            $this->load->view('admin/login/reset_password');
        }	    
	}
	
	public function logout()
	{
		$this->session->sess_destroy();
    redirect('admin/login');
	}	

}
