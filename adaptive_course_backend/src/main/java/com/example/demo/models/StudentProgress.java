package com.example.demo.models;

import java.time.LocalDateTime;

import jakarta.persistence.*;

@Entity
@Table(name="student_progress")
public class StudentProgress {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long progressId;

    @ManyToOne
    @JoinColumn(name="student_id")
    private Student student;

    @ManyToOne
    @JoinColumn(name="course_id")
    private Course course;

    private Integer completedLessons;

    private Integer totalLessons;

    private Double progressPercentage;

    private String lastAccessedLesson;

    private String status;

    @Column(updatable=false)
    private LocalDateTime lastUpdated;

    @PrePersist
    public void prePersist(){
        lastUpdated = LocalDateTime.now();
    }

    public StudentProgress() {
    }

    public Long getProgressId() {
        return progressId;
    }

    public void setProgressId(Long progressId) {
        this.progressId = progressId;
    }

    public Student getStudent() {
        return student;
    }

    public void setStudent(Student student) {
        this.student = student;
    }

    public Course getCourse() {
        return course;
    }

    public void setCourse(Course course) {
        this.course = course;
    }

    public Integer getCompletedLessons() {
        return completedLessons;
    }

    public void setCompletedLessons(Integer completedLessons) {
        this.completedLessons = completedLessons;
    }

    public Integer getTotalLessons() {
        return totalLessons;
    }

    public void setTotalLessons(Integer totalLessons) {
        this.totalLessons = totalLessons;
    }

    public Double getProgressPercentage() {
        return progressPercentage;
    }

    public void setProgressPercentage(Double progressPercentage) {
        this.progressPercentage = progressPercentage;
    }

    public String getLastAccessedLesson() {
        return lastAccessedLesson;
    }

    public void setLastAccessedLesson(String lastAccessedLesson) {
        this.lastAccessedLesson = lastAccessedLesson;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public LocalDateTime getLastUpdated() {
        return lastUpdated;
    }
}
