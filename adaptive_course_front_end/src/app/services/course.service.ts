import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CourseService {
  private apiUrl = 'http://localhost:8080/api/courses';

  constructor(private http: HttpClient) { }

  getAllCourses(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }

  createCourse(courseData: any): Observable<any> {
    return this.http.post<any>(this.apiUrl, courseData);
  }
}
