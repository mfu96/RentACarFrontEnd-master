import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Brand } from 'src/app/models/entities/brand';
import { Car } from 'src/app/models/entities/car';
import { CarDetailDto } from 'src/app/models/entities/carDetailDto';
import { Color } from 'src/app/models/entities/color';
import { CarService } from 'src/app/services/car.service';
import { ColorService } from 'src/app/services/color.service';

@Component({
  selector: 'app-car',
  templateUrl: './car.component.html',
  styleUrls: ['./car.component.css'],
})
export class CarComponent implements OnInit {
  cars: Car[] = [];
  colors: Color[] = [];
  brands: Brand[]=[];
  carDetails: CarDetailDto[] = [];
  carByDetail:CarDetailDto[]=[];
  currentCar:Car;
  dataLoaded = false;

  constructor(
    private carService: CarService,
    private activatedRoute: ActivatedRoute,
  ) {}

  ngOnInit(): void {
    this.activatedRoute.params.subscribe((params) => {
      if (params['categoryId']) {
        this.getCarsByCategory(params['categoryId']);
      }
      else if(params["brandId"]){
        this.getCarsByBrand(params["brandId"]);
      }
      else if(params["colorId"]){
        this.getCarsByColor(params["colorId"]);
      }
      // else if (params["carId"]){
      //   this.getCarsByDetail(params["carId"]);
      // }
      
      else {
        this.getCars()
      }
    });
  }

  getCars() {
    this.carService.getCars().subscribe(response => {
      this.cars = response.data;
      this.dataLoaded = true;
    });
  }

  getCarDetails() {
    this.carService.getCarDetails().subscribe(response => {
      this.carDetails = response.data;
      this.dataLoaded = true;
    });
  }

  getCarsByCategory(categoryId: number) {
    this.carService.getCarsByCategory(categoryId).subscribe(response => {
      this.cars = response.data;
      this.dataLoaded = true;
    });
  }
  getCarsByColor(colorId: number) {
    this.carService.getCarsByColor(colorId).subscribe(response => {
      this.cars = response.data;
      this.dataLoaded = true;
    });
  }
  getCarsByBrand(brandId: number) {
    this.carService.getCarsByBrand(brandId).subscribe(response => {
      this.cars = response.data;
      this.dataLoaded = true;
    });
  }
  // getCarsByDetail(carId:number){
  //   this.carService.getCarsByDetail(carId).subscribe(response=>{
  //      this.carDetails =response.data;
  //     this.dataLoaded=true;
  //   })
  // }
  setCurrentCar(car: Car) {
    this.currentCar = car;
  }

  getCurrentCarClass(car: Car) {
    if (car == this.currentCar) {
      return 'list-group-item active';
    } else {
      return 'list-group-item';
    }
  }
  getAllCarClass(){
    if(!this.currentCar){
      return'list-group-item active';
    }
    else {
      return 'list-group-item';
  }
}
}
