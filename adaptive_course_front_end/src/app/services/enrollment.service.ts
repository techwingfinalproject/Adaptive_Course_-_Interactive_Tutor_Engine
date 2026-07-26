import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EnrollmentService {
  private apiUrl = 'http://localhost:8080/api/enrollments';

  constructor(private http: HttpClient) { }

  getMyEnrollments(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/student`);
  }

  enrollInCourse(courseId: number): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/${courseId}`, {});
  }
}
