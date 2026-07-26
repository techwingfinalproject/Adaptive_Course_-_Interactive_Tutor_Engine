package com.example.demo.controller;

import java.util.List;

import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import com.example.demo.models.Course;
import com.example.demo.service.CourseService;

import jakarta.validation.Valid;
@RestController
@RequestMapping("/api/courses")
@CrossOrigin(origins = "*")
public class CourseController {

    private final CourseService courseService;

    public CourseController(CourseService courseService) {
        this.courseService = courseService;
    }

    @PostMapping
    @PreAuthorize("hasRole('TEACHER')")
    public Course addCourse(@Valid @RequestBody Course course, Authentication authentication) {
        return courseService.createCourse(course, authentication.getName());
    }

    @GetMapping
    @PreAuthorize("hasAnyRole('STUDENT', 'TEACHER', 'ADMIN')")
    public List<Course> getAllCourses() {
        return courseService.getAllCourses();
    }

    @GetMapping("/my-courses")
    @PreAuthorize("hasRole('TEACHER')")
    public List<Course> getMyCourses(Authentication authentication) {
        return courseService.getCoursesByTeacherEmail(authentication.getName());
    }

    @GetMapping("/{id}")
    @PreAuthorize("hasAnyRole('STUDENT', 'TEACHER', 'ADMIN')")
    public Course getCourseById(@PathVariable Long id) {
        return courseService.getCourseById(id);
    }

    @PutMapping("/{id}")
    @PreAuthorize("hasRole('TEACHER')")
    public Course updateCourse(@PathVariable Long id,
                                  @Valid @RequestBody Course course,
                                  Authentication authentication) {
        return courseService.updateCourse(id, course, authentication.getName());
    }

    @DeleteMapping("/{id}")
    @PreAuthorize("hasRole('TEACHER')")
    public String deleteCourse(@PathVariable Long id, Authentication authentication) {
        courseService.deleteCourse(id, authentication.getName());
        return "Course deleted successfully.";
    }
}

