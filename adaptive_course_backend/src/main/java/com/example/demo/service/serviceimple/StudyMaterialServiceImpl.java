package com.example.demo.service.serviceimple;

import com.example.demo.exception.ResourceNotFoundException;

 


import java.util.List;

import org.springframework.stereotype.Service;

import com.example.demo.models.StudyMaterial;
import com.example.demo.repository.StudyMaterialRepository;
import com.example.demo.service.StudyMaterialService;
@Service
public class StudyMaterialServiceImpl implements StudyMaterialService {

    private static final String MATERIAL_NOT_FOUND_MSG = "Study Material not found";

    private final StudyMaterialRepository repository;

    public StudyMaterialServiceImpl(StudyMaterialRepository repository) {
        this.repository = repository;
    }

    @Override
    public StudyMaterial addMaterial(StudyMaterial material) {
        return repository.save(material);
    }

    @Override
    public List<StudyMaterial> getAllMaterials() {
        return repository.findAll();
    }

    @Override
    public StudyMaterial getMaterialById(Long id) {
        return repository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException(MATERIAL_NOT_FOUND_MSG));
    }

    @Override
    public List<StudyMaterial> getMaterialsByCourse(Long courseId) {
        return repository.findByCourseCourseId(courseId);
    }

    @Override
    public List<StudyMaterial> getMaterialsByLesson(Long lessonId) {
        return repository.findByLessonLessonId(lessonId);
    }

    @Override
    public StudyMaterial updateMaterial(Long id, StudyMaterial material) {

        StudyMaterial existing = repository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException(MATERIAL_NOT_FOUND_MSG));

        existing.setTitle(material.getTitle());
        existing.setDescription(material.getDescription());
        existing.setMaterialType(material.getMaterialType());
        existing.setFileUrl(material.getFileUrl());

        return repository.save(existing);
    }

    @Override
    public void deleteMaterial(Long id) {

        StudyMaterial material = repository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException(MATERIAL_NOT_FOUND_MSG));

        repository.delete(material);
    }
}


