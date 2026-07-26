package com.example.demo.service.serviceimple;

import com.example.demo.exception.ApiException;

 

import java.util.List;

import org.springframework.stereotype.Service;

import com.example.demo.repository.CourseRepository;
import com.example.demo.repository.TeacherRepository;
import com.example.demo.models.Course;

import com.example.demo.models.Teacher;
import com.example.demo.service.CourseService;
@Service
public class CourseServiceImpl implements CourseService {

    private static final String COURSE_NOT_FOUND_MSG = "Course not found with id: ";

    private final CourseRepository courseRepository;
    
    private final TeacherRepository teacherRepository;

    public CourseServiceImpl(CourseRepository courseRepository, TeacherRepository teacherRepository) {
        this.courseRepository = courseRepository;
        this.teacherRepository = teacherRepository;
    }

    @Override
    public Course createCourse(Course courseDto, String teacherEmail) {
        Teacher teacher = teacherRepository.findByEmail(teacherEmail)
                .orElseThrow(() -> new ApiException("Teacher not found with email: " + teacherEmail));
        
        if (courseRepository.existsByCourseCode(courseDto.getCourseCode())) {
            throw new ApiException("Course Code already exists");
        }

        Course course = new Course();
        course.setCourseName(courseDto.getCourseName());
        course.setCourseCode(courseDto.getCourseCode());
        course.setDescription(courseDto.getDescription());
        course.setThumbnail(courseDto.getThumbnail());
        course.setDuration(courseDto.getDuration());
        course.setTeacher(teacher);
        
        return courseRepository.save(course);
    }

    @Override
    public List<Course> getAllCourses() {
        return courseRepository.findAll();
    }

    @Override
    public Course getCourseById(Long id) {
        return courseRepository.findById(id)
                .orElseThrow(() -> new ApiException(COURSE_NOT_FOUND_MSG + id));
    }

    @Override
    public Course updateCourse(Long id, Course courseDto, String teacherEmail) {
        Course course = courseRepository.findById(id)
                .orElseThrow(() -> new ApiException(COURSE_NOT_FOUND_MSG + id));
        
        if (!course.getTeacher().getEmail().equals(teacherEmail)) {
            throw new ApiException("You can only update your own courses.");
        }

        course.setCourseName(courseDto.getCourseName());
        if (!course.getCourseCode().equals(courseDto.getCourseCode())) {
            if (courseRepository.existsByCourseCode(courseDto.getCourseCode())) {
                throw new ApiException("Course Code already exists");
            }
            course.setCourseCode(courseDto.getCourseCode());
        }
        course.setDescription(courseDto.getDescription());
        course.setThumbnail(courseDto.getThumbnail());
        course.setDuration(courseDto.getDuration());
        
        return courseRepository.save(course);
    }

    @Override
    public void deleteCourse(Long id, String teacherEmail) {
        Course course = courseRepository.findById(id)
                .orElseThrow(() -> new ApiException(COURSE_NOT_FOUND_MSG + id));
        
        if (!course.getTeacher().getEmail().equals(teacherEmail)) {
            throw new ApiException("You can only delete your own courses.");
        }
        
        courseRepository.delete(course);
    }

    @Override
    public List<Course> getCoursesByTeacherEmail(String teacherEmail) {
        return courseRepository.findByTeacherEmail(teacherEmail);
    }


}


