<?php

class Persona{
	private $id;
	private $apodo;
	private $nombre;
	private $telefono1;
	private $telefono2;
	private $correo;
	
	public function __GET ($k){
		return $this->$k;
	}
	
	public function __SET($k,$v){
		return $this->$k=$v;
	}
	public function returnArray(){
		return get_object_vars($this);
	}
}

?>