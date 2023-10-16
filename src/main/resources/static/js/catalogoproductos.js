var productoData1;
var productoData2;

async function ObtenerProductos(){
	const response = await fetch("/productos");
	const responseJson = await response.json();
	return responseJson;
}

function CargarCategorias(){
	fetch("/categorias").then(response => {
		return response.ok ? response.json() : Promise.reject(response)
	}).then(responseJson => {
		if(responseJson.length > 0){
			responseJson.forEach((categoria) => {
				$("#inputCat").append(
					$("<option>").val(categoria.idcategoria).text(categoria.idcategoria + "-" + categoria.descripcion)
				)
			})
		}
	})
}

async function buscarPorCategoria(idcategoria){
	const response = await fetch(`/buscarPorCategoria/${idcategoria}`);
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
					$("<td>").append(
						$("<img>").attr("src", "img/edit1.png")
					)
				)
			)
		})
	}
}

document.addEventListener("DOMContentLoaded", async function() {
	productoData1 = await ObtenerProductos();
	productoData2 = await ObtenerProductos();
	
	ListarProductos(productoData1);
	CargarCategorias();
})

$(document).on("click", ".btn-consultar", async function(){
	let idcategoria = $("#inputCat").val();
	
	if(idcategoria==-1){
		$("#mensaje").html("Seleccionar categoría");
		return;
	}
	    
	$("#mensaje").html("");
	productoData2 = await buscarPorCategoria(idcategoria);
	
	ListarProductos(productoData2);
})

$(document).on("click", ".btn-listar-todo", async function(){
	$("#mensaje").html("");
	$("#inputCat").val(-1);
	productoData1 = await ObtenerProductos();
	productoData2 = await ObtenerProductos();
	
	ListarProductos(productoData1);
})