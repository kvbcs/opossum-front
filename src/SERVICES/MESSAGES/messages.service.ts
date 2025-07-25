import { HttpClient, HttpHeaders } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, tap } from 'rxjs';
import { Message } from '../../UTILS/types';

@Injectable({
  providedIn: 'root',
})
export class MessagesService {
  private http = inject(HttpClient);
  private router = inject(Router);
  readonly baseUrl: string = 'http://localhost:8080/messages';

  getHeaders() {
    const token = localStorage.getItem('token');
    return {
      headers: new HttpHeaders({
        Authorization: `Bearer ${token}`,
      }),
    };
  }

  getMessagesBetweenUsers(recipientId: number): Observable<Message[]> {
    return this.http
      .get<Message[]>(
        `${this.baseUrl}/between/${recipientId}`,
        this.getHeaders()
      )
      .pipe(
        tap((res) => {
          console.log(res);
          return res;
        })
      );
  }

  getMyMessages(): Observable<Message[]> {
    return this.http
      .get<Message[]>(
        `${this.baseUrl}/me`,
        this.getHeaders()
      )
      .pipe(
        tap((res) => {
          console.log(res);
          return res;
        })
      );
  }

  getMessageById(id: number): Observable<Message> {
    return this.http
      .get<Message>(`${this.baseUrl}/${id}`, this.getHeaders())
      .pipe(
        tap((res) => {
          console.log(res);
          return res;
        })
      );
  }

  createMessage(recipientId: number, message: Message): Observable<Message> {
    return this.http
      .post<Message>(
        `${this.baseUrl}/${recipientId}`,
        message,
        this.getHeaders()
      )
      .pipe(
        tap((res) => {
          console.log(res);
          return res;
        })
      );
  }

  deleteMessage(id: number): Observable<Message> {
    return this.http
      .delete<Message>(`${this.baseUrl}/${id}`, this.getHeaders())
      .pipe(
        tap((res) => {
          console.log(res);
          return res;
        })
      );
  }
}
