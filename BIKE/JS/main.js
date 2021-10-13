/* ------------------------------------------------------ MENU PARA BIKE------------------------------- */
function  menu(valor){
    if(valor == "bike"){
        $("#bike-form").removeClass("d-none");
        $("#usuario-form").addClass("d-none");
        $("#message-form").addClass("d-none");
    }
    else if(valor == "user"){
        $("#bike-form").addClass("d-none");
        $("#usuario-form").removeClass("d-none");
        $("#message-form").addClass("d-none");
    }
    else if(valor == "message"){
        $("#bike-form").addClass("d-none");
        $("#usuario-form").addClass("d-none");
        $("#message-form").removeClass("d-none");
    }
}
/* -------------------------------------------------- END MENU PARA BIKE------------------------------- */

/* ----------------- --------------------------------------- BIKE-------------------------------------- */
/* ----------------- Consultar ID Elementos para BIKE--------------- */
function consultarbikeid(idElemento) {
    var id = idElemento;
    $.ajax(
        {
            url: 'https://g6c8f2f384f4c60-db202110011209.adb.sa-santiago-1.oraclecloudapps.com/ords/admin/bike/bike/' + id,
            type: 'GET',
            dataType: 'json',
            success: function (json) {
                for (i = 0; i < json.items.length; i++) {
                    var id          =   json.items[i].id;
                    var brand       =   json.items[i].brand;
                    var model       =   json.items[i].model;
                    var category_id =   json.items[i].category_id;
                    var name        =   json.items[i].name;     
                }
                    $("#id_update").val(id);
                    $("#brand_update").val(brand);
                    $("#model_update").val(model);
                    $("#category_id_update").val(category_id);
                    $("#name_update").val(name); 
                console.log(json)
            },
            error: function (xhr, status) {
                alert('Operacion no satisfactoria,' + xhr.status);
            },
        }
    );
}
/* --------------END Consultar ID Elementos para BIKE--------------- */
/* --------------------- Listar Elementos para BIKE----------------- */
function listarElementos(items){
    
    let myTable="<table class='table table-hover'><thead>";
        myTable+="<tr><th scope='col'>ID</th>";
        myTable+="<th scope='col'>BRAND</th>";
        myTable+="<th scope='col'>MODEL</th>";
        myTable+="<th scope='col'>CATEGORY</th>";
        myTable+="<th scope='col'>NAME</th>";
        myTable+="<th scope='col'>DETALLE</th>";
        myTable+="<th scope='col'>DELETE</th>";
        myTable+="</tr></thead>";
    for(i=0;i<items.length;i++){
        myTable+="<tbody><tr>";
        myTable+="<td scope='row'>" + items[i].id + "</td>";
        myTable+="<td>" + items[i].brand + "</td>";
        myTable+="<td>" + items[i].model + "</td>";
        myTable+="<td>" + items[i].category_id + "</td>";
        myTable+="<td>" + items[i].name + "</td>";
        myTable+="<td><button data-toggle='modal' data-target='#modalBike' class='btn btn-outline-success' onclick='consultarbikeid("+items[i].id+")'> Detalle</button></td>";
        myTable+="<td><button class='btn btn-outline-danger' onclick='borrarElemento("+items[i].id+")'>Delete</button></td>";
        myTable+="</tr></tbody>";
    }
    myTable+="</table>";
    $("#idDivConsulta").append(myTable);
}
/* ------------ End Listar Elementos para BIKE---------------------- */
/* -------------- Agregar Elementos para BIKE----------------------- */
function agregarElementos() {

    let myData = {
        id          :   $("#id").val(),
        brand       :   $("#brand").val(),
        model       :   $("#model").val(),
        category_id :   $("#category_id").val(),
        name        :   $("#name").val()
    };
    
    $.ajax (
        {

            url          : 'https://g6c8f2f384f4c60-db202110011209.adb.sa-santiago-1.oraclecloudapps.com/ords/admin/bike/bike',
            type         : 'POST',
            data         :  myData,
            dataType     : 'json',

            success      :  function(response){
                                alert("Se ha Agregado satisfactoriamente");
                                $("#id").val("");
                                $("#brand").val("");
                                $("#model").val("");
                                $("#category_id").val("");
                                $("#nombre").val("");
                               console.log(response);
                               
                            },
            error       :   function(xhr,status){
                            console.log( xhr);
                            }


        }
    );
}
/* ------------------- END Agregar Elementos para BIKE-------------- */
/* --------------------- Consultar Elementos para BIKE-------------- */
function consultar() {
    $.ajax(
             {
                url          : 'https://g6c8f2f384f4c60-db202110011209.adb.sa-santiago-1.oraclecloudapps.com/ords/admin/bike/bike',
                type         : 'GET',
                dataType     : 'json',
                success      :  function(respuesta){
                                $("#idDivConsulta").empty();
                                   listarElementos(respuesta.items);
                                    console.log(respuesta);
                                },

                 error       :  function(xhr,status){
                                    console.log(xhr)
                                }


             }


          );
}
/* ----------END Consultar Elementos para BIKE---------------------- */

