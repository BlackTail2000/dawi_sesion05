package com.cibertec.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.cibertec.model.Producto;

@Repository
public interface ProductoRepository extends JpaRepository<Producto, String>{

	List<Producto> findAllByEstProd(int estProd);
	
	@Query("Select p From Producto p Where p.categoria.idcategoria = ?1")
	List<Producto> findByIdCategoria(int idcategoria);
}
