package com.cibertec.model;

import java.util.Date;

import jakarta.persistence.*;
import lombok.*;

@Getter @Setter
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "tb_usuarios")
public class Usuario {

	@Id
	@Column(name = "cod_usua")
	private int codUsua;
	@Column(name = "nom_usua", length = 15)
	private String nomUsua;
	@Column(name = "ape_usua", length = 25)
	private String apeUsua;
	@Column(name = "usr_usua", columnDefinition = "CHAR(45)", nullable = false)
	private String correo;
	@Column(name = "cla_usua", columnDefinition = "CHAR(100)")
	private String clave;
	@Column(name = "fna_usua", columnDefinition = "DATE")
	@Temporal(TemporalType.DATE)
	private Date fnaUsua;
	@ManyToOne
	@JoinColumn(name = "idtipo")
	private Tipo tipo;
	@Column(name = "est_usua", nullable = true)
	private int estUsua;
}
