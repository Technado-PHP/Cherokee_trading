<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class Variant extends Admin_Controller 
{
    function __construct() 
    {
        parent::__construct();		
    }  

    public function index()
    { 	
        $content['records'] = $this->db->select('variant.*,attribute.attribute_id,attribute.attribute_name')
        ->from('variant')
        ->join('attribute','attribute.attribute_id = variant.attribute_id')
        ->where(['variant.variant_status'=>'enable'])->get()->result();
        $content['title'] = 'Variant';
        $content['main_content'] = 'variant/list';
        $this->load->view('admin/inc/view',$content);
    }
    
    public function add()
    {
       if($_POST)
       {  
            $this->form_validation->set_rules('variant_name', 'Variant Name', 'trim|required|min_length[3]|max_length[300]');
           
            if (!$this->form_validation->run() == FALSE)
            {
                $content = array(
                    'variant_name' => $this->input->post('variant_name',TRUE),
                    'attribute_id' => $this->input->post('attribute_id',TRUE),
                ); 

                $data['table'] = 'variant';  
                $this->general->insert($data,$content);        
                $this->session->set_flashdata('success', 'Added Successfully.');
                redirect('admin/variant');
            }
            else
            {   
                $data['table'] = 'attribute';	
                $data['output_type'] = 'result';
                $content['attribute']  = $this->general->get($data);
                $content['title'] = 'Variant';  
                $content['main_content'] = 'variant/add';           
                $this->load->view('admin/inc/view',$content);   
            } 
        }
        else
        { 
            $data['table'] = 'attribute';	
            $data['output_type'] = 'result';
            $content['attribute']  = $this->general->get($data);
            $content['title'] = 'Variant';  
            $content['main_content'] = 'variant/add';           
            $this->load->view('admin/inc/view',$content);   
        } 
    }

    public function edit($id)
    { 
        if($_POST)
        {  
            $this->form_validation->set_rules('variant_name', 'Variant Name', 'trim|required|min_length[3]|max_length[300]');
            if (!$this->form_validation->run() == FALSE)
            {
                 $content = array(
                    'variant_name' => $this->input->post('variant_name',TRUE),
                    'attribute_id' => $this->input->post('attribute_id',TRUE),
                ); 

                $data['where'] = array('variant_id' => $id);	
                $data['table'] = 'variant';	
                $this->general->update($data,$content);        
                $this->session->set_flashdata('success', 'Updated Successfully.');
                redirect('admin/variant');
            }
            else
            {        
                $data['where'] = array('variant_id' => $id);		
                $data['table'] = 'variant';	
                $data['join_table'] = 'attribute';	
                $data['join'] = 'attribute.attribute_id=variant.attribute_id';	
                $data['join_type'] = 'left';	
                $data['output_type'] = 'row';	
                $content['title'] = 'Variant';	
                $content['record']  = $this->general->get($data);
                
                $data1['table'] = 'attribute';	
                $data1['output_type'] = 'result';
                $content['attribute']  = $this->general->get($data1);
                
                $content['main_content'] = 'variant/edit';			
                $this->load->view('admin/inc/view',$content);   
            } 
        }
        else
        {        		  
            $data['where'] = array('variant_id' => $id);		
            $data['table'] = 'variant';	
            $data['join_table'] = 'attribute';	
            $data['join'] = 'attribute.attribute_id=variant.attribute_id';	
            $data['join_type'] = 'left';	
            $data['output_type'] = 'row';	
            $content['title'] = 'Variant';	
            $content['record']  = $this->general->get($data);
                
            $data1['table'] = 'attribute';	
            $data1['output_type'] = 'result';
            $content['attribute']  = $this->general->get($data1);
                
            $content['main_content'] = 'variant/edit';			
            $this->load->view('admin/inc/view',$content);   
        } 
    }
    // public function view($id)
    // {
    //     $data['table'] = 'variant';	
    //     $data['join_table'] = 'attribute';	
    //     $data['join'] = 'attribute.attribute_id=variant.attribute_id';	
    //     $data['join_type'] = 'left';	
    //     $data['output_type'] = 'result';	
    //     $data['where'] = array('variant_id' => $id);		
    //     $content['title'] = 'Variant';			
    //     $content['records']  = $this->general->get($data);
    //     $content['main_content'] = 'variant/view';			
    //     $this->load->view('admin/inc/view',$content);
    // }
    public function delete($id)
    {
        $content = array(
            'variant_status' => 'disable',
            'variant_updated_by' => '1'
        );    
        $data['where'] = array('variant_id' => $id); 
        $data['table'] = 'variant';  
        $this->general->update($data,$content);        
        $this->session->set_flashdata('success', 'Delete Successfully.');
        redirect('admin/variant');
    } 
}

