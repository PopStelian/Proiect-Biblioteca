package com.example.demo.model;
import jakarta.persistence.*;
import lombok.Data;

@Entity
@Table(name = "IMPRUMUTURI")
@Data
public class Loan {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "imprumut_id")
    private Long id;

    @ManyToOne
    @JoinColumn(name = "carte_id")
    private Book book;

    @ManyToOne
    @JoinColumn(name = "membru_id")
    private Member member;

    @Column(name = "data_imprumut")
    private java.time.LocalDate dataImprumut;

    @Column(name = "data_scadenta")
    private java.time.LocalDate dataScadenta;

    @Column(name = "data_returnare")
    private java.time.LocalDate dataReturnare;

    public long getBookId() {
        return this.book.getId();
    }
}
