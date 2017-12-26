
function deshabilitabotones(){
    document.getElementById('editar-persona').style.display = 'none';
    document.getElementById('guardar-persona').style.display = 'none';
    document.getElementById('actualizar-persona').style.display = 'none';
}
function limpiaform(){
    $("#conId").val("");
    $("#conApodo").val("");
    $("#conNombre").val("");
    $("#conTelefono1").val("");
    $("#conTelefono2").val("");
    $("#conCorreo").val("");
}        
function habilitaform(){
    $("#conId").prop( "disabled", false );
    $("#conApodo").prop( "disabled", false );
    $("#conNombre").prop( "disabled", false );
    $("#conTelefono1").prop( "disabled", false );
    $("#conTelefono2").prop( "disabled", false );
    $("#conCorreo").prop( "disabled", false );
}
function deshabilitaform(){
    $("#conId").prop( "disabled", true );
    $("#conApodo").prop( "disabled", true );
    $("#conNombre").prop( "disabled", true );
    $("#conTelefono1").prop( "disabled", true );
    $("#conTelefono2").prop( "disabled", true );
    $("#conCorreo").prop( "disabled", true );            
}    
$(document).ready(function(){

    function validarFormulario(){
        var txtApodo = document.getElementById('conApodo').value;
        //var txtPass = document.getElementById('aluPass').value;
                //Test campo obligatorio
                if(txtApodo == null || txtApodo.length == 0 || /^\s+$/.test(txtApodo)){
                    alert('ERROR: El campo nombre no debe ir vacío o con espacios en blanco');
                    document.getElementById('conApodo').focus();
                    return false;
                }/*
                if(txtPass == null || txtPass.length == 0 || /^\s+$/.test(txtPass)){
                    alert('ERROR: El campo Password no debe ir vacío o con espacios en blanco');
                    document.getElementById('aluPass').focus();
                    return false;
                } */               
                return true;
            }          
    //funcion para listar los contactos
    var getlista = function (){
        var datax = {
            "Accion":"listar"
        }
        $.ajax({
            data: datax, 
            type: "GET",
            dataType: "json", 
            url: "http://localhost/miscontactosv3/controllers/controllerpersona.php", 
        })
        .done(function( data, textStatus, jqXHR ) {
            $("#listacontactos").html("");
            if ( console && console.log ) {
                console.log( " data success : "+ data.success 
                    + " \n data msg : "+ data.message 
                    + " \n textStatus : " + textStatus
                    + " \n jqXHR.status : " + jqXHR.status );
            }
            for(var i=0; i<data.datos.length;i++){
                                //$.each(data.datos[i], function(k, v) { console.log(k + ' : ' + v); });
                                console.log('id: '+data.datos[i].id + ' apodo: '+data.datos[i].apodo);
                                fila = '<tr><td>'+ data.datos[i].apodo +'</td>';
                                fila += '<td>'+ data.datos[i].nombre +'</td>';
                                fila += '<td>'+ data.datos[i].telefono1 +'</td>';
                                fila += '<td>'+ data.datos[i].telefono2 +'</td>';
                                fila += '<td>'+ data.datos[i].correo +'</td>';
                                fila += '<td><button id="edita-persona" type="button" '
                                fila += 'class="btn btn-xs btn-success" data-toggle="modal" data-target="#myModal"'
                                fila += ' onclick="verpersona(\'ver\',\'' + data.datos[i].id + '\')">';
                                fila += 'Ver / Editar</button>';
                                fila += ' <button id="delete-language-modal" name="delete-language-modal" type="button" ';
                                fila += 'class="btn btn-xs btn-danger" data-toggle="modal" data-target="#myModalDelete" ';
                                fila += 'onclick="deletepersona(\''+ data.datos[i].id +'\',\''
                                + data.datos[i].apodo+'\')">';
                                fila += 'Eliminar</button></td></tr>';
                                $("#listacontactos").append(fila);
                            }
                        })
        .fail(function( jqXHR, textStatus, errorThrown ) {
            if ( console && console.log ) {
                console.log( " La solicitud getlista ha fallado,  textStatus : " +  textStatus 
                    + " \n errorThrown : "+ errorThrown
                    + " \n textStatus : " + textStatus
                    + " \n jqXHR.status : " + jqXHR.status );
            }
        });
    }
    //var veralumno = function (action, aluid){

        //Levanta modal nuevo persona
        $("#crea-persona").click(function(e){
            e.preventDefault();
            limpiaform();
            habilitaform();
            $("#Accion").val("registrar");
            $('#myModal').on('shown.bs.modal', function () {
                var modal = $(this);
                modal.find('.modal-title-form').text('Ingreso Contacto');  
                deshabilitabotones();
                $('#guardar-persona').show();
                $('#conApodo').focus();
            });
        });

        // implementacion boton para guardar persona
        $("#guardar-persona").click(function(e){
            e.preventDefault();
            if(validarFormulario()==true){
                var datax = $("#formPersona").serializeArray();
                $.each(datax, function(i, field){
                    console.log("contenido del form = "+ field.name + ":" + field.value + " ");
                });
                $.ajax({
                    data: datax, 
                    type: "POST",
                    dataType: "json", 
                    url: "http://localhost/miscontactosv3/controllers/controllerpersona.php",  
                })
                .done(function( data, textStatus, jqXHR ) {
                    if ( console && console.log ) {
                        console.log( " data success : "+ data.success 
                            + " \n data msg : "+ data.message 
                            + " \n textStatus : " + textStatus
                            + " \n jqXHR.status : " + jqXHR.status );
                    }
                    $('#myModal').modal('hide');
                    $('#myModalLittle').modal('show');
                    $('#myModalLittle').on('shown.bs.modal', function () {
                        var modal2 = $(this);
                        modal2.find('.modal-title').text('Mensaje del Servidor');
                        modal2.find('.msg').text(data.message);  
                        $('#cerrarModalLittle').focus();
                    });
                    getlista();
                    deshabilitabotones();
                })
                .fail(function( jqXHR, textStatus, errorThrown ) {
                    if ( console && console.log ) {
                        console.log( " La solicitud ha fallado,  textStatus : " +  textStatus 
                            + " \n errorThrown : "+ errorThrown
                            + " \n textStatus : " + textStatus
                            + " \n jqXHR.status : " + jqXHR.status );
                    }
                });
            }
        });
        $("#editar-persona").click(function(e){
            e.preventDefault();
            $('.modal-title-form').text('Editar Alumno');
            habilitaform();
            deshabilitabotones();
            $('#actualizar-persona').show();
            $("#Accion").val("actualizar");               
        });

        $("#actualizar-persona").click(function(e){
                    // Detenemos el comportamiento normal del evento click sobre el elemento clicado
                    e.preventDefault();
                    if(validarFormulario()==true){
                        var datax = $("#formPersona").serializeArray();
                        /*   $.each(datax, function(i, field){
                            console.log("contenido del form = "+ field.name + ":" + field.value + " ");
                        });*/
                        $.ajax({
                            data: datax,    // En data se puede utilizar un objeto JSON, un array o un query string
                            type: "POST",   //Cambiar a type: POST si necesario
                            dataType: "json",  // Formato de datos que se espera en la respuesta
                            url: "http://localhost/miscontactosv3/controllers/controllerpersona.php",   // URL a la que se enviará la solicitud Ajax
                        })
                        .done(function( data, textStatus, jqXHR ) {
                            if ( console && console.log ) {
                                console.log( " data success : "+ data.success 
                                    + " \n data msg : "+ data.message 
                                    + " \n textStatus : " + textStatus
                                    + " \n jqXHR.status : " + jqXHR.status );
                            }
                            $('#myModal').modal('hide');
                            $('#myModalLittle').modal('show');
                            $('#myModalLittle').on('shown.bs.modal', function () {
                                var modal2 = $(this);
                                modal2.find('.modal-title').text('Mensaje del Servidor');
                                modal2.find('.msg').text(data.message);
                                $('#cerrarModalLittle').focus();                                
                            });
                            getlista();
                            deshabilitabotones();
                        })
                        .fail(function( jqXHR, textStatus, errorThrown ) {
                            if ( console && console.log ) {
                                console.log( " La solicitud ha fallado,  textStatus : " +  textStatus 
                                    + " \n errorThrown : "+ errorThrown
                                    + " \n textStatus : " + textStatus
                                    + " \n jqXHR.status : " + jqXHR.status );
                            }
                        });                        
                    }
                });    
        $("#eliminar-persona").click(function(e){
            e.preventDefault();
            var datax = $("#formDeletePersona").serializeArray();
                    /* .each(datax, function(i, field){
                        console.log("contenido del form = "+ field.name + ":" + field.value + " ");
                    });*/
                    $.ajax({
                        data: datax, 
                        type: "POST",
                        dataType: "json", 
                        url: "http://localhost/miscontactosv3/controllers/controllerpersona.php",
                    })
                    .done(function(data,textStatus,jqXHR ) {
                        if ( console && console.log ) {
                            console.log( " data success : "+ data.success 
                                + " \n data msg : "+ data.message 
                                + " \n textStatus : " + textStatus
                                + " \n jqXHR.status : " + jqXHR.status );
                        }
                        $('#myModalDelete').modal('hide');
                        $('#myModalLittle').modal('show');
                        $('#myModalLittle').on('shown.bs.modal', function () {
                            var modal2 = $(this);
                            modal2.find('.modal-title').text('Mensaje del Servidor');
                            modal2.find('.msg').text(data.message);
                            $('#cerrarModalLittle').focus();                                
                        });
                        getlista(); 
                    })
                    .fail(function( jqXHR, textStatus, errorThrown ) {
                        if ( console && console.log ) {
                            console.log( " La solicitud ha fallado,  textStatus : " +  textStatus 
                                + " \n errorThrown : "+ errorThrown
                                + " \n textStatus : " + textStatus
                                + " \n jqXHR.status : " + jqXHR.status );
                        }
                    });
                });
        deshabilitabotones();                
        getlista();

    });
