import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, tap, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';
import { LoginModel } from '../models/entities/loginModel';
import { RegisterModel } from '../models/entities/registerModel';
import { ResponseModel } from '../models/responses/responseModel';
import { SingleResponseModel } from '../models/responses/singleResponseModel';
import { TokenModel } from '../models/tokenModel';
import { LocalStorageService } from './local-storge.service';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  apiUrl =environment.apiUrl;
  constructor(
    private httpClient: HttpClient
  ) {}


  //190323 de commendlendi 
    //son gün dersiniden yardım alındı
  // login(user: LoginModel): Observable<SingleResponseModel<TokenModel>> {
  //   let newPath = this.apiUrl + 'auth/login';
  //   return this.httpClient.post<SingleResponseModel<TokenModel>>(
  //     newPath,
  //     user
  //   )
  //   ; 

  // }

  login(loginModel:LoginModel){
    return this.httpClient.post<SingleResponseModel<TokenModel>>(this.apiUrl + 'auth/login',loginModel )

  }


  isAuthenticated(){
    if(localStorage.getItem("token")){
      return true;
    }
    else{
      return false;
    }
  }

   //190323 de commendlendi 
    //son gün dersiniden yardım alındı
  // isAuthenticated(){
  //   return sessionStorage.getItem("token");   //!!!!
  // }

  register(
    registerModel: RegisterModel
  ): Observable<SingleResponseModel<TokenModel>> {
    let newPath = this.apiUrl + 'auth/register';
    return this.httpClient.post<SingleResponseModel<TokenModel>>(newPath,registerModel)
  }



  logOut(){
    sessionStorage.removeItem("token");
    sessionStorage.removeItem("user");
    sessionStorage.removeItem("email");
  }
  
}
