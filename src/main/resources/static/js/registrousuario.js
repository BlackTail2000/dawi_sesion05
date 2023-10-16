var usuarioData1;

async function ObtenerUsuarios() {
	const response = await fetch("/usuarios");
	const responseJson = await response.json();
	return responseJson;
}

document.addEventListener("DOMContentLoaded", async function(){
	usuarioData1 = await ObtenerUsuarios();
})

$(document).on("click", ".btn-registrar", function() {
	
	let fechaInput = new Date($("#fnaUsua").val());
	let año = fechaInput.getFullYear();
	let mes = (fechaInput.getMonth() + 1).toString().padStart(2, '0');
	let dia = (fechaInput.getDate() + 1).toString().padStart(2, '0');
	
	modeloUsuario = {
		nomUsua: $("#nomUsua").val(),
		apeUsua: $("#apeUsua").val(),
		correo: $("#correo").val(),
		clave: $("#clave").val(),
		fnaUsua: año + "-" + mes + "-" + dia,
		tipo: {
			idtipo: 2
		},
		estUsua: 1
	}
	
	console.log(modeloUsuario.fnaUsua)
	
	if(modeloUsuario.nomUsua.trim() === ""){
		$("#mensaje").html("Ingresar nombre");
		return;
	} else if(modeloUsuario.nomUsua.length > 15){
		$("#mensaje").html("Nombre no puede contener más de 15 caracteres");
		return;
	} else if(modeloUsuario.apeUsua.trim() === ""){
		$("#mensaje").html("Ingresar apellido");
		return;
	} else if(modeloUsuario.apeUsua.length > 25){
		$("#mensaje").html("Apellido no puede contener más de 25 caracteres");
		return;
	} else if(modeloUsuario.correo.trim() === ""){
		$("#mensaje").html("Ingresar correo");
		return;
	} else if(modeloUsuario.correo.length > 45){
		$("#mensaje").html("Correo no puede contener más de 45 caracteres");
		return;
	} else if(usuarioData1.some(usuario => usuario.correo === modeloUsuario.correo)){
		$("#mensaje").html("Ya existe un usuario registrado con ese correo");
		return;
	} else if(modeloUsuario.clave.trim() === ""){
		$("#mensaje").html("Ingresar contraseña");
		return;
	} else if(modeloUsuario.clave.length > 100){
		$("#mensaje").html("Contraseña no puede contener más de 100 caracteres");
		return;
	} else if(modeloUsuario.fnaUsua === "NaN-NaN-NaN"){
		$("#mensaje").html("Ingresar fecha de nacimiento");
		return;
	}
	
	var fechaNacimiento = new Date(modeloUsuario.fnaUsua);
	var edadUsuario = new Date().getFullYear() - fechaNacimiento.getFullYear();
	
	if(edadUsuario < 18){
		$("#mensaje").html("Debes ser mayor de 18 años para registrarte");
		return;
	}
	
	fetch("/registrarcuenta", {
		method: "POST",
		headers: { "Content-Type": "application/json;charset=utf-8" },
		body: JSON.stringify(modeloUsuario)
	}).then(response => {
		return response.ok ? response.json() : Promise.reject(response)
	}).then(responseJson => {
		if(responseJson != null){
			$("#mensaje").html("Se ha registrado en el sistema. <br> En unos segundos volverá a la página de inicio.");
			$("input").val("");
			setTimeout(function() {
				window.location.href= "http://localhost:8080/login";
			}, 5000);
		}
	})
})