package com.example.demo.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import com.example.demo.models.Student;

public interface StudentRepository extends JpaRepository<Student, Long> {

   boolean existsByEmail(String email);

    
    Optional<Student> findByEmail(String email);

}
