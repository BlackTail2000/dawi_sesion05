package com.cibertec.model;

import jakarta.persistence.*;
import lombok.*;

@Getter @Setter
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "tb_productos")
public class Producto {

	@Id
	@Column(name = "id_prod", columnDefinition = "CHAR(5)")
	private String idProd;
	@Column(name = "des_prod", length = 45, nullable = false)
	private String desProd;
	@Column(name = "stk_prod", nullable = true)
	private int stkProd;
	@Column(name = "pre_prod", columnDefinition = "DECIMAL(8,2)", nullable = false)
	private double preProd;
	@ManyToOne
	@JoinColumn(name = "idcategoria")
	private Categoria categoria;
	@Column(name = "est_prod", columnDefinition = "TINYINT(1)")
	private int estProd;
	@ManyToOne
	@JoinColumn(name = "idproveedor")
	private Proveedor proveedor;
}
