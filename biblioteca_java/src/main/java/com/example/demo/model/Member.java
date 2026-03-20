package com.example.demo.model;

import jakarta.persistence.*;
import lombok.Data;

@Entity
@Table(name = "MEMBRI")
@Data
public class Member {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "membru_id")
    private Long id;

    @Column(name = "nume")
    private String nume;

    @Column(name = "parola")
    private String parola;

    @Column(name = "email")
    private String email;

    @Column(name = "data_inregistrare")
    private java.time.LocalDate dataInregistrare;

    @PrePersist
    protected void onCreate() {
        this.dataInregistrare = java.time.LocalDate.now();
    }}