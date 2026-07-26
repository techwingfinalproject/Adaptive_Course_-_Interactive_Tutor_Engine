package com.example.demo.repository;


import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.demo.models.Teacher;

public interface TeacherRepository extends JpaRepository<Teacher, Long>{

    Optional<Teacher> findByEmail(String email);

    boolean existsByEmail(String email);

}
