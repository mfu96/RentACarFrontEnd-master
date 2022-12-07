import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CustomerDetailDto } from '../models/entities/customerDetailDto';
import { ListResponseModel } from '../models/responses/listResponseModel';

@Injectable({
  providedIn: 'root',
})
export class CustomerService {
  apiUrl = 'https://localhost:44389/api/';

  constructor(private httpClient: HttpClient) {}
  getCustomerDetails(): Observable<ListResponseModel<CustomerDetailDto>> {
    let newPath= this.apiUrl +"customers/getdetails"

    return this.httpClient.get<ListResponseModel<CustomerDetailDto>>(
      newPath);
  }
}
