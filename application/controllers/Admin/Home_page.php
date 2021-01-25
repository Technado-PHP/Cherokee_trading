<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class Home_page extends Admin_Controller
{
    public function index()
    {
        if ($_POST) {
            // print_r($_POST);exit();
            $this->form_validation->set_rules('banner_heading', 'Banner Heading', 'trim|required');
            $this->form_validation->set_rules('banner_text', 'Banner Sub Heading','trim|required');
            // print_r($_POST);exit();          
            
            if (!$this->form_validation->run() == FALSE) {
                $content = array(
                    'banner_heading' => $this->input->post('banner_heading', TRUE),
                    'banner_text' => $this->input->post('banner_text', TRUE),
                );
                $unlink = $this->db->where(['home_page_id'=>1])->get('home_page')->row();
                // print_r($content);exit();
                if ($_FILES['banner_image']['size'] > 0) {
                    @unlink("./uploads/home_page/".$unlink->banner_image);

                    $banner_image = single_image_upload($_FILES['banner_image'], './uploads/home_page');
                    // print_r($page_video);exit();
                    if (is_array($banner_image)) {
                        $this->session->set_flashdata('error', $banner_image);
                    } else {
                        $content['banner_image'] = $banner_image;
                    }
                }
                $this->db->where('home_page_id', 1)->update('home_page', $content);
                $this->session->set_flashdata('success', 'Updated Successfully.');
                redirect('admin/home_page');
            } else {
                
                $content['record'] = $this->db->where('home_page_id', 1)->get('home_page')->row();
                $content['title'] = 'Edit Data';
                $content['main_content'] = 'home_page/edit';
                $this->load->view('admin/inc/view', $content);
            }
        } else {
            $content['record'] = $this->db->where('home_page_id', 1)->get('home_page')->row();
            $content['title'] = 'Edit Data';
            $content['main_content'] = 'home_page/edit';
            $this->load->view('admin/inc/view', $content);
        }
    }
}