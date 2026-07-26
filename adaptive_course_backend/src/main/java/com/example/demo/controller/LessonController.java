package com.example.demo.controller;

import java.util.List;

import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import com.example.demo.models.Lesson;
import com.example.demo.service.LessonService;

import jakarta.validation.Valid;
@RestController
@RequestMapping("/api/lessons")
@CrossOrigin(origins = "*")
public class LessonController {

    private final LessonService lessonService;

    public LessonController(LessonService lessonService) {
        this.lessonService = lessonService;
    }

    @PostMapping
    @PreAuthorize("hasRole('TEACHER')")
    public Lesson addLesson(@Valid @RequestBody Lesson lesson, Authentication authentication) {
        return lessonService.addLesson(lesson, authentication.getName());
    }

    @PutMapping("/{id}")
    @PreAuthorize("hasRole('TEACHER')")
    public Lesson updateLesson(@PathVariable Long id,
                                  @Valid @RequestBody Lesson lesson,
                                  Authentication authentication) {
        return lessonService.updateLesson(id, lesson, authentication.getName());
    }

    @DeleteMapping("/{id}")
    @PreAuthorize("hasRole('TEACHER')")
    public String deleteLesson(@PathVariable Long id, Authentication authentication) {
        lessonService.deleteLesson(id, authentication.getName());
        return "Lesson deleted successfully.";
    }

    @GetMapping("/course/{courseId}")
    @PreAuthorize("hasAnyRole('STUDENT', 'TEACHER', 'ADMIN')")
    public List<Lesson> getLessonsByCourse(@PathVariable Long courseId) {
        return lessonService.getLessonsByCourseId(courseId);
    }
}

