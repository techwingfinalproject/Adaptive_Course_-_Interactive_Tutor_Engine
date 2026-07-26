package com.example.demo.repository;

import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import com.example.demo.models.Quiz;

public interface QuizRepository extends JpaRepository<Quiz, Long> {
    List<Quiz> findByLessonLessonId(Long lessonId);
}
