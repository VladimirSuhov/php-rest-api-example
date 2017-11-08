<?php
/**
 * Created by PhpStorm.
 * User: Vova
 * Date: 06.11.2017
 * Time: 17:34
 */

// включаем отображение ошибок
ini_set('display_errors', 1);
error_reporting(E_ALL);

// урл корня
$home_url="http://php-rest-api-example/api/";

// номер страницы, переданной в урл, по умолчанию 1
$page = isset($_GET['page']) ? $_GET['page'] : 1;

// устанавливаем количество записей на страницк
$records_per_page = 5;

// подсчитываем лимит записей для запроса
$from_record_num = ($records_per_page * $page) - $records_per_page;

