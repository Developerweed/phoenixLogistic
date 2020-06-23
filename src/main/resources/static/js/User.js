function UsersController(option){
	$("#msg").hide();
	$("#msg").removeClass("alert-success").addClass("alert-danger");
	var token = $("meta[name='_csrf']").attr("content");
	switch(option){
	
	case "list":
		$.ajax({
			type : "post",
			headers: {"X-CSRF-TOKEN": token}, //send CSRF token in header
			url : "/User/list",
			success : function(res){
				$("#userTable").bootstrapTable('load',res);
				$("#userTable tbody").on('click','tr', function(){
					$("#user_id").val($(this).find("td:eq(0)").text());
					$("#username").val($(this).find("td:eq(1)").text());
					$("#password").val($(this).find("td:eq(2)").text());
					$("#enabled").val($(this).find("td:eq(3)").text());
					$("#rol").val($(this).find("td:eq(4)").text());
					$("#myModal").click()
				});
				$("#myModal").modal({show:true})
			},
			error : function(){
				$("#msg").show();
				$("#msg").html("Error en la busqueda de usuario");
			}
		});
		break;
		
	case "get":
		$.ajax({
			type : "post",
			headers: {"X-CSRF-TOKEN": token}, //send CSRF token in header
			url : "/User/get",
			data: "user_id=" + $("#user_id").val(),
			success : function(res){
				if (res== null || res==""){
					$("#msg").show();
					$("#msg").html("Registro no encontrado")
				}else{
					$("#user_id").val(res.user_id);
					$("#username").val(res.username);
					$("#password").val(res.password);
					$("#enabled").val(res.enabled);
					$("#rol").val(res.rol);
				}
			},
			error : function(){
				$("#msg").show();
				$("#msg").html("Error en busqueda de usuario");
			}
		});
		break;
	case "insert":
		var json = 
	{
			'user_id' : $("#user_id").val(),
			'username' : $("#username").val(),
			'password' : $("#password").val(),
			'enabled' : $("#enabled").val(),
			'rol' : $("#rol").val()
	}
		var postData= JSON.stringify(json);
		
		$.ajax({
			type : "post",
			headers: {"X-CSRF-TOKEN": token}, //send CSRF token in header
			url : "/User/insert",
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
			'user_id' : $("#user_id").val(),
			'username' : $("#username").val(),
			'password' : $("#password").val(),
			'enabled' : $("#enabled").val(),
			'rol' : $("#rol").val()
	
	}
	
		var postData= JSON.stringify(json);
		
		$.ajax({
			type : "post",
			headers: {"X-CSRF-TOKEN": token}, //send CSRF token in header
			url : "/User/update",
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
			url : "/User/delete",
			data: "user_id=" + $("#user_id").val(),
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