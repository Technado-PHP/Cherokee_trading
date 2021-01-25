<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class blog extends Admin_Controller 
{
    function __construct()
    {
        parent::__construct();
    }

    public function index()
    {
        $this->db->select('*')->from('blog')->where(array('blog_status'=>'enable'));
        $content['records']  = $this->db->get()->result();
        $content['title'] = 'All Data';

        $content['main_content'] = 'blog/list';
        $this->load->view('admin/inc/view',$content);
    }
        
    public function add()
    {
       if($_POST)
       {  
            $this->form_validation->set_rules('heading', 'Heading', 'trim');
            $this->form_validation->set_rules('short_desc', 'Short Description', 'trim');
            $this->form_validation->set_rules('long_desc', 'Long Description', 'trim');
            // $this->form_validation->set_rules('blog_slug', 'Sub Category Slug', 'trim');
    
            if (!$this->form_validation->run() == FALSE)
            {
                $content = array(
                    'heading' => $this->input->post('heading',TRUE),
                    'slug' => $this->input->post('slug',TRUE),
                    'short_desc' => $this->input->post('short_desc',TRUE),
                    'long_desc' => $this->input->post('long_desc',TRUE),
                );
                if($_FILES['blog_image']['size'] > 0)
                {
                   $blog_image = single_image_upload($_FILES['blog_image'],'./uploads/blog');
                    // print_r($blog_image);exit();
                   if(is_array($blog_image))
                   {            
                     $this->session->set_flashdata('error', $blog_image);
                   }
                   else
                   {
                    $content['blog_image'] = $blog_image;
                  }
                }
                $data['table'] = 'blog';  
                $this->general->insert($data,$content);        
                $this->session->set_flashdata('success', 'Added Successfully.');
                redirect('admin/blog');
            }
            else
            {        
                $content['title'] = 'Add Data';  
                $content['main_content'] = 'blog/add';           
                $this->load->view('admin/inc/view',$content);   
            } 
        }
        else
        { 
            $content['records']  = $this->db->get('category')->result();             
            $content['title'] = 'Sub Category';
            $content['title'] = 'Add Data';  
            $content['main_content'] = 'blog/add';           
            $this->load->view('admin/inc/view',$content); 
        } 
    }
    
    public function edit($id)
    { 
        if($_POST)
        {  
        $this->form_validation->set_rules('heading', 'Heading', 'trim');
        $this->form_validation->set_rules('short_desc', 'Short Description', 'trim');
        $this->form_validation->set_rules('long_desc', 'Long Description', 'trim');
         if (!$this->form_validation->run() == FALSE)
         {
            $content = array(
                'heading' => $this->input->post('heading',TRUE),
                'slug' => $this->input->post('slug',TRUE),
                'short_desc' => $this->input->post('short_desc',TRUE),
                'long_desc' => $this->input->post('long_desc',TRUE),
            );
            if($_FILES['blog_image']['size'] > 0)
            {
               $unlink = $this->db->where(['blog_status'=>'enable','blog_id'=>$id])->get('blog')->row();
               @unlink("./uploads/blog/".$unlink->blog_image);
               $blog_image = single_image_upload($_FILES['blog_image'],'./uploads/blog');
                // print_r($blog_image);exit();
               if(is_array($blog_image))
               {            
                 $this->session->set_flashdata('error', $blog_image);
               }
               else
               {
                $content['blog_image'] = $blog_image;
              }
            }
            $this->db->where('blog_id',$id)->update('blog',$content);        
            $this->session->set_flashdata('success', 'Updated Successfully.');
            redirect('admin/blog');
        }
        else
        {        
            $content['records']  = $this->db->get('category')->result();
    
            $this->db->select('*')->from('blog')->where(array('blog_status'=>'enable','blog_id'=>$id));
            $content['record']  = $this->db->get()->row();
    
            $content['title'] = 'Edit Data';
    
            $content['main_content'] = 'blog/edit';			
            $this->load->view('admin/inc/view',$content);   
        } 
    }
    else
    {   
        $content['records']  = $this->db->get('category')->result();
    
        $this->db->select('*')->from('blog')->where(array('blog_status'=>'enable','blog_id'=>$id));
        $content['record']  = $this->db->get()->row();
        
        $content['title'] = 'Edit Data';
        
        $content['main_content'] = 'blog/edit';			
        $this->load->view('admin/inc/view',$content); 
    } 
    }
    public function view($id)
    {
        $data['where'] = array('blog_id' => $id);		
        $data['table'] = 'blog';	
        $data['output_type'] = 'row';	
        $content['title'] = 'blog';	
        $content['record']  = $this->general->get($data);
        $content['main_content'] = 'blog/view';			
        $this->load->view('admin/inc/view',$content);

    }
    public function delete($id)
    {
        $content = array(
            'blog_status' => 'disable',
        );    
        $this->db->where('blog_id',$id)->update('blog',$content);
        $this->session->set_flashdata('success', 'Delete Successfully.');
        redirect('admin/blog');
    } 
}

