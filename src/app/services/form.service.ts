import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BookingForm } from '../models/booking-form';

@Injectable()
export class FormService {

  baseUrl = '/api/forms/';

  constructor( private http: HttpClient) { }

  saveFormDetails(data: BookingForm): Observable<BookingForm> {
    return this.http.post<BookingForm>(this.baseUrl+ 'saveFormDetails', data);
  }
}
