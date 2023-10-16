package com.cibertec.serviceInterfaces;

import java.util.List;

import com.cibertec.model.Usuario;

public interface IUsuarioService {

	Usuario buscarPorCorreoClave(String correo, String clave);
	void registrarUsuario(Usuario usuario);
	List<Usuario> listarUsuarios();
}
