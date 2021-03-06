/**
 * Created by Vova on 07.11.2017.
 */

class ProductForm {
    constructor(data) {
        this.selectOptions = this._renderCategoriesList(data);
    }

    _renderCategoriesList(data) {
        return data.map(item =>{ return `<option value="${item.id}">${item.name}</option>` });
    }

    renderForm() {
         return `<div id='read-products' class='btn btn-primary pull-right m-b-15px read-products-button'>
                    <span class='glyphicon glyphicon-list'></span> Read Products
                </div>
                <form id='create-product-form' action='#' name="createProduct">
                    <table class='table table-hover table-responsive table-bordered'>
                        <tr>
                            <td>Name</td>
                            <td><input type='text' name='name' class='form-control' required /></td>
                        </tr>
                        <tr>
                            <td>Price</td>
                            <td><input type='price' min='1' name='price' class='form-control' required /></td>
                        </tr>
                        <tr>
                            <td>Description</td>
                            <td><textarea name='description' class='form-control' required></textarea></td>
                        </tr>
                        <tr>
                            <td>Category</td>
                            <td>
                                <select name='category_id' class='form-control'>
                                      ${this.selectOptions}
                                  </select>
                            </td>
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
    }
}


    $(document).on('click', '.create-product-button', showCreateForm);

    function showCreateForm(e) {
        fetch("http://php-rest-api-example/api/category/read.php")
            .then(response => response.json())
                .then(data => {
                    const form = new ProductForm(data.records);
                    $('#page-content').html(form.renderForm());
                })
                .catch(function (err) {
                    console.log('Fetch Error: ', err);
                });
    };

    $(document).on('submit', '#create-product-form', createProduct);

    function createProduct(e) {
        e.preventDefault();

        let formData = new FormData(this);

        fetch("http://php-rest-api-example/api/product/create.php", {
            method: "POST",
            body: formData
        }).then(response => response.json())
            .then(data => {
              console.log(data.message);
              this.reset();
            }).catch(function (err) {
            console.log('Fetch Error: ', err);
        });

    }

