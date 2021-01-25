<?php
defined('BASEPATH') OR exit('No direct script access allowed'); 


$link = explode('/',(isset($_SERVER['HTTPS']) ? "https" : "http") . "://$_SERVER[HTTP_HOST]$_SERVER[REQUEST_URI]");
if($link[4] == 'admin'){  
  $this->set_directory( "Admin" );

  $request = $this->uri->segment(2);
  if(!empty($request) && strpos($request,'-')){ 
    $route['admin/'.$request.''] = str_replace('-','_',$request);
    $route['admin/'.$request.'/(:any)'] = str_replace('-','_',$request).'/$1';
    $route['admin/'.$request.'/(:any)/(:any)'] = str_replace('-','_',$request).'/$1/$2';
  }
  $route['admin/logout'] = 'login/logout'; 
  $route['admin/forgot-password'] = 'login/forgot_password'; 
  $route['admin/reset-password/(:any)'] = 'login/reset_password/$1';
  $route['admin/(:any)'] = '$1'; 
  $route['admin/(:any)/(:any)'] = '$1/$2'; 
  $route['admin/(:any)/(:any)/(:any)'] = '$1/$2/$3'; 
  $route['admin/(:any)/(:any)/(:any)/(:any)'] = '$1/$2/$3/$4'; 
  $route['admin'] = 'dashboard';
  $route['default_controller'] = 'front';
  $route['404_override'] = '';
  $route['translate_uri_dashes'] = FALSE;
}else{ 
  $this->set_directory( "Front" );

  //-------------------------------------------------Authentication------------------------------------------------------------
  
  $route['user-authentication'] = 'login/user_authentication';

  //-----------------------------------------------------Pages-----------------------------------------------------------------

  // $route['my-account'] = 'dashboard';

  $route['wholesale-cart'] = 'wholesale_cart/index';
  $route['proceed-checkout'] = 'cart/proceed_checkout';
  $route['checkout-cart'] = 'cart/checkout';
  $route['update-cart-discount'] = 'cart/updateCartDiscount';
  $route['comapare'] = 'comapare';
  $route['wishlist'] = 'wishlist';
  $route['error'] = 'error_404';
  $route['customer-login'] = 'login';
  $route['wholesale-login'] = 'wholesale_login';
  $route['wholesale-form'] = 'wholesale_login/wholesale_login_form';
  $route['logout'] = 'login/logout';
  $route['wholesale-logout'] = 'wholesale_login/wholesale_logout';
  $route['customer-signup'] = 'register';
  $route['wholesale-signup'] = 'wholesale_signup/wholesale_signup_form';
  $route['customer-dashboard'] = 'dashboard';
  $route['wholesale-dashboard'] = 'wholesale_dashboard';
  $route['success'] = 'success';  
  $route['forgot-password'] = 'login/forget_password';
  $route['reset-password/(:any)'] = 'login/reset_password/$1';
  $route['order-overview'] = 'orderoverview';
  $route['add-to-cart'] = 'cart/add_to_cart';
  
  $route['invoice/(:any)'] = 'home/invoice/$1';
  $route['order-invoice/(:any)'] = 'home/invoice/$1';
  $route['my-account'] = 'my_account';
  $route['password'] = 'dashboard/password';
  $route['category/(:any)'] = 'category/index/$1';
  $route['sub-category/(:any)'] = 'sub_category/index/$1';  
  $route['product/comments'] = 'product/comments'; 
  $route['product/notification'] = 'product/notification'; 
  $route['product/(:any)'] = 'product/index/$1';

  $route['privacy-policy'] = 'privacy_policy';
  $route['terms'] = 'terms';
  $route['about'] = 'about';
  $route['shipping'] = 'shipping';
  $route['shipping-returns'] = 'shipping_return';
  $route['out-story'] = 'our_story';
  $route['refund-policy'] = 'returns';
  $route['contact-us'] = 'contact_us';
  // $route['blog-main/(:any)'] = 'blog_main/index/$1';
  $route['limited-warranty'] = 'warranty';
  $route['videos'] = 'videos';
  $route['events'] = 'events';
  $route['gallery'] = 'gallery';
  $route['videos'] = 'videos';
  $route['search'] = 'search/index';
  $route['newsletter'] = 'home/newsletter';
  $route['pages-info/(:any)'] = 'pages/index/$1';
  // $route['pages-info/about-resistance-tubing'] = 'pages';



  $route['faq'] = 'FAQ';
  $route['activate-redeem-faqs'] = 'FAQ2';
  $route['gift-certificate-store-faqs'] = 'FAQ3';


  // $route['blog'] = 'blog';
  // $route['blog-detail/(:any)'] = 'blog_detail/index/$1';

  $route['wholesale'] = 'wholesale';
  $route['wholesale-detail/(:any)'] = 'wholesale_detail/index/$1';
  

  $route['shop'] = 'shop/index';
  $route['shop-detail/(:any)'] = 'product_detail/index/$1';
  // $route['delivery-information'] = 'delivery';

  //by default home route  
  $route['default_controller'] = 'home';
  $route['404_override'] = '';
  $route['translate_uri_dashes'] = FALSE;
}






