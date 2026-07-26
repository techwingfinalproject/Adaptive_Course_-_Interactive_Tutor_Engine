package com.example.demo.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.demo.models.StudyMaterial;

public interface StudyMaterialRepository extends JpaRepository<StudyMaterial, Long> {

    List<StudyMaterial> findByCourseCourseId(Long courseId);

    List<StudyMaterial> findByLessonLessonId(Long lessonId);

}
