package com.example.demo.controller;

import java.util.List;

import java.util.HashMap;
import java.util.Map;
import org.springframework.http.ResponseEntity;

import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import com.example.demo.models.Teacher;
import com.example.demo.service.TeacherService;
import com.example.demo.service.JwtService;

import jakarta.validation.Valid;
@RestController
@RequestMapping("/api/teachers")
@CrossOrigin(origins = "*")
public class TeacherController {


    private final TeacherService teacherService;
    private final JwtService jwtService;

    public TeacherController(TeacherService teacherService, JwtService jwtService) {
        this.teacherService = teacherService;
        this.jwtService = jwtService;
    }


    // ==============================
    // Teacher Registration
    // Public API (No JWT Required)
    // ==============================

    @PostMapping
    public ResponseEntity<Map<String, Object>> registerTeacher(
            @Valid @RequestBody Teacher teacher) {


        teacher.setRole("TEACHER");

        Teacher registeredTeacher = teacherService.registerTeacher(teacher);
        String token = jwtService.generateToken(registeredTeacher.getEmail(), registeredTeacher.getRole());
        
        Map<String, Object> response = new HashMap<>();
        response.put("token", token);
        response.put("teacher", registeredTeacher);
        return ResponseEntity.ok(response);
    }



    // ==============================
    // Get All Teachers
    // ADMIN Only
    // ==============================

    @PreAuthorize("hasRole('ADMIN')")
    @GetMapping
    public List<Teacher> getAllTeachers() {

        return teacherService.getAllTeachers();
    }



    // ==============================
    // Get Teacher By ID
    // ADMIN Only
    // ==============================

    @PreAuthorize("hasRole('ADMIN')")
    @GetMapping("/{id}")
    public Teacher getTeacherById(
            @PathVariable Long id) {


        return teacherService.getTeacherById(id);
    }



    // ==============================
    // Search Teacher By Email
    // ADMIN Only
    // ==============================

    @PreAuthorize("hasRole('ADMIN')")
    @GetMapping("/email/{email}")
    public Teacher getTeacherByEmail(
            @PathVariable String email) {


        return teacherService.getTeacherByEmail(email);
    }



    // ==============================
    // Update Teacher
    // ADMIN or TEACHER
    // ==============================

    @PreAuthorize("hasAnyRole('ADMIN','TEACHER')")
    @PutMapping("/{id}")
    public Teacher updateTeacher(
            @PathVariable Long id,
            @Valid @RequestBody Teacher teacher) {


        return teacherService.updateTeacher(id, teacher);
    }



    // ==============================
    // Delete Teacher
    // ADMIN Only
    // ==============================

    @PreAuthorize("hasRole('ADMIN')")
    @DeleteMapping("/{id}")
    public String deleteTeacher(
            @PathVariable Long id) {


        teacherService.deleteTeacher(id);

        return "Teacher deleted successfully.";
    }



    // ==============================
    // Teacher Dashboard Test
    // TEACHER Only
    // ==============================

    @PreAuthorize("hasRole('TEACHER')")
    @GetMapping("/dashboard")
    public String teacherDashboard(){


        return "Welcome Teacher";

    }

}

