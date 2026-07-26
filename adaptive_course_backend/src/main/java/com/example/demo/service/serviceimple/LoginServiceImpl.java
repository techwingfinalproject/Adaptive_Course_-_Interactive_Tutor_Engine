package com.example.demo.service.serviceimple;



import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;


import com.example.demo.repository.StudentRepository;
import com.example.demo.repository.TeacherRepository;
import com.example.demo.repository.AdminRepository;

import com.example.demo.models.LoginRequest;
import com.example.demo.models.LoginResponse;

import com.example.demo.service.JwtService;

import com.example.demo.models.Student;
import com.example.demo.models.Teacher;
import com.example.demo.models.Admin;

import com.example.demo.service.LoginService;
@Service
public class LoginServiceImpl implements LoginService {



    private final StudentRepository studentRepository;


    private final TeacherRepository teacherRepository;

    private final AdminRepository adminRepository;

    private final BCryptPasswordEncoder passwordEncoder;


    private final JwtService jwtService;

 
    public LoginServiceImpl(StudentRepository studentRepository, TeacherRepository teacherRepository, AdminRepository adminRepository, BCryptPasswordEncoder passwordEncoder, JwtService jwtService) {
        this.studentRepository = studentRepository;
        this.teacherRepository = teacherRepository;
        this.adminRepository = adminRepository;
        this.passwordEncoder = passwordEncoder;
        this.jwtService = jwtService;
    }



    @Override
    public LoginResponse login(LoginRequest request) {


        // ==========================
        // Check Student Table
        // ==========================

        Student student = studentRepository
                .findByEmail(request.getEmail())
                .orElse(null);



        if(student != null) {


            if(!passwordEncoder.matches(
                    request.getPassword(),
                    student.getPassword())) {


                return new LoginResponse(
                        false,
                        "Invalid Password",
                        null,
                        null,
                        null,
                        null
                );
            }



            String token = jwtService.generateToken(
                    student.getEmail(),
                    student.getRole()
            );



            return new LoginResponse(
                    true,
                    "Student Login Successful",
                    token,
                    student.getStudentId(),
                    student.getFullName(),
                    student.getEmail()
            );

        }





        // ==========================
        // Check Teacher Table
        // ==========================

        Teacher teacher = teacherRepository
                .findByEmail(request.getEmail())
                .orElse(null);



        if(teacher != null) {


            if(!passwordEncoder.matches(
                    request.getPassword(),
                    teacher.getPassword())) {


                return new LoginResponse(
                        false,
                        "Invalid Password",
                        null,
                        null,
                        null,
                        null
                );

            }



            String token = jwtService.generateToken(
                    teacher.getEmail(),
                    teacher.getRole()
            );



            return new LoginResponse(
                    true,
                    "Teacher Login Successful",
                    token,
                    teacher.getTeacherId(),
                    teacher.getFullName(),
                    teacher.getEmail()
            );

        }


        // ==========================
        // Check Admin Table
        // ==========================

        Admin admin = adminRepository
                .findByEmail(request.getEmail())
                .orElse(null);

        if(admin != null) {

            if(!passwordEncoder.matches(
                    request.getPassword(),
                    admin.getPassword())) {

                return new LoginResponse(
                        false,
                        "Invalid Password",
                        null,
                        null,
                        null,
                        null
                );
            }

            String token = jwtService.generateToken(
                    admin.getEmail(),
                    admin.getRole()
            );

            return new LoginResponse(
                    true,
                    "Admin Login Successful",
                    token,
                    admin.getAdminId(),
                    admin.getFullName(),
                    admin.getEmail()
            );
        }

        return new LoginResponse(
                false,
                "User not found",
                null,
                null,
                null,
                null
        );

    }

}

