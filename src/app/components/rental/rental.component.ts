import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Car } from 'src/app/models/entities/car';
import { CarDetailDto } from 'src/app/models/entities/carDetailDto';
import { Customer } from 'src/app/models/entities/customer';
import { CustomerDetailDto } from 'src/app/models/entities/customerDetailDto';
import { Rental } from 'src/app/models/entities/rental';
import { AuthService } from 'src/app/services/auth.service';
import { CarService } from 'src/app/services/car.service';
import { CustomerService } from 'src/app/services/customer.service';
import { LocalStorageService } from 'src/app/services/local-storge.service';
import { RentalService } from 'src/app/services/rental.service';

@Component({
  selector: 'app-rental',
  templateUrl: './rental.component.html',
  styleUrls: ['./rental.component.css'],
})
export class RentalComponent implements OnInit {
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
    private activatedRoute:ActivatedRoute
  ) {}

  ngOnInit(): void {
    


    //car componentten bak
    this.activatedRoute.params.subscribe((params)=>{
      if(params['customerId']){
        this.getCustomerId(params['customerId'])
        console.log("renatalComponentdeyim1")
      }
      else{
      console.log("renatalComponentdeyim2")  
            this.getCustomer();
      }
      
    })


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
      this.toastrService.success(/*KiralamaBaşarılı*/ response.message);
      this.router.navigate(["/payment", JSON.stringify(rental)]);
    },error=>{
        console.info(error)
        this.toastrService.error(error.error.message)
        this.toastrService.error("Hooop0000")
      }


      )
  }


}
