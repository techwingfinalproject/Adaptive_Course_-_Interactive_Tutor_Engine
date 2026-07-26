import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AdminService {
  private apiUrl = 'http://localhost:8080/api';

  constructor(private http: HttpClient) { }

  // --- Students ---
  getAllStudents(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/students`);
  }

  deleteStudent(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/students/${id}`, { responseType: 'text' });
  }

  // --- Teachers ---
  getAllTeachers(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/teachers`);
  }

  createTeacher(teacherData: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/teachers`, teacherData);
  }

  deleteTeacher(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/teachers/${id}`, { responseType: 'text' });
  }
}
