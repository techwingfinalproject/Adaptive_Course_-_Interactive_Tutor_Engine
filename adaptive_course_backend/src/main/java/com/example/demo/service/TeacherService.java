package com.example.demo.service;

import java.util.List;

import com.example.demo.models.Teacher;

public interface TeacherService {

    Teacher registerTeacher(Teacher teacher);

    List<Teacher> getAllTeachers();

    Teacher getTeacherById(Long id);

    Teacher getTeacherByEmail(String email);

    Teacher updateTeacher(Long id, Teacher teacher);

    void deleteTeacher(Long id);

}

