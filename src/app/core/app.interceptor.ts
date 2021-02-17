// Angular
import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpResponse, HttpEvent, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { Router } from '@angular/router';
import { AuthenticationService } from './services/authentication.service';

const TOKEN_HEADER_KEY = 'Authorization';

@Injectable()
export class AppInterceptor implements HttpInterceptor {

    constructor(private router: Router, private authService: AuthenticationService) { }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

        let authReq = request;
        // const userWithToken = this.authService.getStoredUserWithToken();
        // if (userWithToken != null) {
        //     authReq = request.clone({ headers: request.headers.set(TOKEN_HEADER_KEY, 'Token ' + userWithToken.token) });
        // }

        // return next.handle(req);
        return next.handle(authReq).pipe(tap
            (
                (event: any) => {
                    if (event instanceof HttpResponse) { }
                },
                (err: any) => {
                    if (err instanceof HttpErrorResponse) {
                        // if (err.status === 401) {
                        //   this.router.navigate(['login']);
                        // }
                    }
                }
            ));

    }
}