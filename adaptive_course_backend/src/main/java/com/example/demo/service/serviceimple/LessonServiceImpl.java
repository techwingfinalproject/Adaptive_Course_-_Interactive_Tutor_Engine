package com.example.demo.service.serviceimple;

import com.example.demo.exception.ApiException;
import com.example.demo.exception.ResourceNotFoundException;

 
 

import java.util.List;

import org.springframework.stereotype.Service;

import com.example.demo.repository.CourseRepository;
import com.example.demo.repository.LessonRepository;
import com.example.demo.models.Lesson;
import com.example.demo.models.Course;

import com.example.demo.service.LessonService;
@Service
public class LessonServiceImpl implements LessonService {

    private final LessonRepository lessonRepository;
    
    private final CourseRepository courseRepository;

    public LessonServiceImpl(LessonRepository lessonRepository, CourseRepository courseRepository) {
        this.lessonRepository = lessonRepository;
        this.courseRepository = courseRepository;
    }

    @Override
    public Lesson addLesson(Lesson lessonDto, String teacherEmail) {
        Course course = courseRepository.findById(lessonDto.getCourseId())
                .orElseThrow(() -> new ResourceNotFoundException("Course not found"));
        
        if (!course.getTeacher().getEmail().equals(teacherEmail)) {
            throw new ApiException("You can only add lessons to your own courses");
        }

        Lesson lesson = new Lesson();
        lesson.setLessonTitle(lessonDto.getLessonTitle());
        lesson.setLessonContent(lessonDto.getLessonContent());
        lesson.setVideoUrl(lessonDto.getVideoUrl());
        lesson.setLessonOrder(lessonDto.getLessonOrder());
        lesson.setCourse(course);
        
        return lessonRepository.save(lesson);
    }

    @Override
    public Lesson updateLesson(Long id, Lesson lessonDto, String teacherEmail) {
        Lesson lesson = lessonRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Lesson not found"));
        
        if (!lesson.getCourse().getTeacher().getEmail().equals(teacherEmail)) {
            throw new ApiException("You can only update lessons in your own courses");
        }

        lesson.setLessonTitle(lessonDto.getLessonTitle());
        lesson.setLessonContent(lessonDto.getLessonContent());
        lesson.setVideoUrl(lessonDto.getVideoUrl());
        lesson.setLessonOrder(lessonDto.getLessonOrder());
        
        return lessonRepository.save(lesson);
    }

    @Override
    public void deleteLesson(Long id, String teacherEmail) {
        Lesson lesson = lessonRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Lesson not found"));
        
        if (!lesson.getCourse().getTeacher().getEmail().equals(teacherEmail)) {
            throw new ApiException("You can only delete lessons in your own courses");
        }
        
        lessonRepository.delete(lesson);
    }

    @Override
    public List<Lesson> getLessonsByCourseId(Long courseId) {
        return lessonRepository.findByCourseCourseId(courseId);
    }


}


