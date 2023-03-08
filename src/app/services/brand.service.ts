import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Brand } from '../models/entities/brand';
import { Observable } from 'rxjs';
import { ListResponseModel } from '../models/responses/listResponseModel';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class BrandService {
  apiUrl =environment.apiUrl;
  constructor(private httpClient: HttpClient) {}
  getBrands(): Observable<ListResponseModel<Brand>> {
    let newPath= this.apiUrl +"brands/getall"
    return this.httpClient
    .get<ListResponseModel<Brand>>(newPath);
  }
}
