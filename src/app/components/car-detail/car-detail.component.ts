import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Car } from 'src/app/models/entities/car';
import { CarDetailDto } from 'src/app/models/entities/carDetailDto';
import { CarImage } from 'src/app/models/entities/carImage';
import { Rental } from 'src/app/models/entities/rental';
import { CarImageService } from 'src/app/services/car-image.service';
import { CarService } from 'src/app/services/car.service';
import { CartService } from 'src/app/services/cart.service';
import { LocalStorageService } from 'src/app/services/local-storge.service';
import { LocaleService } from 'src/app/services/locale.service';
import { RentalService } from 'src/app/services/rental.service';
import { environment } from 'src/environments/environment';


@Component({
  selector: 'app-car-detail',
  templateUrl: './car-detail.component.html',
  styleUrls: ['./car-detail.component.css'],
})
export class CarDetailComponent implements OnInit {
  baseUrl=environment.baseUrl;
  carDetails: CarDetailDto [];
  car: Car;
  carImages: CarImage[] = [];
  currentDetail: CarDetailDto;
  dataLoaded = false;

  currentCurrency: string;


  // rental: Rental;
  // addRentCarForm: FormGroup;
  // carId: number
  // currentDate: Date = new Date();


  constructor(
    private carService: CarService,
    private carImageService: CarImageService,
    private activatedRoute: ActivatedRoute,
    private toastrService:ToastrService,
    private cartService:CartService,
    private localeService: LocaleService
    

  ) { }

  ngOnInit(): void {

    const locale = this.localeService.getBrowserLocale();
    this.currentCurrency = this.localeService.getCurrencyByLocale(locale);
    
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
        this.toastrService.info("Tüm araçların detayları listelendi")
      }
    });
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

  getImageSource(carImage: CarImage): string {
    let url: string = this.baseUrl + carImage.imagePath;
    return url;
  }


  getCarsByDetail(carId: number) {
    this.carService.getCarsByDetail(carId).subscribe((respone) => {
      this.carDetails = respone.data;
      this.dataLoaded = true;

    });
  }
  getImageByCarId(carid: number) {
    this.carImageService.getImageByCarId(carid).subscribe(response => {
      this.carImages = response.data;
      this.dataLoaded = true;
      console.log("CAR-DETAIL Çalıştı mı?")
    })
  }

  setCarouselClassName(index: Number) {
    if (index == 0) {
      return "carousel-item active";
    }
    else {
      return "carousel-item";
    }
  }

  getSliderClassName(index: Number) {
    if (index == 0) {
      return "carousel-item active";
    } else {
      return "carousel-item";
    }
  }
  setCurrentDetail(detail: CarDetailDto) {
    this.currentDetail = detail;
    this.toastrService.info(detail.carName + " plakalı ve " + detail.brandName + " marka araç listeleniyor")
  }

  getCurrentDetailClass(detail: CarDetailDto) {
    if (detail == this.currentDetail) {
      return 'list-group-item active';
    }
    else {
      return 'list-group-item'
    }
  }

  addToCartDetail(detail:CarDetailDto){

    
    this.toastrService.info("Sepete Eklendi",detail.carName)
    this.cartService.addToCartDetail(detail)
    console.log(detail)

  }

}
