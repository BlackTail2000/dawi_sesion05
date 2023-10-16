package com.cibertec.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import com.cibertec.model.*;
import com.cibertec.serviceInterfaces.*;

@Controller
public class ProductoController {
	
	@Autowired
	private IProductoService productoService;
	
	@Autowired
	private ICategoriaService categoriaService;
	
	@Autowired  
	private IProveedorService proveedorService;

	@GetMapping("/cargar")
	public String cargar() {
		return "crudproductos";
	}
	
	@GetMapping("/productos")
	@ResponseBody
	public List<Producto> obtenerProductos(){
		return productoService.listarProductosActivos();
	}
	
	@GetMapping("/categorias")
	@ResponseBody
	public List<Categoria> obtenerCategorias(){
		return categoriaService.listarCategorias();
	}
	
	@GetMapping("/proveedores")
	@ResponseBody
	public List<Proveedor> obtenerProveedores(){
		return proveedorService.listarProveedores();
	}
	
	@RequestMapping(value = "/procesar", method = { RequestMethod.POST, RequestMethod.PUT })
	public ResponseEntity<Producto> procesar(@RequestBody Producto producto){
		productoService.procesarProducto(producto);
		return ResponseEntity.ok(producto);
	}
	
}
