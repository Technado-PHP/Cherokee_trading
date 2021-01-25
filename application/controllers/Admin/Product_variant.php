<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class Product_variant extends Admin_Controller 
{
    function __construct() 
    {
        parent::__construct();      
    }  

    public function index()
    {   
        $content['records'] = $this->db->select('pv.*,p.product_id,p.product_name,a.attribute_id,a.attribute_name,v.variant_id,v.variant_name')
        ->from('product_variant pv')
        ->join('product p','p.product_id = pv.product_id')
        ->join('attribute a','a.attribute_id = pv.attribute_id')
        ->join('variant v','v.variant_id = pv.variant_id')->get()->result();
        $content['title'] = 'Product variant';
        $content['main_content'] = 'product_variant/list';          
        $this->load->view('admin/inc/view',$content);   
    }
    public function add()
    {
       if($_POST)
       {  
        $this->form_validation->set_rules('product_id', 'Product Name', 'trim|required|integer|min_length[1]|max_length[11]');
        $this->form_validation->set_rules('attribute_id', 'Attribute Name', 'trim|required|integer|min_length[1]|max_length[11]');
        $this->form_validation->set_rules('variant_id', 'Variant Name', 'trim|required|integer|min_length[1]|max_length[11]');
        $this->form_validation->set_rules('product_variant_price', 'Variant Price', 'trim|required|numeric|min_length[1]|max_length[50]');

        if (!$this->form_validation->run() == FALSE)
        {
            $content = array(
                'product_id' => $this->input->post('product_id',TRUE),
                'attribute_id' => $this->input->post('attribute_id',TRUE),
                'variant_id' => $this->input->post('variant_id',TRUE),
                'product_variant_price' => $this->input->post('product_variant_price',TRUE),
            ); 
            $data['table'] = 'product_variant';  
            $this->general->insert($data,$content);        
            $this->session->set_flashdata('success', 'Added Successfully.');
            redirect('admin/product_variant');
        }
        else
        {        
            $content['products']  = $this->db->where(['product_shop'=>'1'])->get('product')->result(); 
            $content['attributes']  = $this->db->where(['attribute_status'=>'enable'])->get('attribute')->result(); 
            $content['title'] = 'Product variant';
            $content['main_content'] = 'product_variant/add';           
            $this->load->view('admin/inc/view',$content); 
        } 
    }
    else
    { 
        $content['products']  = $this->db->where(['product_shop'=>'1'])->get('product')->result(); 
        $content['attributes']  = $this->db->where(['attribute_status'=>'enable'])->get('attribute')->result(); 
        $content['title'] = 'Product variant';
        $content['main_content'] = 'product_variant/add';           
        $this->load->view('admin/inc/view',$content); 
    } 
}
    
    public function edit($id)
    { 
        if($_POST)
        {  
            $this->form_validation->set_rules('product_id', 'Product Name', 'trim|required|integer|min_length[1]|max_length[11]');
            $this->form_validation->set_rules('attribute_id', 'Attribute Name', 'trim|required|integer|min_length[1]|max_length[11]');
            $this->form_validation->set_rules('variant_id', 'Variant Name', 'trim|required|integer|min_length[1]|max_length[11]');
            $this->form_validation->set_rules('product_variant_price', 'Variant Price', 'trim|required|numeric|min_length[1]|max_length[50]');
            
            if (!$this->form_validation->run() == FALSE)
            {
                $content = array(
                    'product_id' => $this->input->post('product_id',TRUE),
                    'attribute_id' => $this->input->post('attribute_id',TRUE),
                    'variant_id' => $this->input->post('variant_id',TRUE),
                    'product_variant_price' => $this->input->post('product_variant_price',TRUE),
                ); 
    
                $data['where'] = array('product_variant_id' => $id);    
                $data['table'] = 'product_variant'; 
                $this->general->update($data,$content);        
                $this->session->set_flashdata('success', 'Updated Successfully.');
                redirect('admin/product_variant');
            }
            else
            {        
                $content['record'] = $this->general->get_list('product_variant',array('product_variant_id'=>$id));
                $content['main_content'] = 'product_variant/edit';          
                $this->load->view('admin/inc/view',$content); 
            } 
        }
        else
        {   

                $content['record'] = $this->general->get_list('product_variant',array('product_variant_id'=>$id));
                $content['main_content'] = 'product_variant/edit';          
                $this->load->view('admin/inc/view',$content); 
            } 
        }
   
    public function view($id)
    {
        $content['record'] = $this->general->get_list('product_variant',array('product_variant_id'=>$id));
        $content['main_content'] = 'product_variant/view';          
        $this->load->view('admin/inc/view',$content);
    }
   
    public function delete($id)
    {
        $content = array(
            'product_variant_status' => 'disable',
        );
        $this->db->where('product_variant_id',$id)->update('product_variant',$content);
        $this->session->set_flashdata('success', 'Deleted Successfully.');
        redirect('admin/product_variant');
    }
    
    public function enable($id)
    {
        $content = array(
            'product_variant_status' => 'enable',
        );
        $this->db->where('product_variant_id',$id)->update('product_variant',$content);
        $this->session->set_flashdata('success', 'Enabled Successfully.');
        redirect('admin/product_variant');
    } 
    
    public function get_variant()
    {
        
        $data['where'] = array('attribute_id' => $this->input->post('id',TRUE));       
        $data['table'] = 'variant';  
        $variant = $this->general->get($data);
        echo '<option selected value="">Please Select</option>';
        foreach($variant as $sc){
            echo '<option value="'.$sc['variant_id'].'">'.$sc['variant_name'].'</option>';
        }
        return;
    }    
}

