<?php
error_reporting(E_ALL);
ini_set('display_errors', '1');
require_once '../config/config.php';
class ModelPersona{

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
			$stm=$this->pdo->prepare("SELECT * FROM persona");
			$stm->execute();


			
			foreach($stm->fetchALL(PDO::FETCH_OBJ) as $r){
				$perso = new Persona();
				$perso->__SET('id', $r->id_persona);
				$perso->__SET('apodo', $r->apodo_persona);
				$perso->__SET('nombre', $r->nombre_persona);
				$perso->__SET('telefono1', $r->telefono1_persona);
				$perso->__SET('telefono2', $r->telefono2_persona);
				$perso->__SET('correo', $r->correo_persona);
				$result[] = $perso->returnArray();
			}
			$responsearray['success']=true;
			$responsearray['message']='Listado correctamente';
			$responsearray['datos']=$result;

		}catch(Exception $e){
			$responsearray['success']=false;
			$responsearray['message']='Error al listar contactos';
		}
		return $responsearray;
	}

    public function Registrar(Persona $data){
        $jsonresponse = array();
        try{
            $sql = "INSERT INTO persona (apodo_persona,
            							nombre_persona,
            							telefono1_persona,
            							telefono2_persona,
            							correo_persona) 
                    VALUES (?,?,?,?,?)";

            $this->pdo->prepare($sql)->execute(array($data->__GET('apodo'),
                                                     $data->__GET('nombre'),
                                                     $data->__GET('telefono1'),
                                                     $data->__GET('telefono2'),
                                                     $data->__GET('correo')));
            $jsonresponse['success'] = true;
            $jsonresponse['message'] = 'Contacto Ingresado correctamente'; 
        } catch (PDOException $pdoException){
            $jsonresponse['success'] = false;
            $jsonresponse['message'] = 'Error al ingresar Contacto';
            $jsonresponse['errorQuery'] = $pdoException->getMessage();
        }
        return $jsonresponse;
    }

    public function Actualizar(Persona $data){
        $jsonresponse = array();
        try{
            $sql = "UPDATE persona SET 
                           apodo_persona = ?,
                           nombre_persona = ?, 
                           telefono1_persona = ?,
                           telefono2_persona=?,
                           correo_persona=?
                    WHERE  id_persona = ? ";

            $this->pdo->prepare($sql)->execute(array($data->__GET('apodo'),
                                                     $data->__GET('nombre'),
                                                     $data->__GET('telefono1'),
                                                     $data->__GET('telefono2'),
                                                     $data->__GET('correo'),
                                                     $data->__GET('id')));
            $jsonresponse['success'] = true;
            $jsonresponse['message'] = 'Contacto actualizado correctamente';                 
        } catch (Exception $e){
            echo $e->getMessage();
            $jsonresponse['success'] = false;
            $jsonresponse['message'] = 'Error al actualizar Contacto';             
        }
        return $jsonresponse;
    }

    public function Eliminar($id){
        $jsonresponse = array();
        try{
            $stm = $this->pdo->prepare("DELETE FROM persona WHERE id_persona = ? ");
            $stm->execute(array($id));
            $jsonresponse['success'] = true;
            $jsonresponse['message'] = 'Contacto Eliminado correctamente';              
        } catch (Exception $e){
            echo $e->getMessage();
            $jsonresponse['success'] = false;
            $jsonresponse['message'] = 'Error al eliminar Contacto';
        }
        return $jsonresponse;
    }
   public function Obtener($id){
        $jsonresponse = array();
        try{
            $stm = $this->pdo->prepare("SELECT  * FROM persona
                                		WHERE id_persona = ? ");
            $stm->execute(array($id));
            $r = $stm->fetch(PDO::FETCH_OBJ);
				$perso = new Persona();
					$perso->__SET('id', $r->id_persona);
					$perso->__SET('apodo', $r->apodo_persona);
					$perso->__SET('nombre', $r->nombre_persona);
					$perso->__SET('telefono1', $r->telefono1_persona);
					$perso->__SET('telefono2', $r->telefono2_persona);
					$perso->__SET('correo', $r->correo_persona);

            $jsonresponse['success'] = true;
            $jsonresponse['message'] = 'Se obtuvo el Contacto correctamente';
            $jsonresponse['datos'] = $perso->returnArray();
        } catch (Exception $e){
            //die($e->getMessage());
            $jsonresponse['success'] = false;
            $jsonresponse['message'] = 'Error al Obtener Contacto';             
        }
        return $jsonresponse;
    }    
}

?>