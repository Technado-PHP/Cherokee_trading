<div class="content-wrapper">
  <section class="content-header">
    <h1>
      <?php echo !empty($title)?$title:'Title';?>
    </h1>
  </section>
  <section class="content">
    <div class="row">
      <div class="col-md-12">
        <div class="box box-primary">
          <div class="box-header with-border">
            <h3 class="box-title">View Data</h3>
          </div>     
          <div class="col-md-12">
            <div class="box-body">
             <table class="table">
              <thead class="thead-dark">
                <tr>
                  <th scope="col">Attributes</th>
                  <th scope="col">Values</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <th scope="row">Attribute Name</th>
                  <td><?php echo $record->attribute_name;?></td>
                </tr>
              </tbody>
            </table>
          </div>      
        </div>
      </div>   
    </div>
  </div>
</section>
</div>

























