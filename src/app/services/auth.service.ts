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
import { UserService } from './user.service';
import { User } from '../models/entities/user';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  apiUrl =environment.apiUrl;
  user: User;
 
  constructor(
    private httpClient: HttpClient,
    private userService:UserService,
    private localStorage: LocalStorageService,

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
    return this.httpClient.post<SingleResponseModel<TokenModel>>
    (this.apiUrl + 'auth/login',loginModel )

  }


  isAuthenticated(): boolean {
    if (localStorage.getItem("token")) {
      if (this.checkTokenExpiration()) {
        return true;
      } else {
        this.logOut();
        return false;
      }
    } else {
      return false;
    }
  }

  // isAuthenticated_old(): boolean {
  //   return !!localStorage.getItem('token');
  // }


   //190323 de commendlendi 
    //son gün dersiniden yardım alındı
  // isAuthenticated(){
  //   return sessionStorage.getItem("token");   //!!!!
  // }

  register(registerModel: RegisterModel):Observable<SingleResponseModel<TokenModel>> {
    let newPath = this.apiUrl + 'auth/register';
    return this.httpClient.post<SingleResponseModel<TokenModel>>(newPath, registerModel)
  }



  logOut() {

    localStorage.removeItem('token');
    localStorage.removeItem('expiration');

    localStorage.removeItem("email");

    localStorage.removeItem('fullName');

    window.location.reload(); // Sayfayı yenileyerek değişiklikleri yansıt



  }

  setUser(email:string){
    this.userService.getByEmail(email).subscribe((response=>{
      this.user=response.data;
      console.info(this.user)
      this.localStorage.set("fullName", this.user.firstName + " "+ this.user.lastName);
      this.localStorage.set("email",this.user.email)
        window.location.reload(); // Sayfayı yenileyerek değişiklikleri yansıt

    }))
  }
  getUserName(): string {
    return localStorage.getItem('fullName') || '';

  }

  checkTokenExpiration(): boolean {
    const expiration = localStorage.getItem('expiration');
    if (expiration) {
      const now = new Date().getTime();
      const expirationDate = new Date(expiration).getTime();
      return now < expirationDate;
    }
    return false;
  }
  
}
