package com.example.demo.service.serviceimple;

import com.example.demo.exception.ApiException;

import com.example.demo.repository.LessonRepository;
import com.example.demo.models.*;
 
import com.example.demo.models.Lesson;
import com.example.demo.service.AiIntegrationService;
import org.springframework.core.ParameterizedTypeReference;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestClient;

import java.util.Map;

@Service
public class AiIntegrationServiceImpl implements AiIntegrationService {

    private final RestClient aiRestClient;
    private final LessonRepository lessonRepository;

    public AiIntegrationServiceImpl(RestClient aiRestClient, LessonRepository lessonRepository) {
        this.aiRestClient = aiRestClient;
        this.lessonRepository = lessonRepository;
    }

    private Lesson getLesson(Long lessonId) {
        return lessonRepository.findById(lessonId)
                .orElseThrow(() -> new ApiException("Lesson not found with id: " + lessonId));
    }

    @Override
    public TutorResponse getTutorResponse(FrontendTutorRequest frontendRequest) {
        Lesson lesson = null;
        if (frontendRequest.getLessonId() != null) {
            lesson = getLesson(frontendRequest.getLessonId());
        }
        
        TutorRequest pythonRequest = new TutorRequest();
        pythonRequest.setLessonTitle(lesson != null ? lesson.getLessonTitle() : "General Programming Concepts");
        pythonRequest.setLessonDescription(lesson != null && lesson.getCourse() != null ? lesson.getCourse().getDescription() : "You are a helpful programming tutor. Answer the student's questions.");
        pythonRequest.setLessonNotes(lesson != null ? lesson.getLessonContent() : "No specific lesson context provided.");
        pythonRequest.setStudentQuestion(frontendRequest.getStudentQuestion());
        
        // Format chat history list into a string
        StringBuilder historyBuilder = new StringBuilder();
        if (frontendRequest.getChatHistory() != null) {
            for (Map<String, String> msg : frontendRequest.getChatHistory()) {
                String role = msg.getOrDefault("role", "user");
                String content = msg.getOrDefault("content", "");
                historyBuilder.append(role).append(": ").append(content).append("\n");
            }
        }
        pythonRequest.setChatHistory(historyBuilder.toString());

        return aiRestClient.post()
                .uri("/tutor")
                .contentType(MediaType.APPLICATION_JSON)
                .body(pythonRequest)
                .retrieve()
                .body(TutorResponse.class);
    }

    @Override
    public Map<String, Object> generateQuiz(FrontendQuizRequest frontendRequest) {
        Lesson lesson = getLesson(frontendRequest.getLessonId());

        QuizRequest pythonRequest = new QuizRequest();
        pythonRequest.setLessonTitle(lesson.getLessonTitle());
        pythonRequest.setLessonDescription(lesson.getCourse() != null ? lesson.getCourse().getDescription() : "");
        pythonRequest.setLessonNotes(lesson.getLessonContent());
        pythonRequest.setDifficulty(frontendRequest.getDifficulty());
        pythonRequest.setTotalQuestions(frontendRequest.getTotalQuestions());
        pythonRequest.setQuestionFormat(frontendRequest.getQuestionFormat());

        return aiRestClient.post()
                .uri("/quiz")
                .contentType(MediaType.APPLICATION_JSON)
                .body(pythonRequest)
                .retrieve()
                .body(new ParameterizedTypeReference<Map<String, Object>>() {});
    }

    @Override
    public Map<String, Object> evaluateAnswers(EvaluateRequest request) {
        // Evaluation doesn't strictly need lesson context, so we pass it through
        return aiRestClient.post()
                .uri("/evaluate")
                .contentType(MediaType.APPLICATION_JSON)
                .body(request)
                .retrieve()
                .body(new ParameterizedTypeReference<Map<String, Object>>() {});
    }

    @Override
    public Map<String, Object> generateStudyPlan(FrontendRemediationRequest frontendRequest) {
        Lesson lesson = getLesson(frontendRequest.getLessonId());

        RemediationRequest pythonRequest = new RemediationRequest();
        pythonRequest.setLessonTitle(lesson.getLessonTitle());
        pythonRequest.setLessonNotes(lesson.getLessonContent());
        pythonRequest.setEvaluationResults(frontendRequest.getEvaluationResults());

        return aiRestClient.post()
                .uri("/remediation")
                .contentType(MediaType.APPLICATION_JSON)
                .body(pythonRequest)
                .retrieve()
                .body(new ParameterizedTypeReference<Map<String, Object>>() {});
    }

    @Override
    public Map<String, Object> getCourseRecommendation(FrontendAdaptiveLearningRequest frontendRequest) {
        Lesson lesson = getLesson(frontendRequest.getLessonId());

        AdaptiveLearningRequest pythonRequest = new AdaptiveLearningRequest();
        pythonRequest.setLessonTitle(lesson.getLessonTitle());
        pythonRequest.setLessonDescription(lesson.getCourse() != null ? lesson.getCourse().getDescription() : "");
        pythonRequest.setLessonNotes(lesson.getLessonContent());
        
        pythonRequest.setDifficulty(frontendRequest.getDifficulty());
        pythonRequest.setTotalQuestions(frontendRequest.getTotalQuestions());
        pythonRequest.setQuestionFormat(frontendRequest.getQuestionFormat());
        pythonRequest.setStudentAnswers(frontendRequest.getStudentAnswers());
        pythonRequest.setMessage(frontendRequest.getMessage());
        pythonRequest.setQuiz(frontendRequest.getQuiz());
        pythonRequest.setEvaluation(frontendRequest.getEvaluation());
        pythonRequest.setPassed(frontendRequest.getPassed());
        pythonRequest.setRetryCount(frontendRequest.getRetryCount());
        pythonRequest.setRemediation(frontendRequest.getRemediation());

        return aiRestClient.post()
                .uri("/adaptive-learning")
                .contentType(MediaType.APPLICATION_JSON)
                .body(pythonRequest)
                .retrieve()
                .body(new ParameterizedTypeReference<Map<String, Object>>() {});
    }

    @Override
    public TutorResponse getCourseSummary(FrontendTutorRequest frontendRequest) {
        Lesson lesson = getLesson(frontendRequest.getLessonId());
        
        TutorRequest pythonRequest = new TutorRequest();
        pythonRequest.setLessonTitle(lesson.getLessonTitle());
        pythonRequest.setLessonDescription(lesson.getCourse() != null ? lesson.getCourse().getDescription() : "");
        pythonRequest.setLessonNotes(lesson.getLessonContent());
        pythonRequest.setStudentQuestion("Please provide a comprehensive summary of this course based on the provided lesson details.");

        return aiRestClient.post()
                .uri("/tutor")
                .contentType(MediaType.APPLICATION_JSON)
                .body(pythonRequest)
                .retrieve()
                .body(TutorResponse.class);
    }
}


