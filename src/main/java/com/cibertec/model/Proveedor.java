package com.cibertec.model;

import java.util.List;

import com.fasterxml.jackson.annotation.JsonIgnore;

import jakarta.persistence.*;
import lombok.*;

@Getter @Setter
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "tb_proveedor")
public class Proveedor {

	@Id
	private int idproveedor;
	@Column(name = "nombre_rs", length = 45, nullable = false)
	private String nombreRS;
	@Column(length = 10, nullable = false)
	private String telefono;
	@Column(length = 45, nullable = false)
	private String email;
	
	@OneToMany(mappedBy = "proveedor")
	@JsonIgnore
	private List<Producto> productos;
}
