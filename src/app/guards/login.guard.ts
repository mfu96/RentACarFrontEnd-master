//21. gün 2.13 dakikada anlatıyor

import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class LoginGuard implements CanActivate {


  constructor(private authService:AuthService,
    private toastrService:ToastrService,
    private roter:Router
    ){

    }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

      if(this.authService.isAuthenticated()){
        return true
      }
      else{
        this.roter.navigate(["login"])
        this.toastrService.info("Sisteme giriş yapmalısınız!")
        return false;
      }


    }
  
}
