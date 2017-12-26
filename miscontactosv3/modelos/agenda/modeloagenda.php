<?php
error_reporting(E_ALL);
ini_set('display_errors', '1');
require_once '../config/config.php';
class ModelAgenda{

	private $pdo;

	public function __CONSTRUCT() {
		try{
			$this->pdo=new PDO('mysql:host='.HOST.';dbname='.DB,USERDB,PASSDB);
			$this->pdo->setAttribute(PDO::ATTR_ERRMODE,PDO::ERRMODE_EXCEPTION);
		}catch(Exception $e){
			die($e->getMessage());
		}
	}

	public function listar(){
		$responsearray = array();
		try{
			$result = array();
			$stm=$this->pdo->prepare("SELECT * FROM agenda");
			$stm->execute();


			
			foreach($stm->fetchALL(PDO::FETCH_OBJ) as $r){
				$age = new Agenda();
				$age->__SET('id', $r->id_agenda);
				$age->__SET('titulo', $r->titulo_agenda);
				$age->__SET('detalle', $r->detalle_agenda);
				$result[] = $age->returnArray();
			}
			$responsearray['success']=true;
			$responsearray['message']='Listado correctamente';
			$responsearray['datos']=$result;

		}catch(Exception $e){
			$responsearray['success']=false;
			$responsearray['message']='Error al listar recordatorios';
		}
		return $responsearray;
	}

    public function Registrar(Agenda $data){
        $jsonresponse = array();
        try{
            $sql = "INSERT INTO agenda (titulo_agenda,
            							detalle_agenda) 
                    VALUES (?,?)";

            $this->pdo->prepare($sql)->execute(array($data->__GET('titulo'),
                                                     $data->__GET('detalle')));
            $jsonresponse['success'] = true;
            $jsonresponse['message'] = 'Recordatorio Ingresado correctamente'; 
        } catch (PDOException $pdoException){
            $jsonresponse['success'] = false;
            $jsonresponse['message'] = 'Error al ingresar Recordatorio';
            $jsonresponse['errorQuery'] = $pdoException->getMessage();
        }
        return $jsonresponse;
    }

    public function Actualizar(Agenda $data){
        $jsonresponse = array();
        try{
            $sql = "UPDATE agenda SET 
                           titulo_agenda = ?,
                           detalle_agenda=?
                    WHERE  id_agenda = ? ";

            $this->pdo->prepare($sql)->execute(array($data->__GET('titulo'),
                                                     $data->__GET('detalle'),
                                                     $data->__GET('id')));
            $jsonresponse['success'] = true;
            $jsonresponse['message'] = 'Agenda actualizada correctamente';                 
        } catch (Exception $e){
            echo $e->getMessage();
            $jsonresponse['success'] = false;
            $jsonresponse['message'] = 'Error al actualizar Agenda';             
        }
        return $jsonresponse;
    }

    public function Eliminar($id){
        $jsonresponse = array();
        try{
            $stm = $this->pdo->prepare("DELETE FROM agenda WHERE id_agenda = ? ");
            $stm->execute(array($id));
            $jsonresponse['success'] = true;
            $jsonresponse['message'] = 'Agenda Eliminada correctamente';              
        } catch (Exception $e){
            echo $e->getMessage();
            $jsonresponse['success'] = false;
            $jsonresponse['message'] = 'Error al eliminar Agenda';
        }
        return $jsonresponse;
    }
   public function Obtener($id){
        $jsonresponse = array();
        try{
            $stm = $this->pdo->prepare("SELECT  * FROM agenda
                                		WHERE id_agenda = ? ");
            $stm->execute(array($id));
            $r = $stm->fetch(PDO::FETCH_OBJ);
				$age = new Agenda();
					$age->__SET('id',      $r->id_agenda);
					$age->__SET('titulo',  $r->titulo_agenda);
					$age->__SET('detalle', $r->detalle_agenda);

            $jsonresponse['success'] = true;
            $jsonresponse['message'] = 'Se obtuvo la agenda correctamente';
            $jsonresponse['datos'] = $age->returnArray();
        } catch (Exception $e){
            //die($e->getMessage());
            $jsonresponse['success'] = false;
            $jsonresponse['message'] = 'Error al Obtener agenda';             
        }
        return $jsonresponse;
    }    
}

?>