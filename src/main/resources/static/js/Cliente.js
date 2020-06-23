function ClienteController(option){
	$("#msg").hide();
	$("#msg").removeClass("alert-success").addClass("alert-danger");
	var token = $("meta[name='_csrf']").attr("content");
	switch(option){
	
	case "list":
		$.ajax({
			type : "post",
			headers: {"X-CSRF-TOKEN": token}, //send CSRF token in header
			url : "/Cliente/list",
			success : function(res){
				$("#clienteTable").bootstrapTable('load',res);
				$("#clienteTable tbody").on('click','tr', function(){
					$("#id_cliente").val($(this).find("td:eq(0)").text());
					$("#nombre_cl").val($(this).find("td:eq(1)").text());
					$("#direccion").val($(this).find("td:eq(2)").text());
					$("#telefono").val($(this).find("td:eq(3)").text());
					$("#email").val($(this).find("td:eq(4)").text());
					$("#id_comuna").val($(this).find("td:eq(5)").text());
					$("#id_giro").val($(this).find("td:eq(6)").text());
					$("#myModal").click()
				});
				$("#myModal").modal({show:true})
			},
			error : function(){
				$("#msg").show();
				$("#msg").html("Error en la busqueda de Cliente");
			}
		});
		break;
		
	case "get":
		$.ajax({
			type : "post",
			headers: {"X-CSRF-TOKEN": token}, //send CSRF token in header
			url : "/Cliente/get",
			data: "id_cliente=" + $("#id_cliente").val(),
			success : function(res){
				if (res== null || res==""){
					$("#msg").show();
					$("#msg").html("Registro no encontrado")
				}else{
					$("#id_cliente").val(res.Id_cliente);
					$("#nombre_cl").val(res.Nombre_cl);
					$("#direccion").val(res.Direccion);
					$("#telefono").val(res.Telefono);
					$("#email").val(res.Email);
					$("#id_comuna").val(res.Id_comuna);
					$("#id_giro").val(res.Id_giro);
					
				}
			},
			error : function(){
				$("#msg").show();
				$("#msg").html("Error en busqueda de Cliente");
			}
		});
		break;
	case "insert":
		var json = 
	{
			'id_cliente' : $("#id_cliente").val(),
			'nombre_cl' : $("#nombre_cl").val(),
			'direccion' : $("#direccion").val(),
			'telefono' : $("#telefono").val(),
			'email' : $("#email").val(),
			'id_comuna' : $("#id_comuna").val(),
			'id_giro' : $("#id_giro").val(),
					
	}
		var postData= JSON.stringify(json);
		
		$.ajax({
			type : "post",
			headers: {"X-CSRF-TOKEN": token}, //send CSRF token in header
			url : "/Cliente/insert",
			data: postData,
			contentType : "application/json; charset=utf-8",
			success : function(res){
				if (res== 1){
					$("#msg").removeClass("alert-danger").addClass("alert-success")
					$("#msg").show();
					$("#msg").html("Registro insertado correctamente")
				}else{
					$("#msg").show();
					$("#msg").html("Error al agregar registro")
				}
			},
			error : function(){
				$("#msg").show();
				$("#msg").html("Error al agregar registro");
			}
		});
		break;
		
	case "update":
		var json = 
	{
			'id_cliente' : $("#id_cliente").val(),
			'nombre_cl' : $("#nombre_cl").val(),
			'direccion' : $("#direccion").val(),
			'telefono' : $("#telefono").val(),
			'email' : $("#email").val(),
			'id_comuna' : $("#id_comuna").val(),
			'id_giro' : $("#id_giro").val(),
	
	}
	
		var postData= JSON.stringify(json);
		
		$.ajax({
			type : "post",
			headers: {"X-CSRF-TOKEN": token}, //send CSRF token in header
			url : "/Cliente/update",
			data: postData,
			contentType : "application/json; charset=utf-8",
			success : function(res){
				if (res== 1){
					$("#msg").removeClass("alert-danger").addClass("alert-success")
					$("#msg").show();
					$("#msg").html("Registro actualizado correctamente")
				}else{
					$("#msg").show();
					$("#msg").html("Error al actualizar registro")
				}
			},
			error : function(){
				$("#msg").show();
				$("#msg").html("Error al actualizar registro");
			}
		});
		break;
		
	case "delete":
		$.ajax({
			type : "post",
			headers: {"X-CSRF-TOKEN": token}, //send CSRF token in header
			url : "/Cliente/delete",
			data: "id_cliente=" + $("#id_cliente").val(),
			success : function(res){
				if (res==1){
					$("#msg").removeClass("alert-danger").addClass("alert-success")
					$("#msg").show();
					$("#msg").html("Registro eliminado con exito")
				}else{
					$("#msg").show();
					$("#msg").html("Registro no se pudo eliminar ")
				}
			},
			error : function(){
				$("#msg").show();
				$("#msg").html("Error al eliminar");
			}
		});
		break;
	default:
			$("#msg").show();
			$("#msg").html("Opcion no valida");
	}
}