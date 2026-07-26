package com.example.demo.service;

import java.util.List;
import com.example.demo.models.Course;

public interface CourseService {
    Course createCourse(Course course, String teacherEmail);
    List<Course> getAllCourses();
    Course getCourseById(Long id);
    Course updateCourse(Long id, Course course, String teacherEmail);
    void deleteCourse(Long id, String teacherEmail);
    List<Course> getCoursesByTeacherEmail(String teacherEmail);
}

