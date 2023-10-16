package com.cibertec.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.cibertec.model.Usuario;
import com.cibertec.repository.UsuarioRepository;
import com.cibertec.serviceInterfaces.IUsuarioService;

@Service
public class UsuarioService implements IUsuarioService {
	
	@Autowired
	private UsuarioRepository usuarioRepository;

	@Override
	public Usuario buscarPorCorreoClave(String correo, String clave) {
		return usuarioRepository.findByCorreoAndClave(correo, clave);
	}

	@Override
	public void registrarUsuario(Usuario usuario) {
		usuarioRepository.save(usuario);
	}

	@Override
	public List<Usuario> listarUsuarios() {
		return usuarioRepository.findAll();
	}

}
