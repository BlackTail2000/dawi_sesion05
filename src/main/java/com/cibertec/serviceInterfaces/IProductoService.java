package com.cibertec.serviceInterfaces;

import java.util.List;

import com.cibertec.model.Producto;

public interface IProductoService {

	List<Producto> listarProductosActivos();
	void procesarProducto(Producto producto);
	List<Producto> buscarPorCategoria(int idcategoria);
}
