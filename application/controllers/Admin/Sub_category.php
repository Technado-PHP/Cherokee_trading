<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class Sub_category extends Admin_Controller 
{
    function __construct() 
    {
        parent::__construct();		
    }  

    public function index()
    {
        $this->db->select('*')->from('sub_category')
        ->join('category','category.category_id = sub_category.category_id','left')
        ->where(array('sub_category.sub_category_status'=>'enable'));
        $content['records']  = $this->db->get()->result();
        // print_r($content['records']);exit();
        $content['title'] = 'All Data';

        $content['main_content'] = 'sub_category/list';			
        $this->load->view('admin/inc/view',$content);   
    }
    
    public function add()
    {
       if($_POST)
       {  
        $this->form_validation->set_rules('sub_category_name', 'Sub Category Name', 'trim');
        // $this->form_validation->set_rules('sub_category_slug', 'Sub Category Slug', 'trim');

        if (!$this->form_validation->run() == FALSE)
        {
            $content = array(
                'category_id' => $this->input->post('category_id',TRUE),
                'sub_category_name' => $this->input->post('sub_category_name',TRUE),
                'sub_category_slug' => $this->input->post('sub_category_slug',TRUE),
            );
            if($_FILES['sub_category_image']['size'] > 0)
            {
               $sub_category_image = single_image_upload($_FILES['sub_category_image'],'./uploads/sub_category');
                // print_r($sub_category_image);exit();
               if(is_array($sub_category_image))
               {            
                 $this->session->set_flashdata('error', $sub_category_image);
               }
               else
               {
                $content['sub_category_image'] = $sub_category_image;
              }
            }
            $data['table'] = 'sub_category';  
            $this->general->insert($data,$content);        
            $this->session->set_flashdata('success', 'Added Successfully.');
            redirect('admin/sub_category');
        }
        else
        {        
            $content['title'] = 'Add Data';  
            $content['main_content'] = 'sub_category/add';           
            $this->load->view('admin/inc/view',$content);   
        } 
    }
    else
    { 
        $content['records']  = $this->db->get('category')->result();             
        $content['title'] = 'Sub Category';
        $content['title'] = 'Add Data';  
        $content['main_content'] = 'sub_category/add';           
        $this->load->view('admin/inc/view',$content); 
    } 
}

public function edit($id)
{ 
    if($_POST)
    {  
     $this->form_validation->set_rules('sub_category_name', 'Sub Category Name', 'trim');
     $this->form_validation->set_rules('sub_category_slug', 'Sub Category Slug', 'trim');
     if (!$this->form_validation->run() == FALSE)
     {
        $content = array(
            'category_id' => $this->input->post('category_id',TRUE),
            'sub_category_name' => $this->input->post('sub_category_name',TRUE),
            'sub_category_slug' => $this->slug->edit_slug('sub_category',$this->input->post('sub_category_slug',TRUE),$id),
        );
        if($_FILES['sub_category_image']['size'] > 0)
        {
           $sub_category_image = single_image_upload($_FILES['sub_category_image'],'./uploads/sub_category');
            // print_r($sub_category_image);exit();
           if(is_array($sub_category_image))
           {            
             $this->session->set_flashdata('error', $sub_category_image);
           }
           else
           {
            $content['sub_category_image'] = $sub_category_image;
          }
        }
        $this->db->where('sub_category_id',$id)->update('sub_category',$content);        
        $this->session->set_flashdata('success', 'Updated Successfully.');
        redirect('admin/sub_category');
    }
    else
    {        
        $content['records']  = $this->db->get('category')->result();

        $this->db->select('*')->from('sub_category')
        ->join('category','category.category_id = sub_category.category_id','left')
        ->where(array('sub_category.sub_category_status'=>'enable','sub_category.sub_category_id'=>$id));
        $content['record']  = $this->db->get()->row();

        $content['title'] = 'Edit Data';

        $content['main_content'] = 'sub_category/edit';			
        $this->load->view('admin/inc/view',$content);   
    } 
}
else
{   
    $content['records']  = $this->db->get('category')->result();

    $this->db->select('*')->from('sub_category')
    ->join('category','category.category_id = sub_category.category_id','left')
    ->where(array('sub_category.sub_category_status'=>'enable','sub_category.sub_category_id'=>$id));
    $content['record']  = $this->db->get()->row();
    
    $content['title'] = 'Edit Data';
    
    $content['main_content'] = 'sub_category/edit';			
    $this->load->view('admin/inc/view',$content); 
} 
}
public function delete($id)
{
    $content = array(
        'sub_category_status' => 'disable',
    );    
    $this->db->where('sub_category_id',$id)->update('sub_category',$content);
    $this->session->set_flashdata('success', 'Delete Successfully.');
    redirect('admin/sub_category');
} 
}

