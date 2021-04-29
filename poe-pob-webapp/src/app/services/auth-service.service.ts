import { environment } from './../../environments/environment';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { LoginInput } from './../models/login-input';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthServiceService {

  constructor(private http: HttpClient) { }

  login(data: LoginInput): Observable<any> {
    return this.http.post(`${environment.baseUrlAPI}/login`, data);
  }
}
