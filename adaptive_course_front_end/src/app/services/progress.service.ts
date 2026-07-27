import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProgressService {
  private apiUrl = '/adaptive_course_backend/api/student-progress';

  constructor(private http: HttpClient) { }

  // These would connect to actual backend progress endpoints
  getStudentProgress(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}`);
  }
}
