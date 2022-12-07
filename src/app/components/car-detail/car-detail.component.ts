import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Car } from 'src/app/models/entities/car';
import { CarDetailDto } from 'src/app/models/entities/carDetailDto';
import { CarImage } from 'src/app/models/entities/carImage';
import { CarImageService } from 'src/app/services/car-image.service';
import { CarService } from 'src/app/services/car.service';
//import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-car-detail',
  templateUrl: './car-detail.component.html',
  styleUrls: ['./car-detail.component.css'],
})
export class CarDetailComponent implements OnInit {
  carDetails: CarDetailDto[] = [];
  cars: Car[] = [];
  carImages: CarImage[]=[];
  dataLoaded = false;

  constructor(
    private carService: CarService,
    private carImageService:CarImageService,
    private activatedRoute: ActivatedRoute,
   // private domSanitizer: DomSanitizer
  ) {}

  ngOnInit(): void {
    this.activatedRoute.params.subscribe((params) => {
      // if (params['categoryId']) {
      //   this.getCarsByCategory(params['categoryId']);
      // } 
      // else 
      if (params['carId']) { 
        
        this.getCarsByDetail(params['carId']);
       this.getImageByCarId(params["carId"]);
      }
       else {
        this.getCarDetails();
      }
    });

    // this.getCarDetails();
  }
  getCarDetails() {
    this.carService.getCarDetails().subscribe((response) => {
      this.carDetails = response.data;
      this.dataLoaded = true;
    });
  }

  // getCarsByCategory(categoryId: number) {
  //   this.carService.getCarsByCategory(categoryId).subscribe((response) => {
  //     this.cars = response.data;
  //     this.dataLoaded = true;
  //   });
  // }

getImageSource(carImage:CarImage):string{
  let url:string ="https://localhost:44389" + carImage.imagePath;
  return url;
}


  getCarsByDetail(carId: number) {
    this.carService.getCarsByDetail(carId).subscribe((respone) => {
      this.carDetails = respone.data;
      this.dataLoaded = true;
    });
  }
  getImageByCarId(carid:number){
    this.carImageService.getImageByCarId(carid).subscribe(response=>{
      this.carImages=response.data;
      this.dataLoaded = true;
      console.log("Çalıştı mı?")
    })
  }

  setCarouselClassName(index:Number){
    if(index == 0){
      return "carousel-item active";
    }
    else {
      return "carousel-item";
    }
  }

  getSliderClassName(index:Number){
    if(index == 0){
      return "carousel-item active";
    } else {
      return "carousel-item";
    }
  }
}
