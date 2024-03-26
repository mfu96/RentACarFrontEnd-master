import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { CarImage } from '../models/entities/carImage';
import { ListResponseModel } from '../models/responses/listResponseModel';
import { Car } from '../models/entities/car';

@Injectable({
  providedIn: 'root'
})
export class CarImageService {
  apiUrl =environment.apiUrl;
 
  constructor(private httpClient:HttpClient) { }

  getImageById(id:number):Observable<ListResponseModel<CarImage>>{
    let newPath=this.apiUrl + "carimages/getbyid?id=" + id;
    return this.httpClient.get<ListResponseModel<CarImage>>(newPath);
  }
  getImageByCarId(carId: number):Observable<ListResponseModel<CarImage>>{
    let newPath=this.apiUrl + "carImages/getimagesbycar?carid=" +carId;
    return this.httpClient.get<ListResponseModel<CarImage>>(newPath);
  }
  getAllImage():Observable<ListResponseModel<CarImage>>{
    let newPath=this.apiUrl+ "carImages/getall";
    return this.httpClient.get<ListResponseModel<CarImage>>(newPath);
  }
}
