<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class Our_story extends Admin_Controller
{
    public function index()
    {
        if ($_POST) {
            // print_r($_POST);exit();
            $this->form_validation->set_rules('banner_heading', 'Banner Heading', 'trim|required');
            $this->form_validation->set_rules('section_one_heading', 'Section One Heading','trim|required');
            $this->form_validation->set_rules('section_one_text', 'Section One Sub Heading','trim|required');
            $this->form_validation->set_rules('section_two_heading', 'Section Two Heading','trim|required');
            $this->form_validation->set_rules('section_two_text', 'Section Two Sub Heading','trim|required');
            $this->form_validation->set_rules('section_three_heading', 'Section Three Heading','trim|required');
            $this->form_validation->set_rules('section_three_sub_heading', 'Section Three Sub Heading','trim|required');
            $this->form_validation->set_rules('section_three_text', 'Section Three Text', 'trim|required');
            $this->form_validation->set_rules('section_four_heading', 'Section Four Heading', 'trim|required');
            $this->form_validation->set_rules('image_one_heading', 'Image One Heading', 'trim|required');
            $this->form_validation->set_rules('image_one_text', 'Image One Text', 'trim|required');
            $this->form_validation->set_rules('image_two_heading', 'Image Two Heading', 'trim|required');
            $this->form_validation->set_rules('image_two_text', 'Image Two Text', 'trim|required');
            $this->form_validation->set_rules('image_three_heading', 'Image Three Heading', 'trim|required');
            $this->form_validation->set_rules('image_three_text', 'Image Three Text', 'trim|required');
            $this->form_validation->set_rules('image_five_heading', 'Image Five Heading', 'trim|required');
            $this->form_validation->set_rules('image_five_text', 'Image Five Text', 'trim|required');
            $this->form_validation->set_rules('image_six_heading', 'Image Six Heading', 'trim|required');
            $this->form_validation->set_rules('image_six_text', 'Image Six Text', 'trim|required');
            // print_r($_POST);exit();          
            
            if (!$this->form_validation->run() == FALSE) {
                $content = array(
                    'banner_heading' => $this->input->post('banner_heading', TRUE),
                    'section_one_heading' => $this->input->post('section_one_heading', TRUE),
                    'section_one_text' => $this->input->post('section_one_text', TRUE),

                    'icon_one_heading' => $this->input->post('icon_one_heading', TRUE),
                    'icon_two_heading' => $this->input->post('icon_two_heading', TRUE),
                    'icon_three_heading' => $this->input->post('icon_three_heading', TRUE),
                    'icon_four_heading' => $this->input->post('icon_four_heading', TRUE),

                    'section_two_heading' => $this->input->post('section_two_heading', TRUE),
                    'section_two_text' => $this->input->post('section_two_text', TRUE),
                    'section_three_heading' => $this->input->post('section_three_heading', TRUE),
                    'section_three_sub_heading' => $this->input->post('section_three_sub_heading', TRUE),
                    'section_three_text' => $this->input->post('section_three_text', TRUE),
                    'section_four_heading' => $this->input->post('section_four_heading', TRUE),

                    'image_one_heading' => $this->input->post('image_one_heading', TRUE),
                    'image_one_text' => $this->input->post('image_one_text', TRUE),
                    'image_two_heading' => $this->input->post('image_two_heading', TRUE),
                    'image_two_text' => $this->input->post('image_two_text', TRUE),
                    'image_three_heading' => $this->input->post('image_three_heading', TRUE),
                    'image_three_text' => $this->input->post('image_three_text', TRUE),

                    'image_five_heading' => $this->input->post('image_five_heading', TRUE),
                    'image_five_text' => $this->input->post('image_five_text', TRUE),
                    'image_six_heading' => $this->input->post('image_six_heading', TRUE),
                    'image_six_text' => $this->input->post('image_six_text', TRUE),
                );
                $unlink = $this->db->where(['our_story_id'=>1])->get('our_story')->row();
                // print_r($content);exit();
                if ($_FILES['banner_image']['size'] > 0) {
                    @unlink("./uploads/our_story/".$unlink->banner_image);

                    $banner_image = single_image_upload($_FILES['banner_image'], './uploads/our_story');
                    // print_r($page_video);exit();
                    if (is_array($banner_image)) {
                        $this->session->set_flashdata('error', $banner_image);
                    } else {
                        $content['banner_image'] = $banner_image;
                    }
                }
                if ($_FILES['image_one']['size'] > 0) {
                    @unlink("./uploads/our_story/".$unlink->image_one);
                    $image_one = single_image_upload($_FILES['image_one'], './uploads/our_story');
                    // print_r($image_one);exit();
                    if (is_array($image_one)) {
                        $this->session->set_flashdata('error', $image_one);
                    } else {
                        $content['image_one'] = $image_one;
                    }
                }
                if ($_FILES['image_two']['size'] > 0) {
                    @unlink("./uploads/our_story/".$unlink->image_two);
                    $image_two = single_image_upload($_FILES['image_two'], './uploads/our_story');
                    if (is_array($image_two)) {
                        $this->session->set_flashdata('error', $image_two);
                    } else {
                        $content['image_two'] = $image_two;
                    }
                }
                
                if ($_FILES['image_three']['size'] > 0) {
                    @unlink("./uploads/our_story/".$unlink->image_three);
                    $image_three = single_image_upload($_FILES['image_three'], './uploads/our_story');
                    if (is_array($image_three)) {
                        // print_r($image_three);exit;
                        $this->session->set_flashdata('error', $image_three);
                    } else {
                        $content['image_three'] = $image_three;
                    }
                }

                if ($_FILES['image_four']['size'] > 0) {
                    @unlink("./uploads/our_story/".$unlink->image_four);
                    $image_four = single_image_upload($_FILES['image_four'], './uploads/our_story');
                    if (is_array($image_four)) {
                        $this->session->set_flashdata('error', $image_four);
                    } else {
                        $content['image_four'] = $image_four;
                    }
                }

                if ($_FILES['icon_one_image']['size'] > 0) {
                    @unlink("./uploads/our_story/".$unlink->icon_one_image);
                    $icon_one_image = single_image_upload($_FILES['icon_one_image'], './uploads/our_story');
                    if (is_array($icon_one_image)) {
                        $this->session->set_flashdata('error', $icon_one_image);
                    } else {
                        $content['icon_one_image'] = $icon_one_image;
                    }
                }

                if ($_FILES['icon_two_image']['size'] > 0) {
                    @unlink("./uploads/our_story/".$unlink->icon_two_image);
                    $icon_two_image = single_image_upload($_FILES['icon_two_image'], './uploads/our_story');
                    if (is_array($icon_two_image)) {
                        $this->session->set_flashdata('error', $icon_two_image);
                    } else {
                        $content['icon_two_image'] = $icon_two_image;
                    }
                }

                if ($_FILES['icon_three_image']['size'] > 0) {
                    @unlink("./uploads/our_story/".$unlink->icon_three_image);
                    $icon_three_image = single_image_upload($_FILES['icon_three_image'], './uploads/our_story');
                    if (is_array($icon_three_image)) {
                        $this->session->set_flashdata('error', $icon_three_image);
                    } else {
                        $content['icon_three_image'] = $icon_three_image;
                    }
                }
                
                if ($_FILES['icon_four_image']['size'] > 0) {
                    @unlink("./uploads/our_story/".$unlink->icon_four_image);
                    $icon_four_image = single_image_upload($_FILES['icon_four_image'], './uploads/our_story');
                    if (is_array($icon_four_image)) {
                        $this->session->set_flashdata('error', $icon_four_image);
                    } else {
                        $content['icon_four_image'] = $icon_four_image;
                    }
                }

                if ($_FILES['image_five']['size'] > 0) {
                    @unlink("./uploads/our_story/".$unlink->image_five);
                    $image_five = single_image_upload($_FILES['image_five'], './uploads/our_story');
                    if (is_array($image_five)) {
                        $this->session->set_flashdata('error', $image_five);
                    } else {
                        $content['image_five'] = $image_five;
                    }
                }
                
                if ($_FILES['image_six']['size'] > 0) {
                    @unlink("./uploads/our_story/".$unlink->image_six);
                    $image_six = single_image_upload($_FILES['image_six'], './uploads/our_story');
                    if (is_array($image_six)) {
                        $this->session->set_flashdata('error', $image_six);
                    } else {
                        $content['image_six'] = $image_six;
                    }
                }
                
                if ($_FILES['image_seven']['size'] > 0) {
                    @unlink("./uploads/our_story/".$unlink->image_seven);
                    $image_seven = single_image_upload($_FILES['image_seven'], './uploads/our_story');
                    if (is_array($image_seven)) {
                        $this->session->set_flashdata('error', $image_seven);
                    } else {
                        $content['image_seven'] = $image_seven;
                    }
                }
                
                if ($_FILES['image_eight']['size'] > 0) {
                    @unlink("./uploads/our_story/".$unlink->image_eight);
                    $image_eight = single_image_upload($_FILES['image_eight'], './uploads/our_story');
                    if (is_array($image_eight)) {
                        // print_r($image_eight);exit;
                        $this->session->set_flashdata('error', $image_eight);
                    } else {
                        $content['image_eight'] = $image_eight;
                    }
                }
                
                if ($_FILES['image_nine']['size'] > 0) {
                    @unlink("./uploads/our_story/".$unlink->image_nine);
                    $image_nine = single_image_upload($_FILES['image_nine'], './uploads/our_story');
                    if (is_array($image_nine)) {
                        $this->session->set_flashdata('error', $image_nine);
                    } else {
                        $content['image_nine'] = $image_nine;
                    }
                }
                $this->db->where('our_story_id', 1)->update('our_story', $content);
                $this->session->set_flashdata('success', 'Updated Successfully.');
                redirect('admin/our_story');
            } else {
                
                $content['record'] = $this->db->where('our_story_id', 1)->get('our_story')->row();
                $content['title'] = 'Our Story Content';
                $content['main_content'] = 'our_story/edit';
                $this->load->view('admin/inc/view', $content);
            }
        } else {
            $content['record'] = $this->db->where('our_story_id', 1)->get('our_story')->row();
            $content['title'] = 'Our Story Content';
            $content['main_content'] = 'our_story/edit';
            $this->load->view('admin/inc/view', $content);
        }
    }
}