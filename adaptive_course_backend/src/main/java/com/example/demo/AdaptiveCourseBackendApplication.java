package com.example.demo;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.builder.SpringApplicationBuilder; // 1. add
import org.springframework.boot.web.servlet.support.SpringBootServletInitializer; // 2. add

@SpringBootApplication
public class AdaptiveCourseBackendApplication extends SpringBootServletInitializer { // 3. extend

    @Override
    protected SpringApplicationBuilder configure(SpringApplicationBuilder application) { // 4. add this method
        return application.sources(AdaptiveCourseBackendApplication.class);
    }

    public static void main(String[] args) {
        SpringApplication.run(AdaptiveCourseBackendApplication.class, args);
    }
}
