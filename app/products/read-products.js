/**
 * Created by Vova on 07.11.2017.
 */
$(document).ready(function () {

    showProducts();

    $(document).on('click', '.read-products-button', function () {
        showProducts();
    });

});

function showProducts() {

    fetch("http://php-rest-api-example/api/product/read.php").then(
        function (response) {
            if(response.status !== 200) {
                console.log('Looks like there was a problem. Status Code: ' + response.status);
                return;
            }

            response.json().then(function (data) {

        let read_products_html =
            `<div id='create-product' class='btn btn-primary pull-right m-b-15px create-product-button'>
                <span class='glyphicon glyphicon-plus'></span> Create Product
            </div>
            <table class='table table-bordered table-hover'>
                <tr>
                    <th class='w-25-pct'>Name</th>
                    <th class='w-10-pct'>Price</th>
                    <th class='w-15-pct'>Category</th>
                    <th class='w-25-pct text-align-center'>Action</th>
                </tr>
                ${renderRows(data)}
            </table> `;

        function renderRows(data) {

            return data.records.map((item, index) => {

                return `<tr>
                        <td>${item.name}</td>
                        <td>${item.price}</td>
                        <td>${item.category_name}</td>
                        
                        <td>
                            <button class='btn btn-primary m-r-10px read-one-products-button' data-id='${item.id}'>
                                <span class='glyphicon glyphicon-eye-open'></span> Read
                            </button>
                            
                            <button class='btn btn-info m-r-10px update-product-button' data-id='${item.id}'>
                                <span class='glyphicon glyphicon-eye-edit'></span> Edit
                            </button>
                            
                            <button class='btn btn-danger m-r-10px delete-product-button' data-id='${item.id}'>
                                <span class='glyphicon glyphicon-eye-remove'></span> Delete
                            </button>
                        </td>
                    </tr>`;

            })
        }
        $('#page-content').html(read_products_html);
    })
    .catch(function (err) {
        console.log('Fetch Error :-S', err);
    });
    // changePageTitle("Read Products");
});
}

