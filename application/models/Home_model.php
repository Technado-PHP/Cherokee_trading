<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class Home_model extends CI_Model {

	public function home_page()
	{
		$this->db->select('*')
		->from('home_page')
		->where('home_page_id',1);
		return $this->db->get()->row();
	}
	public function categories()
	{
		$this->db->select('*')
		->from('category')
		->where('category_status','enable')
		->limit(7);
		return $this->db->get()->result(); 
	}

	public function footer_top_data()
	{
		$this->db->select('home_page_heading_two,home_page_sub_heading')
		->from('home_page')
		->where('home_page_id',1);
		return $this->db->get()->row();
	}
	public function brands()
	{
		$this->db->select('brand_image')
		->from('brand')
		->where('brand_status','enable');
		return $this->db->get()->result();
	}
	public function testimonials()
	{
		$this->db->select('*')
		->from('testimonials')
		->where('testimonials_status','enable');
		return $this->db->get()->result();
	}
	public function blogs()
	{
		$this->db->select('*')
		->from('blog')
		->where('blog_status','enable')
		->order_by('blog_id','ASC')
		->limit(3);	
		return $this->db->get()->result();
	}
	public function home_slider()
	{
		$this->db->select('*')
		->from('slider')
		->where('slider_status','enable');
		return $this->db->get()->result();
	}
	public function featured()
	{
		$this->db->select('*')
		->from('product')
		->where(array('featured_product'=>'Yes','product_status'=>'enable'));
		// ->order_by('rand()')
		// ->limit(5);
		return $this->db->get()->result();
	}
	public function best_seller()
	{
		$this->db->select('*')
		->from('product')
		->where(array('best_seller_product'=>'Yes','product_status'=>'enable'));
		// ->order_by('rand()')
		// ->limit(5);
		return $this->db->get()->result();
	}
	public function new_products()
	{
		$this->db->select('*')
		->from('product')
		->where(array('product_status'=>'enable'))
		->order_by('product_id','desc')
		->limit(10);
		return $this->db->get()->result();
	}
	public function newsletter($email)
	{
		$this->db->select('newsletter_id, newsletter_email, newsletter_status');
		$this->db->from('newsletter');
		$this->db->where(array('newsletter_status'=>'enable','newsletter_email'=>$email));
		return $this->db->get()->row();
		// print_r($prod);exit;
	}
	public function videos()
	{
		$this->db->select('*')
		->from('videos')
		->where(array('videos_status'=>'enable'))
		->order_by('videos_id','RANDOM')
		->limit(1);
		return $this->db->get()->result();
	}
	public function testimonial_videos()
	{
		$this->db->select('*')
		->from('testimonial_videos')
		->where(array('testimonial_videos_status'=>'enable'));
		return $this->db->get()->result();
	}
}