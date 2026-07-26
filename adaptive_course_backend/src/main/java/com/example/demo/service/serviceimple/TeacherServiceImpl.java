package com.example.demo.service.serviceimple;

import com.example.demo.exception.ApiException;


import java.util.List;

import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.example.demo.models.Teacher;
import com.example.demo.repository.TeacherRepository;
import com.example.demo.repository.StudentRepository;
 
 
import com.example.demo.service.TeacherService;
@Service
public class TeacherServiceImpl implements TeacherService {

    private static final String TEACHER_NOT_FOUND_MSG = "Teacher not found";


    private final TeacherRepository repository;

    private final StudentRepository studentRepository;


    private final PasswordEncoder passwordEncoder;

    public TeacherServiceImpl(TeacherRepository repository, StudentRepository studentRepository, PasswordEncoder passwordEncoder) {
        this.repository = repository;
        this.studentRepository = studentRepository;
        this.passwordEncoder = passwordEncoder;
    }



    @Override
    public Teacher registerTeacher(Teacher teacher) {


        if (repository.existsByEmail(teacher.getEmail()) || studentRepository.existsByEmail(teacher.getEmail())) {
            throw new ApiException("Email already exists");
        }


        // Assign role automatically
        teacher.setRole("TEACHER");


        // Encrypt password
        teacher.setPassword(
                passwordEncoder.encode(
                        teacher.getPassword()
                )
        );


        return repository.save(teacher);
    }



    @Override
    public List<Teacher> getAllTeachers() {

        return repository.findAll();

    }



    @Override
    public Teacher getTeacherById(Long id) {


        return repository.findById(id)
                .orElseThrow(
                    () -> new ApiException(TEACHER_NOT_FOUND_MSG)
                );

    }



    @Override
    public Teacher getTeacherByEmail(String email) {


        return repository.findByEmail(email)
                .orElseThrow(
                    () -> new ApiException(TEACHER_NOT_FOUND_MSG)
                );

    }



    @Override
    public Teacher updateTeacher(Long id, Teacher teacher) {


        Teacher existing = repository.findById(id)
                .orElseThrow(
                    () -> new ApiException(TEACHER_NOT_FOUND_MSG)
                );


        existing.setFullName(teacher.getFullName());

        existing.setPhone(teacher.getPhone());

        existing.setDepartment(teacher.getDepartment());

        existing.setQualification(teacher.getQualification());

        existing.setProfileImage(teacher.getProfileImage());


        // Maintain teacher role
        existing.setRole("TEACHER");


        return repository.save(existing);

    }



    @Override
    public void deleteTeacher(Long id) {


        Teacher teacher = repository.findById(id)
                .orElseThrow(
                    () -> new ApiException(TEACHER_NOT_FOUND_MSG)
                );


        repository.delete(teacher);

    }

}


