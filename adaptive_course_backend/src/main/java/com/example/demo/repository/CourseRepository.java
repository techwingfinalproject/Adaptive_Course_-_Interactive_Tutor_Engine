package com.example.demo.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import com.example.demo.models.Course;

public interface CourseRepository extends JpaRepository<Course, Long> {

    boolean existsByCourseCode(String courseCode);

    Optional<Course> findByCourseCode(String courseCode);

    List<Course> findByTeacherEmail(String email);
    
    List<Course> findByTeacherTeacherId(Long teacherId);

}
