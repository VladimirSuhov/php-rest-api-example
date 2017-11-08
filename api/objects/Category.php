<?php

/**
 * Created by PhpStorm.
 * User: Vova
 * Date: 06.11.2017
 * Time: 18:15
 */
class Category
{

    // соединение с бт и имя таблицы
    private $conn;
    private $table_name = "categories";

    // устанавливаем свойства обьекта
    public $id;
    public $name;
    public $description;
    public $created;

    public function __construct($db){
        $this->conn = $db;
    }

    // список всех категорий
    public function readAll(){
        // выбираем нужные данные
        $query = "SELECT
                    id, name, description
                FROM
                    " . $this->table_name . "
                ORDER BY
                    name";

        $stmt = $this->conn->prepare( $query );
        $stmt->execute();

        return $stmt;
    }


    public function read(){

        $query = "SELECT
                id, name, description
            FROM
                " . $this->table_name . "
            ORDER BY
                name";

        $stmt = $this->conn->prepare( $query );
        $stmt->execute();

        return $stmt;
    }
}