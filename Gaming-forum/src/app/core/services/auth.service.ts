import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { AuthResponse } from 'src/app/auth/auth-response.model';
import { tap, catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiUrl = 'http://localhost:3000/api/auth';

  constructor(private http: HttpClient, private router: Router) {}

  login(userData: { email: string; password: string }) {
    return this.http.post<AuthResponse>(`${this.apiUrl}/login`, userData).pipe(
      tap((response) => {
        if (response.token) {
          localStorage.setItem('token', response.token);
          localStorage.setItem('userId', response.userId);
          localStorage.setItem('email', response.email);
          const user = { username: response.username };
          localStorage.setItem('user', JSON.stringify(user));
        }
      }),
      catchError((error) => {
        return throwError(error);
      })
    );
  }

  register(userData: { username: string; email: string; password: string }) {
    return this.http
      .post<AuthResponse>(`${this.apiUrl}/register`, userData)
      .pipe(
        tap((response) => {
          if (response.token) {
            localStorage.setItem('token', response.token);
            localStorage.setItem('userId', response.userId);
            localStorage.setItem('email', response.email);
            const user = { username: userData.username };
            localStorage.setItem('user', JSON.stringify(user));
          }
        }),
        catchError((error) => {
          return throwError(error);
        })
      );
  }

  logout(): void {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    localStorage.removeItem('userId');
    localStorage.removeItem('email');
  }

  isLoggedIn(): boolean {
    return !!localStorage.getItem('token');
  }

  getUsername(): string {
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    return user.username || 'User';
  }

  getToken(): string | null {
    return localStorage.getItem('token');
  }

  getUserId(): string | null {
    return localStorage.getItem('userId');
  }

  getEmail(): string {
    return localStorage.getItem('email') || '';
  }
}