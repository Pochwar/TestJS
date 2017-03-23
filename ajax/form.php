<?php
$username = $_POST['username'];
$password = $_POST['password'];
$age = $_POST['age'];
$message = $_POST['message'];

$response = [
    'username' => $username,
    'password' => $password,
    'age' => $age,
    'message' => $message
];
echo json_encode($response);
?>
