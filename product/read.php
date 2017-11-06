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
$num = $product->numCount();

// проверяем если кол-во записей > 0
if($num > 0) {
    $products_arr = [];
    $products_arr["records"] = array();

}