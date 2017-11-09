/**
 * Created by Vova on 07.11.2017.
 */

class UpdateProductForm {
    constructor(data) {
        this.data = data;
    }

    // _renderCategoriesList(data) {
    //     return data.map(item =>{ return `<option value="${item.id}">${item.name}</option>` });
    // }

    renderForm() {
        return `<div id='read-products' class='btn btn-primary pull-right m-b-15px read-products-button'>
                    <span class='glyphicon glyphicon-list'></span> Read Products
                </div>
                <form id='update-product-form' action='#' name="updateProduct">
                <input type="hidden" name="id" value="${this.data.id}">
                    <table class='table table-hover table-responsive table-bordered'>
                        <tr>
                            <td>Name</td>
                            <td><input type='text' name='name' class='form-control' value="${this.data.name}" required /></td>
                        </tr>
                        <tr>
                            <td>Price</td>
                            <td><input type='price' min='1' name='price' class='form-control' value="${this.data.price}" required /></td>
                        </tr>
                        <tr>
                            <td>Description</td>
                            <td><textarea name='description' class='form-control'  required>${this.data.description}</textarea></td>
                        </tr>
                        <tr>
                            <td>Category</td>
                            <td>
                                <select name='category_id' class='form-control'>
                                      <option value="2">Book</option>
                                  </select>
                            </td>
                        </tr>
                        <tr>
                            <td></td>
                            <td>
                                <button type='submit' class='btn btn-primary'>
                                    <span class='glyphicon glyphicon-plus'></span> Update
                                </button>
                            </td>
                        </tr>
                    </table>
                </form>`;
    }
}


$(document).on('click', '.update-product-button', showUpdateForm);

function showUpdateForm() {
    let productId = this.getAttribute('data-id');
    let categories;
    fetch("http://php-rest-api-example/api/category/read.php")
        .then(response => response.json())
        .then(data => {
            return categories = data;
        }).catch(err => {
        console.log('Fetch Error: ', err);
    });


    console.log(categories);
    fetch("http://php-rest-api-example/api/product/read_one.php?id=" + productId )
        .then(response => response.json())
        .then(data => {
            const form = new UpdateProductForm(data);
            $('#page-content').html(form.renderForm())
        }).catch(err => {
        console.log('Fetch Error: ', err) ;
    });
};


$(document).on('submit', '#update-product-form', updateProduct);

function updateProduct(e) {
    e.preventDefault();

    let formData = new FormData(this);
    fetch("http://php-rest-api-example/api/product/update.php", {
        method: "POST",
        body: formData
    }).then(response => response.json())
        .then(data => {
            console.log(this);
            this.reset();
        }).catch(function (err) {
        console.log('Fetch Error: ', err);
    });

}
