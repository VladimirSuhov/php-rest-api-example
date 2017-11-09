/**
 * Created by Vova on 07.11.2017.
 */


class showProductsTable {

    constructor(data) {
        this.renderProductRows = this._renderProductRows(data);
    }

    renderTableHeader(data) {
        return `<div id='create-product' class='btn btn-primary pull-right m-b-15px create-product-button'>
                    <span class='glyphicon glyphicon-plus'></span> Create Product
                </div>
                <table class='table table-bordered table-hover'>
                    <tr>
                        <th class='w-25-pct'>Name</th>
                        <th class='w-10-pct'>Price</th>
                        <th class='w-15-pct'>Category</th>
                        <th class='w-25-pct text-align-center'>Action</th>
                    </tr>
                    ${this.renderProductRows}
                </table> `;
    }

    _renderProductRows(data) {
        return data.map((item, index) => {
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

}

document.addEventListener("DOMContentLoaded", function (event) {

    showProducts();

    $(document).on('click', '#read-products', showProducts);

    function showProducts() {

        fetch("http://php-rest-api-example/api/product/read.php")
            .then(response => response.json())
            .then(data => {
                const table = new showProductsTable(data.records);
                $('#page-content').html(table.renderTableHeader());
            })
            .catch(err => {
                console.log('Fetch Error: ', err);
            });
    };
});


