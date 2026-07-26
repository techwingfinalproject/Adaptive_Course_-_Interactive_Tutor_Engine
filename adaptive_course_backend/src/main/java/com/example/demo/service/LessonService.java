
package com.example.demo.service;

import java.util.List;
import com.example.demo.models.Lesson;

public interface LessonService {
    Lesson addLesson(Lesson Lesson, String teacherEmail);

    Lesson updateLesson(Long id, Lesson Lesson, String teacherEmail);

    void deleteLesson(Long id, String teacherEmail);

    List<Lesson> getLessonsByCourseId(Long courseId);
}

