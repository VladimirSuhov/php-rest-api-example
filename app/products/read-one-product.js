/**
 * Created by Vova on 07.11.2017.
 */


class showDetailProductInfo {

    constructor(data) {
        this.data = data;
    }

    renderTableHeader(data) {

        return `<div id='read-products' class='btn btn-primary pull-right m-b-15px read-products-button'>
                   <span class='glyphicon glyphicon-list'></span> Read Products
                </div>
                <table class='table table-bordered table-hover'>
                    <tr>
                        <td class='w-30-pct'>Name</td>
                        <td class='w-70-pct'>${this.data.name}</td>
                    </tr>
                    <tr>
                        <td class='w-30-pct'>Price</td>
                        <td class='w-70-pct'>${this.data.price}</td>
                    </tr>
                    <tr>
                        <td class='w-30-pct'>Description</td>
                        <td class='w-70-pct'>${this.data.description}</td>
                    </tr>
                    <tr>
                        <td class='w-30-pct'>Category</td>
                        <td class='w-70-pct'>${this.data.category_name}</td>
                    </tr>
                </table>
                `;
    };

}

$(document).on('click', '.read-one-products-button', showDetailProduct);

function showDetailProduct() {
    let productId = this.getAttribute('data-id');
    fetch("http://php-rest-api-example/api/product/read_one.php?id=" + productId )
        .then(response => response.json())
            .then(data => {
                let detailProductTable = new showDetailProductInfo(data);
                $('#page-content').html(detailProductTable.renderTableHeader());
            }).catch(err => {
               console.log('Fetch Error: ', err) ;
            });
    
}