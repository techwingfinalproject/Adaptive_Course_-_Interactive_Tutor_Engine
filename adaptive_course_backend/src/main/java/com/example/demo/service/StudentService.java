

package com.example.demo.service;

import java.util.List;

import com.example.demo.models.Student;

public interface StudentService {

   
    Student registerStudent(Student student);

    List<Student> getAllStudents();

    Student getStudentById(Long studentId);

 
    Student getStudentByEmail(String email);

    
    Student updateStudent(Long studentId, Student student);

    
    void deleteStudent(Long studentId);

}

