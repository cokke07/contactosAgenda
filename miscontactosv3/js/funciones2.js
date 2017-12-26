
function deshabilitabotones(){
    document.getElementById('editar-agenda').style.display = 'none';
    document.getElementById('guardar-agenda').style.display = 'none';
    document.getElementById('actualizar-agenda').style.display = 'none';
}
function limpiaform(){
    $("#conId").val("");
    $("#conTitulo").val("");
    $("#conDetalle").val("");
    
}        
function habilitaform(){
    $("#conId").prop( "disabled", false );
    $("#conTitulo").prop( "disabled", false );
    $("#conDetalle").prop( "disabled", false );
}
function deshabilitaform(){
    $("#conId").prop( "disabled", true );
    $("#conTitulo").prop( "disabled", true );
    $("#conDetalle").prop( "disabled", true );           
}    
$(document).ready(function(){

    function validarFormulario(){
        var txtTitulo = document.getElementById('conTitulo').value;
        //var txtPass = document.getElementById('aluPass').value;
                //Test campo obligatorio
                if(txtTitulo == null || txtTitulo.length == 0 || /^\s+$/.test(txtTitulo)){
                    alert('ERROR: El campo nombre no debe ir vacío o con espacios en blanco');
                    document.getElementById('conTitulo').focus();
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
            url: "http://localhost/miscontactosv3/controllers/controlleragenda.php", 
        })
        .done(function( data, textStatus, jqXHR ) {
            $("#listaagenda").html("");
            if ( console && console.log ) {
                console.log( " data success : "+ data.success 
                    + " \n data msg : "+ data.message 
                    + " \n textStatus : " + textStatus
                    + " \n jqXHR.status : " + jqXHR.status );
            }
            for(var i=0; i<data.datos.length;i++){
                                //$.each(data.datos[i], function(k, v) { console.log(k + ' : ' + v); });
                                console.log('id: '+data.datos[i].id + ' titulo: '+data.datos[i].titulo);
                                fila = '<tr><td>'+ data.datos[i].titulo +'</td>';
                                fila += '<td>'+ data.datos[i].detalle +'</td>';
                                fila += '<td><button id="edita-agenda" type="button" '
                                fila += 'class="btn btn-xs btn-success" data-toggle="modal" data-target="#myModal"'
                                fila += ' onclick="veragenda(\'ver\',\'' + data.datos[i].id + '\')">';
                                fila += 'Ver / Editar</button>';
                                fila += ' <button id="delete-language-modal" name="delete-language-modal" type="button" ';
                                fila += 'class="btn btn-xs btn-danger" data-toggle="modal" data-target="#myModalDelete" ';
                                fila += 'onclick="deleteagenda(\''+ data.datos[i].id +'\',\''
                                + data.datos[i].titulo+'\')">';
                                fila += 'Eliminar</button></td></tr>';
                                $("#listaagenda").append(fila);
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
        $("#crea-agenda").click(function(e){
            e.preventDefault();
            limpiaform();
            habilitaform();
            $("#Accion").val("registrar");
            $('#myModal').on('shown.bs.modal', function () {
                var modal = $(this);
                modal.find('.modal-title-form').text('Ingreso de Recordatorio');  
                deshabilitabotones();
                $('#guardar-agenda').show();
                $('#conTitulo').focus();
            });
        });

        // implementacion boton para guardar persona
        $("#guardar-agenda").click(function(e){
            e.preventDefault();
            if(validarFormulario()==true){
                var datax = $("#formAgenda").serializeArray();
                $.each(datax, function(i, field){
                    console.log("contenido del form = "+ field.name + ":" + field.value + " ");
                });
                $.ajax({
                    data: datax, 
                    type: "POST",
                    dataType: "json", 
                    url: "http://localhost/miscontactosv3/controllers/controlleragenda.php",  
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
        $("#editar-agenda").click(function(e){
            e.preventDefault();
            $('.modal-title-form').text('Editar Recordatorio');
            habilitaform();
            deshabilitabotones();
            $('#actualizar-agenda').show();
            $("#Accion").val("actualizar");               
        });

        $("#actualizar-agenda").click(function(e){
                    // Detenemos el comportamiento normal del evento click sobre el elemento clicado
                    e.preventDefault();
                    if(validarFormulario()==true){
                        var datax = $("#formAgenda").serializeArray();
                        /*   $.each(datax, function(i, field){
                            console.log("contenido del form = "+ field.name + ":" + field.value + " ");
                        });*/
                        $.ajax({
                            data: datax,    // En data se puede utilizar un objeto JSON, un array o un query string
                            type: "POST",   //Cambiar a type: POST si necesario
                            dataType: "json",  // Formato de datos que se espera en la respuesta
                            url: "http://localhost/miscontactosv3/controllers/controlleragenda.php",   // URL a la que se enviará la solicitud Ajax
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
        $("#eliminar-agenda").click(function(e){
            e.preventDefault();
            var datax = $("#formDeleteAgenda").serializeArray();
                    /* .each(datax, function(i, field){
                        console.log("contenido del form = "+ field.name + ":" + field.value + " ");
                    });*/
                    $.ajax({
                        data: datax, 
                        type: "POST",
                        dataType: "json", 
                        url: "http://localhost/miscontactosv3/controllers/controlleragenda.php",
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
function veragenda(action, conid){
    deshabilitabotones();
    var datay = {"conId": conid,
    "Accion":"obtener" };
    $.ajax({
        data: datay, 
        type: "POST",
        dataType: "json", 
        url: "http://localhost/miscontactosv3/controllers/controlleragenda.php", 
    })
    .done(function(data,textStatus,jqXHR ) {
        if ( console && console.log ) {
            console.log( " data success : "+ data.success 
                + " \n data msg : "+ data.message 
                + " \n textStatus : " + textStatus
                + " \n jqXHR.status : " + jqXHR.status );
        }
        $("#conId").val(data.datos.id);
        $("#conTitulo").val(data.datos.titulo);
        $("#conDetalle").val(data.datos.detalle);  

        deshabilitaform();
        $("#Accion").val(action);

        $('#myModal').on('shown.bs.modal', function () {
            var modal = $(this);
            if (action === 'actualizar'){
                modal.find('.modal-title-form').text('Actualizar Contacto');
                $('#guardar-agenda').hide();                    
                $('#actualizar-agenda').show();   
            }else if (action === 'ver'){
                modal.find('.modal-title-form').text('Ver Recordatorio');
                deshabilitabotones();
               $('#editar-agenda').show();   
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
function deleteagenda(idAgenda, nameAgenda){     
    document.formDeleteAgenda.conId.value = idAgenda;
    document.formDeleteAgenda.nameAgenda.value = nameAgenda;
    document.formDeleteAgenda.Accion.value = "eliminar";
    $('#myModalDelete').on('shown.bs.modal', function () {
        $('#myInput').focus()
    });
}  