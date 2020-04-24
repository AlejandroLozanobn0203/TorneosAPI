<?php

namespace TDW\DemoDoctrine\Entity;

use Doctrine\ORM\Mapping as ORM;

/**
 * Usuario
 *
 * @ORM\Table(name="usuarios")
 * @ORM\Entity
 */
class Usuario implements \JsonSerializable
{
    /**
     *
     * @ORM\Column(name="user_key", type="integer", nullable=false)
     * @ORM\Id
     * @ORM\GeneratedValue(strategy="IDENTITY")
     */
    private int $userKey;

    /**
     *
     * @ORM\Column(name="nombre", type="string", length=20, nullable=false)
     */
    private string $nombre;

    /**
     *
     * @ORM\Column(name="correo", type="string", length=20, nullable=false)
     */
    private string $correo;

    /**
     *
     * @ORM\Column(name="password", type="string", length=20, nullable=false)
     */
    private string $password;

    /**
     *
     * @ORM\Column(name="nivel", type="integer", nullable=false)
     */
    private int $nivel = 0;


    /**
     * Usuario constructor.
     * @param string $nombre
     * @param string $correo
     * @param string $password
     * @param int $nivel
     */
    public function __construct(string $nombre, string $correo, string $password, int $nivel=0)
    {
        $this->nombre = $nombre;
        $this->correo = $correo;
        $this->password = $password;
        $this->nivel = $nivel;
    }

    /**
     * @return int
     */
    public function getUserKey(): int
    {
        return $this->userKey;
    }

    /**
     * @return string
     */
    public function getNombre(): string
    {
        return $this->nombre;
    }

    /**
     * @param string $nombre
     */
    public function setNombre(string $nombre): Usuario
    {
        $this->nombre = $nombre;
        return $this;
    }

    /**
     * @return string
     */
    public function getCorreo(): string
    {
        return $this->correo;
    }

    /**
     * @param string $correo
     */
    public function setCorreo(string $correo): Usuario
    {
        $this->correo = $correo;
        return $this;
    }

    /**
     * @return string
     */
    public function getPassword(): string
    {
        return $this->password;
    }

    /**
     * @param string $password
     */
    public function setPassword(string $password): Usuario
    {
         $this->password = $password;
         return $this;
    }

    /**
     * @return int
     */
    public function getNivel(): int
    {
        return $this->nivel;
    }

    /**
     * @param int $nivel
     */
    public function setNivel(int $nivel): Usuario
    {
        $this->nivel = $nivel;
        return $this;
    }

    public function __toString(): string
    {
        return sprintf(
            'Producto = [key="%2d,nombreUsuario=%40d]',
            $this->$this->getUserKey(),
            $this->getNombre()
        );

    }

    public function jsonSerialize()
    {
        return [
            "id"=>$this->getUserKey(),
            "nombre"=>$this->getNombre(),
            "correo"=>$this->getCorreo(),
            "password"=>$this->getPassword(),
            "nivel"=>$this->getNivel(),
        ];
    }


}
