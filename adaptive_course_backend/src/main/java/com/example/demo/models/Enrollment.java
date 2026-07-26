package com.example.demo.models;

import java.time.LocalDateTime;

import jakarta.persistence.*;

@Entity
@Table(name = "enrollments")
public class Enrollment {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long enrollmentId;

    @ManyToOne
    @JoinColumn(name = "student_id")
    private Student student;

    @ManyToOne
    @JoinColumn(name = "course_id")
    private Course course;

    private LocalDateTime enrollmentDate;

    private String status;

    @PrePersist
    public void prePersist() {
        enrollmentDate = LocalDateTime.now();
    }

    @PostLoad
    public void postLoad() {
        if (course != null) {
            courseId = course.getCourseId();
        }
        if (student != null) {
            studentId = student.getStudentId();
        }
    }

    @Transient
    private Long courseId;

    @Transient
    private Long studentId;

    public Enrollment() {
    }

    public Long getEnrollmentId() {
        return enrollmentId;
    }

    public void setEnrollmentId(Long enrollmentId) {
        this.enrollmentId = enrollmentId;
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

    public LocalDateTime getEnrollmentDate() {
        return enrollmentDate;
    }

    public void setEnrollmentDate(LocalDateTime enrollmentDate) {
        this.enrollmentDate = enrollmentDate;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public Long getCourseId() {
        return courseId;
    }

    public void setCourseId(Long courseId) {
        this.courseId = courseId;
    }

    public Long getStudentId() {
        return studentId;
    }

    public void setStudentId(Long studentId) {
        this.studentId = studentId;
    }

	public Enrollment(Long enrollmentId, Student student, Course course, LocalDateTime enrollmentDate, String status) {
		super();
		this.enrollmentId = enrollmentId;
		this.student = student;
		this.course = course;
		this.enrollmentDate = enrollmentDate;
		this.status = status;
	}
    
}
