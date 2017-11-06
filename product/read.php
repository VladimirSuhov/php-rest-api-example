<?php
/**
 * Created by PhpStorm.
 * User: Vova
 * Date: 06.11.2017
 * Time: 12:42
 */

// необходимые заголовки
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");

// подключаем классы бд и объектов
include_once '../config/Database.php';
include_once '../objects/Product.php';

// инициализируем подключение к бд
$database = new Database();
$db = $database->getConnection();

// инициализируем объект Products
$product = new Product($db);

// запрос к таблице products
$stmt = $product->read();
$num = $product->rowCount();


// проверяем если кол-во записей > 0
if($num > 0) {
    $products_arr = [];
    $products_arr["records"] = array();

    //запрашиваем обьекты из таблицы
    while ($row = $stmt->fetch(PDO::FETCH_ASSOC)) {
        // извлекаем row
        // таким образом $row['name'] будет приведено к $name
        extract($row);
        $products_item = array(
            "id" => $id,
            "name" => $name,
            "description" => html_entity_decode($description),
            "price" => $price,
            "category_id" => $category_id,
            "category_name" => $category_name
        );

        array_push($products_arr["records"], $products_item);
    }
    echo json_encode($products_arr, JSON_PRETTY_PRINT);
} else {
    echo json_encode(
        array("message" => "No products found.")
    );
}