/* --------------- Actualizar Elementos para BIKE------------------- */
function actualizar() {

    myData       = {
        id          :   $("#id_update").val(),
        brand       :   $("#brand_update").val(),
        model       :   $("#model_update").val(),
        category_id :   $("#category_id_update").val(),
        name        :   $("#name_update").val()};
    datosEnvio   = JSON.stringify(myData);


    $.ajax (
                {

                    url          : 'https://g6c8f2f384f4c60-db202110011209.adb.sa-santiago-1.oraclecloudapps.com/ords/admin/bike/bike',
                    type         : 'PUT',
                    data         :  datosEnvio,
                    contentType  : 'application/json',

                    success      :  function(response){
                                        console.log(response);
                                        alert("Se ha actualizado satisfactoriamente");
                                        consultar();
                                    },
                    error       :   function(xhr,status){
                                        console.log( xhr);

                                    }

                }
            );



}
/* --------------- END Actualizar Elementos para BIKE---------------- */

/* -------------- Borrar Elementos para BIKE------------------------- */
function borrarElemento(idElemento){
    let myData={
        id : idElemento
    };

        dataToSend= JSON.stringify(myData);
    $.ajax({
        
        url          : 'https://g6c8f2f384f4c60-db202110011209.adb.sa-santiago-1.oraclecloudapps.com/ords/admin/bike/bike',
        type         : 'DELETE',
        data         :  dataToSend,
        contentType  : 'application/json',

        success      :function(respuesta){
                       consultar();
                       console.log(respuesta);
                        
        },
        error       :   function(xhr,status){
                    console.log( xhr);

            }

    });
}
/* ----------END Borrar Elementos para BIKE------------------ */
/*  ---------------------------------------------------------------END  BIKE --------------------------------------------------- */


