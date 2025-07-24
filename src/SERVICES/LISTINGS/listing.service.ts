import { HttpClient, HttpHeaders } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { map, Observable, tap } from 'rxjs';
import { Listing } from '../../UTILS/types';

@Injectable({
  providedIn: 'root',
})
export class ListingService {
  private http = inject(HttpClient);
  private router = inject(Router);
  readonly baseUrl: string = 'http://localhost:8080/listings';

  getHeaders() {
    const token = localStorage.getItem('token');
    return {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
  }

  getListings(): Observable<Listing[]> {
    return this.http.get<Listing[]>(`${this.baseUrl}`, this.getHeaders()).pipe(
      tap((res) => {
        console.log(res);
        return res;
      })
    );
  }

  getListingById(id: number): Observable<Listing> {
    return this.http
      .get<Listing>(`${this.baseUrl}/${id}`, this.getHeaders())
      .pipe(
        tap((res) => {
          console.log(res);
          return res;
        })
      );
  }

  createListing(listing: Listing): Observable<Listing> {
    return this.http
      .post<Listing>(`${this.baseUrl}`, listing, this.getHeaders())
      .pipe(
        tap((res) => {
          console.log(res);
          return res;
        })
      );
  }

  updateListing(id: number, listing: Listing): Observable<Listing> {
    return this.http
      .put<Listing>(`${this.baseUrl}/${id}`, listing, this.getHeaders())
      .pipe(
        tap((res) => {
          console.log(res);
          return res;
        })
      );
  }

  archiveListing(id: number): Observable<Listing> {
    return this.http
      .put<Listing>(`${this.baseUrl}/${id}/archive`, null, this.getHeaders())
      .pipe(
        tap((res) => {
          console.log(res);
          return res;
        })
      );
  }

  deleteListing(id: number): Observable<Listing> {
    return this.http
      .delete<Listing>(`${this.baseUrl}/${id}`, this.getHeaders())
      .pipe(
        tap((res) => {
          console.log(res);
          return res;
        })
      );
  }
}
