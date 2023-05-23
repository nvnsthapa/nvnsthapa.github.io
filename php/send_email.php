<?php
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $name = $_POST["name"];
    $email = $_POST["email"];
    $subject = $_POST["subject"];
    $message = $_POST["message"];

    $to = "thapasnavin@gmail.com";
    $headers = "From: $name <$email>";
    $email_body = "Name: $name\nEmail: $email\nSubject: $subject\nMessage: $message";

    if (mail($to, $subject, $email_body, $headers)) {
        echo "Email sent successfully.";
    } else {
        echo "Error: Failed to send email.";
    }
}
?>
