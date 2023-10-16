package com.cibertec.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.cibertec.model.Producto;
import com.cibertec.repository.ProductoRepository;
import com.cibertec.serviceInterfaces.IProductoService;

@Service
public class ProductoService implements IProductoService {

	@Autowired
	private ProductoRepository productoRepository;
	
	@Override
	public List<Producto> listarProductosActivos() {
		return productoRepository.findAllByEstProd(1);
	}

	@Override
	public void procesarProducto(Producto producto) {
		productoRepository.save(producto);
	}

	@Override
	public List<Producto> buscarPorCategoria(int idcategoria) {
		return productoRepository.findByIdCategoria(idcategoria);
	}

}
