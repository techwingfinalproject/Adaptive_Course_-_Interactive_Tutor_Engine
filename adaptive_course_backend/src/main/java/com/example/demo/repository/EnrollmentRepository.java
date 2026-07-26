package com.example.demo.repository;

import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import com.example.demo.models.Enrollment;

public interface EnrollmentRepository extends JpaRepository<Enrollment, Long> {
    List<Enrollment> findByStudentEmail(String email);
    List<Enrollment> findByCourseCourseId(Long courseId);
    boolean existsByStudentEmailAndCourseCourseId(String email, Long courseId);
}
