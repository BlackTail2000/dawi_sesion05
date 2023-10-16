package com.cibertec.model;

import java.util.List;

import com.fasterxml.jackson.annotation.JsonIgnore;

import jakarta.persistence.*;
import lombok.*;

@Getter @Setter
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "tb_categorias")
public class Categoria {

	@Id
	private int idcategoria;
	@Column(length = 45)
	private String descripcion;
	
	@OneToMany(mappedBy = "categoria")
	@JsonIgnore
	private List<Producto> producto;
}
