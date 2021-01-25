<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class About extends Admin_Controller
{
    public function index()
    {
        if ($_POST) {
            // print_r($_POST);exit();
            $this->form_validation->set_rules('banner_heading', 'Banner Heading', 'trim|required');
            $this->form_validation->set_rules('page_text', 'Page Text','trim|required');
            // print_r($_POST);exit();          
            
            if (!$this->form_validation->run() == FALSE) {
                $content = array(
                    'banner_heading' => $this->input->post('banner_heading', TRUE),
                    'page_text' => $this->input->post('page_text', TRUE),
                );
                $unlink = $this->db->where(['about_id'=>1])->get('about')->row();
                // print_r($content);exit();
                if ($_FILES['banner_image']['size'] > 0) {
                    @unlink("./uploads/about/".$unlink->banner_image);

                    $banner_image = single_image_upload($_FILES['banner_image'], './uploads/about');
                    // print_r($page_video);exit();
                    if (is_array($banner_image)) {
                        $this->session->set_flashdata('error', $banner_image);
                    } else {
                        $content['banner_image'] = $banner_image;
                    }
                }
                if ($_FILES['page_image']['size'] > 0) {
                    @unlink("./uploads/about/".$unlink->page_image);
                    $page_image = single_image_upload($_FILES['page_image'], './uploads/about');
                    // print_r($image_one);exit();
                    if (is_array($page_image)) {
                        $this->session->set_flashdata('error', $page_image);
                    } else {
                        $content['page_image'] = $page_image;
                    }
                }
                $this->db->where('about_id', 1)->update('about', $content);
                $this->session->set_flashdata('success', 'Updated Successfully.');
                redirect('admin/about');
            } else {
                
                $content['record'] = $this->db->where('about_id', 1)->get('about')->row();
                $content['title'] = 'Edit Data';
                $content['main_content'] = 'about/edit';
                $this->load->view('admin/inc/view', $content);
            }
        } else {
            $content['record'] = $this->db->where('about_id', 1)->get('about')->row();
            $content['title'] = 'Edit Data';
            $content['main_content'] = 'about/edit';
            $this->load->view('admin/inc/view', $content);
        }
    }
}