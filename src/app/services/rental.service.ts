import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { RentalDetailDto } from '../models/entities/rentalDetailDto';
import { ListResponseModel } from '../models/responses/listResponseModel';

@Injectable({
  providedIn: 'root'
})
export class RentalService {
  apiUrl='https://localhost:44389/api/';
 
  constructor(private httpClient:HttpClient) { }
  getRentalDetails():Observable<ListResponseModel<RentalDetailDto>>{
    let newPath= this.apiUrl +"rentals/getdetails"
    return this.httpClient.get<ListResponseModel<RentalDetailDto>>
    (newPath);
  }}
