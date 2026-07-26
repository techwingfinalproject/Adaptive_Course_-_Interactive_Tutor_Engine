package com.example.demo.service.serviceimple;

import com.example.demo.exception.ApiException;
import com.example.demo.exception.ResourceNotFoundException;

 
 


import java.util.List;
import java.util.stream.Collectors;

import org.springframework.stereotype.Service;

import com.example.demo.repository.CourseRepository;
import com.example.demo.repository.EnrollmentRepository;
import com.example.demo.repository.StudentRepository;
import com.example.demo.models.Enrollment;
import com.example.demo.models.Course;

import com.example.demo.models.Student;
import com.example.demo.service.EnrollmentService;

@Service
public class EnrollmentServiceImpl implements EnrollmentService {

    private final EnrollmentRepository enrollmentRepository;
    
    private final StudentRepository studentRepository;
    
    private final CourseRepository courseRepository;

    public EnrollmentServiceImpl(EnrollmentRepository enrollmentRepository, StudentRepository studentRepository, CourseRepository courseRepository) {
        this.enrollmentRepository = enrollmentRepository;
        this.studentRepository = studentRepository;
        this.courseRepository = courseRepository;
    }

    @Override
    public Enrollment enrollInCourse(Long courseId, String studentEmail) {
        Student student = studentRepository.findByEmail(studentEmail)
                .orElseThrow(() -> new ResourceNotFoundException("Student not found"));
        
        Course course = courseRepository.findById(courseId)
                .orElseThrow(() -> new ResourceNotFoundException("Course not found"));
        
        if (enrollmentRepository.existsByStudentEmailAndCourseCourseId(studentEmail, courseId)) {
            throw new ApiException("Student is already enrolled in this course");
        }

        Enrollment enrollment = new Enrollment();
        enrollment.setStudent(student);
        enrollment.setCourse(course);
        enrollment.setStatus("ACTIVE");
        
        Enrollment savedEnrollment = enrollmentRepository.save(enrollment);
        return savedEnrollment;
    }

    @Override
    public List<Enrollment> getStudentEnrollments(String studentEmail) {
        return enrollmentRepository.findByStudentEmail(studentEmail).stream()
                
                .collect(Collectors.toList());
    }

    @Override
    public List<Enrollment> getCourseEnrollments(Long courseId, String teacherEmail) {
        Course course = courseRepository.findById(courseId)
                .orElseThrow(() -> new ResourceNotFoundException("Course not found"));
        
        if (!course.getTeacher().getEmail().equals(teacherEmail)) {
            throw new ApiException("You are not authorized to view enrollments for this course");
        }
        
        return enrollmentRepository.findByCourseCourseId(courseId).stream()
                
                .collect(Collectors.toList());
    }
}
