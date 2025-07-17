import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class ListingService {
  constructor() {}
  private http = inject(HttpClient);
  private router = inject(Router);
  readonly baseUrl: string = 'http://localhost:8080/listings';
}
