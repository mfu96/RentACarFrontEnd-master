import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Rental } from '../models/entities/rental';
import { RentalDetailDto } from '../models/entities/rentalDetailDto';
import { ListResponseModel } from '../models/responses/listResponseModel';
import { ResponseModel } from '../models/responses/responseModel';

@Injectable({
  providedIn: 'root'
})
export class RentalService {
  apiUrl = 'https://localhost:44389/api/';
  rentingCar:Rental;

  constructor(private httpClient: HttpClient) { }
  getRentalDetails(): Observable<ListResponseModel<RentalDetailDto>> {
    let newPath = this.apiUrl + "rentals/getdetails"
    return this.httpClient.get<ListResponseModel<RentalDetailDto>>
      (newPath);
  }

  getByRentalId(rentId: number):Observable<ListResponseModel<Rental>>{
    let newPath = this.apiUrl+ "rentals/getbyid?rentid=" +rentId;
    return this.httpClient.get<ListResponseModel<Rental>>(newPath);
  }

  getLastRentalByCarId(carId:number):Observable<ListResponseModel<RentalDetailDto>>{
    let newPath=this.apiUrl+ "rentals/getlastrentalbycarid?carid=" + carId;
    return this.httpClient.get<ListResponseModel<RentalDetailDto>>(newPath);
  }

  addRental(rental:Rental):Observable<ResponseModel>{
    let newPath=this.apiUrl +"rentals/add"
    return this.httpClient.post<ResponseModel>(newPath,rental)
  }

  setRentingCar(rental: Rental) {
    this.rentingCar = rental;
 }

 getRentingCar() {
    return this.rentingCar;
 }

 removeRentingCar() {
    this.rentingCar = null
 }
}
