<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class Category extends Admin_Controller 
{
    function __construct() 
    {
        parent::__construct();		
    }  

    public function index()
    { 		
        $content['title'] = 'All Data';
        $content['records']  = $this->db->where('category_status','enable')->get('category')->result();
        $content['main_content'] = 'category/list';
        $this->load->view('admin/inc/view',$content);   
    }
    public function add()
    {
       if($_POST)
       {  
            $this->form_validation->set_rules('category_name', 'Category Name', 'trim|required');

            if (!$this->form_validation->run() == FALSE)
            {
                $content = array(
                    'category_name' => $this->input->post('category_name',TRUE),
                    'category_slug' => $this->input->post('category_slug',TRUE),
                );

                $data['table'] = 'category';  
                $this->general->insert($data,$content);        
                $this->session->set_flashdata('success', 'Added Successfully.');
                redirect('admin/category');
            }
            else
            {        
                $content['title'] = 'Add Data';  
                $content['main_content'] = 'category/add';           
                $this->load->view('admin/inc/view',$content);   
            } 
        }
        else
        {              

            $content['title'] = 'Add Data';  
            $content['main_content'] = 'category/add';           
            $this->load->view('admin/inc/view',$content); 
        } 
    }

    public function edit($id)
    { 
        if($_POST)
        {  
            $this->form_validation->set_rules('category_name', 'Category Name', 'trim|required|min_length[3]|max_length[300]');
            if (!$this->form_validation->run() == FALSE)
            {
            $content = array(
                'category_name' => $this->input->post('category_name',TRUE),
                'category_slug' => $this->input->post('category_slug',TRUE),
            );
            $this->db->where('category_id',$id)->update('category',$content);
            $this->session->set_flashdata('success', 'Updated Successfully.');
            redirect('admin/category');
            }
            else
            {
                $content['title'] = 'Edit Data';
                $content['record']  = $this->db->where('category_id',$id)->get('category')->row();
                $content['main_content'] = 'category/edit';			
                $this->load->view('admin/inc/view',$content);   
            } 
        }
        else
        {
            $content['title'] = 'Edit Data';
            $content['record']  = $this->db->where('category_id',$id)->get('category')->row();
            $content['main_content'] = 'category/edit';			
            $this->load->view('admin/inc/view',$content); 
        } 
    }

    public function delete($id)
    {
        $content = array(
            'category_status' => 'disable',
        );
        $this->db->where('category_id',$id)->update('category',$content);
        $this->session->set_flashdata('success', 'Delete Successfully.');
        redirect('admin/category');
    } 
}

