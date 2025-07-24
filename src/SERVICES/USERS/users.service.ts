import { HttpClient, HttpHeaders } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, tap } from 'rxjs';
import { User } from '../../UTILS/types';

@Injectable({
  providedIn: 'root',
})
export class UsersService {
  private http = inject(HttpClient);
  private router = inject(Router);
  readonly baseUrl: string = 'http://localhost:8080/users';

  getHeaders() {
    const token = localStorage.getItem('token');
    return {
      headers: new HttpHeaders({
        Authorization: `Bearer ${token}`,
      }),
    };
  }

  getUsers(): Observable<User[]> {
    return this.http.get<User[]>(`${this.baseUrl}`, this.getHeaders()).pipe(
      tap((res) => {
        console.log(res);
        return res;
      })
    );
  }

  getUserById(id: number): Observable<User> {
    return this.http.get<User>(`${this.baseUrl}/${id}`, this.getHeaders()).pipe(
      tap((res) => {
        console.log(res);
        return res;
      })
    );
  }

  updateUser(id: number, user: User): Observable<User> {
    return this.http
      .put<User>(`${this.baseUrl}/${id}`, user, this.getHeaders())
      .pipe(
        tap((res) => {
          console.log(res);
          return res;
        })
      );
  }

  blockUser(id: number): Observable<User> {
    return this.http
      .put<User>(`${this.baseUrl}/admin/${id}/block`, {}, this.getHeaders())
      .pipe(
        tap((res) => {
          console.log(res);
          return res;
        })
      );
  }

  unblockUser(id: number): Observable<User> {
    return this.http
      .put<User>(`${this.baseUrl}/admin/${id}/unblock`, {}, this.getHeaders())
      .pipe(
        tap((res) => {
          console.log(res);
          return res;
        })
      );
  }
  deleteUser(id: number): Observable<User> {
    return this.http
      .delete<User>(`${this.baseUrl}/${id}`, this.getHeaders())
      .pipe(
        tap((res) => {
          console.log(res);
          return res;
        })
      );
  }
}
