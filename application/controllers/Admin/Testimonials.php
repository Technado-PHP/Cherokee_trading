<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class Testimonials extends Admin_Controller 
{
    function __construct() 
    {
        parent::__construct();		
    }  

    public function index()
    {
        $content['records'] = $this->db->where(array('testimonials_status'=>'enable'))->get('testimonials')->result();
        // print_r($content['records']);exit();
        $content['title'] = 'All Data';

        $content['main_content'] = 'testimonials/list';			
        $this->load->view('admin/inc/view',$content);   
    }
    
    public function add()
    {
       if($_POST)
       {  
        $this->form_validation->set_rules('message', 'Message', 'trim');
        // $this->form_validation->set_rules('testimonials_slug', 'Sub Category Slug', 'trim');

        if (!$this->form_validation->run() == FALSE)
        {
            $content = array(
                'message' => $this->input->post('message',TRUE),
            );
            if($_FILES['testimonials_image']['size'] > 0)
            {
               $testimonials_image = single_image_upload($_FILES['testimonials_image'],'./uploads/testimonials');
                // print_r($testimonials_image);exit();
               if(is_array($testimonials_image))
               {            
                 $this->session->set_flashdata('error', $testimonials_image);
               }
               else
               {
                $content['testimonials_image'] = $testimonials_image;
              }
            }
            $data['table'] = 'testimonials';  
            $this->general->insert($data,$content);        
            $this->session->set_flashdata('success', 'Added Successfully.');
            redirect('admin/testimonials');
        }
        else
        {        
            $content['title'] = 'Add Data';  
            $content['main_content'] = 'testimonials/add';           
            $this->load->view('admin/inc/view',$content);   
        } 
    }
    else
    { 
        $content['records']  = $this->db->get('category')->result();             
        $content['title'] = 'Sub Category';
        $content['title'] = 'Add Data';  
        $content['main_content'] = 'testimonials/add';           
        $this->load->view('admin/inc/view',$content); 
    } 
}

public function edit($id)
{ 
    if($_POST)
    {  
         $this->form_validation->set_rules('message', 'Message', 'trim');
         if (!$this->form_validation->run() == FALSE)
         {
            $content = array(
                'message' => $this->input->post('message',TRUE),
            );
            if($_FILES['testimonials_image']['size'] > 0)
            {
               $testimonials_image = single_image_upload($_FILES['testimonials_image'],'./uploads/testimonials');
                // print_r($testimonials_image);exit();
               if(is_array($testimonials_image))
               {            
                 $this->session->set_flashdata('error', $testimonials_image);
               }
               else
               {
                $content['testimonials_image'] = $testimonials_image;
              }
            }
            $this->db->where('testimonials_id',$id)->update('testimonials',$content);        
            $this->session->set_flashdata('success', 'Updated Successfully.');
            redirect('admin/testimonials');
        }
        else
        {        
            $content['record'] = $this->db->where(array('testimonials_status'=>'enable','testimonials_id'=>$id))->get('testimonials')->row();
            $content['title'] = 'Edit Data';
            $content['main_content'] = 'testimonials/edit';			
            $this->load->view('admin/inc/view',$content);   
        } 
    }
    else
    {   
        $content['record'] = $this->db->where(array('testimonials_status'=>'enable','testimonials_id'=>$id))->get('testimonials')->row();
        $content['title'] = 'Edit Data';
        $content['main_content'] = 'testimonials/edit';			
        $this->load->view('admin/inc/view',$content);   
        
        $content['title'] = 'Edit Data';
        
        $content['main_content'] = 'testimonials/edit';			
        $this->load->view('admin/inc/view',$content); 
    } 
    }
    public function delete($id)
    {
        $content = array(
            'testimonials_status' => 'disable',
        );    
        $this->db->where('testimonials_id',$id)->update('testimonials',$content);
        $this->session->set_flashdata('success', 'Delete Successfully.');
        redirect('admin/testimonials');
    } 
}

