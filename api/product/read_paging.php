<?php
/**
 * Created by PhpStorm.
 * User: Vova
 * Date: 06.11.2017
 * Time: 17:34
 */

// required headers
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");

// include database and object files
include_once '../config/core.php';
include_once '../shared/utilities.php';
include_once '../config/database.php';
include_once '../objects/product.php';

// utilities
$utilities = new Utilities();

// instantiate database and product object
$database = new Database();
$db = $database->getConnection();

// initialize object
$product = new Product($db);

// query products
$stmt = $product->readPaging($from_record_num, $records_per_page);
$num = $stmt->rowCount();

// проверяем что кол-во записей > 0
if($num>0){

    // создаем массив для продуктов
    $products_arr=array();
    $products_arr["records"]=array();
    $products_arr["paging"]=array();

    while ($row = $stmt->fetch(PDO::FETCH_ASSOC)){
        // извлекаем  $row['name'] , таким образом приводя его к виду $row
        extract($row);

        $product_item=array(
            "id" => $id,
            "name" => $name,
            "description" => html_entity_decode($description),
            "price" => $price,
            "category_id" => $category_id,
            "category_name" => $category_name
        );

        array_push($products_arr["records"], $product_item);
    }


    // включаем постраничный вывод
    $total_rows=$product->count();
    $page_url="{$home_url}product/read_paging.php?";
    $paging=$utilities->getPaging($page, $total_rows, $records_per_page, $page_url);
    $products_arr["paging"]=$paging;

    echo json_encode($products_arr, JSON_PRETTY_PRINT);
}

else{
    echo json_encode(
        array("message" => "No products found.")
    );
}