/**
 * Created by Vova on 07.11.2017.
 */

class ProductForm {
    construct(data) {
        this.selectOptions = _renderCategoriesList(data);
    }

    _renderCategoriesList(data) {
        return test.map(item =>{ return `<option value="${item.id}">${item.name}</option>` });
    }

    renderForm() {
        return `<div id='read-products' class='btn btn-primary pull-right m-b-15px read-products-button'>
            <span class='glyphicon glyphicon-list'></span> Read Products
        </div>
        <form id='create-product-form' action='#' border='0'>
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
                              ${this._renderCategoriesList()}
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

document.addEventListener("DOMContentLoaded", function (event) {


    $(document).on('click', '.create-product-button', showCreateForm);
    function showCreateForm(e) {
        e.preventDefault();

        fetch("http://php-rest-api-example/api/product/read.php")
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
        let form = $('#create-product-form');
        let formData = form.serialize();
        $.ajax({
            url: "http://php-rest-api-example/api/product/create.php",
            type: "post",
            dataType: "json",
            data: formData,
            success: function (res) {
                console.log(res);
            },
            error: function (res) {
                console.log(res);
            }
        })
    }
});