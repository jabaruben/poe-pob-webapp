import { environment } from './../../environments/environment';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { LoginInput } from './../models/login-input';
import { RefreshToken } from './../models/refresh-token';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthServiceService {
  readonly JWT_TOKEN = 'JWT_TOKEN';
  private readonly REFRESH_TOKEN = 'REFRESH_TOKEN';

  constructor(private http: HttpClient, private router: Router) { }

  login(data: LoginInput): Observable<any> {
    return this.http.post(`${environment.baseUrlAPI}/login`, data);
  }

  logged(): Observable<any> {
    return this.http.get(`${environment.baseUrlAPI}/api/logged`);
  }

  setJWT(jwt: string): void {
    localStorage.setItem(this.JWT_TOKEN, jwt);
  }

  isLoggedIn(): boolean {
    const jwt = localStorage.getItem(this.JWT_TOKEN);
    const rt = this.untwistToken(localStorage.getItem(this.REFRESH_TOKEN));
    const loggedIn = (jwt && rt && jwt === rt.jwt && new Date() <= rt.expiration);
    return loggedIn;
  }

  clearToken(): void {
    localStorage.removeItem(this.JWT_TOKEN);
    localStorage.removeItem(this.REFRESH_TOKEN);
  }

  setRefreshToken(expDate: string): void {
    const data = [localStorage[this.JWT_TOKEN], expDate];
    localStorage.setItem(this.REFRESH_TOKEN, this.twistToken(data));
  }

  private twistToken(o: string[]): string {
    const t1 = o.join('/').split('').reverse().join('');
    const twisted = btoa(t1);
    return twisted;
  }
  private untwistToken(s: string): RefreshToken {
    const ut1 = atob(s);
    const ut2 = ut1.split('').reverse().join('');
    const ut3 = ut2.split('/');
    const untwisted = {
      jwt: ut3[0],
      expiration: new Date(Number(ut3[1]) * 1000)
    };
    return untwisted;
  }

  logOut(): void {
    this.clearToken();
    this.router.navigate(['/login']);
  }

}
