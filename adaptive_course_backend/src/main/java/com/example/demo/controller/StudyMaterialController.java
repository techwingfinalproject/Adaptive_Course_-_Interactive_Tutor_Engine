package com.example.demo.controller;

import java.util.List;

import org.springframework.web.bind.annotation.*;

import com.example.demo.models.StudyMaterial;
import com.example.demo.service.StudyMaterialService;

import jakarta.validation.Valid;

@RestController
@RequestMapping("/api/study-materials")
@CrossOrigin(origins = "*")
public class StudyMaterialController {

    private final StudyMaterialService studyMaterialService;

    public StudyMaterialController(StudyMaterialService studyMaterialService) {
        this.studyMaterialService = studyMaterialService;
    }

    @PostMapping
    public StudyMaterial addMaterial(@Valid @RequestBody StudyMaterial material) {
        return studyMaterialService.addMaterial(material);
    }

    @GetMapping
    public List<StudyMaterial> getAllMaterials() {
        return studyMaterialService.getAllMaterials();
    }

    @GetMapping("/{id}")
    public StudyMaterial getMaterialById(@PathVariable Long id) {
        return studyMaterialService.getMaterialById(id);
    }

    @GetMapping("/course/{courseId}")
    public List<StudyMaterial> getMaterialsByCourse(@PathVariable Long courseId) {
        return studyMaterialService.getMaterialsByCourse(courseId);
    }

    @GetMapping("/lesson/{lessonId}")
    public List<StudyMaterial> getMaterialsByLesson(@PathVariable Long lessonId) {
        return studyMaterialService.getMaterialsByLesson(lessonId);
    }

    @PutMapping("/{id}")
    public StudyMaterial updateMaterial(@PathVariable Long id,
                                        @Valid @RequestBody StudyMaterial material) {
        return studyMaterialService.updateMaterial(id, material);
    }

    @DeleteMapping("/{id}")
    public String deleteMaterial(@PathVariable Long id) {
    	studyMaterialService.deleteMaterial(id);
        return "Study Material deleted successfully.";
    }
}

