import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ThemeService {
  private apiUrl = 'http://localhost:3000/api/themes';

  constructor(private http: HttpClient) {}

  getThemes(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}`);
  }

  getThemeById(themeId: string): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/${themeId}`);
  }

  createTheme(themeData: {
    themeName: string;
    description: string;
  }): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}`, themeData);
  }
}
