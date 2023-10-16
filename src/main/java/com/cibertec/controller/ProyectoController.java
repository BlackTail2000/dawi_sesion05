package com.cibertec.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import com.cibertec.model.Producto;
import com.cibertec.model.Usuario;
import com.cibertec.serviceInterfaces.*;

@Controller
public class ProyectoController {
	
	@Autowired
	private IUsuarioService usuarioService;
	
	@Autowired
	private IProductoService productoService;

	@GetMapping("/saludo")
	public String saludo(@RequestParam("nombreIngresado") String nombreRecuperado, Model model) {
		model.addAttribute("nombreSaludo", nombreRecuperado);
		return "saludo";
	}
	
	@GetMapping("/login")
	public String login(Model model) {
		model.addAttribute("usuarioLogin", new Usuario());
		return "login";
	}
	
	@PostMapping("/login")
	public String login(@ModelAttribute("usuarioLogin") Usuario usuarioRecuperado, Model model) {
		System.out.println(usuarioRecuperado.getCorreo());
		System.out.println(usuarioRecuperado.getClave());
		Usuario usuarioBuscado = usuarioService.buscarPorCorreoClave(usuarioRecuperado.getCorreo(), usuarioRecuperado.getClave());
		System.out.println(usuarioBuscado);
		if(usuarioBuscado != null) {
			model.addAttribute("usuarioLogueado", usuarioBuscado);
			return "catalogo";
		} else {
			model.addAttribute("usuarioLogin", new Usuario());
			model.addAttribute("mensaje", "Usuario y/o claves incorrectas");
			return "login";
		}
	}
	
	@GetMapping("/buscarPorCategoria/{idcategoria}")
	@ResponseBody
	public List<Producto> buscarPorCategoria(@PathVariable("idcategoria") int idcategoria){
		return productoService.buscarPorCategoria(idcategoria);
	}
	
	@GetMapping("/registrarcuenta")
	public String registrarcuenta(Model model) {
		return "registrarcuenta";
	}
	
	@PostMapping("/registrarcuenta")
	public ResponseEntity<Usuario> registrarcuenta(@RequestBody Usuario usuario) {
		usuarioService.registrarUsuario(usuario);
		return ResponseEntity.ok(usuario);
	}
	
	@GetMapping("/usuarios")
	@ResponseBody
	public List<Usuario> usuarios(){
		return usuarioService.listarUsuarios();
	}
}
