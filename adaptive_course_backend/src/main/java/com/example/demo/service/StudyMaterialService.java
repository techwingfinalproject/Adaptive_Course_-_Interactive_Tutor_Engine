package com.example.demo.service;

import java.util.List;

import com.example.demo.models.StudyMaterial;

public interface StudyMaterialService {

    StudyMaterial addMaterial(StudyMaterial material);

    List<StudyMaterial> getAllMaterials();

    StudyMaterial getMaterialById(Long id);

    List<StudyMaterial> getMaterialsByCourse(Long courseId);

    List<StudyMaterial> getMaterialsByLesson(Long lessonId);

    StudyMaterial updateMaterial(Long id, StudyMaterial material);

    void deleteMaterial(Long id);

}

