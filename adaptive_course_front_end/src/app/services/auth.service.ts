import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'http://localhost:8080/api'; // Adjust port if needed
  
  private loggedInSubject = new BehaviorSubject<boolean>(this.isLoggedIn());
  public isLoggedIn$ = this.loggedInSubject.asObservable();

  constructor(private http: HttpClient) { }

  login(credentials: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/login`, credentials).pipe(
      tap((response: any) => {
        if (response && response.token) {
          this.setToken(response.token);
        }
      })
    );
  }

  registerStudent(studentData: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/students/register`, studentData).pipe(
      tap((response: any) => {
        if (response && response.token) {
          this.setToken(response.token);
        }
      })
    );
  }

  setToken(token: string): void {
    localStorage.setItem('auth_token', token);
    this.loggedInSubject.next(true);
  }

  getToken(): string | null {
    return localStorage.getItem('auth_token');
  }

  logout(): void {
    localStorage.removeItem('auth_token');
    this.loggedInSubject.next(false);
  }

  isLoggedIn(): boolean {
    return !!this.getToken();
  }

  getRole(): string | null {
    const token = this.getToken();
    if (token) {
      try {
        const payload = JSON.parse(atob(token.split('.')[1]));
        return payload.role;
      } catch (e) {
        return null;
      }
    }
    return null;
  }
}
