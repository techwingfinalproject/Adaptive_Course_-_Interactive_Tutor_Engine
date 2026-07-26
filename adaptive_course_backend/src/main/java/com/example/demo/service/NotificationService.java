package com.example.demo.service;

import java.util.List;

import com.example.demo.models.Notification;

public interface NotificationService {

    Notification createNotification(Notification notification);

    List<Notification> getAllNotifications();

    Notification getNotificationById(Long id);

    List<Notification> getNotificationsByStudent(Long studentId);

    List<Notification> getNotificationsByTeacher(Long teacherId);

    Notification updateNotification(Long id, Notification notification);

    void deleteNotification(Long id);

}

