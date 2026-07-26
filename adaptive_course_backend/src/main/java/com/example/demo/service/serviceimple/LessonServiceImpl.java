package com.example.demo.service.serviceimple;

import com.example.demo.exception.ApiException;
import com.example.demo.exception.ResourceNotFoundException;

 
 

import java.util.List;
import java.util.stream.Collectors;

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
    public Lesson addLesson(Lesson Lesson, String teacherEmail) {
        Course course = courseRepository.findById(Lesson.getCourseId())
                .orElseThrow(() -> new ResourceNotFoundException("Course not found"));
        
        if (!course.getTeacher().getEmail().equals(teacherEmail)) {
            throw new ApiException("You can only add lessons to your own courses");
        }

        Lesson lesson = new Lesson();
        lesson.setLessonTitle(Lesson.getLessonTitle());
        lesson.setLessonContent(Lesson.getLessonContent());
        lesson.setVideoUrl(Lesson.getVideoUrl());
        lesson.setLessonOrder(Lesson.getLessonOrder());
        lesson.setCourse(course);
        
        Lesson savedLesson = lessonRepository.save(lesson);
        return savedLesson;
    }

    @Override
    public Lesson updateLesson(Long id, Lesson Lesson, String teacherEmail) {
        Lesson lesson = lessonRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Lesson not found"));
        
        if (!lesson.getCourse().getTeacher().getEmail().equals(teacherEmail)) {
            throw new ApiException("You can only update lessons in your own courses");
        }

        lesson.setLessonTitle(Lesson.getLessonTitle());
        lesson.setLessonContent(Lesson.getLessonContent());
        lesson.setVideoUrl(Lesson.getVideoUrl());
        lesson.setLessonOrder(Lesson.getLessonOrder());
        
        Lesson updatedLesson = lessonRepository.save(lesson);
        return updatedLesson;
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
        return lessonRepository.findByCourseCourseId(courseId).stream()
                
                .collect(Collectors.toList());
    }


}


