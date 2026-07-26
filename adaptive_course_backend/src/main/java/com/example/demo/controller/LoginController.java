package com.example.demo.controller;

import org.springframework.web.bind.annotation.*;

import com.example.demo.models.LoginRequest;
import com.example.demo.models.LoginResponse;
import com.example.demo.service.LoginService;

import jakarta.validation.Valid;
@RestController
@RequestMapping("/api")
@CrossOrigin(origins = "*")
public class LoginController {

    private final LoginService loginService;

    public LoginController(LoginService loginService) {
        this.loginService = loginService;
    }

    @PostMapping("/login")
    public org.springframework.http.ResponseEntity<LoginResponse> login(@Valid @RequestBody LoginRequest request) {
        LoginResponse response = loginService.login(request);
        return org.springframework.http.ResponseEntity
                .status(response.isSuccess() ? 200 : 401)
                .body(response);
    }

}

