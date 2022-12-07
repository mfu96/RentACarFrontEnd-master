import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Brand } from '../models/entities/brand';
import { Observable } from 'rxjs';
import { ListResponseModel } from '../models/responses/listResponseModel';

@Injectable({
  providedIn: 'root',
})
export class BrandService {
  apiUrl = 'https://localhost:44389/api/';
  constructor(private httpClient: HttpClient) {}
  getBrands(): Observable<ListResponseModel<Brand>> {
    let newPath= this.apiUrl +"brands/getall"
    return this.httpClient
    .get<ListResponseModel<Brand>>(newPath);
  }
}
