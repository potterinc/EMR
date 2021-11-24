<?php
define("SERVER", 'localhost');
define("USER", 'root');
define("PASSWORD", '');
define("DB", 'EMR');

$conn = new mysqli(SERVER, USER, PASSWORD, DB);
if (!$conn)
    die('Failed to connect to database' . $conn->connect_error);

/**
 * Notification response
 */
class Notification extends User
{
    // Properties
    public $error;
    public $status;
    public $success;
    public $result;
}

class User {
    //Properties
    public $firstname;
    public $lastname;
    public $userID;
    public $username;
    public $privilege;


}