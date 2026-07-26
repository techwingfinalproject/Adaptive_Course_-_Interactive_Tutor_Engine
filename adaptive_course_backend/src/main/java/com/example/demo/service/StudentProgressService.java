package com.example.demo.service;

import java.util.List;

import com.example.demo.models.StudentProgress;

public interface StudentProgressService {

    StudentProgress saveProgress(StudentProgress progress);

    List<StudentProgress> getAllProgress();

    StudentProgress getProgressById(Long id);

    List<StudentProgress> getProgressByStudent(Long studentId);

    List<StudentProgress> getProgressByCourse(Long courseId);

    void deleteProgress(Long id);

}

