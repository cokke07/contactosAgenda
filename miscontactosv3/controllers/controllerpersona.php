<?php
	require_once '../modelos/persona/modelopersona.php';
	require_once '../modelos/persona/entidadpersona.php';

	$modelpersona= new ModelPersona();

	if(isset($_REQUEST['Accion'])){
		switch($_REQUEST['Accion']){


		case 'listar':
				$jsondata=$modelpersona->listar();
				header('Content-type: application/json; charset=utf-8');
				echo json_encode($jsondata);
				break;
		
        case 'registrar':
        	$perso=new Persona();
	            $perso->__SET('apodo',      $_REQUEST['conApodo']);
	            $perso->__SET('nombre',     $_REQUEST['conNombre']);
	            $perso->__SET('telefono1',  $_REQUEST['conTelefono1']);
	            $perso->__SET('telefono2',  $_REQUEST['conTelefono2']);
	            $perso->__SET('correo',     $_REQUEST['conCorreo']);          
            $jsondata = $modelpersona->Registrar($perso);
            header('Content-type: application/json; charset=utf-8');
            echo json_encode($jsondata);
            break;

     	case 'actualizar':
     		$perso=new Persona();
	            $perso->__SET('id',         $_REQUEST['conId']);
	            $perso->__SET('apodo',      $_REQUEST['conApodo']);
	            $perso->__SET('nombre',     $_REQUEST['conNombre']);
	            $perso->__SET('telefono1',  $_REQUEST['conTelefono1']);
	            $perso->__SET('telefono2',  $_REQUEST['conTelefono2']);
	            $perso->__SET('correo',     $_REQUEST['conCorreo']); 
            $jsondata = $modelpersona->Actualizar($perso);
            header('Content-type: application/json; charset=utf-8');
			echo json_encode($jsondata);
            break;
        case 'eliminar':
            $jsondata = $modelpersona->Eliminar($_REQUEST['conId']);
            header('Content-type: application/json; charset=utf-8');
            echo json_encode($jsondata);
            break;

        case 'obtener':
            $jsondata = $modelpersona->Obtener($_REQUEST['conId']);
            header('Content-type: application/json; charset=utf-8');
            echo json_encode($jsondata);            
            break;		
	}
}

?>