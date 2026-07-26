package com.example.demo.service.serviceimple;

import com.example.demo.exception.ApiException;
import com.example.demo.exception.ResourceNotFoundException;

 
 

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.stereotype.Service;

import com.example.demo.repository.LessonRepository;
import com.example.demo.repository.QuizRepository;
import com.example.demo.models.Quiz;
import com.example.demo.models.Lesson;

import com.example.demo.service.QuizService;
@Service
public class QuizServiceImpl implements QuizService {

    private static final String QUIZ_NOT_FOUND_MSG = "Quiz not found";

    private final QuizRepository quizRepository;
    
    private final LessonRepository lessonRepository;

    public QuizServiceImpl(QuizRepository quizRepository, LessonRepository lessonRepository) {
        this.quizRepository = quizRepository;
        this.lessonRepository = lessonRepository;
    }

    @Override
    public Quiz addQuiz(Quiz quizDto, String teacherEmail) {
        Lesson lesson = lessonRepository.findById(quizDto.getLessonId())
                .orElseThrow(() -> new ResourceNotFoundException("Lesson not found"));
        
        if (!lesson.getCourse().getTeacher().getEmail().equals(teacherEmail)) {
            throw new ApiException("You can only add quizzes to your own courses");
        }

        Quiz quiz = new Quiz();
        quiz.setQuestion(quizDto.getQuestion());
        quiz.setOptionA(quizDto.getOptionA());
        quiz.setOptionB(quizDto.getOptionB());
        quiz.setOptionC(quizDto.getOptionC());
        quiz.setOptionD(quizDto.getOptionD());
        quiz.setCorrectAnswer(quizDto.getCorrectAnswer());
        quiz.setMarks(quizDto.getMarks());
        quiz.setLesson(lesson);
        
        return quizRepository.save(quiz);
    }

    @Override
    public Quiz updateQuiz(Long id, Quiz quizDto, String teacherEmail) {
        Quiz quiz = quizRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException(QUIZ_NOT_FOUND_MSG));
        
        if (!quiz.getLesson().getCourse().getTeacher().getEmail().equals(teacherEmail)) {
            throw new ApiException("You can only update quizzes in your own courses");
        }

        quiz.setQuestion(quizDto.getQuestion());
        quiz.setOptionA(quizDto.getOptionA());
        quiz.setOptionB(quizDto.getOptionB());
        quiz.setOptionC(quizDto.getOptionC());
        quiz.setOptionD(quizDto.getOptionD());
        quiz.setCorrectAnswer(quizDto.getCorrectAnswer());
        quiz.setMarks(quizDto.getMarks());
        
        return quizRepository.save(quiz);
    }

    @Override
    public void deleteQuiz(Long id, String teacherEmail) {
        Quiz quiz = quizRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException(QUIZ_NOT_FOUND_MSG));
        
        if (!quiz.getLesson().getCourse().getTeacher().getEmail().equals(teacherEmail)) {
            throw new ApiException("You can only delete quizzes in your own courses");
        }
        
        quizRepository.delete(quiz);
    }

    @Override
    public List<Quiz> getQuizzesByLessonId(Long lessonId) {
        return quizRepository.findByLessonLessonId(lessonId).stream()
                
                .collect(Collectors.toList());
    }

    @Override
    public String submitQuiz(Long id, String answer) {
        Quiz quiz = quizRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException(QUIZ_NOT_FOUND_MSG));
                
        if (quiz.getCorrectAnswer().equalsIgnoreCase(answer)) {
            return "Correct Answer!";
        } else {
            return "Incorrect Answer!";
        }
    }
}


