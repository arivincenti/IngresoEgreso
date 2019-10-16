import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router, CanLoad } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from './auth/auth.service';
import { take } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate, CanLoad
{
  constructor(private _authService: AuthService) { }


  canActivate(): Observable<boolean> | Promise<boolean> | boolean
  {
    return this._authService.isAuth();
  }

  canLoad(){
    return this._authService.isAuth()
    .pipe(
      take(1)
    );
  }
}
