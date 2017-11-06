<?php

/**
 * Created by PhpStorm.
 * User: Vova
 * Date: 06.11.2017
 * Time: 12:35
 */
class Product
{
    // соединение с базой и имя таблицы
    private $conn;
    private $table_name = "products";

    // свойства объекта
    public $id;
    public $name;
    public $description;
    public $price;
    public $category_id;
    public $category_name;
    public $created;

    // конструктор с $db для соединения с бд
    public function __construct($db)
    {
        $this->conn = $db;
    }
}