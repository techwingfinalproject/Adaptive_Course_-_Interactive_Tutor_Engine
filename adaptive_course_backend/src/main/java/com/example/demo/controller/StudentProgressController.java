package com.example.demo.controller;

import java.util.List;

import org.springframework.web.bind.annotation.*;

import com.example.demo.models.StudentProgress;
import com.example.demo.service.StudentProgressService;

@RestController
@RequestMapping("/api/student-progress")
@CrossOrigin(origins = "*")
public class StudentProgressController {

    private final StudentProgressService studentProgressService;

    public StudentProgressController(StudentProgressService studentProgressService) {
        this.studentProgressService = studentProgressService;
    }

    @PostMapping
    public StudentProgress save(@RequestBody StudentProgress progress){
        return studentProgressService.saveProgress(progress);
    }

    @GetMapping
    public List<StudentProgress> getAll(){
        return studentProgressService.getAllProgress();
    }

    @GetMapping("/{id}")
    public StudentProgress getById(@PathVariable Long id){
        return  studentProgressService.getProgressById(id);
    }

    @GetMapping("/student/{studentId}")
    public List<StudentProgress> getByStudent(@PathVariable Long studentId){
        return  studentProgressService.getProgressByStudent(studentId);
    }

    @GetMapping("/course/{courseId}")
    public List<StudentProgress> getByCourse(@PathVariable Long courseId){
        return  studentProgressService.getProgressByCourse(courseId);
    }

    @DeleteMapping("/{id}")
    public String delete(@PathVariable Long id){

    	 studentProgressService.deleteProgress(id);

        return "Progress Deleted Successfully";
    }
}

