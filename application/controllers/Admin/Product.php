<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class Product extends Admin_Controller {
    function __construct() {
        parent::__construct();		
    }  

    public function index(){ 	

        $content['records']  = $this->db->select('product.*,category.category_name')->from('product')
        ->join('category','product.category_id = category.category_id')
        ->where(['product.product_status'=>'enable'])->get()->result();

        $content['title'] = 'All Products';			
        $content['main_content'] = 'product/list';			
        $this->load->view('admin/inc/view',$content);   
    }

    public function add(){ 
        if($_POST){  
            // $this->form_validation->set_rules('product_shop', 'Shop', 'trim|required');
            // $this->form_validation->set_rules('product_wholesale', 'Wholesale', 'trim|required');
            // $this->form_validation->set_rules('product_name', 'Name', 'trim|required');
            // $this->form_validation->set_rules('product_reg_price', 'Regular Price', 'trim|required');
            // $this->form_validation->set_rules('product_short_desc', 'Product Short Content', 'trim|required');
            // $this->form_validation->set_rules('product_long_desc', 'Product Long Content', 'trim|required');
            // if (!$this->form_validation->run() == FALSE){

                $content = array(
                    'category_id' => $this->input->post('category_id',TRUE),
                    // 'sub_category_id' => $this->input->post('sub_category_id',TRUE),
                    // 'product_shop' => $this->input->post('product_shop',TRUE),
                    // 'product_wholesale' => $this->input->post('product_wholesale',TRUE),
                    'product_name' => $this->input->post('product_name',TRUE),
                    'product_slug' => $this->input->post('product_slug',TRUE),
                    'product_reg_price' => $this->input->post('product_reg_price',TRUE),
                    'product_dis_price' => $this->input->post('product_dis_price',TRUE),
                    'product_wholesale_price' => $this->input->post('product_wholesale_price',TRUE),
                    'product_short_desc' => $this->input->post('product_short_desc'),
                    'product_long_desc' => $this->input->post('product_long_desc'),

                );
                if($_FILES['product_image']['size'] > 0){
                    $image = single_image_upload($_FILES['product_image'],'./uploads/product');
                    if(is_array($image)){            
                        $this->session->set_flashdata('error', $image);
                    }else{
                        $content['product_image'] = $image;
                    }
                }
                // print_r($content);exit();
                $data['table'] = 'product';
                $id = $this->general->insert($data,$content);
                

                $content2 = [];
                $i = 0;
                $multi_image = $this->input->post('product_img_image',TRUE);

                if(!empty($multi_image) && is_array($multi_image)){
                    for($i=0; $i < count($multi_image); $i++){
                        $content2[$i]['product_id'] = $id;
                        $content2[$i]['product_img_image'] = $this->input->post('product_img_image',TRUE)[$i];
                    }
                }
                for($j=0; $j < count($_FILES['product_img_image']['tmp_name']); $j++){
                    if($_FILES['product_img_image']['size'][$j] > 0){
                        $image = multi_image_upload($_FILES['product_img_image'],$j,'./uploads/product_img');
                        if(is_array($image)){            
                            $this->session->set_flashdata('error', $image);
                        }else{
                            $content2[$j]['product_id'] = $id;
                            $content2[$j]['product_img_image'] = $image;
                        }
                    }
                }   

                if(!empty($content2)){
                    $data2['table'] = 'product_img'; 
                    $this->general->insert_batch($data2,$content2); 
                }
                
                $this->session->set_flashdata('success', 'Added Successfully.');
                redirect('admin/product');
            // }else{           

            //     $data['table'] = 'category';	
            //     // $data['join_table'] = 'sub_category';
            //     // $data['join'] = 'sub_category.category_id = category.category_id';
            //     // $data['join_type'] = 'left';
            //     $data['output_type'] = 'result';
            //     $content['records']  = $this->general->get($data);
            //     // $data = [];
            //     // $data['table'] = 'brand';    
            //     // $data['output_type'] = 'result';
            //     // $content['brands']  = $this->general->get($data); 
            //     $this->session->set_flashdata('error','Request Submit Failed');    
            //     $content['title'] = 'Product';  
            //     $content['main_content'] = 'product/add';          
            //     $this->load->view('admin/inc/view',$content); 
                
            // } 
        }else{              

            $data['table'] = 'category';	
            // $data['join_table'] = 'sub_category';
            // $data['join'] = 'sub_category.category_id = category.category_id';
            // $data['join_type'] = 'left';
            $data['output_type'] = 'result';
            $content['records']  = $this->general->get($data);            

            $content['title'] = 'Product';  
            $content['main_content'] = 'product/add';          
            $this->load->view('admin/inc/view',$content); 
        } 
    }  

    public function edit($id){ 
        if($_POST)
        {  
            // $this->form_validation->set_rules('product_shop', 'Shop', 'trim|required');
            // $this->form_validation->set_rules('product_wholesale', 'Wholesale', 'trim|required');
            $this->form_validation->set_rules('product_name', 'Name', 'trim|required|min_length[3]|max_length[128]');
            $this->form_validation->set_rules('product_reg_price', 'Regular Price', 'trim|required');
            $this->form_validation->set_rules('product_short_desc', 'Product Short Content', 'trim|required');
            $this->form_validation->set_rules('product_long_desc', 'Product Long Content', 'trim|required');
            $this->form_validation->set_rules('product_faq', 'Product FAQ Content', 'trim|required');
            // if (!$this->form_validation->run() == FALSE){
                $content = array(
                    'product_name' => $this->input->post('product_name',TRUE),
                    'category_id' =>$this->input->post('category_id'),
                    // 'sub_category_id' => implode (",", $sub_category_id),
                    'featured_product' => $this->input->post('featured_product',TRUE),
                    'special_product' => $this->input->post('special_product',TRUE),
                    'product_name' => $this->input->post('product_name',TRUE),
                    'product_slug' => $this->slug->edit_slug('product',$this->input->post('product_slug',TRUE),$id),
                    'product_reg_price' => $this->input->post('product_reg_price',TRUE),
                    'product_dis_price' => $this->input->post('product_dis_price',TRUE),
                    'product_wholesale_price' => $this->input->post('product_wholesale_price',TRUE),
                    'product_short_desc' => $this->input->post('product_short_desc'),
                    'product_long_desc' => $this->input->post('product_long_desc'),

                );
                if($_FILES['product_image']['size'] > 0)
                {
                    $unlink = $this->db->where(['product_status'=>'enable','product_id'=>$id])->get('product')->row();
                    @unlink("./uploads/product/".$unlink->product_image);
                    $image = single_image_upload($_FILES['product_image'],'./uploads/product');
                    if(is_array($image))
                    {            
                        $this->session->set_flashdata('error', $image);
                    }
                    else
                    {
                        $content['product_image'] = $image;
                    }
                } 
                                
                $data['where'] = array('product_id' => $id);
                $data['table'] = 'product';  
                $this->general->update($data,$content); 
                
                
                $content1['product_img_status'] = 'disable';
                $data1['where'] = array('product_img_status' => 'enable','product_id' => $id);       
                $data1['table'] = 'product_img'; 

                $this->general->update($data1,$content1);  

                $this->general->update($data,$content);
                $unlink = $this->db->where(['product_img_status'=>'enable','product_id'=>$id])->where_not_in('product_img_id',$this->input->post('product_img_id'))->get('product_img')->result();

                foreach($unlink as $key => $value)
                {
                    @unlink("./uploads/product_img/".$value->product_img_image);
                }

                $this->db->where(['product_img_status'=>'enable','product_id'=>$id])->where_not_in('product_img_id',$this->input->post('product_img_id'))->delete('product_img');

                $content2 = [];
                $i = 0;
                $multi_image = $this->input->post('product_img_image',TRUE);

                if(!empty($multi_image) && is_array($multi_image)){
                    for($i=0; $i < count($multi_image); $i++){
                        $content2[$i]['product_id'] = $id;
                        $content2[$i]['product_img_image'] = $this->input->post('product_img_image',TRUE)[$i];
                    }
                } 
                for($j=0; $j < count($_FILES['product_img_image']['tmp_name']); $j++){
                    if($_FILES['product_img_image']['size'][$j] > 0){
                        $image = multi_image_upload($_FILES['product_img_image'],$j,'./uploads/product_img');
                        if(is_array($image)){            
                            $this->session->set_flashdata('error', $image);
                        }else{
                            $content2[$j]['product_id'] = $id;
                            $content2[$j]['product_img_image'] = $image;

                        }
                    }
                }   

                if(!empty($content2)){                    
                    $data2['table'] = 'product_img'; 
                    $this->general->insert_batch($data2,$content2); 
                }
                
                $this->session->set_flashdata('success', 'Updated Successfully.');
                redirect('admin/product');
      
            // }
            // else
            // {        
            //     $data['where'] = array('product_id' => $id);       
            //     $data['table'] = 'product';  
            //     $data['output_type'] = 'row';   
            //     $content['title'] = 'Product';   
            //     $content['record']  = $this->general->get($data);
                
            //     $data = [];
 
            //     $content['images']  =  $this->db->where(['product_id'=>$id,'product_img_status'=>'enable'])->get('product_img')->result();

            //     $data = [];
            //     $data['table'] = 'category';	
            //     // $data['join_table'] = 'sub_category';
            //     // $data['join'] = 'sub_category.category_id = category.category_id';
            //     // $data['join_type'] = 'left';
            //     $data['output_type'] = 'result';
            //     $content['category']  = $this->general->get($data);
                
            //     $this->session->set_flashdata('error','Request Submit Failed');
            //     $error = validation_errors();
            //     $content['main_content'] = 'product/edit';           
            //     $this->load->view('admin/inc/view',$content); 
                
            // } 
        }
        else
        {              
            $data['where'] = array('product_id' => $id);       
            $data['table'] = 'product';  
            $data['output_type'] = 'row';   
            $content['title'] = 'Product';   
            $content['record']  = $this->general->get($data);
            
            $data = [];

            $content['images']  =  $this->db->where(['product_id'=>$id,'product_img_status'=>'enable'])->get('product_img')->result();

            $data = [];
            $data['table'] = 'category';	
            // $data['join_table'] = 'sub_category';
            // $data['join'] = 'sub_category.category_id = category.category_id';
            // $data['join_type'] = 'left';
            $data['output_type'] = 'result';
            $content['category']  = $this->general->get($data);

            $content['main_content'] = 'product/edit';           
            $this->load->view('admin/inc/view',$content);    
        } 
    }
    
    public function view($id)
    {

        $content['record']  =  $this->db->select('product.*,category.category_name')->from('product')
        ->join('category','product.category_id = category.category_id')
        ->where(['product.product_id'=>$id])->get()->row();

        $content['image']  = $this->db->where(['product_id'=>$id,'product_img_status'=>'enable'])->get('product_img')->result();

        $content['title'] = 'Product View';
        $content['main_content'] = 'product/view';
        $this->load->view('admin/inc/view',$content);
    }
    
    public function delete($id)
    {
        $content = array(
            'product_status' => 'disable',
        );    
        $data['where'] = array('product_id' => $id);       
        $data['table'] = 'product';  
        $this->general->update($data,$content); 
        $this->session->set_flashdata('success', 'Delete Successfully.');
        redirect('admin/product');
    }    

    // public function get_sub_cat()
    // {
        
    //     $data['where'] = array('category_id' => $this->input->post('id',TRUE));       
    //     $data['table'] = 'sub_category';  
    //     $sub_category = $this->general->get($data);
    //     echo '<option selected value="">Please Select</option>';
    //     foreach($sub_category as $sc){
    //         echo '<option value="'.$sc['sub_category_id'].'">'.$sc['sub_category_name'].'</option>';
    //     }
    //     return;
    // }    
}