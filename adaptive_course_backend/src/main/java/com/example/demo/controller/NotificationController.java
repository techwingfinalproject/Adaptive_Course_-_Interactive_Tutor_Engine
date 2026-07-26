package com.example.demo.controller;

import java.util.List;

import org.springframework.web.bind.annotation.*;

import com.example.demo.models.Notification;
import com.example.demo.service.NotificationService;

@RestController
@RequestMapping("/api/notifications")
@CrossOrigin(origins = "*")
public class NotificationController {

    private final NotificationService service;

    public NotificationController(NotificationService service) {
        this.service = service;
    }

    @PostMapping
    public Notification createNotification(@RequestBody Notification notification) {
        return service.createNotification(notification);
    }

    @GetMapping
    public List<Notification> getAllNotifications() {
        return service.getAllNotifications();
    }

    @GetMapping("/{id}")
    public Notification getNotificationById(@PathVariable Long id) {
        return service.getNotificationById(id);
    }

    @GetMapping("/student/{studentId}")
    public List<Notification> getNotificationsByStudent(@PathVariable Long studentId) {
        return service.getNotificationsByStudent(studentId);
    }

    @GetMapping("/teacher/{teacherId}")
    public List<Notification> getNotificationsByTeacher(@PathVariable Long teacherId) {
        return service.getNotificationsByTeacher(teacherId);
    }

    @PutMapping("/{id}")
    public Notification updateNotification(@PathVariable Long id,
                                           @RequestBody Notification notification) {
        return service.updateNotification(id, notification);
    }

    @DeleteMapping("/{id}")
    public String deleteNotification(@PathVariable Long id) {
        service.deleteNotification(id);
        return "Notification deleted successfully.";
    }
}

