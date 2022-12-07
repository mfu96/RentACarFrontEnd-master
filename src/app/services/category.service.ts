import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Category } from '../models/entities/category';
import { ListResponseModel } from '../models/responses/listResponseModel';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  apiUrl= "https://localhost:44389/api/"
  constructor(private httpClient:HttpClient) { }
  getCategories():Observable<ListResponseModel<Category>>{
    let newPath= this.apiUrl+"categories/getall";
    return this.httpClient
    .get<ListResponseModel<Category>>(newPath);
  }

  
}
