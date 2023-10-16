package com.cibertec.model;

import java.util.List;

import com.fasterxml.jackson.annotation.JsonIgnore;

import jakarta.persistence.*;
import lombok.*;

@Getter @Setter
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "tb_tipos")
public class Tipo {

	@Id
	private int idtipo;
	@Column(length = 15)
	private String descripcion;
	
	@OneToMany(mappedBy = "tipo")
	@JsonIgnore
	private List<Usuario> usuarios;
}
