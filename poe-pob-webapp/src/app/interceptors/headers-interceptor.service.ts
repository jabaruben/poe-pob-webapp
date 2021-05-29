import { AuthServiceService } from './../services/auth-service.service';
import { Injectable } from '@angular/core';
import { HttpHandler, HttpHeaders, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class HeadersInterceptorService implements HttpInterceptor {

  constructor(private AuthService: AuthServiceService) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<any> {
    const headers = new HttpHeaders({
      Authorization: `Bearer ${localStorage.getItem(this.AuthService.JWT_TOKEN)}`
    });
    const reqClone = req.clone({
      headers
    });

    return (req.url === `${environment.baseUrlAPI}/login`) ? next.handle( req ) : next.handle( reqClone );
  }
}
