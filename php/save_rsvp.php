<?php
include 'config.php';

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $nombre = htmlspecialchars(strip_tags(trim($_POST['name'])));
    $num_personas = (int)$_POST['guests'];

    if (!empty($nombre) && $num_personas > 0) {
        $sql = "INSERT INTO invitados (nombre, num_personas) VALUES (?, ?)";

        $stmt = $conn->prepare($sql);
        $stmt->bind_param("si", $nombre, $num_personas);

        if ($stmt->execute()) {
            echo "Confirmación de asistencia registrada correctamente.";
        } else {
            echo "Error: " . $sql . "<br>" . $conn->error;
        }

        $stmt->close();
    } else {
        echo "Datos inválidos. Por favor, intente nuevamente.";
    }

    $conn->close();
}
?>
