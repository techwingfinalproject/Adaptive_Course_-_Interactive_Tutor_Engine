package com.example.demo.repository;



import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.demo.models.StudentProgress;

public interface StudentProgressRepository extends JpaRepository<StudentProgress, Long>{

    List<StudentProgress> findByStudentStudentId(Long studentId);

    List<StudentProgress> findByCourseCourseId(Long courseId);

}
