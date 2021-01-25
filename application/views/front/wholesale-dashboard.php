<?php include 'inc/header.php'; ?>
<style>
  /*DashBoard*/
/**/
.tab-wrapper-dashboard .nav-pills .nav-link {
    font-weight: 700;
    padding: 10px 29px;
    text-transform: uppercase;
    text-decoration: none;
    letter-spacing: 0.05em;
    font-size: 18px;
    box-shadow: inset 0 0 0 0 transparent;
    transition: all ease 0.4s;
    display: block;
    text-align: center;
    background: transparent;
    margin-bottom: 5%;
    border: 2px solid #4e4e4e;
    border-radius: 15px;
}

.tab-wrapper-dashboard .nav-pills .nav-link.active, .nav-pills .show>.nav-link {
    color: #fff;
    background-color: var(--redclr) !important;
    border-color: var(--redclr) !important;
}
.dashBoard a {
    text-decoration: none !important;
    color: var(--redclr);
}

.dashBoardH4 {
    margin-top: 0;
    font-size: 30px;
    border-bottom: 2px solid var(--redclr);
    padding-bottom: 10px;
    margin-bottom: 20px;
    color: #4e4e4e;
}
.box {
    border-radius: 25px;
    padding: 15px;
    border: 2px solid #4e4e4e;
    margin-bottom: 30px;
    min-height: 179px;
}
.box-title {
    padding-top: 18px;
}
.box-title h3 {
    font-weight: 600;
    font-size: 22px;
    display: inline-block;
    margin-bottom: 10px;
    color: var(--redclr);
}
.box-title {
    display: flex;
    align-items: center;
    justify-content: space-between;
}
.mainForm label {
    /* font-size: 16px; */
    color: #4e4e4e;
    font-weight: 600;
    margin-bottom: 10px;
}

.mainForm input, .mainForm textarea {
    width: 100%;
    font-size: 18px;
    padding: 10px 10px;
    border: 2px solid #333333;
    margin-bottom: 20px;
    outline: none !important;
    border-radius: 15px;
    font-weight: 500;
}
.dashboardform {
    border-right: 1px solid #333333;
}
.tab-wrapper-dashboard li {
    list-style-type: none;
}
.box-content p {
    font-size: 14px;
    line-height: 30px;
    color: #4e4e4e;
}
.dashBoard {
    padding: 50px 0 30px 0;
    /*background-image: linear-gradient(to right bottom, #2b261b, #020100, #0d0e0e, #0a0b0f, #08090d;*/
    background: #eee;
}
/*.dashboardform h4 {
    color: #cc9a27;
}*/

.mainForm h4 {
    color: var(--redclr);
}

