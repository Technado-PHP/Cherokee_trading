<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class Blog_content extends Admin_Controller
{
    public function index()
    {
        if ($_POST) {
            // print_r($_POST);exit();
            $this->form_validation->set_rules('page_heading', 'Page Heading', 'trim|required');
            $this->form_validation->set_rules('section_two_heading', 'Page Heading Two','trim|required');
            $this->form_validation->set_rules('sub_heading', 'Page Sub Heading','trim|required');
            $this->form_validation->set_rules('section_two_text', 'Page Text','trim|required');
            $this->form_validation->set_rules('section_two_sub_heading', 'Sub Heaing','trim|required');
            // print_r($_POST);exit();          
            
            if (!$this->form_validation->run() == FALSE) {
                $content = array(
                    'page_heading' => $this->input->post('page_heading', TRUE),
                    'section_two_heading' => $this->input->post('section_two_heading', TRUE),
                    'sub_heading' => $this->input->post('sub_heading', TRUE),
                    'section_two_text' => $this->input->post('section_two_text', TRUE),
                    'section_two_sub_heading' => $this->input->post('section_two_sub_heading', TRUE),
                );
                $this->db->where('blog_content_id', 1)->update('blog_content', $content);
                $this->session->set_flashdata('success', 'Updated Successfully.');
                redirect('admin/blog_content');
            } else {
                
                $content['record'] = $this->db->where('blog_content_id', 1)->get('blog_content')->row();
                $content['title'] = 'Our Story Content';
                $content['main_content'] = 'blog_content/edit';
                $this->load->view('admin/inc/view', $content);
            }
        } else {
            $content['record'] = $this->db->where('blog_content_id', 1)->get('blog_content')->row();
            $content['title'] = 'Our Story Content';
            $content['main_content'] = 'blog_content/edit';
            $this->load->view('admin/inc/view', $content);
        }
    }
}