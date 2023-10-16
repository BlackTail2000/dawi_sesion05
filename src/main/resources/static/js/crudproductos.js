const modeloProducto = {
	idProd: "",
	desProd: "",
	stkProd: 0,
	preProd: 0.0,
	idcategoria: -1,
	estProd: -1,
	idproveedor: -1
}

var productoData1;

async function ObtenerProductos(){
	const response = await fetch("/productos");
	const responseJson = await response.json();
	return responseJson;
}

function ListarProductos(productoData){
	$(".table tbody").html("");
	if(productoData.length > 0){
		productoData.forEach((producto) => {
			$(".table tbody").append(
				$("<tr>").append(
					$("<td>").append(
						$("<img>").attr("src", "/img/productos/" + producto.idProd + ".png").attr("alt", producto.idProd).css({ width: "100px"})
					),
					$("<td>").text(producto.desProd),
					$("<td>").text(producto.stkProd),
					$("<td>").text(producto.preProd),
					$("<td>").text(producto.categoria.descripcion),
					$("<td>").text(producto.proveedor.nombreRS),
					$('<td class="text-center">').append(
						$('<button class="btn btn-primary btn-editar">')
						.data("dataProducto", producto).text("Editar")
					),
					$('<td class="text-center">').append(
						$('<button class="btn btn-primary btn-eliminar">')
						.data("dataProducto", producto).text("Eliminar")
					)
				)
			)
		})
	}
}

function CargarCategorias(){
	fetch("/categorias").then(response => {
		return response.ok ? response.json() : Promise.reject(response)
	}).then(responseJson => {
		if(responseJson.length > 0){
			responseJson.forEach((categoria) => {
				$("#inputCat").append(
					$("<option>").val(categoria.idcategoria).text(categoria.descripcion)
				)
			})
		}
	})
}

function CargarProveedores(){
	fetch("/proveedores").then(response => {
		return response.ok ? response.json() : Promise.reject(response)
	}).then(responseJson => {
		if(responseJson.length > 0){
			responseJson.forEach((proveedor) => {
				$("#inputProv").append(
					$("<option>").val(proveedor.idproveedor).text(proveedor.nombreRS)
				)
			})
		}
	})
}

function CargarFormulario(){
	$("#inputCod").val(modeloProducto.idProd);
	$("#inputNom").val(modeloProducto.desProd);
	$("#inputStk").val(modeloProducto.stkProd);
	$("#inputPrec").val(modeloProducto.preProd);
	$("#inputCat").val(modeloProducto.idcategoria);
	$("#inputEstado").val(modeloProducto.estProd);
	$("#inputProv").val(modeloProducto.idproveedor);
}

function ProcesarProducto(operacion, modelo){
	let tipoMetodo;
	
	if(operacion == "registrar")
	    tipoMetodo = "POST";
	else
	    tipoMetodo = "PUT";
	    
	fetch("/procesar", {
		method: tipoMetodo,
		headers: { "Content-Type": "application/json;charset=utf-8" },
		body: JSON.stringify(modelo)
	}).then(response => {
		return response.ok ? response.json() : Promise.reject(response)
	}).then(responseJson => {
		if(responseJson != null){
			return Promise.all([ObtenerProductos()]);
		}
	}).then(([data1]) => {
		productoData1 = data1;
		ListarProductos(productoData1);
	})
}

document.addEventListener("DOMContentLoaded", async function() {
	productoData1 = await ObtenerProductos();
	
	ListarProductos(productoData1);
	CargarCategorias();
	CargarProveedores();
})

$(document).on("click", ".btn-cancelar", function() {
	modeloProducto.idProd = "";
	modeloProducto.desProd = "";
	modeloProducto.stkProd = 0;
	modeloProducto.preProd = 0.0;
	modeloProducto.idcategoria = -1;
	modeloProducto.estProd = -1;
	modeloProducto.idproveedor = -1;
	
	$("#botones .btn-cancelar").remove();
	$("#inputCod").prop("readonly", false);
	$("#mensaje").html("");
	
	CargarFormulario();
})

$(document).on("click", ".btn-editar", function() {
	const producto = $(this).data("dataProducto");
	
	modeloProducto.idProd = producto.idProd;
	modeloProducto.desProd = producto.desProd;
	modeloProducto.stkProd = producto.stkProd;
	modeloProducto.preProd = producto.preProd;
	modeloProducto.idcategoria = producto.categoria.idcategoria;
	modeloProducto.estProd = producto.estProd;
	modeloProducto.idproveedor = producto.proveedor.idproveedor;
	
	$("#botones .btn-cancelar").remove();
	
	$("#botones").append(
		$('<button type="button" class="btn btn-primary btn-cancelar">').text("Cancelar")
	)
	
	$("#inputCod").prop("readonly", true);
	$("#mensaje").html("");
	
	CargarFormulario();
})

$(document).on("click", ".btn-procesar", function(){
	const modelo = {
		idProd: $("#inputCod").val(),
		desProd: $("#inputNom").val(),
		stkProd: $("#inputStk").val(),
		preProd: $("#inputPrec").val(),
		categoria: {
			idcategoria: $("#inputCat").val()
		},
		estProd: $("#inputEstado").val(),
		proveedor: {
			idproveedor: $("#inputProv").val()
		}
	}
	
	if(!/^P\d{4}$/.test(modelo.idProd)){
		$("#mensaje").html("Debe ingresar el Id siguiendo este patrón: PXXXX (donde X es un número)");
		return;
	} else if(productoData1.some(producto => producto.idProd === modelo.idProd) && !$("#inputCod").prop("readonly")){
		$("#mensaje").html("El Id ingresado ya existe");
		return;
	} else if(modelo.desProd.trim() === ""){
		$("#mensaje").html("Ingresar descripción");
		return;
	} else if(modelo.desProd.trim().length > 45){
		$("#mensaje").html("La descripción no puede contener más de 45 caracteres");
		return;
	} else if(productoData1.some(producto => producto.desProd === modelo.desProd && producto.idProd !== modelo.idProd)){
		$("#mensaje").html("La descripción ingresada ya existe");
		return;
	} else if(modelo.stkProd < 0){
		$("#mensaje").html("El stock no puede ser negativo");
		return;
	} else if(modelo.preProd <= 0){
		$("#mensaje").html("El precio no puede ser cero ni negativo");
		return;
	} else if(modelo.categoria.idcategoria == -1){
		$("#mensaje").html("Seleccionar una categoría");
		return;
	} else if(modelo.estProd == -1){
		$("#mensaje").html("Seleccionar un estado");
		return;
	} else if(modelo.proveedor.idproveedor == -1){
		$("#mensaje").html("Seleccionar un proveedor");
		return;
	}
	
	if(productoData1.some(producto => producto.idProd === modelo.idProd))
	    ProcesarProducto("registrar", modelo);
	else
	    ProcesarProducto("actualizar", modelo);
	
	$("#mensaje").html("Producto guardado.");
})

$(document).on("click", ".btn-eliminar", function(){
	const producto = $(this).data("dataProducto");
	
	const modelo = {
		idProd: producto.idProd,
		desProd: producto.desProd,
		stkProd: producto.stkProd,
		preProd: producto.preProd,
		categoria: {
			idcategoria: producto.categoria.idcategoria
		},
		estProd: 0,
		proveedor: {
			idproveedor: producto.proveedor.idproveedor
		}
	}
	
	ProcesarProducto("actualizar", modelo);
})