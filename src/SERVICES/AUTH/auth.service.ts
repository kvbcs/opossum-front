import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Auth } from '../../UTILS/types';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor() {}

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
}
