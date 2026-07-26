package com.example.demo.service;

import com.example.demo.models.LoginRequest;
import com.example.demo.models.LoginResponse;

public interface LoginService {

    LoginResponse login(LoginRequest request);

}

