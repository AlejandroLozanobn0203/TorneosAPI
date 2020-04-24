<?php

require __DIR__ . '/../../vendor/autoload.php';

use TDW\DemoDoctrine\Utility\Utils;
use TDW\DemoDoctrine\Entity\Usuario;


Utils::loadEnv(__DIR__.'/../..');

$entityManager = Utils::getEntityManager();


$usuarios = $entityManager->getRepository(Usuario::class)->findAll();

$users = [];

foreach($usuarios as $usuario)
{
    $users[$usuario->getUserkey()] = [
        'email' => $usuario->getCorreo(),
        'password' => $usuario->getPassword()
    ];
}
echo json_encode($users);
?>