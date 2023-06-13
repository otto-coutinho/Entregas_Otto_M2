<?php
// Obtém os valores enviados pelo AJAX
$nome = $_POST['nome'];
$email = $_POST['email'];
$mensagem = $_POST['mensagem'];

// Processa os dados (por exemplo, você pode enviar um e-mail com essas informações)
// Aqui, estamos apenas concatenando as informações em uma string
$resposta = "Nome: " . $nome . "\n";
$resposta .= "Email: " . $email . "\n";
$resposta .= "Mensagem: " . $mensagem;

// Retorna a resposta ao AJAX
echo $resposta;
?>
