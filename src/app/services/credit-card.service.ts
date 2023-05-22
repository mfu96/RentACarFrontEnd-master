import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { CreditCard } from '../models/entities/creditCard';
import { Observable } from 'rxjs';
import { ResponseModel } from '../models/responses/responseModel';
import { ListResponseModel } from '../models/responses/listResponseModel';

@Injectable({
  providedIn: 'root'
})
export class CreditCardService {
  apiUrl=environment.apiUrl;

  constructor(private httpclient: HttpClient) { }

  addCard(creditCard:CreditCard):Observable<ResponseModel>{
    let newPath=this.apiUrl+ "creditcard/add"
    return this.httpclient.post<ResponseModel>(newPath,creditCard)

  }

  getCreditCard():Observable<ListResponseModel<CreditCard>>{
    let newPath=this.apiUrl+ "creditCard/getall"
    return this.httpclient.get<ListResponseModel<CreditCard>>(newPath);
  }

  getByCustomer(customerId:number):Observable<ListResponseModel<CreditCard>>{
    let newPath=this.apiUrl+ "creditcard/getbycustomer"+ customerId;
    return this.httpclient.get<ListResponseModel<CreditCard>>(newPath);
  }




}
