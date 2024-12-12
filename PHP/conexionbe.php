<?php
    $conexion = mysqli_connect("localhost", "root", "", "users");

    if ($conexion) {
    echo 'Conectado a la base de datos';
        } else {
    echo 'No se pudo conectar a la bd';
    }
?>
