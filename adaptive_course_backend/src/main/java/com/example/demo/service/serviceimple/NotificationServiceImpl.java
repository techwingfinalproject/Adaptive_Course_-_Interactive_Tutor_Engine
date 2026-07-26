package com.example.demo.service.serviceimple;

import com.example.demo.exception.ResourceNotFoundException;

 



import java.util.List;

import org.springframework.stereotype.Service;

import com.example.demo.models.Notification;
import com.example.demo.repository.NotificationRepository;
import com.example.demo.service.NotificationService;
@Service
public class NotificationServiceImpl implements NotificationService {

    private static final String NOTIFICATION_NOT_FOUND_MSG = "Notification not found";

    private final NotificationRepository repository;

    public NotificationServiceImpl(NotificationRepository repository) {
        this.repository = repository;
    }

    @Override
    public Notification createNotification(Notification notification) {
        return repository.save(notification);
    }

    @Override
    public List<Notification> getAllNotifications() {
        return repository.findAll();
    }

    @Override
    public Notification getNotificationById(Long id) {
        return repository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException(NOTIFICATION_NOT_FOUND_MSG));
    }

    @Override
    public List<Notification> getNotificationsByStudent(Long studentId) {
        return repository.findByStudentStudentId(studentId);
    }

    @Override
    public List<Notification> getNotificationsByTeacher(Long teacherId) {
        return repository.findByTeacherTeacherId(teacherId);
    }

    @Override
    public Notification updateNotification(Long id, Notification notification) {

        Notification existing = repository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException(NOTIFICATION_NOT_FOUND_MSG));

        existing.setTitle(notification.getTitle());
        existing.setMessage(notification.getMessage());
        existing.setType(notification.getType());

        return repository.save(existing);
    }

    @Override
    public void deleteNotification(Long id) {

        Notification notification = repository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException(NOTIFICATION_NOT_FOUND_MSG));

        repository.delete(notification);
    }
}


