package com.example.demo.controller;

import java.util.List;

import java.util.HashMap;
import java.util.Map;
import org.springframework.http.ResponseEntity;

import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import com.example.demo.models.Student;
import com.example.demo.service.StudentService;
import com.example.demo.service.JwtService;

import jakarta.validation.Valid;
@RestController
@RequestMapping("/api/students")
@CrossOrigin(origins = "*")
@Validated
public class StudentController {

    private final StudentService studentService;
    private final JwtService jwtService;

    public StudentController(StudentService studentService, JwtService jwtService) {
        this.studentService = studentService;
        this.jwtService = jwtService;
    }

    // Register Student
    @PostMapping("/register")
    public ResponseEntity<Map<String, Object>> registerStudent(@Valid @RequestBody Student student) {
        Student registeredStudent = studentService.registerStudent(student);
        String token = jwtService.generateToken(registeredStudent.getEmail(), registeredStudent.getRole());
        
        Map<String, Object> response = new HashMap<>();
        response.put("token", token);
        response.put("student", registeredStudent);
        return ResponseEntity.ok(response);
    }

    // Get All Students
    @GetMapping
    public List<Student> getAllStudents() {
        return studentService.getAllStudents();
    }

    // Get Student By ID
    @GetMapping("/{id}")
    public Student getStudentById(@PathVariable Long id) {
        return studentService.getStudentById(id);
    }

    // Get Student By Email
    @GetMapping("/email/{email}")
    public Student getStudentByEmail(@PathVariable String email) {
        return studentService.getStudentByEmail(email);
    }

    // Update Student
    @PutMapping("/{id}")
    public Student updateStudent(@PathVariable Long id,
                                 @Valid @RequestBody Student student) {
        return studentService.updateStudent(id, student);
    }

    // Delete Student
    @DeleteMapping("/{id}")
    public String deleteStudent(@PathVariable Long id) {

        studentService.deleteStudent(id);

        return "Student deleted successfully.";
    }
}

