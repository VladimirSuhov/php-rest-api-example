<?php
/**
 * Created by PhpStorm.
 * User: Vova
 * Date: 06.11.2017
 * Time: 16:28
 */
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: access");
header("Access-Control-Allow-Methods: GET");
header("Access-Control-Allow-Credentials: true");
header('Content-Type: application/json');

// подключаем классы бд и объектов
include_once '../config/Database.php';
include_once '../objects/Product.php';

// инициализируем подключение к бд
$database = new Database();
$db = $database->getConnection();

// инициализируем объект Products
$product = new Product($db);

$product ->id = isset($_GET['id']) ? $_GET['id'] : die();

// читакм поля которые нужно редактировать
$product->readOne();

$product_arr = array(
    "id" =>  $product->id,
    "name" => $product->name,
    "description" => $product->description,
    "price" => $product->price,
    "category_id" => $product->category_id,
    "category_name" => $product->category_name
);

print_r(json_encode($product_arr,JSON_PRETTY_PRINT));