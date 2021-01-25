<?php 
defined('BASEPATH')OR exit('No direct script access allowed');
class Social_media extends Admin_Controller
{
	
	function __construct()
	{
		parent::__construct();
	}

    public function index(){ 	
        $content['title'] = 'All Data';
        $content['records'] = $this->db->where(['social_status'=>'enable'])->get('social_media')->result();
        $content['main_content'] = 'social_media/list';
        $this->load->view('admin/inc/view',$content);
    }

	public function edit($id)
	{
		if ($this->input->post()) 
		{
			$this->form_validation->set_rules('social_link','Link','required');
			// $this->form_validation->set_rules('social_icon','Link','required');
			if ($this->form_validation->run() == TRUE) 
			{
				$content = array(
					'social_link' =>$this->input->post('social_link',TRUE),
					// 'social_icon' =>$this->input->post('social_icon',TRUE),
				);
				$this->db->where('social_media_id',$id)->update('social_media',$content);
				$this->session->set_flashdata('msg','1');
				$this->session->set_flashdata('alert_data','Data Edited');
				redirect('admin/social_media/index');
			}
		}
		$content['record']=$this->db->where(['social_media_id'=>$id])->get('social_media')->row();
		$content['title']='Social Media';
		$content['main_content']='social_media/edit';
		$this->load->view('admin/inc/view',$content);
	}
}