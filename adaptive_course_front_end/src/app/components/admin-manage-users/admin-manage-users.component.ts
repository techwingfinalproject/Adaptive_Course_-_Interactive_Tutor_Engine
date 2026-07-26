import { Component, OnInit } from '@angular/core';
import { AdminService } from '../../services/admin.service';

@Component({
  selector: 'app-admin-manage-users',
  templateUrl: './admin-manage-users.component.html',
  styleUrls: ['./admin-manage-users.component.css']
})
export class AdminManageUsersComponent implements OnInit {
  teachers: any[] = [];
  students: any[] = [];
  
  newTeacher = {
    fullName: '',
    email: '',
    password: '',
    department: ''
  };

  loading = true;
  successMsg = '';
  errorMsg = '';

  constructor(private adminService: AdminService) {}

  ngOnInit(): void {
    this.loadUsers();
  }

  loadUsers() {
    this.loading = true;
    this.adminService.getAllTeachers().subscribe({
      next: (t) => {
        this.teachers = t;
        this.adminService.getAllStudents().subscribe({
          next: (s) => {
            this.students = s;
            this.loading = false;
          },
          error: () => this.loading = false
        });
      },
      error: () => this.loading = false
    });
  }

  createTeacher() {
    this.adminService.createTeacher(this.newTeacher).subscribe({
      next: (res) => {
        this.successMsg = 'Teacher added successfully!';
        this.errorMsg = '';
        this.newTeacher = { fullName: '', email: '', password: '', department: '' };
        this.loadUsers(); // refresh list
      },
      error: (err) => {
        if (err.error && err.error.message) {
           this.errorMsg = err.error.message;
        } else if (err.error && err.error.errors) {
           // Handle Spring Boot validation errors
           this.errorMsg = err.error.errors[0].defaultMessage || 'Validation failed.';
        } else {
           this.errorMsg = 'Failed to add teacher. Please check the fields and try again.';
        }
        this.successMsg = '';
      }
    });
  }

  deleteTeacher(id: number) {
    this.adminService.deleteTeacher(id).subscribe(() => this.loadUsers());
  }

  deleteStudent(id: number) {
    this.adminService.deleteStudent(id).subscribe(() => this.loadUsers());
  }
}
