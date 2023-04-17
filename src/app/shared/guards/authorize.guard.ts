import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthentificationService } from '../services/authentification.service';

@Injectable({
  providedIn: 'root'
})
export class AuthorizeGuard implements CanActivate {
 
  constructor(
    private router: Router,
    private auth: AuthentificationService) {}
    
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      if (localStorage.getItem('goil_user') != null) {
        this.auth.user = localStorage.getItem('goil_user');
        return true
      }
      this.router.navigate(['/login']);
      return false;
  }
  
  
}
