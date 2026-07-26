package com.example.demo.service.serviceimple;

import com.example.demo.exception.ResourceNotFoundException;

 

import java.util.List;

import org.springframework.stereotype.Service;

import com.example.demo.repository.StudentProgressRepository;
import com.example.demo.models.StudentProgress;

import com.example.demo.service.StudentProgressService;



@Service
public class StudentProgressServiceImpl implements StudentProgressService {

    private final StudentProgressRepository repository;

    public StudentProgressServiceImpl(StudentProgressRepository repository) {
        this.repository = repository;
    }

    @Override
    public StudentProgress saveProgress(StudentProgress progress) {
        return repository.save(progress);
    }

    @Override
    public List<StudentProgress> getAllProgress() {
        return repository.findAll();
    }

    @Override
    public StudentProgress getProgressById(Long id) {

        return repository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Progress not found"));
    }

    @Override
    public List<StudentProgress> getProgressByStudent(Long studentId) {
        return repository.findByStudentStudentId(studentId);
    }

    @Override
    public List<StudentProgress> getProgressByCourse(Long courseId) {
        return repository.findByCourseCourseId(courseId);
    }

    @Override
    public void deleteProgress(Long id) {

        StudentProgress progress = repository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Progress not found"));

        repository.delete(progress);
    }
}


