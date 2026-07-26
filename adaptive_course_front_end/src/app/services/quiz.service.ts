import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class QuizService {
  private apiUrl = 'http://localhost:8080/api/quizzes';

  constructor(private http: HttpClient) { }

  createQuiz(quiz: any): Observable<any> {
    return this.http.post<any>(this.apiUrl, quiz);
  }
}