function verpersona(action, conid){
    deshabilitabotones();
    var datay = {"conId": conid,
    "Accion":"obtener" };
    $.ajax({
        data: datay, 
        type: "POST",
        dataType: "json", 
        url: "http://localhost/miscontactosv3/controllers/controllerpersona.php", 
    })
    .done(function(data,textStatus,jqXHR ) {
        if ( console && console.log ) {
            console.log( " data success : "+ data.success 
                + " \n data msg : "+ data.message 
                + " \n textStatus : " + textStatus
                + " \n jqXHR.status : " + jqXHR.status );
        }
        $("#conId").val(data.datos.id);
        $("#conApodo").val(data.datos.apodo);
        $("#conNombre").val(data.datos.nombre);
        $("#conTelefono1").val(data.datos.telefono1);
        $("#conTelefono2").val(data.datos.telefono2);
        $("#conCorreo").val(data.datos.correo);   

        deshabilitaform();
        $("#Accion").val(action);

        $('#myModal').on('shown.bs.modal', function () {
            var modal = $(this);
            if (action === 'actualizar'){
                modal.find('.modal-title-form').text('Actualizar Contacto');
                $('#guardar-persona').hide();                    
                $('#actualizar-persona').show();   
            }else if (action === 'ver'){
                modal.find('.modal-title-form').text('Ver Contacto');
                deshabilitabotones();
               $('#editar-persona').show();   
            }

        });
    })
    .fail(function( jqXHR, textStatus, errorThrown ) {
        if ( console && console.log ) {
            console.log( " La solicitud ha fallado,  textStatus : " +  textStatus 
                + " \n errorThrown : "+ errorThrown
                + " \n textStatus : " + textStatus
                + " \n jqXHR.status : " + jqXHR.status );
        }
    });
}        
function deletepersona(idPersona, namePersona){     
    document.formDeletePersona.conId.value = idPersona;
    document.formDeletePersona.namePersona.value = namePersona;
    document.formDeletePersona.Accion.value = "eliminar";
    $('#myModalDelete').on('shown.bs.modal', function () {
        $('#myInput').focus()
    });
}  