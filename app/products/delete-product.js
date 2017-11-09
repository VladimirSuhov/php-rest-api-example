/**
 * Created by Vova on 07.11.2017.
 */




$(document).on('click', '.delete-product-button', deleteProduct);

    function deleteProduct(e) {
        e.preventDefault();

        let productId = this.getAttribute('data-id');

        bootbox.confirm({
            message: "<h4>Are you sure?</h4>",
            buttons: {
                confirm: {
                    label: '<span class="glyphicon glyphicon-ok"></span> Yes',
                    className: 'btn-danger'
                },
                cancel: {
                    label: '<span class="glyphicon glyphicon-remove"></span> No',
                    className: 'btn-primary'
                }
            },
            callback: function (result) {
                if(result === true) {
                    deleteQuery(productId);
                } else {
                    return;
                }
            }
        });
    }

    // function deleteQuery(id) {
    //
    //     let options = {
    //         method: "POST",
    //         credentials: 'same-origin',
    //         headers: {
    //             'Content-Type': 'application/json',
    //         },
    //         body: JSON.stringify({id: id})
    //     };
    //
    //     fetch("http://php-rest-api-example/api/product/delete.php", options
    //     ).then(response => response.json())
    //         .then(data => {
    //             console.log(data.message);
    //         }).catch(function (err) {
    //         console.log('Fetch Error: ', err);
    //     });
    // }

function deleteQuery(id) {
   $.ajax({
       url: "http://php-rest-api-example/api/product/delete.php",
       type: "post",
       dataType: "json",
       data: {id:id},
       success: function (res) {
           console.log(res.message);
       },
       error: function (res) {
           console.log(res.message);
       }
   })
}