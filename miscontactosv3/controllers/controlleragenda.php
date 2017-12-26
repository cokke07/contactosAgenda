<?php
	require_once '../modelos/agenda/modeloagenda.php';
	require_once '../modelos/agenda/entidadagenda.php';

	$modelagenda= new ModelAgenda();

	if(isset($_REQUEST['Accion'])){
		switch($_REQUEST['Accion']){


		case 'listar':
				$jsondata=$modelagenda->listar();
				header('Content-type: application/json; charset=utf-8');
				echo json_encode($jsondata);
				break;
		
        case 'registrar':
        	$age=new Agenda();
	            $age->__SET('titulo',      $_REQUEST['conTitulo']);
	            $age->__SET('detalle',     $_REQUEST['conDetalle']);         
            $jsondata = $modelagenda->Registrar($age);
            header('Content-type: application/json; charset=utf-8');
            echo json_encode($jsondata);
            break;

     	case 'actualizar':
     		$age=new Agenda();
	            $age->__SET('id',          $_REQUEST['conId']);
	            $age->__SET('titulo',      $_REQUEST['conTitulo']);
	            $age->__SET('detalle',     $_REQUEST['conDetalle']);
            $jsondata = $modelagenda->Actualizar($age);
            header('Content-type: application/json; charset=utf-8');
			echo json_encode($jsondata);
            break;
        case 'eliminar':
            $jsondata = $modelagenda->Eliminar($_REQUEST['conId']);
            header('Content-type: application/json; charset=utf-8');
            echo json_encode($jsondata);
            break;

        case 'obtener':
            $jsondata = $modelagenda->Obtener($_REQUEST['conId']);
            header('Content-type: application/json; charset=utf-8');
            echo json_encode($jsondata);            
            break;		
	}
}

?>