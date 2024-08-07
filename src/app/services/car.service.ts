import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, ObservableLike } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Car } from '../models/entities/car';
import { CarDetailDto } from '../models/entities/carDetailDto';
import { ListResponseModel } from '../models/responses/listResponseModel';

@Injectable({
  providedIn: 'root',
})
export class CarService {
  apiUrl =environment.apiUrl;
  private currentCar: Car;

  
  constructor(private httpClient: HttpClient) {}

  getCars(): Observable<ListResponseModel<Car>> {
    let newPath = this.apiUrl + 'cars/getall';
    return this.httpClient.get<ListResponseModel<Car>>(newPath);
  }
  getCarDetails(): Observable<ListResponseModel<CarDetailDto>> {
    let newPath = this.apiUrl + 'cars/getdetails';
    return this.httpClient.get<ListResponseModel<CarDetailDto>>(newPath);
  }

  
  getCarsByDetail(carId: number):Observable<ListResponseModel<CarDetailDto>>{
    let newPath=this.apiUrl + 'cars/getbycardetail?carId=' + carId;
    return this.httpClient.get<ListResponseModel<CarDetailDto>>(newPath);
  }


  getCarsByCategory(categoryId: number): Observable<ListResponseModel<Car>> {
    let newPath = this.apiUrl + 'cars/getbycategory?categoryId=' + categoryId;
    return this.httpClient.get<ListResponseModel<Car>>(newPath);
  }


  getCarsByBrand(brandId: number): Observable<ListResponseModel<Car>> {
    let newPath = this.apiUrl + 'cars/getbybrand?brandId=' + brandId;
    return this.httpClient.get<ListResponseModel<Car>>(newPath);
  }

  // getCarsByBrands(brandId: number[]): Observable<ListResponseModel<Car>> {
  //   let newPath = this.apiUrl + 'cars/getbybrand?brandId=' + brandId.join(',');

  //   return this.httpClient.get<ListResponseModel<Car>>(newPath);
  // }
  getCarsByColor(colorId: number): Observable<ListResponseModel<Car>> {
    let newPath = this.apiUrl + 'cars/getbycolor?colorId=' + colorId;
    return this.httpClient.get<ListResponseModel<Car>>(newPath);
  }

  getCarsByBrandAndColor(brandId:number,colorId:number):Observable<ListResponseModel<Car>>{
    let newPath = this.apiUrl +'cars/getcarsbybrandandcolor?brandId='+brandId+'&colorId='+colorId;
    return this.httpClient.get<ListResponseModel<Car>>(newPath);
  }
  getCurrentCar() {
    return this.currentCar;
  }

}
