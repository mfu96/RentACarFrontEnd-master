import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Brand } from 'src/app/models/entities/brand';
import { Car } from 'src/app/models/entities/car';
import { CarDetailDto } from 'src/app/models/entities/carDetailDto';
import { Color } from 'src/app/models/entities/color';
import { CarService } from 'src/app/services/car.service';
import { ColorService } from 'src/app/services/color.service';
import { LocaleService } from 'src/app/services/locale.service';

@Component({
  selector: 'app-car',
  templateUrl: './car.component.html',
  styleUrls: ['./car.component.css'],
})
export class CarComponent implements OnInit {
  cars: Car[] = [];
  colors: Color[] = [];
  brands: Brand[]=[];

  selectedBrandIds: number[] = [];

  carDetails: CarDetailDto[] = [];
  carByDetail:CarDetailDto[]=[];
  currentCar:Car;
  dataLoaded = false;
  currentCurrency:string

  carForm= new FormGroup({
    car: new FormControl(this.cars),
  });

  constructor(
    private carService: CarService,
    private activatedRoute: ActivatedRoute,
    private toastrService:ToastrService,
    private localeService:LocaleService
  ) {}

  ngOnInit(): void {

    const locale = this.localeService.getBrowserLocale();
    this.currentCurrency = this.localeService.getCurrencyByLocale(locale);
    
    this.activatedRoute.params.subscribe((params) => {
      if (params['categoryId']) {
        this.getCarsByCategory(params['categoryId']);
      }
      else if ( params['brandId'] && params['colorId'])
        {
          this.getCarsByBrandAndColor(params['brandId'], params['colorId']);
        }
        // else if (params['brandId']) {
        //   this.getCarsByBrands(params['brandId'].split(',').map(Number));
        // }
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
      this.toastrService.info("Tüm araçlar listlendi")
    }
    });
  }


  
  getCarsByBrandAndColor(brandId: number, colorId: number) {
    this.carService
      .getCarsByBrandAndColor(brandId, colorId)
      .subscribe((response) => {
        this.cars = response.data;
        this.dataLoaded = true;
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

  // getCarsByBrands(brandId: number[]) {
  //   this.carService.getCarsByBrands(brandId).subscribe(response => {
  //     this.cars = response.data;
  //     this.dataLoaded = true;
  //   });
  // }
  // getCarsByDetail(carId:number){
  //   this.carService.getCarsByDetail(carId).subscribe(response=>{
  //      this.carDetails =response.data;
  //     this.dataLoaded=true;
  //   })
  // }
  setCurrentCar(car: Car) {
    this.currentCar = car;
    this.toastrService.info(car.carName +" plakalı araç listeleniyor")
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
