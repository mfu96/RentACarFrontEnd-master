import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ListResponseModel } from '../models/responses/listResponseModel';
import { User } from '../models/entities/user';
import { SingleResponseModel } from '../models/responses/singleResponseModel';
import { environment } from 'src/environments/environment';


@Injectable({
  providedIn: 'root'
})
export class UserService {

  apiUrl =environment.apiUrl;


  constructor(private httpClient:HttpClient) { }

  getUsers():Observable<ListResponseModel<User>>{
    let newPath=this.apiUrl+ "users/getall";
    return this.httpClient.get<ListResponseModel<User>>(newPath);
  }

  getByEmail(email:string):Observable<SingleResponseModel<User>>{
    let newPath=this.apiUrl + "users/getbyemail?email="+ email;
    return this.httpClient.get<SingleResponseModel<User>>(newPath);
  }
}
