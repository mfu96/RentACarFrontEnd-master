import { CommonModule } from '@angular/common';
import { Component, Input, NgModule, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { BrowserModule, Title } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AppComponent } from 'src/app/app.component';
import { Car } from 'src/app/models/entities/car';
import { CarDetailDto } from 'src/app/models/entities/carDetailDto';
import { Customer } from 'src/app/models/entities/customer';
import { CustomerDetailDto } from 'src/app/models/entities/customerDetailDto';
import { Rental } from 'src/app/models/entities/rental';
import { RentalDetailDto } from 'src/app/models/entities/rentalDetailDto';
import { AuthService } from 'src/app/services/auth.service';
import { CarService } from 'src/app/services/car.service';
import { CustomerService } from 'src/app/services/customer.service';
import { LocalStorageService } from 'src/app/services/local-storge.service';
import { RentalService } from 'src/app/services/rental.service';
import { environment } from 'src/environments/environment.prod';

@Component({
  selector: 'app-rental',
  templateUrl: './rental.component.html',
  styleUrls: ['./rental.component.css'],
})
export class RentalComponent implements OnInit {

  @NgModule({
    imports: [
        BrowserModule,
        CommonModule,
        FormsModule,
        ReactiveFormsModule,FormGroup
    ],
    declarations: [
        AppComponent
    ],
    bootstrap: [AppComponent]
})

cars:Car[]=[];
rentals:RentalDetailDto[]=[];
imageUrl="https://localhost:44358/uploads/"
rentalAddFrom:FormGroup;


 customers:Customer[];

 customerDetails:CustomerDetailDto[];

 customerId: number;
 rentDate: Date;
 returnDate: Date;


   @Input() car:CarDetailDto;

  constructor(
    private rentalService:RentalService,
    private customerService:CustomerService,
    private toastrService:ToastrService,
    private router:Router,
    private activatedRoute:ActivatedRoute,
    private formBuilder:FormBuilder,
    private carService:CarService
  ) {}

  ngOnInit(): void {
    

    //Doğukna Dursundan


    // //car componentten bak
    // this.activatedRoute.params.subscribe((params)=>{
    //   if(params['customerId']){
    //     this.getCustomerId(params['customerId'])
    //     console.log("renatalComponentdeyim1")
    //   }
    //   else{
    //   console.log("renatalComponentdeyim2")        
    //   }

      
    // })

    this.getCustomer();

    

  }

  navigateToPay(rentId:number){

    this.router.navigate(['payment/pay', rentId]);  //Buraya geri dön 240723


  }

  createRentalAddForm(){
    this.rentalAddFrom=this.formBuilder.group({
      rentDate:[
        new Date().toISOString().substring(0,10), Validators.required
      ],
      returnDate:['', Validators.required],
      customerId:['',Validators.required]
    });
  }

  add(){
    if(this.rentalAddFrom.valid){
      let rental:Rental=Object.assign({},this.rentalAddFrom.value);
      rental.carId=this.cars[0].carId;
      let rentalPrice=this.calculateDiff(rental.returnDate,rental.rentDate)*this.cars[0].unitPrice;
      this.rentalService.addRental(rental).subscribe({
        next:(response)=>{
          console.log(rental);
            console.log((this.calculateDiff(rental.returnDate,rental.rentDate).toString()))

            this.toastrService.success(response.message, "OLDU");
            this.router.navigate([
              '/payment/'+ this.cars[0].carId+ '/'+ rentalPrice
            ]);
  
        },
        error: (responseError)=>{
          this.toastrService.error(responseError.error.message, "BAŞARAMADIK ABİ");
        },
      });
    }
    else{
      this.toastrService.error("BOŞ geçme")
    }
  }

  getCarImage(imagePath:string):string{
    const url= `${this.imageUrl}`;
    if(imagePath){
      return `${url + imagePath}`;

    }
    return url + 'DefaultImage.jpg';

  }

  getRentDates(cardId: number) {
    this.rentalService.getLastRentalByCarId(cardId).subscribe((response) => {
      this.rentals = response.data;
    });
  }


  calculateDiff(endDate:Date,startDate:Date) {
    const rentDate = new Date(startDate);
    const returnDate = new Date(endDate);

    return Math.floor(
      (Date.UTC(
        returnDate.getFullYear(),
        returnDate.getMonth(),
        returnDate.getDate()
      ) -
        Date.UTC(
          rentDate.getFullYear(),
          rentDate.getMonth(),
          rentDate.getDate()
        )) /
        (1000 * 60 * 60 * 24)
    );
  }






  getEmail(customerId:number){
    let email= localStorage.getItem("email");


      
      console.log(email.toString())
  }

 

  getCustomer(){
    this.customerService.getCustomerDetails().subscribe(response =>{
      this.customerDetails=response.data
      
    })

  }

  
  getCustomerId(customerid:number){
    this.customerService.getCustomerId(customerid).subscribe(response =>{
      this.customerDetails=response.data;

    })
  }



  getDate(day:number){
    var today=new Date();
    today.setDate(today.getDate()+ day);
    return today.toISOString().slice(0,10)
  }

  create(){
    let rental:Rental={
      carId: this.car.carId,
      customerId: parseInt(this.customerId.toString()),
      rentDate:this.rentDate,
      returnDate:this.returnDate
    }
    this.rentalService.addRental(rental).subscribe(response=>{
      this.toastrService.info("Ödeme sayfasına");
      this.toastrService.success("Kiralama Başarılı");
      this.router.navigate(["/payment", JSON.stringify(rental)]);
    },error=>{
        console.info(error)
        this.toastrService.error("Hata")
        this.toastrService.error("Hooop0000")
      }


      )



  }





}
