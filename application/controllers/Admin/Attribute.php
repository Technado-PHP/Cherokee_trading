<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class Attribute extends Admin_Controller 
{
    function __construct() 
    {
        parent::__construct();		
    }  

    public function index()
    { 	
        $data['table'] = 'attribute';	
        $data['output_type'] = 'result';	
        $content['title'] = 'Attribute';			
        $content['records']  = $this->general->get($data);
        $content['main_content'] = 'attribute/list';			
        $this->load->view('admin/inc/view',$content);   
    }
    
    public function add()
    {
       if($_POST)
       {  
            $this->form_validation->set_rules('attribute_name', 'Attribute Name', 'trim|required|min_length[3]|max_length[300]');

            if (!$this->form_validation->run() == FALSE)
            {
                $content = array(
                    'attribute_name' => $this->input->post('attribute_name',TRUE),
                ); 

                $data['table'] = 'attribute';  
                $this->general->insert($data,$content);        
                $this->session->set_flashdata('success', 'Added Successfully.');
                redirect('admin/attribute');
            }
            else
            {        
                $content['title'] = 'Attribute ';  
                $content['main_content'] = 'attribute/add';           
                $this->load->view('admin/inc/view',$content);   
            } 
        }
        else
        {              

            $content['title'] = 'Attribute ';  
            $content['main_content'] = 'attribute/add';           
            $this->load->view('admin/inc/view',$content);   
        } 
    }

    public function edit($id)
    { 
        if($_POST)
        {  
            $this->form_validation->set_rules('attribute_name', 'Attribute Name', 'trim|required|min_length[3]|max_length[300]');
            if (!$this->form_validation->run() == FALSE)
            {
                 $content = array(
                    'attribute_name' => $this->input->post('attribute_name',TRUE),
                ); 

                $data['where'] = array('attribute_id' => $id);	
                $data['table'] = 'attribute';	
                $this->general->update($data,$content);        
                $this->session->set_flashdata('success', 'Updated Successfully.');
                redirect('admin/attribute');
            }
            else
            {        
                $data['where'] = array('attribute_id' => $id);		
                $data['table'] = 'attribute';	
                $data['output_type'] = 'row';	
                $content['title'] = 'Attribute';	
                $content['record']  = $this->general->get($data);
                $content['main_content'] = 'attribute/edit';			
                $this->load->view('admin/inc/view',$content);   
            } 
        }
        else
        {        		
            $data['where'] = array('attribute_id' => $id);		
            $data['table'] = 'attribute';	
            $data['output_type'] = 'row';	
            $content['title'] = 'Attribute';	
            $content['record']  = $this->general->get($data);
            $content['main_content'] = 'attribute/edit';			
            $this->load->view('admin/inc/view',$content);
        } 
    }
    public function view($id)
    {
        $data['where'] = array('attribute_id' => $id);		
        $data['table'] = 'attribute';	
        $data['output_type'] = 'row';	
        $content['title'] = 'Attribute';	
        $content['record']  = $this->general->get($data);
        $content['main_content'] = 'attribute/view';			
        $this->load->view('admin/inc/view',$content);


    }
    public function delete($id)
    {
        $content = array(
            'attribute_status' => 'disable',
            'attribute_updated_by' => '1'
        );    
        $data['where'] = array('attribute_id' => $id); 
        $data['table'] = 'attribute';  
        $this->general->update($data,$content);        
        $this->session->set_flashdata('success', 'Delete Successfully.');
        redirect('admin/attribute');
    } 
}

