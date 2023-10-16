package com.cibertec.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.cibertec.model.Proveedor;
import com.cibertec.repository.ProveedorRepository;
import com.cibertec.serviceInterfaces.IProveedorService;

@Service
public class ProveedorService implements IProveedorService {
	
	@Autowired
	private ProveedorRepository proveedorRepository;

	@Override
	public List<Proveedor> listarProveedores() {
		return proveedorRepository.findAll();
	}

}
