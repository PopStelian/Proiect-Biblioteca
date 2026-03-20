package com.example.demo.model;

import jakarta.persistence.*;
import lombok.Data;

@Entity
@Table(name = "CARTI")
@Data
public class Book {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "carte_id")
    private Long id;

    @Column(name = "titlu")
    private String titlu;

    @Column(name = "autor")
    private String autor;

    @Column(name = "isbn")
    private String isbn;

    @Column(name = "an_publicare")
    private Integer anPublicare;

    @Column(name = "nr_exemplare")
    private Integer nrExemplare;

    @Column (name = "imagine_url")
    private String imagineUrl;

    @Column (name = "categorie")
    private String categorie;

    public void scadeNrExemplare() {
        if (this.nrExemplare != null && this.nrExemplare > 0) {
            this.nrExemplare--;
        }
    }
}