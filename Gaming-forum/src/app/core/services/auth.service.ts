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
  private token: string | null = null;
  private userId: string | null = null;
  private user: any;

  constructor(private http: HttpClient, private router: Router) {}

  login(userData: { email: string; password: string }) {
    return this.http.post<AuthResponse>(`${this.apiUrl}/login`, userData).pipe(
      tap((response) => {
        if (response.token) {
          localStorage.setItem('token', response.token);
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
  }

  isLoggedIn(): boolean {
    return !!localStorage.getItem('token');
  }

  getUsername(): string {
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    return user.username || 'User';
  }

  getToken(): string | null {
    return this.token;
  }

  getUserId(): string | null {
    return this.userId;
  }

  getEmail(): string {
    return this.user.email || '';
  }
}
