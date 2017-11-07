/**
 * Created by Vova on 07.11.2017.
 */
$(document).ready(function () {


   $(document).on('click', '.create-product-button', createProduct) ;

   function createProduct() {
       fetch("http://php-rest-api-example/api/product/read.php").then(
           function (response) {
               if(response.status !== 200) {
                   console.log('Looks like there was a problem. Status Code: ' + response.status);
                   return;
               }
               
               response.json().then(function (data) {

                   let categories_options_html =
                       `<select name='category_id' class='form-control'>
                            ${renderCategotiesList(data)}
                        </select> `;

                   let create_product_html =
                       `<div id='read-products' class='btn btn-primary pull-right m-b-15px read-products-button'>
                            <span class='glyphicon glyphicon-list'></span> Read Products
                        </div>
                        <form id='create-product-form' action='#' method='post' border='0'>
                            <table class='table table-hover table-responsive table-bordered'>
                                <tr>
                                    <td>Name</td>
                                    <td><input type='text' name='name' class='form-control' required /></td>
                                </tr>
                                <tr>
                                    <td>Price</td>
                                    <td><input type='number' min='1' name='price' class='form-control' required /></td>
                                </tr>
                                <tr>
                                    <td>Description</td>
                                    <td><textarea name='description' class='form-control' required></textarea></td>
                                </tr>
                                <tr>
                                    <td>Category</td>
                                    <td>${categories_options_html}</td>
                                </tr>
                                <tr>
                                    <td></td>
                                    <td>
                                        <button type='submit' class='btn btn-primary'>
                                            <span class='glyphicon glyphicon-plus'></span> Create Product
                                        </button>
                                    </td>
                                </tr>
                            </table>
                        </form>`;

                   function renderCategotiesList(data) {
                       return data.records.map((item, index)=> {
                           return `<option value="${item.id}">${item.name}</option>`
                       });
                   }

                   $("#page-content").html(create_product_html);
               })



           // changePageTitle("Create Product");
       })
       .catch(function (err) {
           console.log('Fetch Error :-S', err);
       });
   }

});