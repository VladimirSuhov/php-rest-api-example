/**
 * Created by Vova on 07.11.2017.
 */

$(document).on('click', '.delete-product-button', showCreateForm);

function showCreateForm(e) {
    e.preventDefault();

    fetch("http://php-rest-api-example/api/product/delete.php")
        .then(response => response.json())
        .then(data => {
            const form = new ProductForm(data.records);
            $('#page-content').html(form.renderForm());
        })
        .catch(function (err) {
            console.log('Fetch Error: ', err);
        });

};