/*  ---------------------------------------------------------------------USUARIO ----------------------------------------------- */
/* -------- Consultar ID Elementos para Usuario----------------- */
function consultarUsuarioId(idElemento) {
    var id = idElemento;
    $.ajax(
        {
            url: 'https://g6c8f2f384f4c60-db202110011209.adb.sa-santiago-1.oraclecloudapps.com/ords/admin/client/client/' + id,
            type: 'GET',
            dataType: 'json',
            success: function (json) {
                for (i = 0; i < json.items.length; i++) {
                    var id_usuario      =   json.items[i].id;
                    var name_usuario    =   json.items[i].name;
                    var email_usuario   =   json.items[i].email;
                    var age_usuario     =   json.items[i].age;  
                }
                    $("#id_usuario_update").val(id_usuario);
                    $("#name_usuario_update").val(name_usuario);
                    $("#email_usuario_update").val(email_usuario);
                    $("#age_usuario_update").val(age_usuario);
                console.log(json)
            },
            error: function (xhr, status) {
                alert('Operacion no satisfactoria,' + xhr.status);
            },
        }
    );
}
/* --------------END Consultar ID Elementos para USER----------------- */
/* -------------- Listar Elementos para USER-------------------------- */
function listarElementosUsuario(items){
    
    let myTable="<table class='table table-hover'><thead>";
        myTable+="<tr><th scope='col'>ID</th>";
        myTable+="<th scope='col'>NAME</th>";
        myTable+="<th scope='col'>EMAIL</th>";
        myTable+="<th scope='col'>AGE</th>";
        myTable+="<th scope='col'>DETALLE</th>";
        myTable+="<th scope='col'>DELETE</th>";
        myTable+="</tr></thead>";
    for(i=0;i<items.length;i++){
        myTable+="<tbody><tr>";
        myTable+="<td scope='row'>" + items[i].id + "</td>";
        myTable+="<td>" + items[i].name + "</td>";
        myTable+="<td>" + items[i].email + "</td>";
        myTable+="<td>" + items[i].age + "</td>";
        myTable+="<td><button data-toggle='modal' data-target='#modalUser' class='btn btn-outline-success' onclick='consultarUsuarioId("+items[i].id+")'> Detalle</button></td>";
        myTable+="<td><button class='btn btn-outline-danger' onclick='borrarElementoUsuario("+items[i].id+")'>Delete</button></td>";
        myTable+="</tr></tbody>";
    }
    myTable+="</table>";
    $("#idDivConsultaUsuario").append(myTable);
}
/* --------------- End Listar Elementos para USER------------------------ */
/* ----------------- Agregar Elementos para usuario---------------------- */
function agregarElementosUsuario() {

    let myData = {
        id      :   $("#id_usuario").val(),
        name    :   $("#name_usuario").val(),
        email   :   $("#email_usuario").val(),
        age     :   $("#age_usuario").val()
    };
    
    $.ajax (
        {

            url          : 'https://g6c8f2f384f4c60-db202110011209.adb.sa-santiago-1.oraclecloudapps.com/ords/admin/client/client',
            type         : 'POST',
            data         :  myData,
            dataType     : 'json',

            success      :  function(response){
                                alert("Se ha Agregado satisfactoriamente");
                                $("#id_usuario").val("");
                                $("#name_usuario").val("");
                                $("#email_usuario").val("");
                                $("#age_usuario").val("");
                                consultarElementosUsuario();
                               console.log(response);
                               
                            },
            error       :   function(xhr,status){
                            console.log( xhr);
                            }


        }
    );
}
/* ---------------- END Agregar Elementos para usuario--------------------- */
/* --------------- Consultar Elementos para USUARIO------------------------ */
function consultarElementosUsuario() {
    $.ajax(
             {
                url          : 'https://g6c8f2f384f4c60-db202110011209.adb.sa-santiago-1.oraclecloudapps.com/ords/admin/client/client',
                type         : 'GET',
                dataType     : 'json',
                success      :  function(respuesta){
                                $("#idDivConsultaUsuario").empty();
                                   listarElementosUsuario(respuesta.items);
                                    console.log(respuesta);
                                },

                 error       :  function(xhr,status){
                                    console.log(xhr)
                                }


             }


          );
}
/* ---------------END Consultar Elementos para Usuario------------------------- */
/* --------------- Actualizar Elementos para USUARIO------------------------------ */
function actualizarElementosUsuario() {

    myData       = {
        id          :   $("#id_usuario_update").val(),
        name        :   $("#name_usuario_update").val(),
        email       :   $("#email_usuario_update").val(),
        age         :   $("#age_usuario_update").val()
    };
    datosEnvio   = JSON.stringify(myData);


    $.ajax (
                {

                    url          : 'https://g6c8f2f384f4c60-db202110011209.adb.sa-santiago-1.oraclecloudapps.com/ords/admin/client/client',
                    type         : 'PUT',
                    data         :  datosEnvio,
                    contentType  : 'application/json',

                    success      :  function(response){
                                        console.log(response);
                                        alert("Se ha actualizado satisfactoriamente");
                                        consultarElementosUsuario();
                                    },
                    error       :   function(xhr,status){
                                        console.log( xhr);

                                    }

                }
            );



}
/* ------------- END Actualizar Elementos para USUARIO--------------------- */
/* -------------- Borrar Elementos para Usuario------------------------- */
function borrarElementoUsuario(idElemento){
    let myData={
        id : idElemento
    };

        dataToSend= JSON.stringify(myData);
    $.ajax({
        
        url          : 'https://g6c8f2f384f4c60-db202110011209.adb.sa-santiago-1.oraclecloudapps.com/ords/admin/client/client',
        type         : 'DELETE',
        data         :  dataToSend,
        contentType  : 'application/json',

        success      :function(respuesta){
                        consultarElementosUsuario();
                        console.log(respuesta);
                        
        },
        error       :   function(xhr,status){
                    console.log( xhr);

            }

    });
}
/* --------------END Borrar Elementos para USUARIO------------------ */
/*  ----------------------------------------------------------END  USUARIO ------------------------------------------------ */
/*  -----------------------------------------------------------  MESSAGE -------------------------------------------------- */
/* -------- Consultar ID Elementos para MENSAJE----------------- */
function consultarMensajeId(idElemento) {
    var id = idElemento;
    $.ajax(
        {
            url: 'https://g6c8f2f384f4c60-db202110011209.adb.sa-santiago-1.oraclecloudapps.com/ords/admin/message/message/' + id,
            type: 'GET',
            dataType: 'json',
            success: function (json) {
                for (i = 0; i < json.items.length; i++) {
                    var id_mensaje     =   json.items[i].id;
                    var messagetext   =   json.items[i].messagetext; 
                }
                    $("#id_mensaje_update").val(id_mensaje);
                    $("#menssajetext_update").val(messagetext);
                console.log(json)
            },
            error: function (xhr, status) {
                alert('Operacion no satisfactoria,' + xhr.status);
            },
        }
    );
}
/* --------------END Consultar ID Elementos para MENSAJE----------------- */
/* -------------- Listar Elementos para mensaje-------------------------- */
function listarElementosMensaje(items){
    
    let myTable="<table class='table table-hover'><thead>";
        myTable+="<tr><th scope='col'>ID</th>";
        myTable+="<th scope='col'>MENSAJE</th>";
        myTable+="<th scope='col'>DETALLE</th>";
        myTable+="<th scope='col'>DELETE</th>";
        myTable+="</tr></thead>";
    for(i=0;i<items.length;i++){
        myTable+="<tbody><tr>";
        myTable+="<td scope='row'>" + items[i].id + "</td>";
        myTable+="<td>" + items[i].messagetext + "</td>";
        myTable+="<td><button data-toggle='modal' data-target='#modalMensaje' class='btn btn-outline-success' onclick='consultarMensajeId("+items[i].id+")'> Detalle</button></td>";
        myTable+="<td><button class='btn btn-outline-danger' onclick='borrarElementoMensaje("+items[i].id+")'>Delete</button></td>";
        myTable+="</tr></tbody>";
    }
    myTable+="</table>";
    $("#idDivConsultaMensaje").append(myTable);
}
/* --------------- End Listar Elementos para MENSAJE------------------------ */
/* ----------------- Agregar Elementos para MENSAJE---------------------- */
function agregarElementosMensaje() {

    let myData = {
        id              :   $("#id_mensaje").val(),
        messagetext    :   $("#messagetext").val()
    };
    
    $.ajax (
        {

            url          : 'https://g6c8f2f384f4c60-db202110011209.adb.sa-santiago-1.oraclecloudapps.com/ords/admin/message/message',
            type         : 'POST',
            data         :  myData,
            dataType     : 'json',

            success      :  function(response){
                                alert("Se ha Agregado satisfactoriamente");
                                $("#id_mensaje").val("");
                                $("#messagetext").val("");
                                consultarElementosMensaje();
                               console.log(response);
                               
                            },
            error       :   function(xhr,status){
                            console.log( xhr);
                            }


        }
    );
}
/* ---------------- END Agregar Elementos para MENSAJE--------------------- */
/* --------------- Consultar Elementos para MENSAJE------------------------ */
function consultarElementosMensaje() {
    $.ajax(
             {
                url          : 'https://g6c8f2f384f4c60-db202110011209.adb.sa-santiago-1.oraclecloudapps.com/ords/admin/message/message',
                type         : 'GET',
                dataType     : 'json',
                success      :  function(respuesta){
                                $("#idDivConsultaMensaje").empty();
                                listarElementosMensaje(respuesta.items);
                                    console.log(respuesta);
                                },

                 error       :  function(xhr,status){
                                    console.log(xhr)
                                }


             }


          );
}
/* ---------------END Consultar Elementos para MENSAJE------------------------- */
/* --------------- Actualizar Elementos para Mensaje------------------------------ */
function actualizarElementosMensaje() {

    myData       = {
        id                  :   $("#id_mensaje_update").val(),
        messagetext        :   $("#menssajetext_update").val()
    };
    datosEnvio   = JSON.stringify(myData);


    $.ajax (
                {

                    url          : 'https://g6c8f2f384f4c60-db202110011209.adb.sa-santiago-1.oraclecloudapps.com/ords/admin/message/message',
                    type         : 'PUT',
                    data         :  datosEnvio,
                    contentType  : 'application/json',

                    success      :  function(response){
                                        console.log(response);
                                        alert("Se ha actualizado satisfactoriamente");
                                        consultarElementosMensaje();
                                    },
                    error       :   function(xhr,status){
                                        console.log( xhr);

                                    }

                }
            );



}
/* ------------- END Actualizar Elementos para MENSAJE--------------------- */
/* -------------- Borrar Elementos para MENSAJE------------------------- */
function borrarElementoMensaje(idElemento){
    let myData={
        id : idElemento
    };

        dataToSend= JSON.stringify(myData);
    $.ajax({
        
        url          : 'https://g6c8f2f384f4c60-db202110011209.adb.sa-santiago-1.oraclecloudapps.com/ords/admin/message/message',
        type         : 'DELETE',
        data         :  dataToSend,
        contentType  : 'application/json',

        success      :function(respuesta){
                        consultarElementosMensaje();
                        console.log(respuesta);
                        
        },
        error       :   function(xhr,status){
                    console.log( xhr);

            }

    });
}
/* --------------END Borrar Elementos para mensaje------------------ */