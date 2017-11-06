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

// получаем id продутка, который нужно обновить
$data = json_decode(file_get_contents("php://input"));

// присваиваем id продутка, который нужно обновить
$product->id = $data->id;



// обновляем продукт
if($product->update()){
    echo '{';
        echo '"message": "Product was deleted."';
    echo '}';
}

else{
    echo '{';
        echo '"message": "Unable to delete product."';
    echo '}';
}