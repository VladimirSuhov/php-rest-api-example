<?php
/**
 * Created by PhpStorm.
 * User: Vova
 * Date: 06.11.2017
 * Time: 17:09
 */

// необходимые заголовки
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Max-Age: 3600");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

// подключаем классы бд и объектов
include_once '../config/database.php';
include_once '../objects/product.php';

// инициализируем подключение к бд
$database = new Database();
$db = $database->getConnection();

// инициализируем объект Products
$product = new Product($db);

// получаем ключевые слова для поиска
$keywords = isset($_GET["s"]) ? $_GET["s"] : "";

// запрашиваем продукты
$stmt = $product->search($keywords);
$num = $stmt->rowCount();

if($num > 0){
    $products_arr = array();
    $products_arr["records"] = array();

    while ($row = $stmt->fetch(PDO::FETCH_ASSOC)) {
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

    echo json_encode($products_arr, JSON_PRETTY_PRINT);
} else {
    echo json_encode(
        array("message" => "No products found.")
    );
}