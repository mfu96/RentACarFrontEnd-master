import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ListResponseModel } from '../models/responses/listResponseModel';
import { User } from '../models/entities/user';


@Injectable({
  providedIn: 'root'
})
export class UserService {

  apiUrl = 'https://localhost:44389/api/';


  constructor(private httpClient:HttpClient) { }

  getUsers():Observable<ListResponseModel<User>>{
    let newPath=this.apiUrl+ "users/getall";
    return this.httpClient.get<ListResponseModel<User>>(newPath);
  }

  getUserDetails(email:string):Observable<ListResponseModel<User>>{
    let newPath=this.apiUrl + "users/getbyemail?email="+ email;
    return this.httpClient.get<ListResponseModel<User>>(newPath);
  }
}
