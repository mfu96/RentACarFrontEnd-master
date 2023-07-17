import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Customer } from '../models/entities/customer';
import { CustomerDetailDto } from '../models/entities/customerDetailDto';
import { ListResponseModel } from '../models/responses/listResponseModel';

@Injectable({
  providedIn: 'root',
})
export class CustomerService {
  apiUrl =environment.apiUrl;

  private currentUser: Customer;


  constructor(private httpClient: HttpClient) {}
  getCustomerDetails(): Observable<ListResponseModel<CustomerDetailDto>> {
    let newPath= this.apiUrl +"customers/getdetails"

    return this.httpClient.get<ListResponseModel<CustomerDetailDto>>(
      newPath);
  }

  getCustomer():Observable<ListResponseModel<Customer>>{
    let newPath=this.apiUrl + "customers/getall"
    return this.httpClient.get<ListResponseModel<Customer>>(newPath)
  }

  getCurrentUser(): Customer {
    return this.currentUser;
  }

  getCustomerId(id:number):Observable<ListResponseModel<Customer>>{
    let newPath=this.apiUrl+ "customers/getbyid?id="+ id;
    return this.httpClient.get<ListResponseModel<Customer>>(newPath);
  }


}
