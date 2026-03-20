package com.example.demo.controller;

import com.example.demo.model.Member;
import com.example.demo.repository.MemberRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@CrossOrigin(origins = "http://localhost:5173")
@RestController
@RequestMapping("/api/membri")
public class MemberController {
    @Autowired
    private MemberRepository memberRepository;

    @GetMapping
    public List<Member> getAllMembers() {
        return memberRepository.findAll();
    }

    @PostMapping
    public Member addMember(@RequestBody Member member) {
        return memberRepository.save(member);
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody Member loginData) {
        return memberRepository.findByEmail(loginData.getEmail())
                .map(member -> {
                    if (member.getParola().equals(loginData.getParola())) {
                        return ResponseEntity.ok(member);
                    } else {
                        return ResponseEntity.status(401).body("Parolă incorectă!");
                    }
                })
                .orElse(ResponseEntity.status(401).body("Utilizatorul nu există!"));
    }
}