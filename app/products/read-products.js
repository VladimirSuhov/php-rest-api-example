/**
 * Created by Vova on 07.11.2017.
 */

var test = [
    {
        "id": "60",
        "name": "Rolex Watch",
        "description": "Luxury watch.",
        "price": "25000",
        "category_id": "1",
        "category_name": "Fashion"
    },
    {
        "id": "48",
        "name": "Bristol Shoes",
        "description": "Awesome shoes.",
        "price": "999",
        "category_id": "5",
        "category_name": "Movies"
    },
    {
        "id": "42",
        "name": "Nike Shoes for Men",
        "description": "Nike Shoes",
        "price": "12999",
        "category_id": "3",
        "category_name": "Motors"
    },
    {
        "id": "31",
        "name": "Amanda Waller Shirt",
        "description": "New awesome shirt!",
        "price": "333",
        "category_id": "1",
        "category_name": "Fashion"
    },
    {
        "id": "28",
        "name": "Wallet",
        "description": "You can absolutely use this one!",
        "price": "799",
        "category_id": "6",
        "category_name": "Books"
    },
    {
        "id": "26",
        "name": "Another product",
        "description": "Awesome product!",
        "price": "555",
        "category_id": "2",
        "category_name": "Electronics"
    },
    {
        "id": "13",
        "name": "Abercrombie Allen Brook Shirt",
        "description": "Cool red shirt!",
        "price": "70",
        "category_id": "1",
        "category_name": "Fashion"
    },
    {
        "id": "12",
        "name": "Abercrombie Lake Arnold Shirt",
        "description": "Perfect as gift!",
        "price": "60",
        "category_id": "1",
        "category_name": "Fashion"
    },
    {
        "id": "11",
        "name": "Huawei Y300",
        "description": "For testing purposes.",
        "price": "100",
        "category_id": "2",
        "category_name": "Electronics"
    },
    {
        "id": "10",
        "name": "Sony Smart Watch",
        "description": "The coolest smart watch!",
        "price": "300",
        "category_id": "2",
        "category_name": "Electronics"
    },
    {
        "id": "9",
        "name": "Spalding Watch",
        "description": "My sports watch.",
        "price": "199",
        "category_id": "1",
        "category_name": "Fashion"
    },
    {
        "id": "8",
        "name": "Samsung Galaxy Tab 10.1",
        "description": "Good tablet.",
        "price": "259",
        "category_id": "2",
        "category_name": "Electronics"
    },
    {
        "id": "7",
        "name": "Lenovo Laptop",
        "description": "My business partner.",
        "price": "399",
        "category_id": "2",
        "category_name": "Electronics"
    },
    {
        "id": "6",
        "name": "Bench Shirt",
        "description": "The best shirt!",
        "price": "29",
        "category_id": "1",
        "category_name": "Fashion"
    },
    {
        "id": "2",
        "name": "Google Nexus 4",
        "description": "The most awesome phone of 2013!",
        "price": "299",
        "category_id": "2",
        "category_name": "Electronics"
    },
    {
        "id": "1",
        "name": "LG P880 4X HD",
        "description": "My first awesome phone!",
        "price": "336",
        "category_id": "3",
        "category_name": "Motors"
    },
    {
        "id": "3",
        "name": "Samsung Galaxy S4",
        "description": "How about no?",
        "price": "600",
        "category_id": "3",
        "category_name": "Motors"
    }];

class showProductsTable {

    construct() {
        this.renderProductRows = _renderProductRows(data);
    }

    _renderTableHeader() {
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
                    ${this._renderProductRows()}
                </table> `;
    }

    _renderProductRows(data) {
        return test.map((item, index) => {
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

    $(document).on('click', '.create-product-button', showProducts);

    function showProducts() {

        fetch("http://php-rest-api-example/api/product/read.php")
            .then(response => response.json())
            .then(data => {
                const table = new showProductsTable(data.records);
                $('#page-content').html(table._renderTableHeader());
            })
            .catch(function (err) {
                console.log('Fetch Error: ', err);
            });
    };
});


