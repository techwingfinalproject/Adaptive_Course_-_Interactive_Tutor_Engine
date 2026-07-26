package com.example.demo.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.bind.annotation.*;

import com.example.demo.repository.AdminRepository;
import com.example.demo.models.Admin;
import com.example.demo.service.JwtService;

import java.util.HashMap;
import java.util.Map;
@RestController
@RequestMapping("/api/admin")
@CrossOrigin(origins = "*")
public class AdminController {

    private final AdminRepository adminRepository;

    private final BCryptPasswordEncoder passwordEncoder;
    private final JwtService jwtService;

    public AdminController(AdminRepository adminRepository, BCryptPasswordEncoder passwordEncoder, JwtService jwtService) {
        this.adminRepository = adminRepository;
        this.passwordEncoder = passwordEncoder;
        this.jwtService = jwtService;
    }

    @PostMapping("/register")
    public ResponseEntity<Map<String, Object>> registerAdmin(@RequestBody Admin admin) {
        
        Map<String, Object> response = new HashMap<>();

        if (adminRepository.findByEmail(admin.getEmail()).isPresent()) {
            response.put("message", "Email already exists");
            return ResponseEntity.badRequest().body(response);
        }

        admin.setPassword(passwordEncoder.encode(admin.getPassword()));
        admin.setRole("ADMIN");

        adminRepository.save(admin);
        
        String token = jwtService.generateToken(admin.getEmail(), admin.getRole());
        response.put("token", token);
        response.put("admin", admin);
        response.put("message", "Admin registered successfully");
        
        return ResponseEntity.ok(response);
    }
}

