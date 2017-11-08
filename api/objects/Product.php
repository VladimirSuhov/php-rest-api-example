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

        // выполняем запрос
        $stmt->execute();

        return $stmt;
    }


    // вызывается, когда заполнена форма редактирования
    function readOne() {
        $query = "SELECT
                c.name as category_name, p.id, p.name, p.description, p.price, p.category_id, p.created
            FROM
                " . $this->table_name . " p
                LEFT JOIN
                    categories c
                        ON p.category_id = c.id
            WHERE
                p.id = ?
            LIMIT
                0,1";

        // подготавливаем запрос
        $stmt = $this->conn->prepare($query);

        $stmt->bindParam(1, $this->id);

        // выполняем запрос
        $stmt->execute();

        // получаем данные запроса
        $row = $stmt->fetch(PDO::FETCH_ASSOC);

        // присваиваем значения свойствам обьекта
        $this->name = $row['name'];
        $this->price = $row['price'];
        $this->description = $row['description'];
        $this->category_id = $row['category_id'];
        $this->category_name = $row['category_name'];
    }


    function update(){

        // обновляем запрос
        $query = "UPDATE
                " . $this->table_name . "
            SET
                name = :name,
                price = :price,
                description = :description,
                category_id = :category_id
            WHERE
                id = :id";

        // prepare query statement
        $stmt = $this->conn->prepare($query);

        // sanitize
        $this->name=htmlspecialchars(strip_tags($this->name));
        $this->price=htmlspecialchars(strip_tags($this->price));
        $this->description=htmlspecialchars(strip_tags($this->description));
        $this->category_id=htmlspecialchars(strip_tags($this->category_id));
        $this->id=htmlspecialchars(strip_tags($this->id));

        // bind new values
        $stmt->bindParam(':name', $this->name);
        $stmt->bindParam(':price', $this->price);
        $stmt->bindParam(':description', $this->description);
        $stmt->bindParam(':category_id', $this->category_id);
        $stmt->bindParam(':id', $this->id);

        // execute the query
        if($stmt->execute()){
            return true;
        }else{
            return false;
        }
    }

    function delete(){
        $query = "DELETE FROM " . $this->table_name . " WHERE id =?";

        $stmt = $this->conn->prepare($query);

        $this->id=htmlspecialchars(strip_tags($this->id));

        $stmt->bindParam(1, $this->id);

        if($stmt->execute()){
            return true;
        }

        return false;
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

        // выполняем запрос
        if($stmt->execute()){
            return true;
        }else{
            return false;
        }

    }

    // поиск продуктов
    function search($keywords){

        // выбираем необходимые поля
        $query = "SELECT
                c.name as category_name, p.id, p.name, p.description, p.price, p.category_id, p.created
            FROM
                " . $this->table_name . " p
                LEFT JOIN
                    categories c
                        ON p.category_id = c.id
            WHERE
                p.name LIKE ? OR p.description LIKE ? OR c.name LIKE ?
            ORDER BY
                p.created DESC";

        // подготавливаем запрос
        $stmt = $this->conn->prepare($query);

        // удаляем лишние html теги
        $keywords=htmlspecialchars(strip_tags($keywords));
        $keywords = "%{$keywords}%";

        // биндим параметры запроса
        $stmt->bindParam(1, $keywords);
        $stmt->bindParam(2, $keywords);
        $stmt->bindParam(3, $keywords);

        // выполняем запрос
        $stmt->execute();

        return $stmt;
    }

    public function readPaging($from_record_num, $records_per_page){


        $query = "SELECT
                c.name as category_name, p.id, p.name, p.description, p.price, p.category_id, p.created
            FROM
                " . $this->table_name . " p
                LEFT JOIN
                    categories c
                        ON p.category_id = c.id
            ORDER BY p.created DESC
            LIMIT ?, ?";

        $stmt = $this->conn->prepare( $query );

        $stmt->bindParam(1, $from_record_num, PDO::PARAM_INT);
        $stmt->bindParam(2, $records_per_page, PDO::PARAM_INT);

        $stmt->execute();

        return $stmt;
    }

    // постраничный вывод продуктов
    public function count() {
        $query = "SELECT COUNT(*) as total_rows FROM " . $this->table_name . "";

        $stmt = $this->conn->prepare($query);
        $stmt->execute();
        $row = $stmt->fetch(PDO::FETCH_ASSOC);

        return $row['total_rows'];
    }

    function rowCount() {
        return count($this->read());
    }
}