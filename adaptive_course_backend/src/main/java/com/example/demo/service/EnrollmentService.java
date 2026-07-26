package com.example.demo.service;

import java.util.List;
import com.example.demo.models.Enrollment;

public interface EnrollmentService {
    Enrollment enrollInCourse(Long courseId, String studentEmail);
    List<Enrollment> getStudentEnrollments(String studentEmail);
    List<Enrollment> getCourseEnrollments(Long courseId, String teacherEmail);
}

