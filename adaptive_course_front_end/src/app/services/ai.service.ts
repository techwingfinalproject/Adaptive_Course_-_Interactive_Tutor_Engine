import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AiService {
  private apiUrl = '/adaptive_course_backend/api/ai';

  constructor(private http: HttpClient) { }

  chat(message: string, history: any[] = []): Observable<any> {
    const request = {
      studentQuestion: message,
      lessonId: null,
      chatHistory: history
    };
    return this.http.post<any>(`${this.apiUrl}/chat`, request);
  }
}
