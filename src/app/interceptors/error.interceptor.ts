import { HttpInterceptorFn, HttpErrorResponse } from '@angular/common/http';
import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, throwError } from 'rxjs';
import { AuthService } from '../services/auth.service';

export const errorInterceptor: HttpInterceptorFn = (req, next) => {
  const router = inject(Router);
  const authService = inject(AuthService);

  return next(req).pipe(
    catchError((error: HttpErrorResponse) => {
      if (error.status === 401) {
        authService.logout();
        router.navigate(['/login']);
      } else if (error.status === 0) {
        // Netzwerkfehler – API nicht erreichbar
        console.error('API nicht erreichbar:', error.message);
      } else if (error.status >= 500) {
        console.error('Server-Fehler:', error.status, error.message);
      }

      return throwError(() => error);
    })
  );
};
