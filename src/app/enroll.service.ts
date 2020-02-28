import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Person } from './person';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EnrollService {
  private url:string = 'http://localhost:3000/register';
  constructor(private httpClient: HttpClient) { }

  register(person: Person){
    return this.httpClient.post<any>(this.url, person)
      .pipe(
        catchError(error => throwError(error.message || 'Server error'))
      );
  }

  enroll(data){
    return this.httpClient.post(this.url, data);
  }
}

