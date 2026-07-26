package com.example.demo.controller;

import java.util.List;

import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import com.example.demo.models.Enrollment;
import com.example.demo.service.EnrollmentService;
@RestController
@RequestMapping("/api/enrollments")
@CrossOrigin(origins = "*")
public class EnrollmentController {

    private final EnrollmentService enrollmentService;

    public EnrollmentController(EnrollmentService enrollmentService) {
        this.enrollmentService = enrollmentService;
    }

    @PostMapping("/{courseId}")
    @PreAuthorize("hasRole('STUDENT')")
    public Enrollment enrollInCourse(@PathVariable Long courseId, Authentication authentication) {
        return enrollmentService.enrollInCourse(courseId, authentication.getName());
    }

    @GetMapping("/student")
    @PreAuthorize("hasRole('STUDENT')")
    public List<Enrollment> getStudentEnrollments(Authentication authentication) {
        return enrollmentService.getStudentEnrollments(authentication.getName());
    }

    @GetMapping("/course/{courseId}")
    @PreAuthorize("hasRole('TEACHER')")
    public List<Enrollment> getCourseEnrollments(@PathVariable Long courseId, Authentication authentication) {
        return enrollmentService.getCourseEnrollments(courseId, authentication.getName());
    }
}

