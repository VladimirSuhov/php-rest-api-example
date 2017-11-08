<?php
/**
 * Created by PhpStorm.
 * User: Vova
 * Date: 06.11.2017
 * Time: 15:54
 */

// необходимые заголовки
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Max-Age: 3600");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

// подключаем классы бд и объектов
include_once '../config/Database.php';
include_once '../objects/Product.php';

// инициализируем подключение к бд
$database = new Database();
$db = $database->getConnection();

// инициализируем объект Products
$product = new Product($db);

// получаем данные отправленные через POST

if(!empty($_POST['name'] && $_POST['price'] && $_POST['description'] && $_POST['category_id'])) {
    $product->name = $_POST['name'];
    $product->price = $_POST['price'];
    $product->description = $_POST['description'];
    $product->category_id = $_POST['category_id'];
    $product->created = date('Y-m-d H:i:s');

    if($product->create()){
        echo json_encode(array("success" => true, "message" => "New product successfully added"));
    } else{
        echo json_encode(array("success" => false, "message" => "Failed to add new product"));
    }
} else {
    echo json_encode(array("success" => false, "message" => "Failed to add new product, please, enter all required data"));
}

