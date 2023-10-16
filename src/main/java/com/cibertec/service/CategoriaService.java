package com.cibertec.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.cibertec.model.Categoria;
import com.cibertec.repository.CategoriaRepository;
import com.cibertec.serviceInterfaces.ICategoriaService;

@Service
public class CategoriaService implements ICategoriaService {
	
	@Autowired
	private CategoriaRepository categoriaRepository;

	@Override
	public List<Categoria> listarCategorias() {
		return categoriaRepository.findAll();
	}

}
