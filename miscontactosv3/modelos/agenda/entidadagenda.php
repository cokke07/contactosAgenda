<?php

class Agenda{
	private $id;
	private $titulo;
	private $detalle;
		
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