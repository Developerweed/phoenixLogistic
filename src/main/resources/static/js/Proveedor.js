function ProveedorController(option){
	$("#msg").hide();
	$("#msg").removeClass("alert-success").addClass("alert-danger");
	var token = $("meta[name='_csrf']").attr("content");
	switch(option){
	
	case "list":
		$.ajax({
			type : "post",
			headers: {"X-CSRF-TOKEN": token}, //send CSRF token in header
			url : "/proveedor/list",
			success : function(res){
				$("#proveedorTable").bootstrapTable('load',res);
				$("#proveedorTable tbody").on('click','tr', function(){
					$("#Id_proveedor").val($(this).find("td:eq(0)").text());
					$("#Nombre_proveedor").val($(this).find("td:eq(1)").text());
					$("#Id_giro").val($(this).find("td:eq(2)").text());
					$("#Contacto").val($(this).find("td:eq(3)").text());
					$("#Email").val($(this).find("td:eq(4)").text());
					$("#Direccion").val($(this).find("td:eq(5)").text());
					$("#Id_comuna").val($(this).find("td:eq(6)").text());
					$("#Id_reg").val($(this).find("td:eq(7)").text());
					$("#Id_pais").val($(this).find("td:eq(8)").text());
					$("#Id_tproveedor").val($(this).find("td:eq(9)").text());
					$("#myModal").click()
				});
				$("#myModal").modal({show:true})
			},
			error : function(){
				$("#msg").show();
				$("#msg").html("Error en la busqueda de Proveedor");
			}
		});
		break;
		
	case "get":
		$.ajax({
			type : "post",
			headers: {"X-CSRF-TOKEN": token}, //send CSRF token in header
			url : "/proveedor/get",
			data: "Id_proveedor=" + $("#Id_proveedor").val(),
			success : function(res){
				if (res== null || res==""){
					$("#msg").show();
					$("#msg").html("Registro no encontrado")
				}else{
					$("#Id_proveedor").val(res.Id_proveedor);
					$("#Nombre_proveedor").val(res.Nombre_proveedor);
					$("#Id_giro").val(res.Id_giro);
					$("#Contacto").val(res.Contacto);
					$("#Email").val(res.Email);
					$("#Direccion").val(res.Direccion);
					$("#Id_comuna").val(res.Id_comuna);
					$("#Id_reg").val(res.Id_reg);
					$("#Id_pais").val(res.Id_pais);
					$("#Id_tproveedor").val(res.Id_tproveedor);
					
				}
			},
			error : function(){
				$("#msg").show();
				$("#msg").html("Error en busqueda de Proveedor");
			}
		});
		break;
	case "insert":
		var json = 
	{
			'Id_proveedor' : $("#Id_proveedor").val(),
			'Nombre_proveedor' : $("#Nombre_proveedor").val(),
			'Id_giro' : $("#Id_giro").val(),
			'Contacto' : $("#Contacto").val(),
			'Email' : $("#Email").val(),
			'Direccion' : $("#Direccion").val(),
			'Id_comuna' : $("#Id_comuna").val(),
			'Id_reg' : $("#Id_reg").val(),
			'Id_pais' : $("#Id_pais").val(),
			'Id_tproveedor' : $("#Id_tproveedor").val(),
					
	}
		var postData= JSON.stringify(json);
		
		$.ajax({
			type : "post",
			headers: {"X-CSRF-TOKEN": token}, //send CSRF token in header
			url : "/proveedor/insert",
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
			'Id_proveedor' : $("#Id_proveedor").val(),
			'Nombre_proveedor' : $("#Nombre_proveedor").val(),
			'Id_giro' : $("#Id_giro").val(),
			'Contacto' : $("#Contacto").val(),
			'Email' : $("#Email").val(),
			'Direccion' : $("#Direccion").val(),
			'Id_comuna' : $("#Id_comuna").val(),
			'Id_reg' : $("#Id_reg").val(),
			'Id_pais' : $("#Id_pais").val(),
			'Id_tproveedor' : $("#Id_tproveedor").val(),
	
	}
	
		var postData= JSON.stringify(json);
		
		$.ajax({
			type : "post",
			headers: {"X-CSRF-TOKEN": token}, //send CSRF token in header
			url : "/proveedor/update",
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
			url : "/proveedor/delete",
			data: "Id_proveedor=" + $("#Id_proveedor").val(),
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