.dashBoard .table thead th {
    vertical-align: bottom;
    border-top: 2px solid #dcdcdc;
    border-bottom: 2px solid #dcdcdc;
    color: var(--redclr);
}
/*End-DashBoard*/
</style>
<div class="dashBoard">
  <div class="container">
    <div class="row">
      <div class="col-12  col-md-12 col-lg-3">
        <div class="tab-wrapper-dashboard">
         <div class="nav flex-column nav-pills" id="v-pills-tab" role="tablist" aria-orientation="vertical">
            <a class="nav-link active" id="v-pills-home-tab" data-toggle="pill" href="#v-pills-home" role="tab" aria-controls="v-pills-home" aria-selected="false">Dashboard</a> 
            <a class="nav-link" id="v-pills-profile-tab" data-toggle="pill" href="#v-pills-profile" role="tab" aria-controls="v-pills-profile" aria-selected="false">Account Details</a>
             <a class="nav-link" id="v-pills-messages-tab" data-toggle="pill" href="#v-pills-messages" role="tab" aria-controls="v-pills-messages" aria-selected="false">Order History</a>
              <a class="nav-link" id="v-pills-settings-tab" data-toggle="pill" href="#v-pills-settings" role="tab" aria-controls="v-pills-settings" aria-selected="true">Log Out</a>
             </div>
        </div>
      </div>
      <div class="col-12  col-md-12 col-lg-9">
        <div class="tab-content" id="v-pills-tabContent">
          <div class="tab-pane fade in show active" id="v-pills-home" role="tabpanel" aria-labelledby="v-pills-home-tab">
            <h2 class="text-left dashBoardH4">My Dashboard</h2>
            <div class="row">
              <div class="col-md-6">
                <div class="box">
                  <div class="box-title">
                    <h3 class="display-inline-block">Account Details</h3>
                    <a href="#" class="pull-right">Edit <i class="fa fa-edit"></i></a> </div>
                  <div class="box-content">
                    <p class="no-margin-bottom margin-five">Daniel Adams</p>
                    <p>daniel.adams@gmail.com</p>
                    <a class="pass-link" href="#">Change Password</a> </div>
                </div>
              </div>
              <div class="col-md-6">
                <div class="box">
                  <div class="box-title">
                    <h3 class="display-inline-block">Order History</h3>
                    <a href="#" class="pull-right">View <i class="fa fa-edit"></i></a> </div>
                  <div class="box-content">
                    <p>Total Number of Orders : <span class="font-weight-700">5</span></p>
                  </div>
                </div>
              </div>
              <div class="col-md-6">
                <div class="box">
                  <div class="box-title">
                    <h3 class="display-inline-block">Select Your Latest Plans</h3>
                  </div>
                  <div class="box-content">
                    <p class="no-margin-bottom margin-five">Lorem Ipsum De amit Lorem Ipsum De amit</p>
                    <p>Lorem Ipsum De amit Lorem Ipsum </p> </div>
                </div>
              </div>
              <div class="col-md-6">
                <div class="box">
                  <div class="box-title">
                    <h3 class="display-inline-block">Address</h3>
                  </div>
                  <div class="box-content">
                    <p class="no-margin-bottom margin-five">Shipping Address: Lorem Ipsum</p>
                    <p>Billing Address: Lorem Ipsum</p>
                  </div>
                </div>
              </div>
              <div class="col-md-6">
                <div class="box">
                  <div class="box-title">
                    <h3 class="display-inline-block">Log out</h3>
                  </div>
                  <div class="box-content">
                    <p class="no-margin-bottom margin-five">Logout from your account to stay secure</p>
                    <p>Log Out Now</p>
                    <a class="pass-link" href="#">Log out</a> </div>
                </div>
              </div>
            </div>
          </div>
          <div class="tab-pane fade" id="v-pills-profile" role="tabpanel" aria-labelledby="v-pills-profile-tab">
            <h2 class="text-left dashBoardH4">My Account Details</h2>
            <div class="mainForm">
              <form>
                <div class="row">
                  <div class="col-12 col-sm-6 dashboardform">
                    <div class="col-12 col-sm-12 margin-bottom-5">
                      <h4>Account Information</h4>
                    </div>
                    <div class="col-12 col-sm-12">
                      <label>First Name</label>
                      <input type="text" placeholder="Enter Your First Name">
                    </div>
                    <div class="col-12 col-sm-12">
                      <label>Last Name</label>
                      <input type="text" placeholder="Enter Your Last Name">
                    </div>
                    <div class="col-12 col-sm-12">
                      <label>Email</label>
                      <input type="email" placeholder="Enter Your Email">
                    </div>
                    <div class="col-12 col-sm-12">
                      <label>Shipping Address</label>
                      <input type="text" placeholder="Enter Your Shipping Address">
                    </div>
                    <div class="col-12 col-sm-12">
                      <label>Billing Address</label>
                      <input type="text" placeholder="Enter Your Billing Address">
                    </div>
                    <div class="col-xs-12 col-sm-12 col-md-12 col-lg-8"> <a href="#" class="dashboardbtn2">Update Details</a> </div>
                  </div>
                  <div class="col-xs-12 col-sm-6">
                    <div class="col-xs-12 col-sm-12 margin-bottom-5">
                      <h4>Set New Password</h4>
                    </div>
                    <div class="col-xs-12 col-sm-12">
                      <label>Current Password</label>
                      <input type="password" placeholder="Enter Your Current Password">
                    </div>
                    <div class="col-xs-12 col-sm-12">
                      <label>New Password</label>
                      <input type="password" placeholder="Enter Your New Password">
                    </div>
                    <div class="col-xs-12 col-sm-12">
                      <label>Confirm Password</label>
                      <input type="password" placeholder="Confirm Your New Password">
                    </div>
                    <div class="col-xs-12 col-sm-12 col-md-12 col-lg-8"> <a href="#" class="dashboardbtn2">Update Password</a> </div>
                  </div>
                </div>
              </form>
            </div>
          </div>
          <div class="tab-pane fade" id="v-pills-messages" role="tabpanel" aria-labelledby="v-pills-messages-tab">
            <h2 class="text-left dashBoardH4">Order History</h2>
            <table class="table customtable  ">
              <thead>
                <tr>
                  <th>Lorem</th>
                  <th>Lorem</th>
                  <th>Lorem</th>
                  <th>Lorem</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Data 1</td>
                  <td>Data 2</td>
                  <td>Data 3</td>
                  <td>Data 4</td>
                </tr>
                <tr>
                  <td>Data 1</td>
                  <td>Data 2</td>
                  <td>Data 3</td>
                  <td>Data 4</td>
                </tr>
                <tr>
                  <td>Data 1</td>
                  <td>Data 2</td>
                  <td>Data 3</td>
                  <td>Data 4</td>
                </tr>
                <tr>
                  <td>Data 1</td>
                  <td>Data 2</td>
                  <td>Data 3</td>
                  <td>Data 4</td>
                </tr>
              </tbody>
            </table>
          </div>
          <div class="tab-pane fade" id="v-pills-settings" role="tabpanel" aria-labelledby="v-pills-settings-tab"> </div>
        </div>
      </div>
    </div>
  </div>
</div>

<?php include"inc/footer.php"?>