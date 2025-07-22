import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Auth } from '../../UTILS/types';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private http = inject(HttpClient);
  private router = inject(Router);
  readonly baseUrl: string = 'http://localhost:8080/auth';

  register(dto: Auth): Observable<Auth> {
    return this.http.post<Auth>(`${this.baseUrl}/register`, dto);
  }

  login(dto: Auth): Observable<Auth> {
    return this.http.post<Auth>(`${this.baseUrl}/login`, dto);
  }

  logout(): void {
    localStorage.removeItem('token');
    this.router.navigate(['/']);
  }

  isLoggedIn(): boolean {
    const token = localStorage.getItem('token');
    return !!token && !this.isTokenExpired(token);
  }

  getUserRole(): 'user' | 'admin' | null {
    const token = localStorage.getItem('token');
    if (!token) return null;

    try {
      const payload = this.parseJwt(token);
      return payload?.role ?? null;
    } catch {
      return null;
    }
  }

  private isTokenExpired(token: string): boolean {
    try {
      const payload = this.parseJwt(token);
      if (!payload?.exp) return true;
      const now = Math.floor(Date.now() / 1000);
      return payload.exp < now;
    } catch {
      return true;
    }
  }

  private parseJwt(token: string): any {
    const base64Url = token.split('.')[1];
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    const jsonPayload = decodeURIComponent(
      atob(base64)
        .split('')
        .map((c) => '%' + c.charCodeAt(0).toString(16))
        .join('')
    );
    return JSON.parse(jsonPayload);
  }
}
