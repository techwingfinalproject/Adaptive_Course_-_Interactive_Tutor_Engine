package com.example.demo.repository;



import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.demo.models.Notification;

public interface NotificationRepository extends JpaRepository<Notification, Long> {

    List<Notification> findByStudentStudentId(Long studentId);

    List<Notification> findByTeacherTeacherId(Long teacherId);

}
