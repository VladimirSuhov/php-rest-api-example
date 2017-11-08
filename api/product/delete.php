<?php
/**
 * Created by PhpStorm.
 * User: Vova
 * Date: 06.11.2017
 * Time: 16:56
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

// присваиваем id продутка, который нужно удалить

if (!empty($_POST['id'])) {
    $product->id = $_POST['id'];
// удаляем продукт
    if($product->update()){
        echo json_encode(array("success" => true, "message" => "Product successfully deleted"));
    }
    else{
        echo json_encode(array("success" => true, "message" => "Error, product was not deleted"));
    }
} else {
    echo json_encode(array("success" => true, "message" => "Data error, please check iff you pass correct product id"));
}



