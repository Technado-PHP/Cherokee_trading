<?php defined('BASEPATH') OR exit('No direct script access allowed');

class Contact_us extends Front_Controller {
	
	public function index()
	{
		$content['main_content'] = 'contactus';
		$this->load->view('front/inc/view',$content);
	}
	public function form_validate()
	{

        if ($this->input->post())
        {
            $this->form_validation->set_rules('name','Name','required');
            $this->form_validation->set_rules('email','Email','required|valid_email');
            $this->form_validation->set_rules('message','Message','required');
            if ($this->form_validation->run() == TRUE)
            {
                $content = array(
                    'name' =>$this->input->post('name',TRUE),
                    'email' =>$this->input->post('email',TRUE),
                    'message' =>$this->input->post('message',TRUE),
                );
//                print_r($content);exit();
                $data4 = array(
                    'table' =>'contact_us',
                );
                $res = $this->general->insert($data4,$content);
                if($res)
                {
                    $output['status'] = 'success';
                }
//                $section['subject'] = 'New Lead';
//                $section['body'] =  '
//				<b>Contact Leads</b> <br><br>
//
//				Name = '.$this->input->post('name').'<br>
//				Email = '.$this->input->post('email').'<br>
//				Message = '.$this->input->post('message').'<br>
//				';
//                $body = $this->load->view('front/email/template',$section, TRUE);
//                send_email('ubaid.rehman@technado.co',$this->site_title.'  New Lead',$body);

            }
            else
            {
                $result=$this->form_validation->error_array();
                $output['status']=$result;
            }
            echo json_encode($output);
        }
	}
}