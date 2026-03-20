package com.example.demo.controller;

import com.example.demo.model.Book;
import com.example.demo.model.Loan;
import com.example.demo.repository.LoanRepository;
import com.example.demo.repository.BookRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@CrossOrigin(origins = "*")
@RestController
@RequestMapping("/api/imprumuturi")
public class LoanController {
    @Autowired
    private LoanRepository loanRepository;

    @Autowired
    private BookRepository bookRepository;

    @GetMapping
    public List<Loan> getAllLoans() {
        return loanRepository.findAll();
    }

    @PostMapping
    @Transactional
    public ResponseEntity<?> addLoan(@RequestBody Loan loan) {
        if (loan.getBook() == null || loan.getBook().getId() == null) {
            return ResponseEntity.badRequest().body("Book id is required");
        }

        Long bookId = loan.getBook().getId();
        Optional<Book> optBook = bookRepository.findById(bookId);
        if (optBook.isEmpty()) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Book not found");
        }

        Book book = optBook.get();
        if (book.getNrExemplare() == null || book.getNrExemplare() <= 0) {
            return ResponseEntity.status(HttpStatus.CONFLICT).body("No copies available");
        }

        book.scadeNrExemplare();
        bookRepository.save(book);

        loan.setBook(book);
        Loan saved = loanRepository.save(loan);

        return ResponseEntity.status(HttpStatus.CREATED).body(saved);
    }

    @GetMapping("/membru/{membruId}")
    public List<Loan> getLoansByMembruId(@PathVariable Long membruId) {
        return loanRepository.findByMember_Id(membruId);
    }
}
