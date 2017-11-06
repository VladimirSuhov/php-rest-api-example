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
    // читаем записи из таблицы продуктов
    function read() {

        // выбираем все из таблицы products
        $query = "SELECT
                c.name as category_name, p.id, p.name, p.description, p.price, p.category_id, p.created
            FROM
                " . $this->table_name . " p
                LEFT JOIN
                    categories c
                        ON p.category_id = c.id
            ORDER BY
                p.created DESC";

        // подготавливаем запрос
        $stmt = $this->conn->prepare($query);

        // eвыполняем запрос
        $stmt->execute();

        return $stmt;
    }

    // вызывается, когда заполнена форма редактирования
    function readOne() {

    }

    function create() {
        $query = "INSERT INTO
                " . $this->table_name . "
            SET
                name=:name, price=:price, description=:description, category_id=:category_id, created=:created";

        // подготавливаем запрос
        $stmt = $this->conn->prepare($query);

        // Удаляем теги
        $this->name=htmlspecialchars(strip_tags($this->name));
        $this->price=htmlspecialchars(strip_tags($this->price));
        $this->description=htmlspecialchars(strip_tags($this->description));
        $this->category_id=htmlspecialchars(strip_tags($this->category_id));
        $this->created=htmlspecialchars(strip_tags($this->created));

        // биндим значения
        $stmt->bindParam(":name", $this->name);
        $stmt->bindParam(":price", $this->price);
        $stmt->bindParam(":description", $this->description);
        $stmt->bindParam(":category_id", $this->category_id);
        $stmt->bindParam(":created", $this->created);

        // execute query
        if($stmt->execute()){
            return true;
        }else{
            return false;
        }

    }

    function rowCount() {
        return count($this->read());
    }
}