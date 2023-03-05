import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, tap, throwError } from 'rxjs';
import { LoginModel } from '../models/entities/loginModel';
import { RegisterModel } from '../models/entities/registerModel';
import { SingleResponseModel } from '../models/responses/singleResponseModel';
import { TokenModel } from '../models/tokenModel';
import { LocalStorageService } from './local-storge.service';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  apiUrl = 'https://localhost:44389/api/';

  constructor(
    private httpClient: HttpClient
  ) {}

  login(user: LoginModel): Observable<SingleResponseModel<TokenModel>> {
    let newPath = this.apiUrl + 'auth/login';
    return this.httpClient.post<SingleResponseModel<TokenModel>>(
      newPath,
      user
    )
    ; 

  }



  register(
    registerModel: RegisterModel
  ): Observable<SingleResponseModel<TokenModel>> {
    let newPath = this.apiUrl + 'auth/register';
    return this.httpClient.post<SingleResponseModel<TokenModel>>(newPath,registerModel)
  }

  isAuthenticated(){
    return sessionStorage.getItem("token");
  }

  logOut(){
    sessionStorage.removeItem("token");
    sessionStorage.removeItem("user");
    sessionStorage.removeItem("email");
  }
  
}
